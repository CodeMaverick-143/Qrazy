import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

class EnvConfig {
    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || "development";
        this.PORT = Number(process.env.PORT || 4000);
        this.DATABASE_URL = this.getEnv("DATABASE_URL");
        this.DIRECT_URL = process.env.DIRECT_URL || "";
        this.SUPABASE_URL = process.env.SUPABASE_URL || "http://localhost:54321";
        this.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "dummy-anon-key";
        this.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy-service-role-key";
        this.FRONTEND_URL = process.env.FRONTEND_URL || "https://qrazy-drab.vercel.app";
        this.APP_NAME = "Qrazy";

        this.MAIL_HOST = process.env.MAIL_HOST || 'smtp.ethereal.email';
        this.MAIL_PORT = Number(process.env.MAIL_PORT || 587);
        this.MAIL_USER = process.env.MAIL_USER || 'ereinaldo.kutch@ethereal.email';
        this.MAIL_PASS = process.env.MAIL_PASS || 'w1n3b4r';


    }

    getEnv(key) {
        if (!process.env[key]) {
            throw new Error(`Key Missing: ${key}`);
        }
        return process.env[key];
    }
}

const env = new EnvConfig();
export default env;
