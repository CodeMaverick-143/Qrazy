import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Cleaning up database...');
    // Order matters for cleanup (delete children first)
    await prisma.scanLog.deleteMany();
    await prisma.qRPass.deleteMany();
    await prisma.order.deleteMany();
    await prisma.passType.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();
    await prisma.club.deleteMany();

    console.log('Seeding Indian Clubs...');

    const clubs = [
        {
            name: 'The Vault',
            city: 'Mumbai',
            verified: true,
            events: {
                create: [
                    {
                        title: 'MIDNIGHT MAYHEM',
                        date: new Date(Date.now() + 86400000), // Tomorrow
                        passTypes: {
                            create: [
                                { name: 'General Entry', price: 1500, capacity: 100 },
                                { name: 'Couple Entry', price: 2500, capacity: 50 },
                                { name: 'VIP Lounge', price: 10000, capacity: 10 }
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'Social - Indiranagar',
            city: 'Bangalore',
            verified: true,
            events: {
                create: [
                    {
                        title: 'SUNDOWNER BEATS',
                        date: new Date(Date.now() + 172800000), // Day after
                        passTypes: {
                            create: [
                                { name: 'Stag Entry', price: 1000, capacity: 200 },
                                { name: 'Couple Entry', price: 1800, capacity: 100 }
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'Kitty Su',
            city: 'Delhi',
            verified: true,
            events: {
                create: [
                    {
                        title: 'NEON CARNIVAL',
                        date: new Date(Date.now() + 259200000), // 3 days later
                        passTypes: {
                            create: [
                                { name: 'Early Bird', price: 2000, capacity: 300 },
                                { name: 'VIP Access', price: 5000, capacity: 50 }
                            ]
                        }
                    }
                ]
            }
        },
        {
            name: 'Priveé',
            city: 'Delhi',
            verified: false,
            events: {
                create: [
                    {
                        title: 'BOLLYWOOD NIGHT',
                        date: new Date(Date.now() + 432000000), // 5 days later
                        passTypes: {
                            create: [
                                { name: 'General', price: 2500, capacity: 500 }
                            ]
                        }
                    }
                ]
            }
        }
    ];

    for (const clubData of clubs) {
        await prisma.club.create({
            data: clubData
        });
    }

    console.log('Seeding Super Admin...');
    await prisma.user.create({
        data: {
            email: 'admin@qrazy.in',
            name: 'Qrazy Admin',
            role: 'SUPER_ADMIN',
            isEmailVerified: true
        }
    });

    console.log('Seeding complete! 🚀');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
