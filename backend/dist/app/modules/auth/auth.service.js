"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// services/auth/auth.service.ts
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const auth_model_1 = require("./auth.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const referralWord_utils_1 = require("../referralWord/referralWord.utils");
/**
 * Create a new user in the database
 */
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.email || !payload.password || !payload.name) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Name, email and password are required");
    }
    // Check if user already exists
    const existingUser = yield auth_model_1.User.findOne({ email: payload.email });
    if (existingUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exists!");
    }
    // Hash password
    const hashedPassword = yield bcrypt_1.default.hash(payload.password.trim(), 10);
    // Generate unique referral word
    const referralId = yield (0, referralWord_utils_1.generateUniqueReferralWord)();
    // Create user
    const newUser = yield auth_model_1.User.create(Object.assign(Object.assign({}, payload), { password: hashedPassword, referralWord: referralId }));
    // Remove password before returning (ESLint safe)
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;
    return userWithoutPassword;
});
/**
 * Login user and return JWT token
 */
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.email || !payload.password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email and password are required");
    }
    // Find user by email and include password for comparison
    const user = yield auth_model_1.User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    console.log(payload.password, user.password);
    // Compare password
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password.trim(), user.password);
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invalid credentials!");
    }
    // JWT payload
    const jwtPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
        referralWord: user.referralWord,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET || "my-secret", {
        expiresIn: "1d",
    });
    // Remove password before returning (ESLint safe)
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return {
        accessToken,
        user: userWithoutPassword,
    };
});
exports.AuthService = {
    createUserIntoDB,
    loginUser,
};
