require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());  
// Habilita CORS
app.use(cors({
  origin: "http://localhost:3000", // URL do frontend
  credentials: true              // permite envio de cookies
}));

app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000 🚀");
});
