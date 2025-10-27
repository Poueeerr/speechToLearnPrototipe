import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import LanguageButtons from "../components/LanguageButtons";
import Transcription from "../components/Transcription";

const url_base = "https://falvojr.github.io/speech2learning";

export default function App() {
  const [apiModel, setApiModel] = useState({
    id: "",
    url: "",
    metadata: { originalLanguage: "", localizations: {} },
  });
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [transcription, setTranscription] = useState("");
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    fetch(url_base + "/api/mockV2.json")
      .then((res) => res.json())
      .then((data) => {
        setApiModel(data);
        setSelectedLanguage(data.metadata.originalLanguage);
      })
      .catch((err) => console.error(err));
  }, []);

  const carregarResumo = (lang) => {
    const url = apiModel.metadata.localizations[lang]?.transcriptUrl;
    if (!url) return;
    fetch(url)
      .then((res) => res.text())
      .then((text) => setTranscription(text))
      .catch((err) => console.error(err));
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
          <VideoPlayer
            apiModel={apiModel}
            selectedLanguage={selectedLanguage}
          />
        </article>

        <aside className="w-full md:flex-1 flex flex-col gap-6 p-6 overscroll-none">
          <LanguageButtons
            localizations={apiModel.metadata.localizations}
            setSelectedLanguage={setSelectedLanguage}
            carregarResumo={carregarResumo}
          />
          <Transcription
            transcription={transcription}
            setTranscription={setTranscription}
            highContrast={highContrast}
          />
        </aside>
      </section>
    </main>
  );
}
