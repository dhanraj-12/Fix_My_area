import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  passwordHash: string;
  department: "road" | "water" | "electricity" | "sanitation" | "garbage";
  zones: string[];
}

const AdminSchema: Schema<IAdmin> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  department: {
    type: String,
    required: true,
    enum: ["road", "water", "electricity", "sanitation", "garbage"]
  },
  zones: [{ type: String, required: true }]
});

const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>("Admin", AdminSchema);
export default AdminModel;
