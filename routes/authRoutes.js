import express from "express";
import User from "./../models/userModels.js";

const router = express.Router();

// POST - Create a new user
router.post("/", async (req, res) => {
  try {
      const { name, email, password, expenseScore = 0 } = req.body;

      // Create new user object
      const newUser = new User({
          name,
          email,
          password,
          expenseScore, // Defaulted to 0 if not provided
      });

      const response = await newUser.save();
      console.log("User created successfully");
      res.status(200).json(response);
  } catch (err) {
      console.error("Error creating user:", err);
      res.status(400).json({ error: err.message });
  }
});


// GET - Read all users
router.get("/", async (req, res) => {
    try {
        const data = await User.find();
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch user data" });
    }
});

export default router;
