import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './cadastrar-alunos.estilos.css';

const CadastrarAlunos = () => {
    const [form, definir__form] = useState({
        numero_aluno: '',
        id_militar: '',
        nome_guerra: '',
        nome_completo: '',
        aniversario: '',
        data_ingresso: '',
        naturalidade: '',
        cpf: '',
        rg_civil: '',
        tipo_sanguineo: '',
        contato_pessoal: '',
        contato_emergencia_nome: '',
        contato_emergencia_telefone: '',
        dados_foto: ''
    });

    const [status, definir__status] = useState('');
    const navegacao = useNavigate();

    // Função única para atualizar qualquer campo de texto/número
    const gerenciarMudanca = (e) => {
        const { name, value } = e.target;
        definir__form({ ...form, [name]: value });
    };

    // Função para converter a foto em Base64
    const lerFoto = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                definir__form({ ...form, dados_foto: reader.result });
            };
            reader.readAsDataURL(arquivo);
        }
    };

    const salvar = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/alunos', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            definir__status('Aluno cadastrado com sucesso!');
            setTimeout(() => navegacao('/dashboard'), 2000);
        } catch (err) {
            definir__status(err.response?.data?.erro || 'Erro ao realizar o cadastro.');
        }
    };

    return (
        <div className="cad_container">
            <header className="cad_topo">
                <button className="voltar_botao" onClick={() => navegacao("/dashboard")}>← Voltar</button>
                <h2>Novo Aluno</h2>
            </header>

            <form className="cad_form" onSubmit={salvar}>
                {status && <p className="status_msg">{status}</p>}

                <h3>1. Identificação Militar</h3>
                <div className="form_grid">
                    <input type="number" name="numero_aluno" placeholder="NIM" required onChange={gerenciarMudanca} />
                    <input type="text" name="nome_guerra" placeholder="Nome de Guerra" required onChange={gerenciarMudanca} />
                    <input type="text" name="id_militar" placeholder="Identidade Militar" onChange={gerenciarMudanca} />
                </div>

                <h3>2. Dados Pessoais</h3>
                <div className="form_grid">
                    <input type="text" name="nome_completo" placeholder="Nome Completo" required onChange={gerenciarMudanca} />
                    <input type="date" name="aniversario" title="Data de Nascimento" required onChange={gerenciarMudanca} />
                    <input type="date" name="data_ingresso" title="Data de Ingresso" required onChange={gerenciarMudanca} />
                </div>

                <h3>3. Documentos e Saúde</h3>
                <div className="form_grid">
                    <input type="text" name="cpf" placeholder="CPF" onChange={gerenciarMudanca} />
                    <input type="text" name="rg_civil" placeholder="RG Civil" onChange={gerenciarMudanca} />
                    <input type="text" name="tipo_sanguineo" placeholder="Tipo Sanguíneo (ex: A+)" onChange={gerenciarMudanca} />
                </div>

                <h3>4. Contatos</h3>
                <div className="form_grid">
                    <input type="text" name="contato_pessoal" placeholder="Celular (Pessoal)" required onChange={gerenciarMudanca} />
                    <input type="text" name="naturalidade" placeholder="Naturalidade (Cidade/UF)" onChange={gerenciarMudanca} />
                </div>

                <h3 style={{ color: 'red' }}>5. Emergência</h3>
                <div className="emergencia_box">
                    <input type="text" name="contato_emergencia_nome" placeholder="Nome do Contato" onChange={gerenciarMudanca} />
                    <input type="text" name="contato_emergencia_telefone" placeholder="Telefone de Emergência" onChange={gerenciarMudanca} />
                </div>

                <div className="foto_sessao">
                    <label>Foto do Aluno:</label>
                    <input type="file" accept="image/*" onChange={lerFoto} />
                </div>

                <button type="submit" className="salvar_botao">Finalizar Cadastro</button>
            </form>
        </div>
    );
};

export default CadastrarAlunos;