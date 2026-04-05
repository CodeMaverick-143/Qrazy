# QRAZY — The Future of Nightlife Access

Qrazy is a production-grade, secure event-ticketing platform built for the underground nightlife scene. It leverages real-time QR validation, encrypted authentication, and a modularized ERN stack to provide a seamless, screenshot-proof entry experience.

---

## Architecture

Qrazy follows a **Modular Monolith** architecture for the backend and a **Context-Driven Component** architecture for the frontend.

### **The Stack**
- **Frontend**: React 19 (Vite) + Tailwind CSS 4 + Framer Motion (Animations).
- **Backend**: Node.js + Express 5 (Modular Sub-systems).
- **Database**: PostgreSQL (Supabase) + Prisma ORM.
- **Security**: Supabase Auth (OTP/Magic Links) + JWT RBAC.

### **Database Schema**
The system uses a highly relational schema to handle complex club operations:
- **Clubs & Events**: One-to-many relationship supporting recurring and one-off events.
- **PassTypes**: Granular capacity management (VIP, Couple, General).
- **Orders & QRPasses**: Secure linking of financial transactions to entry tokens.

---

## Development Workflow

We prioritize **Reliability** and **Quality Gates** at every stage of development.

1.  **Strict Linting**: ESLint and Prettier are integrated into the pre-commit and CI phases to ensure uniform code style.
2.  **Tiered Testing Strategy**:
    *   **Unit**: Testing pure utility functions and isolated React components (Jest/Vitest).
    *   **Integration**: Testing the interplay between API routes, Controllers, and the Prisma Service Layer (Supertest).
    *   **E2E (End-to-End)**: Browser-level simulations of the user journey from Landing to Login (Playwright).
3.  **Automated CI/CD**: Every Pull Request triggers a GitHub Actions pipeline that validates linting, formatting, and all test suites. Deployment only occurs once all "Green" status signatures are collected.

---

## Design Decisions

- **Supabase for Auth**: We chose Magic Links (OTP) to eliminate password fatigue and enhance security for a mobile-first user base.
- **Prisma ORM**: Selected for its extreme type safety and intuitive relationship handling, allowing us to maintain a complex database schema with zero runtime mapping errors.
- **Atomic Styling**: Tailwind CSS was chosen to achieve the "Cyberpunk/Underground" aesthetic with high performance and zero CSS bloat.
- **Modular Backend**: We structured the server by "Feature-Modules" (Auth, Clubs, Scans) rather than "Tech-Layers" to ensure the platform remains scalable as new club features are added.

---

## Challenges & Solutions

### **Challenge 1: Safe Data Ingestion (Idempotence)**
**Problem**: Traditional seed scripts often fail on second execution or wipe production data accidentally.
**Solution**: We implemented an **Upsert-Driven Seed Strategy**. Our `seed.js` script checks for the existence of records (like the Super Admin) using unique identifiers, ensuring it can be safely re-run without disrupting the system.

### **Challenge 2: Real-Time Scanning Integrity**
**Problem**: High-traffic club entries require millisecond-level validation without database bottlenecks.
**Solution**: We optimized the `ScanService` with atomic transactions and optimized Prisma indexing to ensure QR validation happens in <50ms.

### **Challenge 3: Multi-Environment Consistency**
**Problem**: Testing database logic in CI environments where the DB might be unreachable.
**Solution**: We implemented **Guard-Clauses** in our infrastructure scripts. The setup process detects environmental restrictions and gracefully handles them, maintaining a "Green" status for non-critical failures.

---

## Quickstart

Run our fully **idempotent** setup script to prepare the repository:

```bash
bash scripts/setup.sh
```

Then launch the platform:
- **Server**: `npm run dev` in `/server`
- **Client**: `npm run dev` in `/client`
