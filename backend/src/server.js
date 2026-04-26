const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');

const alunoRoutes = require('./routes/alunoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const faltasRoutes = require('./routes/faltasRoutes');
const notasRoutes = require('./routes/notasRoutes');
const visitasRoutes = require('./routes/visitasRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Aumenta o limite para 50MB para acceptar fotos em base64

app.use('/api/alunos', alunoRoutes);
app.use('/api/disciplina', disciplinaRoutes);
app.use('/api/faltas', faltasRoutes);
app.use('/api/notas', notasRoutes);
app.use('/api/visitas', visitasRoutes);
app.use('/api/auth', authRoutes); // Rota de autenticação (login)
app.use('/api/alunos', authMiddleware, alunoRoutes); // Protege as rotas de alunos com autenticação

app.get('/', (req, res) => res.send('SIGAN API Online'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('ERRO AO CONECTAR NO BANCO:', err.message);
    console.log('Verifique se o serviço do PostgreSQL está rodando e se a senha no .env está correta.');
  } else {
    console.log('BANCO DE DADOS CONECTADO: Horário no banco é', res.rows[0].now);
  }
});