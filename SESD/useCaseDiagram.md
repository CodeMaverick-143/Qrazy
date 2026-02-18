# Use Case Diagram

```mermaid
usecaseDiagram
    actor User as "Student / User"
    actor ClubAdmin as "Club Admin"
    actor SuperAdmin as "Super Admin"

    package "Qrazy App" {
        usecase "Register / Login (Magic Link)" as UC1
        usecase "View Clubs & Events" as UC2
        usecase "Buy Event Pass" as UC3
        usecase "View My Tickets" as UC4
        usecase "Verify Ticket (QR)" as UC5
        
        usecase "Create Club" as UC6
        usecase "Create Event" as UC7
        usecase "Manage Pass Types" as UC8
        usecase "Scan Tickets" as UC9
        
        usecase "Verify Club" as UC10
        usecase "View Platform Stats" as UC11
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
