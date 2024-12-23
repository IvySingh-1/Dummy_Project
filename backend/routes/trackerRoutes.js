
import express from "express";
import User from "../models/userModels.js"; 

const router = express.Router();

router.put("/update-expense-score", async (req, res) => {
    try {
      const { email, expenseScore } = req.body;

      if (!email || expenseScore === undefined) {
        return res.status(400).json({
          success: false,
          message: "Email and expenseScore are required",
        });
      }
 
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { expenseScore }, 
        { new: true } 
      );
  
    
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
 
      res.status(200).json({
        success: true,
        message: "Expense score updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating expense score:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
  router.put("/update-due-date", async (req, res) => {
    try {
      const { email, dueDate } = req.body;
//we have to make sure dueDate format matches with what mongo db accepts
      if (!email || dueDate === undefined) {
        return res.status(400).json({
          success: false,
          message: "Email and expenseScore are required",
        });
      }
 
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { dueDate }, 
        { new: true } 
      );
  
    
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
 
      res.status(200).json({
        success: true,
        message: "New DueDate added",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating due date:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
  export default router;