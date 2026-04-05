# Qrazy Project Architecture & DevOps Documentation

## System Architecture

Qrazy is built using a modern **ERN Stack** (Express, React, Node) with **Prisma ORM** and **Supabase** for Backend-as-a-Service (BaaS) functionality.

- **Frontend**: React 19 + Vite, with Tailwind CSS and Framer Motion for a custom cyber-slime aesthetic.
- **Backend**: Express.js server providing a REST API and Socket.io for real-time ticket scanning and capacity management.
- **Database**: PostgreSQL (via Supabase) with Prisma ORM for type-safe database access.
- **Authentication**: Hybrid Magic Link and Google OAuth (Supabase Auth).

---

## CI/CD Workflow

We use **GitHub Actions** for a fully automated pipeline.

1. **Continuous Integration**:
   - Every `push` and `pull_request` to `main` triggers `.github/workflows/ci.yml`.
   - Pipeline steps: Install -> Lint -> Unit Tests -> Integration Tests -> E2E Tests -> Production Build.
2. **Dependabot**:
   - Automated daily tracking of dependency vulnerabilities and updates.

---

## Design Decisions

- **Idempotency**: All deployment scripts are written to produce the same result regardless of the current state (`mkdir -p`, etc.).
- **Room-based Sockets**: Socket events are scoped to `club_${id}` rooms to prevent data leakage.

---

## Challenges & Solutions

- **Challenge**: Peer dependency conflicts between React 19 and older QR libraries.
  - **Solution**: Evaluated and switched to `html5-qrcode`.
- **Challenge**: Ensuring real-time capacity sync across distributed clients.
  - **Solution**: Implemented Redis (planned) or In-memory (current) Socket.io state management.
