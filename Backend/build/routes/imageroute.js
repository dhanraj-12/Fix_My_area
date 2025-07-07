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
const multer_1 = require("../Middelerware/multer");
const gemini_1 = require("../util/gemini");
const IssueModel_1 = __importDefault(require("../modals/IssueModel"));
const uploadimages_1 = __importDefault(require("../util/uploadimages"));
const AuthMiddelerware_1 = __importDefault(require("../Middelerware/AuthMiddelerware"));
const imageRouter = express_1.default.Router();
const getImageUrlFromKey = (key) => {
    const bucket = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};
const uploadImageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const s3key = yield (0, uploadimages_1.default)(filename, file.buffer);
    if (!s3key) {
        res.status(500).send("Failed to upload image to S3.");
        return;
    }
    const imgeeUrl = getImageUrlFromKey(s3key);
    const aidescriptions = yield (0, gemini_1.getImageDescription)(file.buffer);
    if (!aidescriptions) {
        res.status(500).send("Failed to get image description.");
        return;
    }
    // Save the issue to the database
    const issue = IssueModel_1.default.create({
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
});
imageRouter.post("/upload", multer_1.upload.single("image"), AuthMiddelerware_1.default, uploadImageHandler);
exports.default = imageRouter;
