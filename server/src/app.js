import express from "express";
import cors from "cors";
import env from "./config/env.js";
import router from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";
import errorMiddleware from "./middlewares/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Health check for Render
app.head("/", (req, res) => {
    res.status(200).end();
});

app.use(express.json());
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true
}));

app.use("/api", router);

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});
app.use(errorMiddleware.handle);

export default app;
