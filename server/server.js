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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error", err));

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
