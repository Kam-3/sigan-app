import react, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './cadastrar-alunos.estilos.css';

const cadastrar = () => {
    const [form, definir__form] = useState({ numero_aluno: '', nome_guerra: '', nome_completo: '' });
    const [status, definir__status] = useState('');
    const navegacao = useNavigate();

    const salvar = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/alunos', form, {
                headers: { authorization: `bearer ${token}` }
            });
            definir__status('Aluno cadastrado com sucesso!');
            setTimeout(() => navegacao('/dashboard'), 2000);
        } catch (err) {
            definir__status('Erro ao realizar o cadastro. Verifique os dados.');
        }
    };

    return (
        <div className="cad__container">
            <header className="cad__topo">
                <button className="voltar__botao" onClick={() => navegacao('/dashboard')}>← Voltar</button>
                <h2>Novo Aluno</h2>
            </header>
            <form className="cad__form" onSubmit={salvar}>
                {status && <p className="status__msg">{status}</p>}
                <div className="form__grupo">
                    <label>Número do Aluno:</label>
                    <input type="number" placeholder="Ex: 101" required onChange={(e) => definir__form({...form, numero_aluno: e.target.value})} />
                </div>
                <div className="form__grupo">
                    <label>Nome de Guerra:</label>
                    <input type="text" placeholder="Ex: Silva" required onChange={(e) => definir__form({...form, nome_guerra: e.target.value})} />
                </div>
                <div className="form__grupo">
                    <label>Nome Completo:</label>
                    <input type="text" placeholder="Digite o nome completo" required onChange={(e) => definir__form({...form, nome_completo: e.target.value})} />
                </div>
                <button type="submit" className="salvar__botao">Cadastrar Aluno</button>
            </form>
        </div>
    );
};

export default cadastrar;