import express from "express";
import { createTrade } from "../controllers/trade.controller.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { validateCreateTrade } from "../validations/trade.validation.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-trade", verifyJWT ,validateCreateTrade, validateRequest, createTrade);

export default router;
