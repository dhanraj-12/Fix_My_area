import s3Client from "./s3client";
import { PutObjectAclCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const uploadimage = async (filename : string, filebuffer : Buffer) => {
    try {
        const s3key = `images/${Date.now()}_${filename}`;
        const uploadparam = {
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: s3key,
            Body: filebuffer,
            ContentType: getContentType(filename),
            ACL: "public-read",
        }

        const command = new PutObjectCommand(uploadparam as any)
        await s3Client.send(command);
        console.log("✅ File uploaded successfully:", filename);
        return s3key;
    
    } catch(err) {
        console.error("❌ Upload failed:", err);
        throw err;
    }
}

function getContentType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
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


export default uploadimage;