import express from "express";
import { registerUser, loginUser, refreshAccessToken } from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { validateRegister, validateLogin } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", validateRegister, validateRequest, registerUser);
router.post("/login", validateLogin, validateRequest, loginUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
