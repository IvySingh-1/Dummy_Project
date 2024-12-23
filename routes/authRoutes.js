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


//sign in

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ Email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
  //use bcrypt logic here to decrypt the password
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_JS_KEY
      ).toString(CryptoJS.enc.Utf8);
  
      if (password !== decryptedPassword) {
        return res.status(401).json({
          success: false,
          message: "Wrong Password",
        });
      }
  
  
      const token = jwt.sign(
        {
          Email: user.email,
          name: user.name,
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
  
  //get a specific user by email
  router.get("/user", async (req, res) => {
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
  

export default router;
