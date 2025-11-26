import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import fs from "fs";
import { start } from "repl";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const transcribe = async (filePath, originalName) => {
  const response = await client.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    filename: 'video.mp4',
    model: "whisper-1",
    response_format: "verbose_json"
  });

  return {
    text: response.text,
    segments: response.segments.map(seg => ({
        id: seg.id,
        start: seg.start,
        end: seg.end,
        text: seg.text
    }))
  }};

export default { transcribe };
