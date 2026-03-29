const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    // Procura o token no cabeçalho da requisição
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (!token) {
        return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Verifica se o token é legítimo usando a chave secreta do seu .env
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guarda os dados do utilizador (id, role) na requisição
        next(); // Autoriza a continuação para a rota
    } catch (err) {
        res.status(403).json({ erro: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;