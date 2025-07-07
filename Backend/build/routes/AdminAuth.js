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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const AdminModel_1 = __importDefault(require("../modals/AdminModel"));
const express_validator_1 = require("express-validator");
dotenv_1.default.config();
const AdminAuthRouter = express_1.default.Router();
const validateAuthInput = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (0, express_validator_1.body)('name').if((0, express_validator_1.body)('type').equals('signup')).notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('department').if((0, express_validator_1.body)('type').equals('signup')).notEmpty().withMessage('Department is required'),
    (0, express_validator_1.body)('zones').if((0, express_validator_1.body)('type').equals('signup')).notEmpty().withMessage('Zone is required')
];
const AdminAuthHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { email, password, name, department, zones } = req.body;
    const type = req.query.type;
    try {
        if (type === "signup") {
            const existingAdmin = yield AdminModel_1.default.findOne({ email });
            if (existingAdmin) {
                res.status(400).json({ message: "Admin with this email already exists" });
                return;
            }
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const newAdmin = yield AdminModel_1.default.create({
                name,
                email,
                department,
                zones: Array.isArray(zones) ? zones : [zones], // Ensure zones is an array
                passwordHash,
            });
            const token = jsonwebtoken_1.default.sign({ adminId: newAdmin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(201).json({
                message: "Admin account created successfully",
                token,
                admin: {
                    id: newAdmin._id,
                    name: newAdmin.name,
                    email: newAdmin.email,
                    department: newAdmin.department
                }
            });
            return;
        }
        if (type === "signin") {
            const admin = yield AdminModel_1.default.findOne({ email });
            if (!admin) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }
            const isMatch = yield bcrypt_1.default.compare(password, admin.passwordHash);
            if (!isMatch) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ adminId: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.status(200).json({
                message: "Login successful",
                token,
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    department: admin.department
                }
            });
            return;
        }
        res.status(400).json({ message: "Invalid request type" });
        return;
    }
    catch (err) {
        console.error("Admin auth error:", err);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
AdminAuthRouter.post("/auth", validateAuthInput, AdminAuthHandler);
exports.default = AdminAuthRouter;
