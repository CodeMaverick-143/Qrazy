# Qrazy - The Future of Nightlife Access

Qrazy is a high-performance, decentralized nightlife access platform designed to eliminate fraud and streamline entry for elite clubs and celebrity events. By leveraging digital pass technology and identity verification, Qrazy ensures that every entry is authentic and every experience is seamless.

## Core Features

- **Digital Pass Infiltration**: Secure, non-transferable QR codes for club entry.
- **Elite Club Network**: Curated access to 50+ premium venues across major Indian metropolitan areas.
- **Celebrity Frequencies**: Real-time event tracking for top-tier artists and DJs.
- **Holographic UI**: A high-fidelity, glassmorphic interface built for the modern nightlife enthusiast.
- **Automated Verification**: Integrated gate-scanning system for venue administrators.

## Technical Stack

### Frontend
- **Framework**: Vite + React
- **Styling**: Vanilla CSS / Tailwind CSS (Optional)
- **Animation**: Framer Motion
- **Icons**: Phosphor Icons
- **Logic**: React Hooks with custom Auth and Toast contexts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma v5+
- **Database**: PostgreSQL (Dockerized or Supabase)
- **Authentication**: Supabase Auth (Google OAuth & Email)

### Infrastructure
- **Containerization**: Docker & Docker-Compose
- **Reverse Proxy**: Nginx with SSL termination
- **CI/CD**: GitHub Actions (Automated Build & Amazon ECS Deployment)
- **Monitoring**: Integration-level health checks

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/CodeMaverick-143/Qrazy.git
   cd Qrazy
   ```

2. Install dependencies for both client and server:
   ```bash
   # Root/Server
   cd server && npm install
   # Client
   cd ../client && npm install
   ```

3. Set up environment variables in `server/.env`:
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/qrazy"
   DIRECT_URL="postgresql://user:pass@localhost:5432/qrazy"
   SUPABASE_URL="your-project-url"
   SUPABASE_ANON_KEY="your-anon-key"
   ```

4. Initialize the database:
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Launch the development environment:
   ```bash
   # Server (Port 5000)
   npm run dev
   # Client (Port 5017)
   cd ../client && npm run dev
   ```

## Production Deployment

The project is configured for automated containerized deployment via GitHub Actions.

### Deployment Workflow
- **Continuous Integration**: Every push triggers build, lint, and Prisma validation checks via `.github/workflows/ci.yml`.
- **Continuous Deployment**: Successful merges to `main` trigger `.github/workflows/deploy.yml` which:
    1. Builds Docker images for Frontend and Backend.
    2. Pushes images to **Amazon ECR**.
    3. Updates the **Amazon ECS (Fargate)** task definition.
    4. Triggers a rolling update on the ECS Service.

### Infrastructure Requirements
- **Amazon ECR**: Repositories for `qrazy-frontend` and `qrazy-backend`.
- **Amazon ECS**: A cluster and service configured with Fargate.
- **AWS SSM**: Secrets stored in Parameter Store (`/QRAZY_DATABASE_URL`, etc.).
- **GitHub Secrets**:
    - `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY`
    - `SUPABASE_URL` & `SUPABASE_ANON_KEY` (for frontend build)

## Development Standards

- **Code Quality**: Pre-configured ESLint v9 and Prettier for mandatory consistency.
- **Purity**: React components maintain 100% idempotency for performance.
- **Testing**: Integrated Jest (Backend) and Vitest/Playwright (Frontend) suites.

## License

Copyright (c) 2026 Qrazy Platforms. All rights reserved.


