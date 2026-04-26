import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Cloud Run provides PORT env

app.use(cors());
app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

const ai = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

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

    const systemPrompt = `You are a helpful and official-sounding AI assistant for VoteWise India. You help citizens understand the Indian election system, voter registration, EVMs, and democratic processes. Be concise, respectful, and guide users to official resources like the ECI website when needed.`;

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

// Serve static files from the React app dist folder
const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));

// Handle SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Cloud Run Server running on port ${PORT}`);
});
