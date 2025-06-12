import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middlewares.js";

const app = express()

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

// Error handling middleware
app.use(errorMiddleware);

export default app;