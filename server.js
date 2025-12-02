import express from "express";
import chatRoutes from "./src/routes/chatRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Baby Bot running on port ${PORT}`);
});
