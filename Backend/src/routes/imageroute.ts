import express from "express"
import { Request, Response } from "express";
import { upload } from "../Middelerware/multer";
import { getImageDescription } from "../util/gemini";
import IssueModel from "../modals/IssueModel";
import uploadimage from "../util/uploadimages";
import authmiddleware from "../Middelerware/AuthMiddelerware";
const imageRouter = express.Router();


const getImageUrlFromKey = (key: string): string => {
    const bucket = process.env.S3_BUCKET_NAME!;
    const region = process.env.AWS_REGION!;
  
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
  };
  


const uploadImageHandler = async (req: Request, res: Response) => {
    const file = req.file;
    const userId = req.userId;
    if (!file) {
        res.status(400).send("No file uploaded.");
        return;
    }

    const filename = file.originalname;
    if (!filename) {
        res.status(400).send("No filename provided.");
        return;
    }

    // Upload the image to S3
    const s3key = await uploadimage(filename, file.buffer);
    if (!s3key) {
        res.status(500).send("Failed to upload image to S3.");
        return;
    }

    const imgeeUrl = getImageUrlFromKey(s3key);

    const aidescriptions = await getImageDescription(file.buffer)

    if (!aidescriptions) {
        res.status(500).send("Failed to get image description.");
        return;
    }
    // Save the issue to the database
    const issue = IssueModel.create({
        userId: userId,
        imageUrl: imgeeUrl,
        description: aidescriptions.description,
        category: aidescriptions.category,
        status: "Open",
    });

    res.status(200).json({
        aidescriptions: aidescriptions,
        imageUrl: imgeeUrl,
        message: "Image uploaded and analyzed successfully.",
    
    });
}

imageRouter.post("/upload", upload.single("image"), authmiddleware, uploadImageHandler);

export default imageRouter;