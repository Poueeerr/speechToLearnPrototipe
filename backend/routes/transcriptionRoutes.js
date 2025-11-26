import express from 'express';
import controller from '../controllers/transcriptionController.js';

const router = express.Router();


router.post(
  "/",
  controller.upload,
  controller.getTranscription
);

export default router;