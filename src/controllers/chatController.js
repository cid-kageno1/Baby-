import { getReply, teach } from "../utils/responder.js";

export const handleChat = (req, res) => {
    const { msg, teachReply } = req.body;

    if (!msg) return res.status(400).json({ error: "Message is required" });

    if (teachReply) {
        teach(msg, teachReply);
        return res.json({ reply: `I learned how to respond to "${msg}"!` });
    }

    const reply = getReply(msg);
    res.json({ reply });
};
