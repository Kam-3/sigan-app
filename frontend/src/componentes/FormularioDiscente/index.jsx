import React, { useState } from 'react';
import EntradaTexto from '../EntradaTexto';
import axios from 'axios';
import './formulario-discente.estilos.css';

const FormularioDiscente = () => {
    // Estado inicial unificado para todos os campos do SIGAN
    const [dadosAluno, setDadosAluno] = useState({
        numero_aluno: '',
        nome_guerra: '',
        nome_completo: '',
        aniversario: '',
        data_ingresso: '',
        naturalidade: '',
        cpf: '',
        class_comportamento: 'BOM' 
    });

    // Função para atualizar o estado quando o usuário digita
    const manipularMudanca = (nomeCampo, valor) => {
        setDadosAluno(estadoAnterior => ({
            ...estadoAnterior,
            [nomeCampo]: valor
        }));
    };

    const aoSalvar = async (evento) => {
        evento.preventDefault();
        try {
            // Chamada para a rota POST que criamos no Node.js
            const response = await axios.post('http://localhost:3000/api/alunos', dadosAluno);
            alert('Militar cadastrado com sucesso!');
            console.log('Resposta do servidor:', response.data);
        } catch (erro) {
            console.error('Erro ao salvar no Postgres:', erro);
            alert('Erro ao salvar. Verifique se o backend está rodando!');
        }
    };

    return (
        <form onSubmit={aoSalvar} className="formulario-discente">
            <div className="form-row">
                <EntradaTexto 
                    label="Número do Aluno (NIM)" 
                    nome="numero_aluno"
                    tipo="number"
                    obrigatorio={true}
                    valor={dadosAluno.numero_aluno}
                    aoAlterado={manipularMudanca}
                />
                <EntradaTexto 
                    label="Nome de Guerra" 
                    nome="nome_guerra"
                    obrigatorio={true}
                    valor={dadosAluno.nome_guerra}
                    aoAlterado={manipularMudanca}
                />
            </div>
            
            <EntradaTexto 
                label="Nome Completo" 
                nome="nome_completo"
                obrigatorio={true}
                valor={dadosAluno.nome_completo}
                aoAlterado={manipularMudanca}
            />

            <div className="form-row">
                <EntradaTexto 
                    label="Data de Nascimento" 
                    nome="aniversario"
                    tipo="date"
                    valor={dadosAluno.aniversario}
                    aoAlterado={manipularMudanca}
                />
                <EntradaTexto 
                    label="Data de Ingresso" 
                    nome="data_ingresso"
                    tipo="date"
                    valor={dadosAluno.data_ingresso}
                    aoAlterado={manipularMudanca}
                />
            </div>

            <div style={{ marginTop: '20px' }}>
                <button type="submit" className="btn-primary">
                    <i className="fas fa-save"></i> Salvar no Banco de Dados
                </button>
            </div>
        </form>
    );
};

export default FormularioDiscente;