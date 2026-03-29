import react, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.estilos.css';

const login = () => {
    const [credenciais, definir__credenciais] = useState({ usuario: '', senha: '' });
    const [erro__msg, definir__erro] = useState('');
    const navegacao = useNavigate();

    const acao__executar__login = async (e) => {
        e.preventDefault();
        try {
            const resposta = await axios.post('http://localhost:3000/api/auth/login', credenciais);
            localStorage.setItem('token', resposta.data.token);
            localStorage.setItem('user', JSON.stringify(resposta.data.user));
            navegacao('/dashboard');
        } catch (err) {
            definir__erro('Usuário ou senha incorretos. Verifique suas credenciais.');
        }
    };

    return (
        <div className="login__fundo">
            <div className="login__cartao">
                {/* cabeçalho do cartão em azul escuro */}
                <div className="login__topo">
                    <span className="login__logo">👤 SIGAN - Login</span>
                </div>

                <div className="login__corpo">
                    <h3 className="unidade__nome">NPOR / 5º BE Cmb Bld</h3>
                    
                    <form onSubmit={acao__executar__login}>
                        {erro__msg && <p className="alerta__erro">{erro__msg}</p>}

                        <div className="campo__grupo">
                            <label>Usuário:</label>
                            <input 
                                type="text" 
                                placeholder="Digite seu usuário" 
                                onChange={(e) => definir__credenciais({...credenciais, usuario: e.target.value})}
                                required
                            />
                        </div>

                        <div className="campo__grupo">
                            <label>Senha:</label>
                            <input 
                                type="password" 
                                placeholder="Digite sua senha" 
                                onChange={(e) => definir__credenciais({...credenciais, senha: e.target.value})}
                                required
                            />
                        </div>

                        <button type="submit" className="login__botao">
                            Entrar no Sistema
                        </button>
                    </form>

                    {/* informativo inferior com o detalhe dourado */}
                    <div className="info__rodape">
                        <div className="info__box">
                            <span className="info__icone">ℹ️</span>
                            <div className="info__texto">
                                <strong>Sistema de Gestão Militar</strong>
                                <p>Utilize suas credenciais institucionais para acessar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;