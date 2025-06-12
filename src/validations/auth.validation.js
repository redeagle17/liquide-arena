import { body } from "express-validator";

export const validateRegister = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 4 }).withMessage("Password must be at least 4 characters long")
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required"),

  body("password")
    .notEmpty().withMessage("Password is required")
];
