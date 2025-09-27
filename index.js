const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// ใช้ ENV จาก Render (ต้องไปเพิ่มใน Dashboard → Environment → MONGODB_URI)
const mongoUri = process.env.MONGODB_URI;

// เชื่อม MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error:", err));

// Middleware
app.use(express.json());

// ตัวอย่าง Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model("User", UserSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Render + MongoDB!");
});

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "✅ User saved", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
