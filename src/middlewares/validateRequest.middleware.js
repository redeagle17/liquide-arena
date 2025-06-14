import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));
    return next(new ApiError(400, "Error Occurred", extractedErrors));
  }
  next();
};
