# Campus AI Assistant — Architecture & Auth Slice

An academic management and RAG-powered AI assistant platform with role-based access for Administrators, Faculty, and Students.

---

## Auth Slice Phase-wise Roadmap

| Phase | Title | Scope & Objectives | Status |
|---|---|---|---|
| **Phase 0** | **Design System & Visual Shell** | Real, cohesive UI shell defining the visual language for the whole app: login, admin dashboard, force password change, and design tokens. Mock auth in memory. | **Completed** |
| **Phase 1** | **App Bootstrap** | Runnable frontend and backend (`Express + TypeScript`), `/api/health`, and Vite `/api` proxy. | **Completed** |
| **Phase 2** | **Users Table & Admin Seed** | MySQL `users` table migration, constraints, and idempotent admin seed. | Pending |
| **Phase 3** | **Login API + JWT Cookie** | `POST /api/auth/login`, bcrypt hash comparison, httpOnly JWT cookie. | Pending |
| **Phase 4** | **Wire Login UI to API** | Real sign-in via cookie, error message mapping, redirect to dashboard. | Pending |
| **Phase 5** | **Change Password** | `POST /api/auth/change-password` endpoint + first-login UI integration. | Pending |
| **Phase 6** | **Guards & /me Session** | Session restore on refresh, route guards for roles and mandatory password change. | Pending |
| **Phase 7** | **Logout & Slice Verification** | `POST /api/auth/logout`, cookie invalidation, end-to-end slice verification. | Pending |

---

## Phase 0: Visual System & Design Specifications

### 1. Visual Direction
* **Theme**: Light, warm paper canvas (`#F7F6F3`), lots of whitespace, crisp 1px borders (`#E7E5E4`), minimal elevation/shadows.
* **Typography**:
  * **UI & Body**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) (`--font`)
  * **Brand Mark & Large Headings**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (`--serif`)
  * **Data & Stats**: Tabular numbers (`tabular-nums`)
* **Color Tokens** (`src/styles/tokens.css`):
  * `--bg`: `#F7F6F3` (warm paper)
  * `--surface`: `#FFFFFF` (cards, sidebar)
  * `--text`: `#1C1917` (primary text)
  * `--text-muted`: `#78716C` (labels, hints)
  * `--line`: `#E7E5E4` (1px borders)
  * `--accent`: `#1D4E4A` (deep teal)
  * `--accent-hover`: `#163E3B`
  * `--danger`: `#B42318` (error text, invalid inputs)
  * `--ok`: `#3F7D57` (success / active state)
  * `--radius`: `12px` (containers, cards)
  * `--radius-sm`: `10px` (inputs, buttons)
* **Form Controls**:
  * **Buttons**: Filled accent, exactly 40px height, no gradients.
  * **Inputs**: White background, 40px height, 1px muted border, accent focus ring.
  * **Errors**: Displayed in `--danger` color directly **under the field**, plus accessible `aria-invalid` / `aria-describedby` attributes.

---

## Implemented Screens

1. **Login (`/login`)**:
   * Centered card with brand glyph and serif title.
   * Email and password inputs with field-level inline error validation ("User does not exist", "Password is wrong", "Enter your campus email").
   * Role-aware redirection upon sign-in.
2. **Force Password Change (`/change-password`)**:
   * Focused security card for users with `mustChangePassword = true`.
   * Current password & new password validation (minimum 8 characters, must differ from current).
   * Inline field-level error messages.
3. **Admin Shell & Dashboard (`/admin`)**:
   * Left navigation sidebar with Campus brand, active "Dashboard" route, and visible inactive links ("Faculty", "Students", "Courses", "Materials") labeled "Soon".
   * Top bar displaying authenticated user email, role pill, and logout action.
   * Greeting header and 4 summary metric cards (`Faculty`, `Students`, `Courses`, `Materials`) with tabular numbers and roadmap panel.
4. **Coming Soon Placeholder (`/coming-soon`)**:
   * Dedicated landing view for non-admin accounts until their respective dashboards are implemented.

---

## Mock Accounts for Phase 0

| Account | Email | Password | Role | Behavior |
|---|---|---|---|---|
| **Admin** | `admin@campus.local` | `campus123` | Admin | Direct access to `/admin` dashboard |
| **Faculty** | `faculty@campus.local` | `temp123` | Faculty | Redirects to `/change-password` first, then `/coming-soon` |
| **Student** | `student@campus.local` | `temp123` | Student | Redirects to `/change-password` first, then `/coming-soon` |

---

## Running Locally

### Option A: Run Both Frontend & Backend Concurrently (Recommended)
From the project root:
```bash
npm install
npm run dev
```
* **Frontend**: `http://localhost:5173` (Vite)
* **Backend**: `http://localhost:5000` (Express)
* **API Health Check**: `http://localhost:5173/api/health` (via Vite proxy) or `http://localhost:5000/api/health`

### Option B: Run Services Individually
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

