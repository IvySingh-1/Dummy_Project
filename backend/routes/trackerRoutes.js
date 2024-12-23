import express from "express";
import User from "../models/userModels.js"; 
import Expense from "../models/trackerModel.js";

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
      const { userEmail,sharedWith, dueDate } = req.body;
//we have to make sure dueDate format matches with what mongo db accepts
      if (!email || dueDate === undefined) {
        return res.status(400).json({
          success: false,
          message: "Email and m due date are required",
        });
      }
 
      const updatedUser = await Expense.findOneAndUpdate(
        {
          $and: [
            { userEmail }, 
            { "sharedWith.email": sharedWith } // shared with email
          ]
        },
        { dueDate: new Date(dueDate)}, 
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
router.post("/", async (req, res) => {
    try {
        const { userEmail, title, amount, category, dueDate, description, sharedWith } = req.body;

        if (!userEmail || !title || !amount || !category || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const newExpense = new Expense({
            userEmail,
            title,
            amount,
            category,
            dueDate: new Date(dueDate),
            description,
            sharedWith,
        });

        const savedExpense = await newExpense.save();

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expense: savedExpense,
        });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// GET - Fetch all expenses
router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json({
            success: true,
            expenses,
        });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// GET - Fetch expenses by status (Pending/Settled) and type (To Be Given/To Be Taken)
router.get("/filter", async (req, res) => {
    try {
        const { status, type } = req.query;

        // Validate input
        if (!status || !["Pending", "Settled"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing status (Pending/Settled)",
            });
        }

        if (!type || !["To Be Taken", "To Be Given"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing type (To Be Taken/To Be Given)",
            });
        }

        // Query expenses based on status and type
        const filteredExpenses = await Expense.find({
            "sharedWith.status": status,
            "sharedWith.type": type,
        });

        res.status(200).json({
            success: true,
            expenses: filteredExpenses,
        });
    } catch (error) {
        console.error("Error filtering expenses:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/category", async (req, res) => {
  try {
      const { category } = req.query;

      // Validate input
      if (!category || !["Cafe Food", "Ordered Food", "Outside Food", "Groceries", "Munchies", "Others"].includes(category)) {
          return res.status(400).json({
              success: false,
              message: "Invalid or missing category",
          });
      }

      // Query expenses based on category
      const categorizedExpenses = await Expense.find({ category });

      res.status(200).json({
          success: true,
          expenses: categorizedExpenses,
      });
  } catch (error) {
      console.error("Error filtering expenses by category:", error);
      res.status(500).json({
          success: false,
          message: "Internal server error",
      });
  }
});


export default router;