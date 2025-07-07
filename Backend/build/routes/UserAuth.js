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
const googleconfig_1 = __importDefault(require("../util/googleconfig"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserModal_1 = __importDefault(require("../modals/UserModal"));
dotenv_1.default.config();
const authrouter = express_1.default.Router();
const authroutehandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    console.log("Code from Frontend:", code);
    try {
        // 1. Get Google OAuth Tokens
        console.log("Getting token...");
        const { tokens } = yield googleconfig_1.default.getToken(code);
        googleconfig_1.default.setCredentials(tokens);
        console.log("Credential set.");
        // 2. Fetch User Info from Google
        const userRes = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
        console.log("Authentication successful!");
        console.log(userRes.data);
        const { id, email, name, picture } = userRes.data;
        let user = yield UserModal_1.default.findOne({ email });
        if (!user) {
            user = yield UserModal_1.default.create({
                name,
                email,
                picture,
            });
        }
        const { _id } = user;
        console.log(_id);
        const token = jsonwebtoken_1.default.sign({ _id, email }, process.env.JWT_SECRET, {});
        res.status(200).json({
            message: 'success',
            token,
            user,
        });
    }
    catch (err) {
        console.error("Error during authentication:", err);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
authrouter.get("/google", authroutehandler);
exports.default = authrouter;
