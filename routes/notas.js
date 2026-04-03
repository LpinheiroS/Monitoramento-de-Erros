const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const notasController = require("../controllers/notasController");

// rota para buscar erros das notas
router.get("/notas", authMiddleware, notasController.getNotas);

module.exports = router;
