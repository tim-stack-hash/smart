import express from "express";
import path from "path";
import fs from "fs";
import AdmZip from "adm-zip";
import { createServer as createViteServer } from "vite";
import TelegramBot from "node-telegram-bot-api";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "256kb" }));


  // Endpoint to accept a new lead from the client (and notify by email)
  app.post("/api/lead", async (req, res) => {
    try {
      const { parentName, phone, childName, childAge, direction, format } = req.body || {};

      // Basic validation
      if (!parentName || !phone || !childName || typeof childAge !== "number") {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const leadLine = [
        `Новая заявка:
- Родитель: ${parentName}
- Телефон: ${phone}
- Ребенок: ${childName} (${childAge} лет)
- Направление: ${direction ?? ""}
- Формат: ${format ?? ""}`
      ].join("\n");

      // Always persist to a local log file so you can verify requests even without SMTP
      try {
        const logDir = path.join(process.cwd(), "data");
        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
        fs.appendFileSync(path.join(logDir, "leads.log"), `[${new Date().toISOString()}]\n${leadLine}\n\n`);
      } catch (e) {
        console.error("Failed to write leads.log", e);
      }

      const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

      if (!BOT_TOKEN || !CHAT_ID) {
        console.log("Telegram not configured. Lead received but message not sent.");
        return res.status(200).json({ ok: true, telegramSent: false });
      }

      const bot = new TelegramBot(BOT_TOKEN, { polling: false });
      const message = `Новая заявка\n\n${leadLine}`;

      await bot.sendMessage(String(CHAT_ID), message);
      res.status(200).json({ ok: true, telegramSent: true });
    } catch (err) {
      console.error("POST /api/lead failed:", err);
      res.status(500).json({ error: "Failed to process lead" });
    }
  });

  // Endpoint to download the entire project workspace as a ZIP
  app.get("/api/download-zip", (req, res) => {

    try {
      const zip = new AdmZip();
      const workspaceRoot = process.cwd();

      function addFolderToZip(currentDir: string) {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
          const fullPath = path.join(currentDir, item);
          const relativePath = path.relative(workspaceRoot, fullPath);

          // Filtering rules to keep file size lightweight and pristine
          if (
            item === "node_modules" ||
            item === "dist" ||
            item === ".git" ||
            item === ".cache" ||
            item === "package-lock.json" ||
            item === "server.js"
          ) {
            continue;
          }

          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            addFolderToZip(fullPath);
          } else {
            // Local path inside zip is the relative directory structure
            const zipFolder = path.dirname(relativePath);
            const targetZipFolder = zipFolder === "." ? "" : zipFolder;
            zip.addLocalFile(fullPath, targetZipFolder);
          }
        }
      }

      addFolderToZip(workspaceRoot);

      const buffer = zip.toBuffer();
      
      // Send ZIP file directly to the client
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", 'attachment; filename="smart-start-project.zip"');
      res.end(buffer);
    } catch (error) {
      console.error("ZIP building failed:", error);
      res.status(500).json({ error: "Failed to generate ZIP archive" });
    }
  });

  // Serve static UI assets or attach Vite HMR middleware
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
    console.log(`Server successfully running on port ${PORT}`);
  });
}

startServer();
