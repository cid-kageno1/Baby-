import express from "express";
import cors from "cors";
import chatRoutes from "./src/routes/chatRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);

app.get("/", (req, res) => res.send("Baby Bot API is running."));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
