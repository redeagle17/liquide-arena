import Trade from "../models/Trade.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc Create a new trade
 * @route POST /api/v1/trades/create-trade
 * @access Private
 */
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

/**
 * @desc Get all trades
 * @route GET /api/v1/trades/get-all-trades
 * @access Private
 */
export const getAllTrades = asyncHandler(async (req, res) => {
  
  const { type, user_id } = req.query;
  const filter = {};

  if (type) {
    filter.type = type;
  }

  if (user_id) {
    filter.user_id = user_id;
  }

  const trades = await Trade.find(filter).sort({ id: 1 });
  if (trades.length === 0) {
    return res.status(404).json(
      new ApiResponse(404, "No trades found", [])
    );
  }

  const allTradesList = trades.map(trade => trade.toJSON());

  res.status(200).json(
    new ApiResponse(200, "Trades retrieved successfully", allTradesList)
  );
});

/**
 * @desc Get a trade by ID
 * @route GET /api/v1/trades/get-trade/:id
 * @access Private
 */
export const getTradeById = asyncHandler(async (req, res) => {

  const tradeId = req.params.id;

  const trade = await Trade.findOne({ id: tradeId });

  if (!trade) {
    throw new ApiError(404, "Error Occurred", [{"message": `Trade with id ${tradeId} not found`}]);
  }

  res.status(200).json(new ApiResponse(200, "Trade fetched successfully", trade));
});

export const methodNotAllowed = (req, res, next) => {
  throw new ApiError(405, `Method ${req.method} not allowed on ${req.originalUrl}`);
};
