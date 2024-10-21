import React from "react";

const getFileType = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
    return "image";
  } else if (["pdf"].includes(extension)) {
    return "pdf";
  }
  return "generic";
};

export default function FileList({ files }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Uploaded Files : </h2>
      <div className="grid grid-cols-3 gap-4">
        {files.map((file) => {
          const fileType = getFileType(file.Key);
          const fileUrl = `https://next-file-upload-system.s3.amazonaws.com/${file.Key}`;

          return (
            <div key={file.Key} className="border rounded p-2 shadow">
              <a href={fileUrl} download className="block">
                {fileType === "image" ? (
                  <img
                    src={fileUrl}
                    alt={file.Key}
                    className="h-24 w-full object-cover mb-2"
                  />
                ) : fileType === "pdf" ? (
                  <div className="flex justify-center items-center h-24 mb-2">
                    <span className="text-6xl">📄</span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-24 mb-2">
                    <span className="text-6xl">📁</span>
                  </div>
                )}
                <p className="text-sm truncate">{file.Key}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
