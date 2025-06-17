const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/students"); // ✅ Import your router
const certificateRoutes = require("./routes/certificate");

app.use(cors());
app.use(express.json()); // ✅ Required to parse JSON body

// ✅ Use the route
app.use("/api/student", studentRoutes);
app.use("/api",certificateRoutes);

// Connect to MongoDB (replace db name as needed)
mongoose.connect("mongodb://localhost:27017/studentTestPortal", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
