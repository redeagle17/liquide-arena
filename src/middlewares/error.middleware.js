import ApiResponse from "../utils/ApiResponse.js";

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  const response = new ApiResponse(statusCode, message, null);
  response.success = false;
  response.errors = errors;

  res.status(statusCode).json(response);
};
