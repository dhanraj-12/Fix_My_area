import mongoose, { Schema, Document, Model } from "mongoose";



export interface IIssue extends Document {
  userId: mongoose.Types.ObjectId;
  description: string;
  imageUrl: string;
  category: "road" | "water" | "electricity" | "sanitation" | "garbage";
  status: "Open" | "In Progress" | "Resolved";
  timestamp: Date;
  location: String;
  assignedTo?: mongoose.Types.ObjectId;
}

const IssueSchema: Schema<IIssue> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: {
    type: String,
    enum: ["road", "water", "electricity", "sanitation", "garbage"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open",
  },
  timestamp: { type: Date, default: Date.now },
  location: {
    type: String
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", 
    required: false, 
  },
});

const IssueModel: Model<IIssue> = mongoose.model<IIssue>("Issue", IssueSchema);

export default IssueModel;
