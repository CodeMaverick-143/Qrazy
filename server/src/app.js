import express from "express";
import cors from "cors";
import router from "./routes.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);
app.use(errorMiddleware.handle);

export default app;
