import express from "express";
import { createTrade, getAllTrades, getTradeById, methodNotAllowed } from "../controllers/trade.controller.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { validateCreateTrade, validateGetTrade } from "../validations/trade.validation.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-trade", verifyJWT ,validateCreateTrade, validateRequest, createTrade);
router.get("/get-all-trades", verifyJWT, getAllTrades);
router.get("/get-trade/:id", verifyJWT, validateGetTrade, validateRequest, getTradeById);
router.delete("/delete-trade/:id", verifyJWT, methodNotAllowed);
router.route("/update-trade/:id")
  .put(verifyJWT, methodNotAllowed)
  .patch(verifyJWT, methodNotAllowed);


export default router;
