export default function Transcription({ transcription, setTranscription }) {
  return (
    <div >
      <div >
        {transcription.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {transcription && (
        <button onClick={() => setTranscription("")}>
          Ocultar transcrição
        </button>
      )}
    </div>
  );
}
