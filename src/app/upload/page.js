"use client";
import { useState, useEffect } from "react";
import FileList from "@/components/FileList";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const fetchFiles = async () => {
    const response = await fetch("/api/listFiles");
    const data = await response.json();
    setFiles(data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setMessage(result.message);
    fetchFiles(); // Refresh the file list
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 min-w-full min-h-full">
      <h1 className="font-bold text-4xl m-12">
        File UPLOAD SYSTEM USING AWS S3
      </h1>
      <h1 className="text-2xl font-bold mb-4">Upload File</h1>
      <form onSubmit={handleUpload} className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 p-2 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
      <FileList files={files} />
    </div>
  );
}
