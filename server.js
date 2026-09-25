import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/profiles", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});