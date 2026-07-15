const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Model
const User = mongoose.model("User", {
  fullname: String,
  email: String,
  password: String,
  referral: String,
  balance: {
    type: Number,
    default: 0
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("MaxTech Backend Running");
});

// Signup Route
app.post("/api/signup", async (req, res) => {
  try {
    const { fullname, email, password, referral } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    const user = new User({
      fullname,
      email,
      password,
      referral
    });

    await user.save();

    res.json({
      success: true,
      message: "Account created successfully"
    });

  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
