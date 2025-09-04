require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth");

// Habilita CORS
app.use(cors({
  origin: "http://localhost:3000", // URL do frontend
  credentials: true              // permite envio de cookies
}));

app.use(express.json());
app.use("/api", authRoutes);

app.get("/teste", (req, res) => {
  res.send("Backend funcionando!");
});


app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000 🚀");
});
