import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Handle GET request for listing files
export async function GET() {
  const params = {
    Bucket: "next-file-upload-system",
  };

  try {
    const command = new ListObjectsCommand(params);
    const data = await s3Client.send(command);

    return new Response(JSON.stringify(data.Contents), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error listing files:", error);
    return new Response(JSON.stringify({ error: "Error listing files" }), {
      status: 500,
    });
  }
}
