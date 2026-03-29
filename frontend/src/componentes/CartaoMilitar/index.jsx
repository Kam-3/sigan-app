import react from 'react';
import './cartao-militar.estilos.css';

const Cartaomilitar = ({ aluno, onClick }) => {
    return (
        <div className="militar__cartao" onClick={onClick}>
            <div className="cartao__capa">
                {aluno.foto ? (
                    <img src={aluno.foto} alt={aluno.nome_guerra} className="cartao__img" />
                ) : (
                    <div className="avatar__padrao">
                        <i className="fas fa-user-shield"></i>
                    </div>
                )}
                <div className="overlay__gradiente"></div>
            </div>
            
            <div className="cartao__legenda">
                <span className="aluno__numero">N° {String(aluno.numero_aluno).padStart(3, '0')}</span>
                <span className="aluno__guerra">{aluno.nome_guerra}</span>
                <span className="aluno__posto">{aluno.rank || 'Aluno'}</span>
            </div>
        </div>
    );
};

export default Cartaomilitar;