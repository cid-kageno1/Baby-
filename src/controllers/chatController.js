import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { replyFromMemory, teachMemory } from "../utils/responder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const memoryPath = path.join(__dirname, "../db/memory.json");

export function handleChat(req, res) {
  const message = req.body.msg?.trim().toLowerCase();

  if (!message) {
    return res.status(400).json({ error: "msg is required" });
  }

  const memory = JSON.parse(fs.readFileSync(memoryPath, "utf8"));
  const reply = replyFromMemory(memory, message);

  // Known reply
  if (reply) {
    return res.json({ reply, learned: false });
  }

  // Unknown: teach stub
  const teachText = "I don't know this yet. Send back with 'teach' to teach me.";

  memory[message] = teachText;
  fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));

  return res.json({ reply: teachText, learned: false });
}
