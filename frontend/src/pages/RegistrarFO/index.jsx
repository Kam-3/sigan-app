import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Certifique-se de que seu axios está configurado aqui

const RegistrarFO = () => {
  const [alunos, setAlunos] = ('useState')([]);
  const [formData, setFormData] = useState({
    aluno_id: '',
    data_ocorrencia: new Date().toISOString().split('T')[0],
    tipo_ocorrencia: 'Leve',
    descricao: ''
  });
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });

  // 1. Carregar a lista de alunos ao abrir a página
  useEffect(() => {
    const buscarAlunos = async () => {
      try {
        const response = await api.get('/alunos');
        setAlunos(response.data);
      } catch (err) {
        console.error("Erro ao buscar alunos", err);
      }
    };
    buscarAlunos();
  }, [setAlunos]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // O usuario_id geralmente vem do token decodificado ou do localStorage
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
      
      const dadosParaEnviar = {
        ...formData,
        usuario_id: usuarioLogado.id 
      };

      await api.post('/disciplina/fo', dadosParaEnviar);
      
      setMensagem({ tipo: 'sucesso', texto: 'FO registrada com sucesso!' });
      setFormData({ ...formData, descricao: '' }); // Limpa apenas a descrição
    } catch (err) {
      setMensagem({ tipo: 'erro', texto: 'Erro ao registrar FO: ' + err.response?.data?.erro });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>Registrar Formulário de Ocorrência (FO)</h2>
      
      {mensagem.texto && (
        <div style={{ color: mensagem.tipo === 'sucesso' ? 'green' : 'red', marginBottom: '10px' }}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Aluno:</label><br />
          <select name="aluno_id" value={formData.aluno_id} onChange={handleChange} required style={{ width: '100%' }}>
            <option value="">Selecione um aluno...</option>
            {alunos.map(aluno => (
              <option key={aluno.id} value={aluno.id}>{aluno.nome_completo}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Data:</label><br />
          <input type="date" name="data_ocorrencia" value={formData.data_ocorrencia} onChange={handleChange} required style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Gravidade:</label><br />
          <select name="tipo_ocorrencia" value={formData.tipo_ocorrencia} onChange={handleChange} style={{ width: '100%' }}>
            <option value="Leve">Leve</option>
            <option value="Média">Média</option>
            <option value="Grave">Grave</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Descrição da Ocorrência:</label><br />
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} required style={{ width: '100%', height: '100px' }} />
        </div>

        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
          Registrar FO
        </button>
      </form>
    </div>
  );
};

export default RegistrarFO;