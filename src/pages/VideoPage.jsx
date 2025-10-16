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
    <div>
      <div>
        <div>
          <VideoPlayer apiModel={apiModel} selectedLanguage={selectedLanguage} />
        </div>

        <div>
          <LanguageButtons
            localizations={apiModel.metadata.localizations}
            setSelectedLanguage={setSelectedLanguage}
            carregarResumo={carregarResumo}
          />
          <Transcription transcription={transcription} setTranscription={setTranscription} />
        </div>
      </div>
    </div>
  );
}
