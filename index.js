const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt"); // para senhas seguras
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL com sucesso!");
});


// rota de cadastro
app.post("/api/register", (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaHash = bcrypt.hashSync(senha, 10);

  db.query(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senhaHash],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao cadastrar" });
      }
      res.json({ message: "Usuário cadastrado com sucesso!" });
    }
  );
});

// rota de login
app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (results.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

      const usuario = results[0];
      const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

      if (!senhaCorreta) return res.status(401).json({ error: "Senha inválida" });

      res.json({ message: "Login bem-sucedido!", usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
    }
  );
});

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
