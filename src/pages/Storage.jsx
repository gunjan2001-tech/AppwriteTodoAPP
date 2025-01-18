import React, { useState, useEffect } from 'react';
import { ID } from 'appwrite';
import { storage } from '../appwrite/config';

export default function Storage() {
  const [pic, setPic] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await storage.listFiles(import.meta.env.VITE_APPWRITE_BUCKET_ID);
      setFiles(response.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pic) {
      try {
        await storage.createFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, ID.unique(), pic);
        setPic(null);
        fetchFiles();
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleDelete = async (fileId) => {
    try {
      await storage.deleteFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, fileId);
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const getImg = async (fileId) => {
    try {
      let x = await storage.getFile(import.meta.env.VITE_APPWRITE_BUCKET_ID, fileId);
      // console.log(x);
      // You might want to do something with the file data here
    } catch (e) {
      console.log(e);
    }
  };

  const imgDownload = async (fileId) => {
    try {
      const downloadUrl = await storage.getFileDownload(import.meta.env.VITE_APPWRITE_BUCKET_ID, fileId);
      const a = document.createElement('a');
      a.href = downloadUrl; // Use the download URL directly
      a.download = 'downloaded-file'; // Provide a default name for the file
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.log('Error downloading file:', e);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold text-center">File Storage</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="file" className="sr-only">Choose file</label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      onChange={(e) => setPic(e.target.files[0])}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Upload
                  </button>
                </form>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <p className="text-gray-900">Uploaded Files:</p>
                <ul className="mt-4 space-y-2">
                  {files.map((file) => (
                    <li key={file.$id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out">
                      <span className="truncate max-w-xs text-gray-700">{file.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => getImg(file.$id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          View
                        </button>
                        <button
                          onClick={() => imgDownload(file.$id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                          Download
                        </button>
                        <button
                          onClick={() => handleDelete(file.$id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

