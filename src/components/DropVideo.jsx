import { useState, useRef, useEffect } from "react";

export default function DragDropVideoPlayer() {
  const videoRef = useRef(null);
  const dropZoneRef = useRef(null);

  const [videoSrc, setVideoSrc] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.type.startsWith("video/")) {
        if (videoSrc) {
          URL.revokeObjectURL(videoSrc);
        }

        const newVideoSrc = URL.createObjectURL(file);
        setVideoSrc(newVideoSrc);
        setVideoTitle(file.name); 
      } else {
        console.warn("Arquivo solto não é um vídeo.");
        setVideoTitle("Arquivo inválido. Por favor, solte um vídeo.");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.src = videoSrc;
      videoRef.current.load(); // Carrega o novo vídeo
    }
  }, [videoSrc]);

  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]); 

  return (
    <div className="w-full ">
      {(!videoSrc || isDragging) && (
        <div
          ref={dropZoneRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative w-full h-64 border-2 border-dashed rounded-xl 
            flex flex-col justify-center items-center 
            text-gray-500 transition-colors duration-200
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          `}
        >
          {isDragging && (
            <div className="absolute inset-0 bg-blue-900 bg-opacity-50 flex justify-center items-center rounded-xl z-10">
              <span className="text-white text-2xl font-semibold">
                Solte para carregar!
              </span>
            </div>
          )}

          {!videoSrc && (
            <>
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12l-3-3-3 3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v9m0 0l3-3m-3 3l-3-3"
                />
              </svg>
              <span className="mt-2 text-lg font-medium">
                Arraste e solte seu vídeo aqui
              </span>
              <span className="text-sm">ou clique para selecionar</span>
            </>
          )}
        </div>
      )}

      {videoSrc && (
        <div
          className="relative"
          onDragOver={handleDragOver} 
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <video
            ref={videoRef}
            controls
            preload="metadata"
            className="w-full rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Vídeo: ${videoTitle || "Vídeo carregado"}`}
          >
          </video>

          {isDragging && (
            <div
              className="absolute inset-0 bg-blue-900 bg-opacity-50 flex justify-center items-center rounded-xl z-10"
              style={{ pointerEvents: "none" }} 
            >
              <span className="text-white text-2xl font-semibold">
                Solte para carregar!
              </span>
            </div>
          )}
        </div>
      )}
      {videoTitle && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-inherit">{videoTitle}</h3>
        </div>
      )}
    </div>
  );
}