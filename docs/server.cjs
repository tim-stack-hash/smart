var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_adm_zip = __toESM(require("adm-zip"), 1);
var import_vite = require("vite");
var import_node_telegram_bot_api = __toESM(require("node-telegram-bot-api"), 1);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "256kb" }));
  app.post("/api/lead", async (req, res) => {
    try {
      const { parentName, phone, childName, childAge, direction, format } = req.body || {};
      if (!parentName || !phone || !childName || typeof childAge !== "number") {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const leadLine = [
        `\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430:
- \u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C: ${parentName}
- \u0422\u0435\u043B\u0435\u0444\u043E\u043D: ${phone}
- \u0420\u0435\u0431\u0435\u043D\u043E\u043A: ${childName} (${childAge} \u043B\u0435\u0442)
- \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435: ${direction ?? ""}
- \u0424\u043E\u0440\u043C\u0430\u0442: ${format ?? ""}`
      ].join("\n");
      try {
        const logDir = import_path.default.join(process.cwd(), "data");
        if (!import_fs.default.existsSync(logDir)) import_fs.default.mkdirSync(logDir, { recursive: true });
        import_fs.default.appendFileSync(import_path.default.join(logDir, "leads.log"), `[${(/* @__PURE__ */ new Date()).toISOString()}]
${leadLine}

`);
      } catch (e) {
        console.error("Failed to write leads.log", e);
      }
      const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
      const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
      if (!BOT_TOKEN || !CHAT_ID) {
        console.log("Telegram not configured. Lead received but message not sent.");
        return res.status(200).json({ ok: true, telegramSent: false });
      }
      const bot = new import_node_telegram_bot_api.default(BOT_TOKEN, { polling: false });
      const message = `\u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430

${leadLine}`;
      await bot.sendMessage(String(CHAT_ID), message);
      res.status(200).json({ ok: true, telegramSent: true });
    } catch (err) {
      console.error("POST /api/lead failed:", err);
      res.status(500).json({ error: "Failed to process lead" });
    }
  });
  app.get("/api/download-zip", (req, res) => {
    try {
      let addFolderToZip = function(currentDir) {
        const items = import_fs.default.readdirSync(currentDir);
        for (const item of items) {
          const fullPath = import_path.default.join(currentDir, item);
          const relativePath = import_path.default.relative(workspaceRoot, fullPath);
          if (item === "node_modules" || item === "dist" || item === ".git" || item === ".cache" || item === "package-lock.json" || item === "server.js") {
            continue;
          }
          const stat = import_fs.default.statSync(fullPath);
          if (stat.isDirectory()) {
            addFolderToZip(fullPath);
          } else {
            const zipFolder = import_path.default.dirname(relativePath);
            const targetZipFolder = zipFolder === "." ? "" : zipFolder;
            zip.addLocalFile(fullPath, targetZipFolder);
          }
        }
      };
      const zip = new import_adm_zip.default();
      const workspaceRoot = process.cwd();
      addFolderToZip(workspaceRoot);
      const buffer = zip.toBuffer();
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", 'attachment; filename="smart-start-project.zip"');
      res.end(buffer);
    } catch (error) {
      console.error("ZIP building failed:", error);
      res.status(500).json({ error: "Failed to generate ZIP archive" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
