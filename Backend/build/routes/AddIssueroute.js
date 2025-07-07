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
const AuthMiddelerware_1 = __importDefault(require("../Middelerware/AuthMiddelerware"));
const IssueModel_1 = __importDefault(require("../modals/IssueModel"));
const AdminModel_1 = __importDefault(require("../modals/AdminModel"));
const AddIssuerouter = express_1.default.Router();
const AddIssuehandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { description, category, imageUrl, city } = req.body;
    const timestamp = new Date();
    try {
        const zone = city;
        const matchedAdmin = yield AdminModel_1.default.findOne({
            department: category,
            zones: zone,
        });
        const issue = {
            userId,
            description,
            category,
            location: city,
            assignedTo: (matchedAdmin === null || matchedAdmin === void 0 ? void 0 : matchedAdmin._id) || null,
            timestamp,
        };
        const updatedIssue = yield IssueModel_1.default.findOneAndUpdate({ userId, imageUrl }, // filter to find the issue
        issue, // the update (should be the updated fields)
        { upsert: true, new: true } // options
        );
        res.status(200).json({
            message: "Issue submitted successfully",
            assignedTo: (matchedAdmin === null || matchedAdmin === void 0 ? void 0 : matchedAdmin.email) || null,
            issue: updatedIssue,
        });
    }
    catch (e) {
        console.error("Error submitting issue:", e);
        res.status(500).json({
            message: "Error submitting issue",
            error: e,
        });
    }
});
AddIssuerouter.post("/issue", AuthMiddelerware_1.default, AddIssuehandler);
exports.default = AddIssuerouter;
