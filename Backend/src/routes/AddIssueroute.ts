import express, { Router, Request, Response } from "express";
import authmiddleware from "../Middelerware/AuthMiddelerware";
import IssueModel from "../modals/IssueModel";
import { reverseGeocodeOpenCage } from "../util/reversegeoCode";
import AdminModel from "../modals/AdminModel";

const AddIssuerouter = express.Router();

const AddIssuehandler = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { description, category, imageUrl, city } = req.body;
  const timestamp = new Date();

  try {

    const zone = city;
    const matchedAdmin = await AdminModel.findOne({
      department: category,
      zones: zone,
    });

    const issue = {
      userId,
      description,
      category,
      location: city,
      assignedTo: matchedAdmin?._id || null,
      timestamp,
    };

    const updatedIssue = await IssueModel.findOneAndUpdate(
      { userId, imageUrl },    // filter to find the issue
      issue,                   // the update (should be the updated fields)
      { upsert: true, new: true } // options
    );
    

    

    res.status(200).json({
      message: "Issue submitted successfully",
      assignedTo: matchedAdmin?.email || null,
      issue: updatedIssue,
    });
  } catch (e) {
    console.error("Error submitting issue:", e);
    res.status(500).json({
      message: "Error submitting issue",
      error: e,
    });
  }
};

AddIssuerouter.post("/issue", authmiddleware, AddIssuehandler);
export default AddIssuerouter;
