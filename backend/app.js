import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import transcriptionRoutes from './routes/transcriptionRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use("/transcription", transcriptionRoutes);
//Comment
export default app;
