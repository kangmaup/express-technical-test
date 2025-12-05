import { body, param, query, ValidationChain } from "express-validator";

export class UserValidator {
  static createUser(): ValidationChain[] {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 1, max: 100 })
        .withMessage("Name must be between 1 and 100 characters"),

      body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
          "Username can only contain letters, numbers, and underscores"
        ),

      body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),

      body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    ];
  }

  static updateUser(): ValidationChain[] {
    return [
      param("id").isUUID(4).withMessage("ID must be a valid UUID v4"),

      body("name")
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Name must be between 1 and 100 characters"),

      body("username")
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
          "Username can only contain letters, numbers, and underscores"
        ),

      body("phoneNumber")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Phone number cannot be empty"),

      body("password")
        .optional()
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    ];
  }

  static getUserById(): ValidationChain[] {
    return [param("id").isUUID(4).withMessage("ID must be a valid UUID v4")];
  }

  static deleteUser(): ValidationChain[] {
    return [param("id").isUUID(4).withMessage("ID must be a valid UUID v4")];
  }

  static pagination(): ValidationChain[] {
    return [
      query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer")
        .toInt(),

      query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be between 1 and 100")
        .toInt(),
    ];
  }
}

export class AuthValidator {
  static register(): ValidationChain[] {
    return [
      body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 1, max: 100 })
        .withMessage("Name must be between 1 and 100 characters"),

      body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Username must be between 3 and 50 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
          "Username can only contain letters, numbers, and underscores"
        ),

      body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),

      body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    ];
  }

  static login(): ValidationChain[] {
    return [
      body("username").trim().notEmpty().withMessage("Username is required"),

      body("password").trim().notEmpty().withMessage("Password is required"),
    ];
  }
}
