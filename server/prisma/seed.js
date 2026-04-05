import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.scanLog.deleteMany();
  await prisma.qRPass.deleteMany();
  await prisma.order.deleteMany();
  await prisma.passType.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();
  await prisma.club.deleteMany();

  const clubData = {
    MUMBAI: [
      "Tryst Nightclub", "Kitty Su (Mumbai)", "Dragonfly Experience", "Matahaari", "Club Sirkus",
      "Aer Lounge", "Toto’s Garage", "Playboy Club Mumbai", "R Adda", "Wink"
    ],
    BANGALORE: [
      "Skyye", "Loft 38", "NoLimmits Lounge", "Kitty Ko", "The Boozy Griffin",
      "Fandom", "The 13th Floor", "Pebble", "Big Pitcher", "XU Fashion Bar"
    ],
    DELHI: [
      "Kitty Su (Delhi)", "Priveé", "Toy Room Delhi", "Soho Club", "Summer House Café",
      "Playboy Club Delhi", "Key Nightclub", "RSVP Club", "House A", "Aquila"
    ],
    GOA: [
      "Club Cubana", "Tito’s", "Café Mambos", "LPK Waterfront", "SinQ Night Club",
      "Hilltop", "Shiva Valley", "Cohiba", "Cape Town Café", "Waters Beach Lounge"
    ],
    PUNE: [
      "Mi A Mi", "Penthouze Nightlife", "The House of Medici", "LIIT", "Waters Bar",
      "High Spirits (live gigs)", "Ballr", "Social (KP)", "Coco Sushi & Bar", "Viman Nagar clubs zone"
    ]
  };

  const artists = [
    "Arijit Singh", "Diljit Dosanjh", "Badshah", "AP Dhillon", "Karan Aujla",
    "Divine", "Ritviz", "Nucleya", "Raftaar", "Yo Yo Honey Singh",
    "Neha Kakkar", "Sunidhi Chauhan", "Shreya Ghoshal", "King", "Prateek Kuhad",
    "Anuv Jain", "Darshan Raval", "Jubin Nautiyal", "Armaan Malik", "Sachet Tandon",
    "Parampara Thakur", "DJ Chetas", "DJ NYK", "Lost Stories", "Zaeden",
    "KSHMR", "Amaal Mallik", "B Praak", "Guru Randhawa", "Hardy Sandhu",
    "Martin Garrix", "David Guetta", "Alan Walker", "Marshmello", "The Chainsmokers",
    "Calvin Harris", "DJ Snake", "Skrillex", "Hardwell", "Armin van Buuren",
    "Tiesto", "Afrojack", "Zedd", "Diplo", "Steve Aoki",
    "Avicii", "Dua Lipa", "Travis Scott", "Drake", "Post Malone"
  ];

  const cityToClubs = {};
  for (const [city, names] of Object.entries(clubData)) {
    cityToClubs[city] = [];
    for (const name of names) {
      const club = await prisma.club.create({
        data: {
          name,
          city,
          verified: true
        }
      });
      cityToClubs[city].push(club);
    }
  }

  let artistIndex = 0;
  for (const city of Object.keys(clubData)) {
    const clubs = cityToClubs[city];
    
    await prisma.event.create({
      data: {
        title: `${artists[artistIndex++].toUpperCase()} LIVE`,
        date: new Date(),
        clubId: clubs[0].id,
        passTypes: {
          create: [
            { name: "Early Bird", price: 499, capacity: 100 },
            { name: "General Admission", price: 999, capacity: 200 }
          ]
        }
      }
    });

    await prisma.event.create({
      data: {
        title: `${artists[artistIndex++].toUpperCase()} LIVE`,
        date: new Date(Date.now() + 86400000),
        clubId: clubs[1].id,
        passTypes: {
          create: [
            { name: "General Admission", price: 1299, capacity: 200 },
            { name: "VIP Access", price: 2999, capacity: 50 }
          ]
        }
      }
    });
  }

  while (artistIndex < artists.length) {
    const artist = artists[artistIndex++];
    const cities = Object.keys(clubData);
    const city = cities[Math.floor(Math.random() * cities.length)];
    const clubs = cityToClubs[city];
    const club = clubs[Math.floor(Math.random() * clubs.length)];

    await prisma.event.create({
      data: {
        title: `${artist.toUpperCase()} LIVE`,
        date: new Date(Date.now() + (Math.floor(Math.random() * 28) + 2) * 24 * 60 * 60 * 1000),
        clubId: club.id,
        passTypes: {
          create: [
            { name: "General Admission", price: 999, capacity: 200 }
          ]
        }
      }
    });
  }

  await prisma.user.upsert({
    where: { email: "admin@qrazy.in" },
    update: {},
    create: {
      email: "admin@qrazy.in",
      name: "Qrazy Admin",
      role: "SUPER_ADMIN",
      isEmailVerified: true
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
