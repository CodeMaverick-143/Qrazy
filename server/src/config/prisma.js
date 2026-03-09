import { PrismaClient } from "@prisma/client";

class Database extends PrismaClient {
    constructor() {
        super({
            log: ["error", "warn"],
        });
    }

    async connect() {
        try {
            const sanitizedUrl = process.env.DATABASE_URL?.replace(/:([^:@]+)@/, ":****@");
            console.log(`Attempting to connect to database: ${sanitizedUrl}`);
            await this.$connect();
            console.log("Database connected successfully");
        } catch (error) {
            console.error("Database connection failed", error);
            process.exit(1);
        }
    }

    async disconnect() {
        await this.$disconnect();
        console.log("Database disconnected");
    }
}

const db = new Database();
export default db;
