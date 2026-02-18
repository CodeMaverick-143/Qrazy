# Qrazy App – Use Case Flow

This document represents the structured Use Case Flow for the Qrazy App platform.

---

## Diagram

```mermaid
flowchart LR
    %% Title
    %% Qrazy_App Use Case Flow

    %% Actors
    Student["Student / User"]
    ClubAdmin["Club Admin"]
    SuperAdmin["Super Admin"]

    %% System Boundary
    subgraph Qrazy_App

        %% Authentication
        Login([Register or Login via Magic Link])

        %% Student Functions
        subgraph Student_Functions
            ViewClubs([View Clubs and Events])
            BuyPass([Buy Event Pass])
            ViewTickets([View My Tickets])
        end

        %% Club Admin Functions
        subgraph Club_Admin_Functions
            CreateClub([Create Club])
            CreateEvent([Create Event])
            ManagePass([Manage Pass Types])
            ScanQR([Scan and Verify Ticket QR])
        end

        %% Super Admin Functions
        subgraph Super_Admin_Functions
            VerifyClub([Verify Club])
            ViewStats([View Platform Stats])
        end

    end

    %% Actor Relationships
    Student --> Login
    ClubAdmin --> Login
    SuperAdmin --> Login

    %% Student Relationships
    Student --> ViewClubs
    Student --> BuyPass
    Student --> ViewTickets

    %% Club Admin Relationships
    ClubAdmin --> CreateClub
    ClubAdmin --> CreateEvent
    ClubAdmin --> ManagePass
    ClubAdmin --> ScanQR

    %% Super Admin Relationships
    SuperAdmin --> VerifyClub
    SuperAdmin --> ViewStats

    %% Include Dependencies (Authentication Required)
    BuyPass -.->|Requires Login| Login
    CreateClub -.->|Requires Login| Login
    CreateEvent -.->|Requires Login| Login
    ManagePass -.->|Requires Login| Login
    ScanQR -.->|Requires Login| Login
```

---

## Description

### Actors

- **Student / User**
- **Club Admin**
- **Super Admin**

---

### Core Authentication

All actors must register or login using a **Magic Link Authentication system** before accessing protected features.

---

### Student Capabilities

- View available clubs and events  
- Purchase event passes  
- View purchased tickets  

---

### Club Admin Capabilities

- Create and manage clubs  
- Create events  
- Configure pass types  
- Scan and verify QR-based tickets  

---

### Super Admin Capabilities

- Verify clubs  
- Monitor platform statistics  

---

## Notes

- Authentication is required for all transactional or administrative actions.
- The system boundary clearly separates platform logic from actors.
- This structure follows GitHub-compatible Mermaid flowchart format.
