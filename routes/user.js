const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // seu middleware que verifica o cookie

// rota protegida /home
router.get("/home", authMiddleware, (req, res) => {
  res.json({
    message: "Bem-vindo à Home!",
    usuario: req.user // informações do JWT
  });
});

module.exports = router;
