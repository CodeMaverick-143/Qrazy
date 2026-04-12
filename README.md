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
- **CI/CD**: GitHub Actions (Verification & Automated SSH Deployment)
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

The project is configured for automated deployment via GitHub Actions.

### Deployment Workflow
- **Continuous Integration**: Every push triggers a build, lint, and Prisma validation check.
- **Continuous Deployment**: Successful builds on the `main` branch are automatically deployed to `Qrazy.nstsdc.org` via SSH.

### Server Requirements
- Docker and Docker-Compose must be installed on the host.
- Nginx must be configured to use the provided `deploy/nginx/conf.d/default.conf`.
- GitHub Secrets (`SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY`) must be configured in the repository settings.

## Development Standards

- **Code Quality**: Pre-configured ESLint v9 and Prettier for mandatory consistency.
- **Purity**: React components maintain 100% idempotency for performance.
- **Testing**: Integrated Jest (Backend) and Vitest/Playwright (Frontend) suites.

## License

Copyright (c) 2026 Qrazy Platforms. All rights reserved.


