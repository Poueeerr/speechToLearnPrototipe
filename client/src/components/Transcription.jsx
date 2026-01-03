import { useRef, useEffect, useState } from "react";

export default function Transcription({ 
  transcription, 
  setTranscription, 
  highContrast,
  currentTime = 0,
  onSegmentClick
}) {
  const transcriptionRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Função para formatar timestamps
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Se transcription é um objeto com segments
  const isSegmentedTranscription = 
    transcription && typeof transcription === "object" && transcription.segments;

  // Auto-scroll para o segment ativo
  useEffect(() => {
    if (isSegmentedTranscription && transcriptionRef.current) {
      const activeSegment = transcriptionRef.current.querySelector(
        `[data-active="true"]`
      );
      if (activeSegment) {
        activeSegment.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentTime, isSegmentedTranscription]);

  return (
    <section
      className={`rounded-xl shadow transition-all duration-300 ${
        isExpanded ? "p-4 max-h-96 overflow-y-auto" : "p-2"
      }`}
      aria-live="polite"
      aria-label="Transcrição do vídeo"
      ref={transcriptionRef}
    >
      {transcription && isExpanded ? (
        <div className="flex flex-col">
          {isSegmentedTranscription ? (
            // Renderizar segments com timestamps
            <div className="space-y-2">
              {transcription.segments.map((segment, i) => {
                const isActive =
                  currentTime >= segment.start && currentTime < segment.end;
                return (
                  <div
                    key={i}
                    data-active={isActive}
                    onClick={() => {
                      if (onSegmentClick) {
                        onSegmentClick(segment.start);
                      }
                    }}
                    className={`p-2 rounded transition-all cursor-pointer ${
                      isActive
                        ? highContrast
                          ? "bg-yellow-400 text-black font-semibold"
                          : "bg-blue-400 text-white font-semibold"
                        : highContrast
                        ? "bg-transparent text-yellow-300 hover:bg-yellow-900"
                        : "bg-transparent text-inherit hover:bg-gray-100 dark:hover:bg-gray-500"
                    }`}
                  >
                    <span className="text-xs opacity-70 mr-2">
                      {formatTime(segment.start)}
                    </span>
                    <span className="text-sm">{segment.text}</span>
                  </div>
                );
              })}
            </div>
          ) : typeof transcription === "string" ? (
            // Renderizar texto simples
            <div>
              {transcription.split("\n").map((p, i) => (
                <p key={i} className="text-sm text-inherit leading-relaxed mb-2">
                  {p}
                </p>
              ))}
            </div>
          ) : null}

          <button
            onClick={() => setIsExpanded(false)}
            className={`mt-4 px-4 py-2 text-sm font-semibold rounded-lg focus:ring-2 focus:outline-none transition-all ${
              highContrast
                ? "bg-yellow-400 text-black hover:bg-yellow-300 focus:ring-yellow-500"
                : "bg-black text-white hover:bg-gray-800 focus:ring-blue-400"
            }`}
          >
            Minimizar transcrição
          </button>
        </div>
      ) : transcription && !isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className={`w-full px-4 py-2 text-sm font-semibold rounded-lg focus:ring-2 focus:outline-none transition-all ${
            highContrast
              ? "bg-yellow-400 text-black hover:bg-yellow-300 focus:ring-yellow-500"
              : "bg-black text-white hover:bg-gray-800 focus:ring-blue-400"
          }`}
        >
          Mostrar transcrição
        </button>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic flex items-center justify-center text-center">
          Envie um vídeo para gerar a transcrição.
        </p>
      )}
    </section>
  );
}
