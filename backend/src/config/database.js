const { Pool } = require('pg');
const path = require('path');

// Procura o .env na raiz da pasta backend
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: String(process.env.DB_PASSWORD || ''), // Garante que seja string, mesmo que vazia
  port: process.env.DB_PORT,
});

// Teste de conexão imediato
pool.on('connect', () => {
  console.log('✅ Banco de dados conectado com sucesso!');
});

pool.on('error', (err) => {
  console.error('❌ Erro inesperado no pool do banco:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};