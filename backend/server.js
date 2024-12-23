import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'; 
import trackerRoutes from "./routes/trackerRoutes.js";
import db from "./db.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000" // frontend URL
}));

app.use("/auth", authRoutes);
app.use("/api", trackerRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the Express app!");
});

// Server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
