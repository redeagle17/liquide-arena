import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Error Occurred", [{"message": "Unauthorized request"}]);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (error) {
    throw new ApiError(401, "Error Occurred", [{"message": "Invalid or expired access token"}]);
  }

  const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Error Occurred", [{"message": "User not found or token invalid"}]);
  }

  req.user = user;
  next();
});
