const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
  const token = req.cookies.token; // pega o cookie enviado pelo cliente

  if (!token) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // opcional: informações do usuário disponíveis na rota
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = verificarToken;