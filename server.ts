import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

app.post("/api/chat", async (req, res): Promise<void> => {
  try {
    if (!ai) {
      res.status(500).json({ message: "Gemini API key not configured" });
      return;
    }

    const { message } = req.body;
    if (!message) {
      res.status(400).json({ message: "Message is required" });
      return;
    }

    const systemPrompt = `You are a helpful and official-sounding AI assistant for VoteWise India. You help citizens understand the Indian election system, voter registration, EVMs, and democratic processes. Be concise, respectful, and guide users to official resources like the ECI website when needed. Do not answer questions completely unrelated to Indian civics or elections.`;

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`${systemPrompt}\n\nUser Question: ${message}`);
    const response = await result.response;
    const aiText = response.text() || "I'm sorry, I couldn't generate a response at this time.";

    res.json({ response: aiText });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ message: "Server error during chat processing" });
  }
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
