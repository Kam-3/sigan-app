import './entrada-texto.estilos.css';

const EntradaTexto = ({ label, nome, tipo = "text", valor, aoAlterado, obrigatorio = false, placeholder }) => {
    return (
        <div className="campo-texto">
            <label>{label}{obrigatorio && ' *'}</label>
            <input 
                type={tipo} 
                name={nome}
                value={valor} 
                onChange={(evento) => aoAlterado(evento.target.name, evento.target.value)} 
                required={obrigatorio} 
                placeholder={placeholder}
            />
        </div>
    )
}

export default EntradaTexto;