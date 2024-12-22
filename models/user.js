
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {type:String, required:true},
    ContactNumber: {type:Number, required:true, unique:true},
    Address: {type:String, required:true},
    Email: {type:String, required:true, unique:true},
    Password:{type:String, required:true},
    expenseScore:{type:Number, required:true},

}, {timestamps:true})
mongoose.models = {};
const User =
  mongoose.model.User || mongoose.model("User", userSchema);
export default User;