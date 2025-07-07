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
const s3client_1 = __importDefault(require("./s3client"));
const client_s3_1 = require("@aws-sdk/client-s3");
const uploadimage = (filename, filebuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const s3key = `images/${Date.now()}_${filename}`;
        const uploadparam = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: s3key,
            Body: filebuffer,
            ContentType: getContentType(filename),
            ACL: "public-read",
        };
        const command = new client_s3_1.PutObjectCommand(uploadparam);
        yield s3client_1.default.send(command);
        console.log("✅ File uploaded successfully:", filename);
        return s3key;
    }
    catch (err) {
        console.error("❌ Upload failed:", err);
        throw err;
    }
});
function getContentType(filename) {
    var _a;
    const ext = (_a = filename.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    switch (ext) {
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "png":
            return "image/png";
        default:
            return "application/octet-stream";
    }
}
exports.default = uploadimage;
