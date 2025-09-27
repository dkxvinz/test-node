require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// ดึงค่า URI จาก .env
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error:", err));

app.get("/", (req, res) => {
  res.send("Hello from Node.js + Mongoose!");
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age:Number
});
const User = mongoose.model("User", UserSchema);

// PUT API อัปเดตข้อมูล
app.put("/detail", async (req, res) => {
  try {
    const { email, name } = req.body;

    // อัปเดต User ตาม email
    const result = await User.findOneAndUpdate(
      { email: email },       // เงื่อนไขหา document
      { name: name }, 
      { age: age}  ,      // ค่าที่จะอัปเดต
      { new: true }           // ส่งกลับค่าที่อัปเดตแล้ว
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
