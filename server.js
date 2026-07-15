const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  accountNumber: String,
  referralCode: String,
  referredBy: String,
  balance: { type: Number, default: 0 }
});

const User = mongoose.model("User", UserSchema);

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({ success: false, message: "Invalid email or password" });
  }

  res.json({
    success: true,
    user
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
