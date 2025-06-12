import User from "../models/User.js";
import ApiError from '../utils/ApiError.js';
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

/**
 * @desc Register a new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Error Occurred", [{"message": "User already exists"}]);
  }

  const user = await User.create({ email, password });
  await user.save();

  const createdUser = await User.findById(user._id).select("-password -refreshToken -createdAt -updatedAt -__v");

  res.status(201).json(new ApiResponse(201, "User registered successfully", { createdUser }));
});


/**
 * @desc Login a user
 * @route POST /api/v1/auth/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(404, "Error Occurred", [{"message": "Invalid email. No user found with this email"}]);
  }

  if (!(await user.comparePassword(password))) {
    throw new ApiError(401, "Error Occurred", [{"message": "Invalid password"}]);
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });

  const safeUser = user.toObject();
  delete safeUser.password;
  delete safeUser.refreshToken;

  res.status(200).json(new ApiResponse(200, "Login successful", { user: safeUser, accessToken }));
});

/**
 * @desc Refresh access token using refresh token
 * @route POST /api/v1/auth/refresh-token
 * @access Public
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Error Occurred", [{"message": "Refresh token is required"}]);
  }
  
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new ApiError(403, "Error Occurred", [{"message": "Invalid refresh token"}]);
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new ApiError(403, "Error Occurred", [{"message": "Refresh token expired or invalid"}]);
  }

  const newAccessToken = user.generateAccessToken();

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
  });

  res.status(200).json(
    new ApiResponse(200, "Access token refreshed", { accessToken: newAccessToken })
  );
});
