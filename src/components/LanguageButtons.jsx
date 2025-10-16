import enUS from "../assets/icon/en-us.png";
import esES from "../assets/icon/es-es.png";
import ptBR from "../assets/icon/pt-br.png";

const flagImages = {
  "en-us": enUS,
  "es-es": esES,
  "pt-br": ptBR,
};

export default function LanguageButtons({ localizations, setSelectedLanguage, carregarResumo }) {
  return (
    <div>
      {Object.keys(localizations).map((lang) => (
        <div key={lang}>
          <button
            onClick={() => {
              setSelectedLanguage(lang);
              carregarResumo(lang);
            }}
          >
            <img src={flagImages[lang.toLowerCase()]} alt={`Bandeira do ${lang}`} style={{width: "30px", height: "30px"}} />
            <p>{lang.toUpperCase()}</p>
          </button>
        </div>
      ))}
    </div>
  );
}
