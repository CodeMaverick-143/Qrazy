# Use Case Diagram

```mermaid

usecaseDiagram
    actor User as "Student / User"
    actor ClubAdmin as "Club Admin"
    actor SuperAdmin as "Super Admin"

    rectangle Qrazy_App {
        (Register / Login via Magic Link) as UC1
        (View Clubs & Events) as UC2
        (Buy Event Pass) as UC3
        (View My Tickets) as UC4
        
        (Create Club) as UC6
        (Create Event) as UC7
        (Manage Pass Types) as UC8
        (Scan & Verify Ticket QR) as UC9
        
        (Verify Club) as UC10
        (View Platform Stats) as UC11
    }

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4

    ClubAdmin --> UC1
    ClubAdmin --> UC6
    ClubAdmin --> UC7
    ClubAdmin --> UC8
    ClubAdmin --> UC9

    SuperAdmin --> UC1
    SuperAdmin --> UC10
    SuperAdmin --> UC11

    UC3 ..> UC1 : <<include>>
    UC6 ..> UC1 : <<include>>
    UC7 ..> UC1 : <<include>>
    UC8 ..> UC1 : <<include>>
    UC9 ..> UC1 : <<include>>

```
