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
    <div
      className="flex flex-wrap justify-center gap-4"
      role="group"
      aria-label="Seleção de idioma"
    >
      {Object.keys(localizations).map((lang) => (
        <button
          key={lang}
          onClick={() => {
            setSelectedLanguage(lang);
            carregarResumo(lang);
          }}
          className="flex flex-col items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 shadow hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150"
        >
          <img
            src={flagImages[lang.toLowerCase()]}
            alt={`Bandeira representando ${lang.toUpperCase()}`}
            className="w-8 h-8 mb-1"
          />
          <span className="text-sm font-medium">{lang.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
