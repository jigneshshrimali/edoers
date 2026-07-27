import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    studio: "EDOERS Digital Experience Studio",
    timestamp: new Date().toISOString()
  });
});

// API High-Intent Engagement Enquiry Submission Endpoint
app.post("/api/enquiry", async (req, res) => {
  try {
    const { name, email, company, engagementType, budgetTier, brief } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required fields." });
    }

    console.log("[EDOERS Enquiry Received]:", {
      name,
      email,
      company: company || "Undisclosed",
      engagementType,
      budgetTier,
      timestamp: new Date().toISOString()
    });

    // Optional Gemini AI Brief Analysis if GEMINI_API_KEY is present
    let aiInsights = null;
    if (process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Analyze this executive client inquiry brief and output 2 key technical recommendation bullet points for an enterprise proposal:\nClient: ${name} (${company})\nType: ${engagementType}\nBudget: ${budgetTier}\nBrief: ${brief}`
        });
        aiInsights = response.text;
      } catch (aiErr) {
        console.warn("Gemini AI Brief Analysis skipped:", aiErr);
      }
    }

    return res.json({
      success: true,
      message: "Engagement request logged successfully. Principal Director assigned.",
      referenceId: `EDO-${Math.floor(100000 + Math.random() * 900000)}`,
      aiInsights
    });
  } catch (err) {
    console.error("Error handling enquiry:", err);
    return res.status(500).json({ error: "Internal server error processing enquiry." });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EDOERS Studio Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
