import express from "express";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "./models/userModels";
import dotenv from "dotenv";
const app = express();
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/register", async (req, res) => {
  try {
    const payload = req.body;
    const { username, ContactNumber, Address, Email, Password, expenseScore } = payload;

  
    const encryptedPassword = CryptoJS.AES.encrypt(
      Password,
      process.env.CRYPTO_JS_KEY
    ).toString();

  
    const user = new User({
      username,
      ContactNumber,
      Address,
      Email,
      expenseScore,
      Password: encryptedPassword,
    });


    const result = await user.save();

    res.status(201).json({ result, success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



//Sign in
app.use(cookieParser());
app.post("/login", async (req, res) => {
    const { Email, Password } = req.body;
  
    try {
      const user = await User.findOne({ Email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
  
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.Password,
        process.env.CRYPTO_JS_KEY
      ).toString(CryptoJS.enc.Utf8);
  
      if (Password !== decryptedPassword) {
        return res.status(401).json({
          success: false,
          message: "Wrong Password",
        });
      }
  
  
      const token = jwt.sign(
        {
          Email: user.Email,
          username: user.username,
          ContactNumber: user.ContactNumber,
          Address: user.Address,
          expenseScore: user.expenseScore
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
  
    
      res.cookie("token", token, {
        secure: true,
        httpOnly: true,
      });
  
      res.status(201).json({
        success: true,
        message: "Successfully Logged in",
        token,
        result: user,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
  
  app.get("/user", async (req, res) => {
    const userEmail = req.query.userEmail;
  
    try {
      const users = await User.find({ Email: userEmail });
  
      if (!users || users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        result: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
  
  
  