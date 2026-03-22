const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            // 1. Procura o usuário na tabela 'usuarios' que criámos no Postgres
            const { rows } = await db.query('SELECT * FROM usuarios WHERE nome_usuario = $1', [username]);
            const usuario = rows[0];

            if (!usuario) {
                return res.status(404).json({ erro: 'Usuário não encontrado.' });
            }

            // 2. Compara a password enviada com a do banco (usando bcrypt)
            // Nota: Se ainda estiver a usar texto limpo no banco, use: password === usuario.senha_usuario
            const senhaValida = await bcrypt.compare(password, usuario.senha_usuario);
            if (!senhaValida) {
                return res.status(401).json({ erro: 'Senha incorreta.' });
            }

            // 3. Cria o "Passe Digital" (Token) que expira em 2 horas
            const token = jwt.sign(
                { id: usuario.id, perfil: usuario.perfil },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.json({ 
                mensagem: 'Login efetuado!', 
                token, 
                user: { nome: usuario.nome_completo, perfil: usuario.perfil } 
            });

        } catch (error) {
            res.status(500).json({ erro: 'Erro no processo de login.' });
        }
    }
}

module.exports = new AuthController();