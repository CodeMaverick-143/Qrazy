# Project Structure & UML Class Diagram

This document outlines the architectural structure of the Qrazy Club Pass Marketplace, including both the Backend (Node.js/Express) module design and the Frontend (React) component hierarchy.

## Backend Structure (Modules)

The backend is organized into functional modules. Each module contains a Controller (handling HTTP requests), a Service (business logic), and Routes.

```mermaid
classDiagram
    note "Backend Modules & Classes"

    class AuthController {
        +register(req, res)
        +login(req, res)
        +googleAuth(req, res)
        +logout(req, res)
        +getMe(req, res)
    }

    class AuthService {
        +createUser(userData)
        +validateUser(email, password)
        +generateToken(user)
    }

    class ClubController {
        +createClub(req, res)
        +getClub(req, res)
        +updateClub(req, res)
        +getAllClubs(req, res)
        +verifyClub(req, res)
    }

    class ClubService {
        +create(clubData)
        +findById(id)
        +update(id, data)
        +findAll(filters)
    }

    class EventController {
        +createEvent(req, res)
        +getEvent(req, res)
        +getClubEvents(req, res)
        +updateEvent(req, res)
    }

    class EventService {
        +create(eventData)
        +findById(id)
        +findByClubId(clubId)
    }

    class PassController {
        +createPassType(req, res)
        +purchasePass(req, res)
        +getMyPasses(req, res)
        +getPassDetails(req, res)
    }

    class PassService {
        +createType(typeData)
        +processOrder(userId, passTypeId)
        +generateQR(orderId)
        +getUserPasses(userId)
    }

    class ScanController {
        +scanQR(req, res)
        +getScanHistory(req, res)
    }

    class ScanService {
        +validateAndMarkUsed(qrCode)
        +logScan(qrPassId, scannerId)
    }

    AuthController --> AuthService : uses
    ClubController --> ClubService : uses
    EventController --> EventService : uses
    PassController --> PassService : uses
    ScanController --> ScanService : uses
```

## Frontend Structure (Components)

The frontend is built with React components, organized by feature and reusability.

```mermaid
classDiagram
    direction TB
    note "Frontend Component Hierarchy"

    class App {
        +render()
    }

    class Navbar {
        +render()
        -handleLogin()
        -handleLogout()
    }

    class Hero {
        +render()
    }

    class MainContent {
        <<Container>>
    }

    class TrustSection {
        +render()
    }

    class ValueProps {
        +render()
    }

    class ProblemSolution {
        +render()
    }

    class ProductOverview {
        +render()
    }

    class HowItWorks {
        +render()
    }

    class SecuritySection {
        +render()
    }

    class CTABand {
        +render()
        -handleGetStarted()
    }

    class Footer {
        +render()
    }

    App *-- Navbar
    App *-- MainContent
    App *-- Footer
    
    MainContent *-- Hero
    MainContent *-- TrustSection
    MainContent *-- ValueProps
    MainContent *-- ProblemSolution
    MainContent *-- ProductOverview
    MainContent *-- HowItWorks
    MainContent *-- SecuritySection
    MainContent *-- CTABand
```
