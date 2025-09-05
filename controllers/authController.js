const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  register(req, res) {
    const { nome, email, senha } = req.body;
    const senhaHash = bcrypt.hashSync(senha, 10);

    db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaHash],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro ao cadastrar" });
        }
        res.json({ message: "Usuário cadastrado com sucesso!" });
      }
    );
  },

  login(req, res) {
    const { email, senha } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
      if (err) return res.status(500).json({ error: "Erro no servidor" });
      if (results.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

      const usuario = results[0];
      const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

      if (!senhaCorreta) return res.status(401).json({ error: "Senha inválida" });

      // 🔑 Gera o token
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email }, // payload
        JWT_SECRET, // chave secreta
        { expiresIn: "1h" } // expira em 1 hora
      );

      res.cookie("token", token, {
      httpOnly: true,   // não acessível via JS
      secure: true,     // só em https (em dev pode deixar false)
      sameSite: "strict"
      });

      res.json({
        message: "Login bem-sucedido!",
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
      });
    });
  },

  logout(req, res) {
    res.clearCookie("token", {
    httpOnly: true,
    secure: false, // em prod = true (https)
    sameSite: "strict"
  });
  res.json({ message: "Logout realizado com sucesso!" });
  }
};

