import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaTimes, FaCamera, FaInfoCircle, FaCloudUploadAlt, FaSave, FaPlus } from 'react-icons/fa';
import './cadastrar-alunos.estilos.css';

export default function NovoDiscente() {
    const [abaAtiva, setAbaAtiva] = useState('basicas');

    const navigate = useNavigate();
    const voltarParaInicio = () => {
    navigate('/dashboard'); // Aqui você coloca a rota da sua página inicial (ex: '/dashboard' ou '/')
    };
    return (
        <div className="fundo-modal">
            <div className="cartao-modal">

                {/* CABEÇALHO */}
                <div className="cabecalho-modal">
                    <h2><FaUserPlus style={{ marginRight: '10px' }} /> Novo Discente</h2>
                    <button className="botao-fechar" onClick={voltarParaInicio}>
                        <FaTimes />
                    </button>
                </div>

                {/* MENU DE ABAS */}
                <div className="menu-abas">
                    <button
                        className={abaAtiva === 'basicas' ? 'aba ativa' : 'aba'}
                        onClick={() => setAbaAtiva('basicas')}
                    >
                        Informações Básicas
                    </button>
                    <button
                        className={abaAtiva === 'militares' ? 'aba ativa' : 'aba'}
                        onClick={() => setAbaAtiva('militares')}
                    >
                        Dados Militares
                    </button>
                    <button
                        className={abaAtiva === 'disciplina' ? 'aba ativa' : 'aba'}
                        onClick={() => setAbaAtiva('disciplina')}
                    >
                        Disciplina
                    </button>
                </div>

                {/* CONTEÚDO DAS ABAS */}
                <div className="conteudo-modal">
                    {abaAtiva === 'basicas' && (
                        <div className="animacao-suave">

                            <div className="caixa-foto">
                                <span className="icone-camera"><FaCamera /></span>
                                <p>Clique para adicionar foto do discente</p>
                                <input type="file" />
                            </div>

                            <h3 className="titulo-secao">Dados de Identificação</h3>

                            {/* O GRID (2 COLUNAS) */}
                            <div className="grid-inputs">

                                <div className="grupo-input">
                                    <label>Número do Aluno (NIM): *</label>
                                    <input type="number" />
                                </div>

                                <div className="grupo-input">
                                    <label>Identidade Militar:</label>
                                    <input type="number" />
                                </div>

                                <div className="grupo-input">
                                    <label>Nome de Guerra: *</label>
                                    <input type="text" />
                                </div>

                                <div className="grupo-input">
                                    <label>Nome Completo: *</label>
                                    <input type="text" />
                                </div>

                                <div className="grupo-input">
                                    <label>Data de Nascimento: *</label>
                                    <input type="date" />
                                </div>

                                <div className="grupo-input">
                                    <label>Data de Ingresso: *</label>
                                    <input type="date" />
                                </div>

                                <div className="grupo-input">
                                    <label>Naturalidade (Cidade/UF): *</label>
                                    <input type="text" />
                                </div>

                                <div className='grupo-input'>
                                    <label>Nacionalidade: *</label>
                                    <input type="text" placeholder='Brasileira' />
                                </div>
                            </div>
                            <br />

                            <h3 className='titulo-secao'>Documentos Pessoais</h3>

                            <div className="grid-inputs">

                                <div className='grupo-input'>
                                    <label for="cpf">CPF: *</label>
                                    <input type="number" id="cpf" min="1" maxLength="11" />
                                </div>
                                <div className='grupo-input'>
                                    <label for="rg">RG (Civil):</label>
                                    <input type="number" id="rg" min="1" />
                                </div>
                                <div className='grupo-input'>
                                    <label for="titulo">Título de Eleitor:</label>
                                    <input type="number" id="titulo__eleitor" />
                                </div>
                                <div className='grupo-input'>
                                    <label for="reservista">Certificado de Reservista:</label>
                                    <input type="text" id="cer__reservista" />
                                </div>
                            </div>
                            <br />

                            <h3 className='titulo-secao'>Dados Pessoais</h3>

                            <div className="grid-inputs">
                                <div className="grupo-input">
                                    <label>Estado Civil:</label>
                                    <select>
                                        <option value="">Selecione</option>
                                        <option value="solteiro">Solteiro</option>
                                        <option value="casado">Casado</option>
                                        <option value="divorciado">Divorciado</option>
                                        <option value="viuvo">Viúvo</option>
                                    </select>
                                </div>
                                <div className="grupo-input">
                                    <label>Tipo Sanguíneo:</label>
                                    <select>
                                        <option value="">Selecione</option>
                                        <option value="a+">A+</option>
                                        <option value="a-">A-</option>
                                        <option value="b+">B+</option>
                                        <option value="b-">B-</option>
                                        <option value="ab+">AB+</option>
                                        <option value="ab-">AB-</option>
                                        <option value="o+">O+</option>
                                        <option value="o-">O-</option>
                                    </select>
                                </div>
                                <div className="grupo-input">
                                    <label>Religião:</label>
                                    <input type="text" />
                                </div>
                                <div className="grupo-input">
                                    <label>Escolaridade:</label>
                                    <select>
                                        <option value="">Selecione</option>
                                        <option value="ensino__medio__incompleto">Ensino Médio Incompleto</option>
                                        <option value="ensino__medio__completo">Ensino Médio Completo</option>
                                        <option value="superior__incompleto">Superior Incompleto</option>
                                        <option value="superior__completo">Superior Completo</option>
                                        <option value="pos__graduacao">Pós-Graduação</option>
                                    </select>
                                </div>
                            </div>
                            <br />

                            <h3 className='titulo-secao'>Endereço Residencial</h3>

                            <div className="grid-inputs">
                                <div className="grupo-input">
                                    <label>Endereço Completo:</label>
                                    <input type="text" />
                                </div>
                                <div className="grupo-input">
                                    <label>Bairro:</label>
                                    <input type="text" />
                                </div>
                                <div className="grupo-input">
                                    <label>Cidade/Estado:</label>
                                    <input type="text" />
                                </div>
                                <div className="grupo-input">
                                    <label>CEP:</label>
                                    <input type="number" />
                                </div>
                                <div className="grupo-input">
                                    <label>Telefone Residencial</label>
                                    <input type="number" /></div>
                            </div>
                            <br />

                            <h3 className="titulo-secao" style={{ marginTop: '30px' }}>Contatos</h3>

                            <div className="grid-inputs">
                                <div className="grupo-input">
                                    <label>Contato Pessoal (Celular): *</label>
                                    <input type="text" />
                                    <span className="texto-ajuda">Telefone do próprio discente</span>
                                </div>

                                <div className="grupo-input">
                                    <label>E-mail Pessoal:</label>
                                    <input type="email" />
                                </div>
                            </div>

                            <div className="caixa-agrupamento familiar">
                                <label className="titulo-grupo">Contato Familiar:</label>
                                <div className="grid-inputs">
                                    <div className="grupo-input"><input type="text" placeholder="Nome" /></div>
                                    <div className="grupo-input"><input type="text" placeholder="Grau de Parentesco" /></div>
                                </div>
                                <div className="grupo-input" style={{ marginTop: '10px' }}>
                                    <input type="text" placeholder="Telefone" />
                                </div>
                            </div>

                            <div className="caixa-agrupamento emergencia">
                                <label className="titulo-grupo">Contato de Emergência:</label>
                                <div className="grid-inputs">
                                    <div className="grupo-input"><input type="text" placeholder="Nome" /></div>
                                    <div className="grupo-input"><input type="text" placeholder="Grau de Parentesco" /></div>
                                </div>
                                <div className="grupo-input" style={{ marginTop: '10px' }}>
                                    <input type="text" placeholder="Telefone" />
                                </div>
                            </div>

                            <h3 className="titulo-secao" style={{ marginTop: '30px' }}>Filiação</h3>

                            <div className="grupo-filiacao">
                                <label>PAI:</label>
                                <input type="text" />
                            </div>

                            <div className="grupo-filiacao">
                                <label>MÃE:</label>
                                <input type="text" />
                            </div>

                            <div className="grupo-input" style={{ marginTop: '15px' }}>
                                <label>Endereço dos Pais (se diferente):</label>
                                <textarea rows="3" placeholder="Digite o endereço completo..."></textarea>
                            </div>

                            <div className="caixa-comportamento">
                            <h4>Classificação de Comportamento</h4>
                            <div className="badge-comportamento">BOM</div>
                            <p className="texto-rde"><FaInfoCircle style={{ marginRight: '5px' }} /> Conforme Art. 51 do RDE</p>
                            </div>

                            <h3 className="titulo-secao" style={{ marginTop: '30px' }}>
                            📎 Anexos - Informações Pessoais
                            </h3>
              
                            <div className="caixa-upload">
                             <span className="icone-upload"><FaCloudUploadAlt /></span>
                             <p className="texto-principal">Clique para adicionar documentos (RG, CPF, Certidões, etc.)</p>
                             <p className="texto-secundario">PDF, JPG, PNG, DOC - Máx 10MB</p>
                             <input type="file" multiple />
                         </div>

                        </div>
                    )}

                    {abaAtiva === 'militares' && (
                        <div className="animacao-suave">
                            <p>Conteúdo dos dados militares vai aqui...</p>
                        </div>
                    )}

                    {abaAtiva === 'disciplina' && (
                        <div className="animacao-suave">
                            <p>Conteúdo de disciplina vai aqui...</p>
                        </div>
                    )}
                </div>
                
                <div className="rodape-modal">
                  <button className="btn-cancelar">Cancelar</button>
                  <button className="btn-salvar"><FaSave style={{ marginRight: '8px' }} /> Salvar Discente</button>
                </div>

            </div>
        </div>
    );
}