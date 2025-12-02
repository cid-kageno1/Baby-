import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const memoryPath = path.join(__dirname, "../db/memory.json");

// Ensure memory.json exists
if (!fs.existsSync(memoryPath)) {
    fs.writeFileSync(memoryPath, JSON.stringify({}, null, 2), "utf-8");
}

// Load memory safely
export function loadMemory() {
    try {
        const data = fs.readFileSync(memoryPath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Failed to load memory.json:", err);
        return {};
    }
}

// Save memory safely
export function saveMemory(memory) {
    try {
        fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2), "utf-8");
    } catch (err) {
        console.error("Failed to save memory.json:", err);
    }
}

// Respond to a message
export function getReply(msg) {
    const memory = loadMemory();
    const key = msg.toLowerCase();
    if (memory[key]) {
        const replies = memory[key];
        return replies[Math.floor(Math.random() * replies.length)];
    }
    return "I don't know that yet. You can teach me!";
}

// Teach a new message/reply
export function teach(msg, reply) {
    const memory = loadMemory();
    const key = msg.toLowerCase();
    if (memory[key]) {
        memory[key].push(reply);
    } else {
        memory[key] = [reply];
    }
    saveMemory(memory);
}
