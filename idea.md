# Qrazy — Club Pass Marketplace

## One-liner
A modern platform to buy, sell, and verify club passes online with secure QR-based entry, built using the ERN stack, Prisma, and Supabase (Google OAuth).

---

## Problem Statement
Nightlife access is fragmented and unreliable:
- Offline promoters lead to scams and fake passes
- No centralized platform for verified club passes
- Manual guest lists and screenshots cause entry chaos
- No controlled resale or audit trail

Clubs lose control, users lose money, and entry management breaks down.

---

## Solution
Qrazy is a digital marketplace where:
- Clubs list verified events and passes
- Users purchase passes online
- QR codes are used for secure, one-time entry
- Optional resale is supported with platform enforcement

No screenshots. No fake passes. Fully verifiable entry.

---

## Target Audience
- College students and nightlife enthusiasts
- Tourists in metro cities
- Club owners and managers
- Event promoters

---

## Core Use Cases

### Users
- Sign in using Google OAuth (Supabase)
- Discover clubs by city and date
- Purchase different types of passes
- Access QR passes inside the app
- Resell unused passes (if enabled)
- View order and entry history

### Clubs
- Create and manage club profiles
- Create events and pass types
- Configure pricing and capacity
- Scan QR passes at entry
- Track real-time entry count
- View earnings and analytics

---

## Pass Types
- General Entry
- Couple Entry
- Stag Entry
- Ladies Entry
- VIP or Lounge Entry
- Table Booking
- Event-specific passes

---

## Authentication and Security
- Supabase Authentication
- Google OAuth
- Role-based access control:
  - USER
  - CLUB_ADMIN
  - SUPER_ADMIN
- JWT-based API authorization

---

## Anti-Fraud System
- Unique QR code per pass
- QR invalid after first scan
- Time-window and event-bound validation
- Club-restricted scanning
- Scan logs for auditing
- Verified club badges

---

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS and Shadcn UI
- TanStack Query
- QR code generation and display
- Dark, nightlife-focused UI

### Backend
- Node.js with Express
- Prisma ORM
- PostgreSQL
- WebSockets for real-time updates

### Authentication and Infrastructure
- Supabase for authentication and OAuth
- Supabase-hosted PostgreSQL
- Prisma connected to Supabase database
- Object storage for club assets

---

## Database Design (High-Level)

### Core Models
- User
- Club
- Event
- PassType
- Order
- QRPass
- ScanLog
- Payout

### Relationships
- One Club has many Events
- One Event has many PassTypes
- One PassType has many Orders
- One Order maps to one QRPass
- One QRPass has many ScanLogs

---

## MVP Scope
- Google OAuth login
- Club and event listings
- Pass purchase flow
- QR code generation and validation
- Basic admin dashboards
- Scan logging
