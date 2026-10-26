import http from "http";
import { createApp } from "./app.js";

async function runTests() {
  const app = createApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 5000;
  const baseUrl = `http://127.0.0.1:${port}`;

  console.log(`[test] Server running on ${baseUrl}`);

  try {
    // 1. Non-existent user
    console.log("Test 1: Non-existent user");
    const res1 = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "unknown@campus.local", password: "xyz" }),
    });
    const data1 = (await res1.json()) as any;
    console.assert(res1.status === 401, `Expected 401, got ${res1.status}`);
    console.assert(data1.error === "User does not exist", `Expected 'User does not exist', got '${data1.error}'`);
    console.log("✓ Test 1 passed");

    // 2. Wrong password
    console.log("Test 2: Wrong password");
    const res2 = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@campus.local", password: "wrongpassword" }),
    });
    const data2 = (await res2.json()) as any;
    console.assert(res2.status === 401, `Expected 401, got ${res2.status}`);
    console.assert(data2.error === "Password is wrong", `Expected 'Password is wrong', got '${data2.error}'`);
    console.log("✓ Test 2 passed");

    // 3. Admin login success
    console.log("Test 3: Admin login success");
    const res3 = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@campus.local", password: "campus123" }),
    });
    const data3 = (await res3.json()) as any;
    console.assert(res3.status === 200, `Expected 200, got ${res3.status}`);
    console.assert(data3.user.email === "admin@campus.local", "Admin email mismatch");
    console.assert(data3.user.role === "admin", "Admin role mismatch");
    console.assert(data3.user.mustChangePassword === false, "Admin mustChangePassword mismatch");
    const cookieHeader = res3.headers.get("set-cookie");
    console.assert(Boolean(cookieHeader && cookieHeader.includes("token=")), "Cookie not set");
    console.log("✓ Test 3 passed");

    const cookie = cookieHeader!.split(";")[0];

    // 4. Session /me with cookie
    console.log("Test 4: /api/auth/me with cookie");
    const res4 = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: cookie },
    });
    const data4 = (await res4.json()) as any;
    console.assert(res4.status === 200, `Expected 200, got ${res4.status}`);
    console.assert(data4.user.email === "admin@campus.local", "/me email mismatch");
    console.log("✓ Test 4 passed");

    // 5. Session /me without cookie
    console.log("Test 5: /api/auth/me without cookie");
    const res5 = await fetch(`${baseUrl}/api/auth/me`);
    console.assert(res5.status === 401, `Expected 401, got ${res5.status}`);
    console.log("✓ Test 5 passed");

    // 6. Faculty login (mustChangePassword: true)
    console.log("Test 6: Faculty login");
    const res6 = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "faculty@campus.local", password: "temp123" }),
    });
    const data6 = (await res6.json()) as any;
    console.assert(res6.status === 200, `Expected 200, got ${res6.status}`);
    console.assert(data6.user.mustChangePassword === true, "Faculty mustChangePassword should be true");
    const facultyCookie = res6.headers.get("set-cookie")!.split(";")[0];
    console.log("✓ Test 6 passed");

    // 7. Change password - wrong current password
    console.log("Test 7: Change password - wrong current");
    const res7 = await fetch(`${baseUrl}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: facultyCookie,
      },
      body: JSON.stringify({ currentPassword: "bad", newPassword: "newsecretpassword123" }),
    });
    const data7 = (await res7.json()) as any;
    console.assert(res7.status === 400, `Expected 400, got ${res7.status}`);
    console.assert(data7.error === "Current password is wrong", `Got ${data7.error}`);
    console.log("✓ Test 7 passed");

    // 8. Change password - same password
    console.log("Test 8: Change password - same password");
    const res8 = await fetch(`${baseUrl}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: facultyCookie,
      },
      body: JSON.stringify({ currentPassword: "temp123", newPassword: "temp123" }),
    });
    const data8 = (await res8.json()) as any;
    console.assert(res8.status === 400, `Expected 400, got ${res8.status}`);
    console.assert(data8.error.includes("different") || data8.error.includes("characters"), `Got ${data8.error}`);
    console.log("✓ Test 8 passed");

    // 9. Change password - success
    console.log("Test 9: Change password - success");
    const res9 = await fetch(`${baseUrl}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: facultyCookie,
      },
      body: JSON.stringify({ currentPassword: "temp123", newPassword: "newsecretpassword123" }),
    });
    const data9 = (await res9.json()) as any;
    console.assert(res9.status === 200, `Expected 200, got ${res9.status}`);
    console.assert(data9.user.mustChangePassword === false, "mustChangePassword should be false now");
    console.log("✓ Test 9 passed");

    // 10. Logout
    console.log("Test 10: Logout");
    const res10 = await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      headers: { Cookie: cookie },
    });
    console.assert(res10.status === 200, `Expected 200, got ${res10.status}`);
    const logoutCookie = res10.headers.get("set-cookie");
    console.assert(Boolean(logoutCookie && (logoutCookie.includes("token=;") || logoutCookie.includes("Max-Age=0"))), "Cookie not cleared");
    console.log("✓ Test 10 passed");

    console.log("\nALL BACKEND AUTH TESTS PASSED PERFECTLY! 🎉\n");
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
