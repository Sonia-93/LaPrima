require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./authentication_Mongo/route/auth.routes");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");
const customerRoutes = require("./routes/customer");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api", menuRoutes);
app.use("/api", orderRoutes);
app.use("/api", customerRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
