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
const IssueModel_1 = __importDefault(require("../modals/IssueModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const AdminAuhtmidd_1 = __importDefault(require("../Middelerware/AdminAuhtmidd"));
const alladmineissueRouter = express_1.default.Router();
const AlladmineissueHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AdminId = req.userId;
    console.log("Admin ID:", AdminId);
    try {
        const issues = yield IssueModel_1.default.find({ assignedTo: new mongoose_1.default.Types.ObjectId(AdminId) });
        res.status(200).json(issues);
    }
    catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
alladmineissueRouter.get("/a/issue", AdminAuhtmidd_1.default, AlladmineissueHandler);
exports.default = alladmineissueRouter;
