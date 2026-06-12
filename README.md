SmartVision – Kids Educational Platform

SmartVision is a secure, full-stack web application designed to provide a structured, gamified learning environment for early childhood education (ages 3–6). It separates educational modules into a dedicated **Learning Phase** (concept understanding) and a **Playing Phase** (practical application through games). The platform features robust parental controls, including dynamic screen time limits and encrypted master PIN access to foster healthy digital habits.

## 🚀 Key Features

- **Dual-Phase Core Learning:** Structural splits for core foundational topics like alphabets, numbers, colors, shapes, memory matching, and animal sounds.
- **Advanced Parental Control Framework:** Parents can select explicit playtime sessions (15, 30, 45, 60 minutes).
- **Global Lock Screen Enforcement:** The application overlays an inescapable lock container immediately when session limits expire.
- **Secure Authentication & Management:** Integrates Firebase Auth (Google Sign-In) to isolate unique parent records and safe usage tracking.
- **Protected Access Verification:** Encrypted 4-digit Master PIN protection utilizando bcrypt hashing routines for editing limits or unlocking sessions.

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend:** FastAPI (Python), REST APIs
- **Database:** PostgreSQL (Cloud hosted via Neon/Render)
- **Authentication & Security:** Firebase Auth, Passlib (bcrypt hashing)
- **Deployment & Lifecycle:** Vercel (Frontend), Render (Backend & DB)

## 📂 Project Architecture

File written successfully.

```text
├── frontend/             # React + TypeScript + Tailwind CSS application
│   ├── src/
│   │   ├── components/   # Modular, reusable layouts (Navbar, Section, Timer overlays)
│   │   ├── pages/        # Dynamic phases (Home, Selection, Phase1: Learn, Phase2: Play)
│   │   └── context/      # Firebase authentication & session state engines
└── backend/              # High-performance FastAPI backend
    ├── app/
    │   ├── api/          # Route controller layers and CRUD transactions
    │   ├── core/         # Security configurations and password hashing logic
    │   ├── models/       # SQLAlchemy relational database mapping definitions
    │   └── schemas/      # Strict structure request and response validations (Pydantic)


⚙️ Setup and Configuration
Prerequisites
Node.js (v18+ recommended)
Python 3.10+
PostgreSQL instance
