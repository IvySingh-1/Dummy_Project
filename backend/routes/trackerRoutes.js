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
      { userEmail: email },
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
    const { email, sharedWith, dueDate } = req.body;
    //we have to make sure dueDate format matches with what mongo db accepts
    console.log({ email, sharedWith, dueDate });
    if (!email || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Email and  due date are required",
      });
    }

    const updatedUser = await Expense.findOneAndUpdate(
      {
        $and: [
          { userEmail: email },
          // {sharedWith: { $elemMatch: { email: sharedWith } } }
          { "sharedWith.email": sharedWith }, // shared with email sharedWith: { $elemMatch: { email: sharedWith } }
        ],
      },
      { dueDate: new Date(dueDate) },
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
    const {
      userEmail,
      title,
      amount,
      category,
      dueDate,
      description,
      sharedEmail,
      type,
      status,
    } = req.body;

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
      sharedWith: {
        email: sharedEmail,
        type,
        status,
        amount,
      },
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

router.put("/updateStatus", async (req, res) => {
  try {
    const { email, sharedWith, status, expense_id } = req.body;

    // Validate input
    if (!email || !sharedWith || !status || !expense_id) {
      return res.status(400).json({
        success: false,
        message: "Email, sharedWith, status, and expense ID are required",
      });
    }

    // Find the expense
    const expense = await Expense.findOne({ _id: expense_id });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Determine the type of the expense
    const type = expense.sharedWith?.find(
      (item) => item.email === sharedWith
    )?.type;
    if (!type) {
      return res.status(404).json({
        success: false,
        message: "SharedWith user not found in expense",
      });
    }

    // Handle penalty if the due date has passed and the status is settled
    if (expense.dueDate < new Date() && status === "Settled") {
      const targetUserEmail = type === "To be Taken" ? sharedWith : email;
      const targetUser = await User.findOne({ email: targetUserEmail });

      if (targetUser) {
        const penalty = targetUser.expenseScore * 0.05 || 5;
        targetUser.expenseScore = Math.max(
          0,
          targetUser.expenseScore - penalty
        );
        await targetUser.save();
      }
    }

    // Update the status in the sharedWith array
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expense_id, "sharedWith.email": sharedWith },
      { $set: { "sharedWith.$.status": status } },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Failed to update status",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.delete("/deleteExpense", async (req, res) => {
  try {
    const { email, expense_id } = req.body;

    // Validate input
    if (!email || !expense_id) {
      return res.status(400).json({
        success: false,
        message: "Email and expense ID are required",
      });
    }

    // Find the expense
    const expense = await Expense.findById(expense_id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // If the expense is "To be Taken," adjust the user's expense score
    if (expense.sharedWith[0]?.type === "To be Taken") {
      const user = await User.findOne({ email });
      if (user) {
        const penaltyReduction = user.expenseScore % 5 || 0; // Deduct based on the logic of expense score
        user.expenseScore = Math.max(0, user.expenseScore - penaltyReduction);
        await user.save();
      }
    }

    // Delete the expense
    const deletedExpense = await Expense.findByIdAndDelete(expense_id);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Failed to delete expense",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
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

router.get("/filterByEmail", async (req, res) => {
  try {
    const { email, page } = req.query;

    let pageNumber = parseInt(page) || 1;
    let pageSize = 2;
    let skip = (pageNumber - 1) * pageSize;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not recieved",
      });
    }

    const filteredExpenses = await Expense.find({
      userEmail: email,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    const total = await Expense.countDocuments({ userEmail:email });
    res.status(200).json({
      success: true,
      expenses: filteredExpenses,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Error filtering expenses:", error);
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

router.get("/filterByCategory", async (req, res) => {
  try {
    const { category } = req.query;

    // Validate input
    if (
      !category ||
      ![
        "Cafe Food",
        "Ordered Food",
        "Outside Food",
        "Groceries",
        "Munchies",
        "Others",
      ].includes(category)
    ) {
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
