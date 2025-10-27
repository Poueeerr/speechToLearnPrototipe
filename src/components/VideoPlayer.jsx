import { useEffect, useRef } from "react";

export default function VideoPlayer({ apiModel, selectedLanguage }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (apiModel.url && videoRef.current) {
      const source = document.createElement("source");
      source.src = apiModel.url;
      source.type = "video/mp4";
      videoRef.current.innerHTML = "";
      videoRef.current.appendChild(source);
      videoRef.current.load();
    }
  }, [apiModel]);

  useEffect(() => {
    if (apiModel.metadata.localizations && videoRef.current) {
      const videoEl = videoRef.current;
      videoEl.querySelectorAll("track").forEach((t) => t.remove());

      for (const langCode in apiModel.metadata.localizations) {
        const loc = apiModel.metadata.localizations[langCode];
        const track = document.createElement("track");
        track.kind = "subtitles";
        track.label = langCode;
        track.srclang = langCode;
        track.src = loc.subtitleUrl;
        track.default = langCode === apiModel.metadata.originalLanguage;
        videoEl.appendChild(track);
      }
    }
  }, [apiModel]);

  const title = apiModel.metadata.localizations[selectedLanguage]?.name;
  const description = apiModel.metadata.localizations[selectedLanguage]?.description;

  return (
    <div className="w-full">
      <video
        ref={videoRef}
        controls
        preload="metadata"
        className="w-full rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Vídeo: ${title || "Sem título"}`}
      ></video>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-inherit">{title}</h3>
        <p className="text-inherit mt-1">{description}</p>
      </div>
    </div>
  );
}
