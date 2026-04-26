import react, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cartaomilitar from '../../componentes/Cartaomilitar';
import './dashboard.estilos.css';
import { FaUserPlus, FaTimes, FaCamera, FaInfoCircle, FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import React from 'react';


const Dashboard = () => {
    const [lista__alunos, definir__alunos] = useState([]);
    const [filtro__busca, definir__busca] = useState('');
    const navegacao__interna = useNavigate();

    const usuario__dados = JSON.parse(localStorage.getItem('user'));
    const data__hora = new Date().toLocaleDateString('pt-br') + ' | ' + new Date().toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' });

    useEffect(() => {
        const carregar__dados = async () => {
            try {
                const chave__acesso = localStorage.getItem('token');
                const resposta = await axios.get('http://localhost:3000/api/alunos', {
                    headers: { authorization: `bearer ${chave__acesso}` }
                });
                definir__alunos(resposta.data);
            } catch (erro) {
                navegacao__interna('/');
            }
        };
        carregar__dados();
    }, []);

    const lista__filtrada = lista__alunos.filter(aluno =>
        aluno.nome_guerra?.toLowerCase().includes(filtro__busca.toLowerCase()) ||
        aluno.numero_aluno?.toString().includes(filtro__busca)
    );

    return (
        <div className="dash__fundo">
            {/* barra superior de identificação */}
            <header className="topo__admin">
                <div className="perfil__box">
                    <div className="avatar__circulo"><FaUserPlus style={{ marginRight: '10px' }} /></div>
                    <div className="info__box">
                        <span className="nome__usuario">{usuario__dados?.nome || 'Administrador'}</span>
                        <span className="cracha__admin">Administrador</span>
                    </div>
                </div>

                <div className="topo__comandos">
                    <button className="btn__gerenciar"><i className="fas fa-users-cog"></i> Gerenciar Usuários</button>
                    <span className="data__info">📅 {data__hora}</span>
                    <button className="btn__sair" onClick={() => { localStorage.clear(); navegacao__interna('/'); }}>
                        <i className="fas fa-sign-out-alt"></i> Sair
                    </button>
                </div>
            </header>

            {/* banner principal do sistema */}
            <section className="banner__sigan">
                <div className="titulo__secao">
                    <i className="fas fa-user-shield icone__escudo"></i>
                    <h1>SIGAN - Sistema Integrado de Gestão de Alunos do NPOR/5° BE Cmb Bld</h1>
                </div>

                <div className="ferramentas__barra">
                    <div className="links__auxiliares">
                        <button className="btn__intranet"><i className="fas fa-network-wired"></i> Sistema Intranet</button>
                        <button className="btn__relatorios"><i className="fas fa-chart-pie"></i> Relatórios</button>
                    </div>

                    <div className="comandos__principais">
                        <button className="btn__exportar"><i className="fas fa-file-export"></i> Exportar</button>
                        <button className="btn__importar"><i className="fas fa-file-import"></i> Importar</button>
                        <button className="btn__limpar"><i className="fas fa-trash-alt"></i> Limpar Tudo</button>
                    </div>
                </div>
            </section>

            {/* corpo principal com busca e grade */}
            <main className="dash__conteudo">
                <div className="pesquisa__container">
                    <input
                        className="campo__busca"
                        placeholder="Pesquisar discente por nome de guerra ou número..."
                        onChange={(e) => definir__busca(e.target.value)}
                    />
                </div>

                {lista__filtrada.length > 0 ? (
                    <div className="dash__grade">
                        {lista__filtrada.map(aluno => (
                            <cartaomilitar
                                key={aluno.id}
                                aluno={aluno}
                                onClick={() => navegacao__interna(`/aluno/${aluno.id}`)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="vazio__container">
                        <i className="fas fa-users icone__vazio"></i>
                        <h3>Nenhum discente cadastrado</h3>
                        <p>Clique no botão "+" abaixo para adicionar o primeiro discente.</p>
                    </div>
                )}
            </main>

            <button className="botao-flutuante" onClick={() => navegacao__interna('/cadastrar-aluno')}>
                <FaPlus />
            </button>
        </div>
    );
};

export default Dashboard;