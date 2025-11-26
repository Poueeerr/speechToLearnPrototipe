export default function Transcription({ transcription, setTranscription, highContrast }) {
  return (
    <section
      className={`rounded-xl shadow p-4 focus:outline-none`}
      aria-live="polite"
      aria-label="Transcrição do vídeo"
    >
      {transcription ? (
        <div className="flex flex-col">
          <div>
            {transcription.split("\n").map((p, i) => (
              <p key={i} className="text-sm text-inherit leading-relaxed mb-2">
                {p}
              </p>
            ))}
          </div>

          <button
            onClick={() => setTranscription("")}
            className={`mt-4 px-4 py-2 text-sm font-semibold rounded-lg focus:ring-2 focus:outline-none transition-all ${
              highContrast
                ? "bg-yellow-400 text-black hover:bg-yellow-300 focus:ring-yellow-500"
                : "bg-black text-white hover:bg-gray-800 focus:ring-blue-400"
            }`}
          >
            Ocultar transcrição
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic flex items-center justify-center text-center">
          Selecione um idioma para carregar a transcrição.
        </p>
      )}
    </section>
  );
}
