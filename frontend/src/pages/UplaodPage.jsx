import { useState } from "react";

import { Upload, Eye, Download, FileText, Video } from "lucide-react";

export default function UploadPage() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const fileURLs = uploadedFiles.map(file => ({ file, url: URL.createObjectURL(file) }));
    setFiles((prevFiles) => [...prevFiles, ...fileURLs]);
  };

  const handleDownload = (file, url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-indigo-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl text-center border border-gray-200 relative">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Upload and Manage Files</h2>
        <div className="relative w-full">
          <label className="cursor-pointer border-dashed border-4 border-gray-400 rounded-lg p-8 w-full text-gray-700 hover:bg-gray-200 transition-all flex flex-col items-center justify-center">
            <Upload className="mb-3 text-indigo-600" size={50} />
            <span className="font-semibold text-lg">Click or Drag files here to upload</span>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" multiple onChange={handleFileChange} />
          </label>
        </div>
        {files.length > 0 && (
          <div className="mt-6 p-5 bg-gray-100 rounded-lg shadow-lg w-full">
            {files.map(({ file, url }, index) => (
              <div key={index} className="mb-5 p-4 bg-white rounded-lg shadow-md flex flex-col items-center border border-gray-300">
                <p className="font-semibold text-gray-800 text-lg">{file.name}</p>
                {file.type.startsWith("image") && (
                  <img src={url} alt="Preview" className="mt-3 max-h-60 mx-auto rounded-lg shadow-lg border border-gray-400" />
                )}
                {file.type.startsWith("video") && (
                  <video controls className="mt-3 max-h-60 mx-auto rounded-lg shadow-lg border border-gray-400">
                    <source src={url} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {file.type === "application/pdf" && (
                  <iframe src={url} className="mt-3 w-full h-64 border border-gray-400 rounded-lg shadow-lg"></iframe>
                )}
                <div className="mt-4 flex justify-center gap-4 w-full">
                <button 
  className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
  onClick={() => window.open(url, '_blank')}
>
  <Eye size={20} className="mr-2" /> Preview
</button>

<button 
  className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
  onClick={() => handleDownload(file, url)}
>
  <Download size={20} className="mr-2" /> Download
</button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



