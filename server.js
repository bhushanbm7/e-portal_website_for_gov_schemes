const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ Enable both form-data and JSON parsing
app.use(cors());
app.use(bodyParser.json()); // For JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // For HTML form submissions

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://bhushan:bhushanbm@cluster0.vj8oh.mongodb.net/gov_schemes?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(" MongoDB connected"))
  .catch((err) => console.log(" MongoDB error:", err));

// ✅ Routes
app.use("/", authRoutes);

// ✅ Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
