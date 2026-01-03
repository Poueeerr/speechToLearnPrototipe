import { useEffect, useState, useRef } from "react";
import Transcription from "../components/Transcription";
import DragDropVideoPlayer from "../components/DropVideo";

const url_base = "https://falvojr.github.io/speech2learning";

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("pt-BR");
  const [transcription, setTranscription] = useState("");
  const [highContrast, setHighContrast] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    setSelectedLanguage("pt-BR");
  }, []);

  const handleTranscriptionReceived = (data) => {
    // data contem { text, segments }
    setTranscription(data);
  };

  const handleVideoTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleSegmentClick = (startTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
    }
  };

  const handleVideoRef = (ref) => {
    videoRef.current = ref;
  };

  return (
    <main
      className={`flex flex-col min-h-screen transition-all duration-300 ${
        highContrast ? "bg-black text-yellow-300" : "bg-white text-black"
      }`}
    >
      <header className="flex items-center justify-between p-4">
        <div>
          <p className="text-xl font-bold text-inherit">Speech To Learn</p>
        </div>
        <div>
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`px-4 py-2 rounded-lg font-semibold border transition-all ${
              highContrast
                ? "bg-yellow-400 text-black border-yellow-300 hover:bg-yellow-300"
                : "bg-black border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 text-white"
            }`}
          >
            {highContrast ? "Modo normal" : "Alto contraste"}
          </button>
        </div>
      </header>

      <section className="flex flex-col md:flex-row flex-1">
        <article className="w-full md:w-2/3 p-6">
          {/* <VideoPlayer
            apiModel={apiModel}
            selectedLanguage={selectedLanguage}
          /> */}
          <DragDropVideoPlayer
            onTranscriptionReceived={handleTranscriptionReceived}
            onVideoTimeUpdate={handleVideoTimeUpdate}
            onVideoRef={handleVideoRef}
          />
        </article>

        <aside className="w-full md:flex-1 flex flex-col gap-6 p-6 overscroll-none">
          <Transcription
            transcription={transcription}
            highContrast={highContrast}
            currentTime={currentTime}
            onSegmentClick={handleSegmentClick}
          />
        </aside>
      </section>
    </main>
  );
}
