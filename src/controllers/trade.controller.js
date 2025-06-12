import Trade from "../models/Trade.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTrade = asyncHandler(async (req, res) => {
  
  const { type, user_id, symbol, shares, price } = req.body;

  const newTrade = await Trade.create({
    type,
    user_id,
    symbol,
    shares,
    price,
  });

  res.status(201).json(
    new ApiResponse(201, "Trade created successfully", newTrade.toJSON())
  );
});
