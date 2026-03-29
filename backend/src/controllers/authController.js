const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async login(req, res) {
        // AJUSTE AQUI: Receber 'usuario' e 'senha' para bater com o Frontend
        const { usuario, senha } = req.body;

        try {
            // 1. Busca o usuário pelo nome de usuário (coluna nome_usuario)
            const { rows } = await db.query('SELECT * FROM usuarios WHERE nome_usuario = $1', [usuario]);
            const usuario_encontrado = rows[0];

            if (!usuario_encontrado) {
                return res.status(401).json({ erro: 'Credenciais inválidas.' });
            }

            // 2. Verifica se a senha bate (usando o bcrypt para comparar o hash)
            // AJUSTE AQUI: Usar a variável 'senha' que veio do req.body
            const senha__valida = await bcrypt.compare(senha, usuario_encontrado.senha_usuario);
            
            if (!senha__valida) {
                return res.status(401).json({ erro: 'Credenciais inválidas.' });
            }

            // 3. Gera o Token JWT
            const token = jwt.sign(
                { id: usuario_encontrado.id, perfil: usuario_encontrado.perfil },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            res.json({
                auth: true,
                token: token,
                user: {
                    nome: usuario_encontrado.nome_completo,
                    perfil: usuario_encontrado.perfil
                }
            });

        } catch (err) {
            console.error(err); // Importante para você ver erros de conexão no console
            res.status(500).json({ erro: 'Erro interno no servidor.' });
        }
    }
}

module.exports = new AuthController();