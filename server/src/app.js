import express from "express";
import cors from "cors";
import router from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";
import errorMiddleware from "./middlewares/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// Catch-all route to serve the frontend's index.html
app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(publicPath, "index.html"));
    }
});
app.use(errorMiddleware.handle);

export default app;
