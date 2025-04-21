import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  otp: String,
  otpExpires: Date,
});

export default mongoose.model('User998', userSchema);
