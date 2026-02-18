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
        +refreshToken(req, res)
        +logout(req, res)
        +getMe(req, res)
        +updateProfile(req, res)
    }

    class AuthService {
        +createUser(userData)
        +validateUser(email, password)
        +generateToken(user)
        +refresh(token)
    }

    class ClubController {
        +createClub(req, res)
        +getClub(req, res)
        +updateClub(req, res)
        +getAllClubs(req, res)
        +verifyClub(req, res)
        +getClubStats(req, res)
    }

    class ClubService {
        +create(clubData)
        +findById(id)
        +update(id, data)
        +findAll(filters)
        +getStats(clubId)
    }

    class EventController {
        +createEvent(req, res)
        +getEvent(req, res)
        +getClubEvents(req, res)
        +updateEvent(req, res)
        +getEventStats(req, res)
    }

    class EventService {
        +create(eventData)
        +findById(id)
        +findByClubId(clubId)
        +getStats(eventId)
    }

    class PassController {
        +createPassType(req, res)
        +updatePassType(req, res)
        +getPassType(req, res)
        +deletePassType(req, res)
    }

    class PassService {
        +createType(typeData)
        +updateType(id, data)
        +findById(id)
    }
    
    class OrderController {
        +createOrder(req, res)
        +verifyPayment(req, res)
        +getOrder(req, res)
        +getMyOrders(req, res)
    }

    class OrderService {
        +createOrder(userId, passTypeId, quantity)
        +verifyPayment(orderId, paymentDetails)
        +getUserOrders(userId)
    }

    class TicketController {
        +getMyTickets(req, res)
        +generateQR(req, res)
        +validateTicket(req, res)
    }

    class TicketService {
        +generate(orderId)
        +getQR(ticketId)
        +validate(qrCode)
    }

    class ScanController {
        +scanQR(req, res)
        +getScanHistory(req, res)
    }

    class ScanService {
        +processScan(qrCode, scannerId)
        +getHistory(clubId)
    }

    class PayoutController {
        +requestPayout(req, res)
        +getPayoutHistory(req, res)
        +getEarnings(req, res)
    }

    class PayoutService {
        +createRequest(clubId, amount)
        +getHistory(clubId)
        +calculateEarnings(clubId)
    }

    AuthController --> AuthService : uses
    ClubController --> ClubService : uses
    EventController --> EventService : uses
    PassController --> PassService : uses
    OrderController --> OrderService : uses
    TicketController --> TicketService : uses
    ScanController --> ScanService : uses
    PayoutController --> PayoutService : uses

    OrderService --> PassService : verifies availability
    TicketService --> OrderService : links to order
    ScanService --> TicketService : validates ticket
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
