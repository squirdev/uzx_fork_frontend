"use client";

import { useState, useRef, useEffect } from "react";

export default function FileUpload() {
  const [image, setImage] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Get available cameras (including USB cameras)
  useEffect(() => {
    async function getDevices() {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceList.filter(device => device.kind === "videoinput");
      setDevices(videoDevices);

      // Select the first available camera
      if (videoDevices.length > 0) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    }
    getDevices();
  }, []);

  // Open camera with selected device
  const openCamera = async () => {
    if (!selectedDevice) {
      alert("No camera detected");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: selectedDevice } }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraOpen(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Capture image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      setImage(canvasRef.current.toDataURL("image/png"));
      stopCamera();
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraOpen(false);
  };

  return (
    <div className="p-4 border rounded-md shadow-md w-96 text-center">
      <h2 className="text-lg font-bold mb-2">Upload or Capture Image</h2>

      {/* File Upload */}
      <input type="file" accept="image/*" onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setImage(reader.result);
          reader.readAsDataURL(file);
        }
      }} className="mb-2" />

      {/* Camera Selection Dropdown */}
      <select
        value={selectedDevice}
        onChange={(e) => setSelectedDevice(e.target.value)}
        className="mb-2 p-2 border rounded"
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </option>
        ))}
      </select>

      {/* Open Camera Button */}
      {!cameraOpen && (
        <button onClick={openCamera} className="bg-blue-500 text-white px-3 py-1 rounded-md m-2">
          Open Camera
        </button>
      )}

      {/* Video Preview */}
      {cameraOpen && (
        <div className="mt-2">
          <video ref={videoRef} autoPlay playsInline className="w-full border border-gray-300 rounded-md"></video>
          <button onClick={captureImage} className="bg-green-500 text-white px-3 py-1 rounded-md m-2">
            Capture Image
          </button>
          <button onClick={stopCamera} className="bg-red-500 text-white px-3 py-1 rounded-md m-2">
            Close Camera
          </button>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      )}

      {/* Display Captured Image */}
      {image && <img src={image} alt="Captured or Uploaded" className="mt-4 rounded-md w-full" />}
    </div>
  );
}
