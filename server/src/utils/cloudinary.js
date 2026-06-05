import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryUpload = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }
    const response = await cloudinary.uploader.upload(file.tempFilePath || file.path, {
      resource_type: "auto"
    });
    if (file.tempFilePath) {
      // Clean up the temporary file
      fs.unlinkSync(file.tempFilePath);
    }
    return response;
  } catch (error) {
    console.error("Cloudinary error:", error);
    return null;
  }
};

export { cloudinaryUpload };
