import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express()

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./routes/auth.route.js" ;
import tradeRouter from "./routes/trade.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/trade", tradeRouter);

app.use(errorMiddleware);

export default app;