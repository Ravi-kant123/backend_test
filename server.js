import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js'
import userRoutes from './routes/userRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use("/api" , userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
} 

)