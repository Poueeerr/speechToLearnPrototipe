import multer from "multer";
import transcriptionServices from "../services/transcriptionServices.js";
import fs from "fs/promises";
import { response } from "express";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

const getTranscription = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "Nenhum arquivo enviado." });

    const result = await transcriptionServices.transcribe(req.file.path);

    await fs.unlink(req.file.path);
    console.log(result)
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    if (req.file?.path) {
      try { await fs.unlink(req.file.path); } catch {}
    }

    return res.status(500).json({ error: e.message });
  }
};

export default {
  upload: upload.single("video"),
  getTranscription,
};
