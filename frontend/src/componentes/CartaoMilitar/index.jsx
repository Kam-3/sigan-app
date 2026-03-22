import React from 'react';
import './cartao-militar.estilos.css';

const CartaoMilitar = ({ aluno, onClick }) => {
    // Lógica para definir a classe de borda baseada no comportamento
    const obterClasseStatus = (comportamento) => {
        if (comportamento === 'MAU' || comportamento === 'INSUFICIENTE') return 'status-critico';
        if (comportamento === 'REGULAR') return 'status-alerta';
        return 'status-normal';
    };

    return (
        <div 
            className={`cartao-militar ${obterClasseStatus(aluno.class_comportamento)}`}
            onClick={() => onClick(aluno.id)}
        >
            <div className="foto-container">
                {aluno.dados_foto ? (
                    <img src={aluno.dados_foto} alt={aluno.nome_guerra} className="foto-militar" />
                ) : (
                    <i className="fas fa-user-shield foto-padrao"></i>
                )}
            </div>

            <div className="info-militar">
                <span className="numero-aluno">N° {aluno.numero_aluno.toString().padStart(3, '0')}</span>
                <span className="nome-guerra">{aluno.nome_guerra}</span>
                <small style={{ color: '#0077B6', fontStyle: 'italic' }}>{aluno.rank}</small>
            </div>
        </div>
    );
};

export default CartaoMilitar;