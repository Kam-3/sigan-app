import react, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './prontuario.estilos.css';

const prontuario = () => {
    const { id } = useParams();
    const [aluno, definir__aluno] = useState(null);
    const [aba__ativa, definir__aba] = useState('notas');
    const navegacao = useNavigate();

    useEffect(() => {
        const carregar__dados = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:3000/api/alunos/${id}`, {
                    headers: { authorization: `bearer ${token}` }
                });
                definir__aluno(res.data);
            } catch (err) {
                console.error("Erro ao carregar prontuário.");
            }
        };
        carregar__dados();
    }, [id]);

    if (!aluno) return <div className="carregando__tela">Sincronizando prontuário...</div>;

    return (
        <div className="pront__fundo">
            <header className="pront__topo">
                <button onClick={() => navegacao('/dashboard')} className="btn__voltar">← Voltar ao Painel</button>
                <h2>Prontuário Individual do Discente</h2>
            </header>

            <main className="pront__corpo">
                <section className="info__aluno__box">
                    <h3>{aluno.nome_completo}</h3>
                    <p>Número: {aluno.numero_aluno} | Nome de Guerra: {aluno.nome_guerra}</p>
                    <div className="faixa__status">Comportamento: {aluno.perfil_comportamento}</div>
                </section>

                <nav className="abas__navegacao">
                    <button className={aba__ativa === 'notas' ? 'aba__item ativa' : 'aba__item'} onClick={() => definir__aba('notas')}>Notas e Avaliações</button>
                    <button className={aba__ativa === 'faltas' ? 'aba__item ativa' : 'aba__item'} onClick={() => definir__aba('faltas')}>Frequência e Faltas</button>
                    <button className={aba__ativa === 'visitas' ? 'aba__item ativa' : 'aba__item'} onClick={() => definir__aba('visitas')}>Visitas Médicas</button>
                </nav>

                <div className="conteudo__dinamico">
                    {aba__ativa === 'notas' && (
                        <div className="secao__dados">
                            <h4>Histórico Escolar</h4>
                            <button className="btn__lancar">+ Lançar Nova Nota</button>
                            {/* Lista de notas virá aqui */}
                        </div>
                    )}
                    
                    {aba__ativa === 'faltas' && (
                        <div className="secao__dados">
                            <h4>Registro de Ausências</h4>
                            <button className="btn__lancar">+ Registrar Falta/Atraso</button>
                            {/* Lista de faltas virá aqui */}
                        </div>
                    )}

                    {aba__ativa === 'visitas' && (
                        <div className="secao__dados">
                            <h4>Atendimentos de Saúde</h4>
                            <button className="btn__lancar">+ Registrar Visita Médica</button>
                            {/* Lista de visitas virá aqui */}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default prontuario;