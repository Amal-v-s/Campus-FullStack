import { useHealth } from "../hooks/useHealth";

const STATS = [
  { label: "Faculty", value: "—", note: "Directory comes later" },
  { label: "Students", value: "—", note: "Enrollment comes later" },
  { label: "Courses", value: "—", note: "Catalog comes later" },
  { label: "Materials", value: "—", note: "Uploads come later" },
];

const UPCOMING = [
  { title: "Invite faculty", detail: "Create accounts and issue first passwords" },
  { title: "Enroll students", detail: "Assign students to classes and courses" },
  { title: "Attach materials", detail: "Faculty uploads feed the RAG assistant" },
];

export function AdminDashboardPage() {
  const { health, error, loading } = useHealth();

  return (
    <>
      <header className="page-head">
        <h1 className="serif">Welcome back</h1>
        <p className="muted">
          This is the admin home. Academic structure tools will land here in
          later phases.
        </p>
      </header>

      <section className="stats" aria-label="Summary">
        {STATS.map((stat) => (
          <article key={stat.label} className="stat-card">
            <div className="label">{stat.label}</div>
            <div className="value">{stat.value}</div>
            <div className="note">{stat.note}</div>
          </article>
        ))}
      </section>

      <section className="panel" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 15 }}>Backend API Proxy</h3>
            <p className="muted" style={{ fontSize: 13, marginTop: 4 }}>
              GET /api/health → Node + Express backend service
            </p>
          </div>
          <div>
            {loading ? (
              <span className="role-pill" style={{ background: "var(--line)", color: "var(--text-muted)" }}>
                Checking proxy...
              </span>
            ) : health ? (
              <span className="role-pill" style={{ background: "var(--ok-soft)", color: "var(--ok)" }}>
                ● Connected (HTTP 200)
              </span>
            ) : (
              <span className="role-pill" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
                ● {error || "Service unavailable"}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="panel">
        <h3>On the roadmap</h3>
        <ul className="upcoming">
          {UPCOMING.map((item) => (
            <li key={item.title}>
              <span>{item.title}</span>
              <span className="muted">{item.detail}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
