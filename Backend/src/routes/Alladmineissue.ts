import express from "express"
import { Request, Response } from "express";
import IssueModel from "../modals/IssueModel";
import mongoose from "mongoose";
import adminauthmiddleware from "../Middelerware/AdminAuhtmidd";
const alladmineissueRouter = express.Router();

const AlladmineissueHandler = async (req: Request, res: Response) => {
    
    const AdminId = req.userId;
    console.log("Admin ID:", AdminId);

    try {
        const issues = await IssueModel.find({assignedTo : new mongoose.Types.ObjectId(AdminId)});
        res.status(200).json(issues);
    } catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

alladmineissueRouter.get("/a/issue", adminauthmiddleware, AlladmineissueHandler);
export default alladmineissueRouter;