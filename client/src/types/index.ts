export interface DbUser {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
}

export interface Club {
    id: string;
    name: string;
    city: string;
    description?: string;
    verified: boolean;
    image?: string;
    events?: Event[];
}

export interface PassType {
    id: string;
    name: string;
    price: number;
    capacity: number;
    eventId: string;
    event?: Event;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    clubId: string;
    club: Club;
    passTypes: PassType[];
}

export interface Order {
    id: string;
    userId: string;
    passTypeId: string;
    quantity: number;
    status: string;
    createdAt: string;
    passType: PassType;
}
