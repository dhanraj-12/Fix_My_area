"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const adminauthmiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({
            error: "Token not provide",
        });
    }
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    if (decoded) {
        req.userId = decoded.adminId; // Assuming adminId is stored in the JWT payload
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
};
exports.default = adminauthmiddleware;
