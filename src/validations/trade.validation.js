import { body, param } from "express-validator";

export const validateCreateTrade = [
  body("type")
    .exists().withMessage("Type is required")
    .isIn(["buy", "sell"]).withMessage("Type must be 'buy' or 'sell'"),
  body("user_id")
    .exists().withMessage("user_id is required")
    .isInt().withMessage("user_id must be an integer"),
  body("symbol")
    .exists().withMessage("Symbol is required")
    .isString().withMessage("Symbol must be a string")
    .trim()
    .notEmpty().withMessage("Symbol cannot be empty"),
  body("shares")
    .exists().withMessage("Shares is required")
    .isInt({ min: 1, max: 100 }).withMessage("Shares must be between 1 and 100"),
  body("price")
    .exists().withMessage("Price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a non-negative number"),
];

export const validateGetTrade = [
  param("id")
    .isInt().withMessage("Invalid Trade ID format"),
];