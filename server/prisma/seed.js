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

    console.log('Seeding Expanded Indian Clubs Network...');

    const cities = [
        'Mumbai', 'Bangalore', 'Delhi', 'Goa', 'Pune',
        'Hyderabad', 'Gurgaon', 'Kolkata', 'Chennai', 'Chandigarh'
    ];

    const clubPrefixes = ['Neon', 'Velvet', 'Cyber', 'Electric', 'Void', 'Zenith', 'Pulse', 'Prism', 'Echo', 'Flux', 'Solar', 'Luna', 'Aura', 'Nova', 'Titan'];
    const clubSuffixes = ['Club', 'Lounge', 'Room', 'Stage', 'Vault', 'Orbit', 'Sphere', 'Haven', 'Sanctuary', 'Bunker', 'Basement', 'Attic', 'Garden', 'Plaza', 'Den'];

    const eventThemes = [
        'Midnight Mayhem', 'Sundowner Beats', 'Neon Carnival', 'Bollywood Night',
        'Techno Takeover', 'Retro Rewind', 'Acoustic Soul', 'Progressive Pulse',
        'EDM Explosion', 'Hip-Hop Hype', 'Trance Travel', 'House Party'
    ];

    for (const city of cities) {
        console.log(`Generating 10 clubs for ${city}...`);

        for (let i = 0; i < 10; i++) {
            const clubName = `${clubPrefixes[Math.floor(Math.random() * clubPrefixes.length)]} ${clubSuffixes[Math.floor(Math.random() * clubSuffixes.length)]} ${i + 1}`;

            // Generate random capacity between 100-500
            const totalCapacity = Math.floor(Math.random() * 401) + 100;

            // Distribute capacity across 2-3 pass types
            const passTypeCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
            const passTypes = [];

            let remainingCapacity = totalCapacity;
            for (let j = 0; j < passTypeCount; j++) {
                const isLast = j === passTypeCount - 1;
                const capacity = isLast ? remainingCapacity : Math.floor(remainingCapacity / (passTypeCount - j));
                remainingCapacity -= capacity;

                const names = ['General Entry', 'Couple Entry', 'VIP Access', 'Early Bird', 'VIP Lounge'];
                const prices = [500, 1000, 1500, 2000, 3000, 5000];

                passTypes.push({
                    name: names[j % names.length],
                    price: prices[Math.floor(Math.random() * prices.length)],
                    capacity: capacity
                });
            }

            await prisma.club.create({
                data: {
                    name: clubName,
                    city: city,
                    verified: Math.random() > 0.3,
                    events: {
                        create: [
                            {
                                title: eventThemes[Math.floor(Math.random() * eventThemes.length)].toUpperCase(),
                                date: new Date(Date.now() + Math.floor(Math.random() * 604800000)), // Random within next 7 days
                                passTypes: {
                                    create: passTypes
                                }
                            }
                        ]
                    }
                }
            });
        }
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

    console.log('Seeding complete! 🚀 Total Clubs: 100');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
