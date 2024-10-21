import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Configure AWS S3 client
const s3Client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Handle POST request for file upload
export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  const fileName = `${uuidv4()}-${file.name}`;
  const params = {
    Bucket: "next-file-upload-system",
    Key: fileName,
    Body: file.stream(),
  };

  const upload = new Upload({
    client: s3Client,
    params,
  });

  try {
    await upload.done();
    return new Response(
      JSON.stringify({
        success: true,
        message: "File uploaded successfully",
        fileUrl: `https://next-file-upload-system.s3.amazonaws.com/${fileName}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Response(JSON.stringify({ error: "Error uploading file" }), {
      status: 500,
    });
  }
}
