import dotenv from "dotenv";
dotenv.config();

class EnvConfig {
    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || "development";
        this.PORT = Number(process.env.PORT || 4000);
        this.DATABASE_URL = this.getEnv("DATABASE_URL");
        this.DIRECT_URL = this.getEnv("DIRECT_URL");
        this.SUPABASE_URL = this.getEnv("SUPABASE_URL");
        this.SUPABASE_ANON_KEY = this.getEnv("SUPABASE_ANON_KEY");
        this.SUPABASE_SERVICE_ROLE_KEY = this.getEnv("SUPABASE_SERVICE_ROLE_KEY");
        this.FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
        this.APP_NAME = "Qrazy";

        // Mail Configuration
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
