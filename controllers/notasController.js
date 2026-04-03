const db = require("../config/db");

exports.getNotas = (req, res) => {
  const query = "SELECT * FROM notas";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar notas:", err);
      return res.status(500).json({ error: "Erro interno do servidor ao buscar notas." });
    }
    
    res.json(results);
  });
};
