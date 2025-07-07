import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AdminModel from "../modals/AdminModel";
import { body, validationResult } from "express-validator";

dotenv.config();
const AdminAuthRouter = express.Router();

const validateAuthInput = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').if(body('type').equals('signup')).notEmpty().withMessage('Name is required'),
  body('department').if(body('type').equals('signup')).notEmpty().withMessage('Department is required'),
  body('zones').if(body('type').equals('signup')).notEmpty().withMessage('Zone is required')
];

const AdminAuthHandler = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, name, department, zones } = req.body;
  const type = req.query.type;

  try {
    if (type === "signup") {
      const existingAdmin = await AdminModel.findOne({ email });
      if (existingAdmin) {
        res.status(400).json({ message: "Admin with this email already exists" });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newAdmin = await AdminModel.create({
        name,
        email,
        department,
        zones: Array.isArray(zones) ? zones : [zones], // Ensure zones is an array
        passwordHash,
      });

      const token = jwt.sign(
        { adminId: newAdmin._id, role: 'admin' }, 
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

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
      const admin = await AdminModel.findOne({ email });
      if (!admin) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const isMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const token = jwt.sign(
        { adminId: admin._id, role: 'admin' },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

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
  } catch (err) {
    console.error("Admin auth error:", err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

AdminAuthRouter.post("/auth", validateAuthInput, AdminAuthHandler);
export default AdminAuthRouter;