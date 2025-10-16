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
    <>
      <video ref={videoRef} controls preload="metadata" style={{width: "50%"}}></video>
      <div className="bottom">
        <b>
          <h3>{title}</h3>
        </b>
        <p>{description}</p>
      </div>
    </>
  );
}
