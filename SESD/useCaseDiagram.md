# Use Case Diagram

```mermaid
usecaseDiagram
    actor "Student / User" as User
    actor "Club Admin" as ClubAdmin
    actor "Super Admin" as SuperAdmin

    rectangle "Qrazy App" {
        usecase UC1 as "Register / Login (Magic Link)"
        usecase UC2 as "View Clubs & Events"
        usecase UC3 as "Buy Event Pass"
        usecase UC4 as "View My Tickets"
        usecase UC5 as "Verify Ticket (QR)"
        
        usecase UC6 as "Create Club"
        usecase UC7 as "Create Event"
        usecase UC8 as "Manage Pass Types"
        usecase UC9 as "Scan Tickets"
        
        usecase UC10 as "Verify Club"
        usecase UC11 as "View Platform Stats"
    }

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5

    ClubAdmin --> UC1
    ClubAdmin --> UC6
    ClubAdmin --> UC7
    ClubAdmin --> UC8
    ClubAdmin --> UC9

    SuperAdmin --> UC1
    SuperAdmin --> UC10
    SuperAdmin --> UC11

    UC3 ..> UC1 : "requires"
    UC6 ..> UC1 : "requires"
```
