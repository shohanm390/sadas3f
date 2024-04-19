import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, required:true},
  message: {type:String, required:true},
  
});

const formModel = mongoose.models.myCrud || mongoose.model("myCrud", userSchema)

export default formModel;
