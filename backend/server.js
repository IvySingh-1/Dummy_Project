import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'; 
import trackerRoutes from "./routes/trackerRoutes.js";
import db from "./db.js";
import Expense from "./models/trackerModel.js"
import schedule from "node-schedule"
import sgMail from '@sendgrid/mail';
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

//Track due date & Send mails
async function sendDailyNotifications() {
    try {
      const now = new Date();
      const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  
      //  due within the next 24 hours and not notified yet
      const expenses = await Expense.find({
        dueDate: { $lte: next24Hours, $gte: now },
        notified: false,
      });
      for (const expense of expenses) {
      
        const mailOptions = {
          from: "your-email@gmail.com",
          to: expense.userEmail, 
          subject: "Expense Due Date Reminder",
          text: `Reminder: Your expense "${expense.title}" is due on ${expense.dueDate.toDateString()}.`,
        };
        expense.notified = true;
        await expense.save();
  
        console.log(`Notification sent for expense: ${expense.title}`);
      }
    } catch (error) {
      console.error("Error sending daily notifications:", error);
    }
  }
  
  // run daily at 12:00 AM
  schedule.scheduleJob("0 0 * * *", sendDailyNotifications);   



// Server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
