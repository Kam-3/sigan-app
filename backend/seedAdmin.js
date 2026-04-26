const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const db = require('./src/config/database'); 
const bcrypt = require('bcrypt');

async function criarAdmin() {
    // Definindo as variáveis que vamos usar
    const nomeCompleto = 'Administrador NPOR';
    const loginUsuario = 'admin';
    const senhaPura = 'admin123';
    const perfilUsuario = 'ADMIN';

    try {
        console.log('--- Iniciando criação do usuário admin ---');

        const salt = await bcrypt.genSalt(10);
        const senhaCripto = await bcrypt.hash(senhaPura, salt);

        // A Query deve usar EXATAMENTE os nomes das colunas do SQL acima
        const query = `
            INSERT INTO usuarios (nome_completo, nome_usuario, senha_usuario, perfil) 
            VALUES ($1, $2, $3, $4)
        `;
        
        const valores = [nomeCompleto, loginUsuario, senhaCripto, perfilUsuario];

        await db.query(query, valores);

        console.log('SUCESSO: Usuário Admin criado!');
        console.log(`Login: ${loginUsuario} | 🔑 Senha: ${senhaPura}`);
        process.exit();
    } catch (err) {
        console.error('ERRO ao criar admin:', err.message);
        process.exit(1);
    }
}

criarAdmin();