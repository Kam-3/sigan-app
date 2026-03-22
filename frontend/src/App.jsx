import { useEffect, useState } from 'react';
import axios from 'axios';
import CartaoMilitar from './componentes/CartaoMilitar';
import './App.css'; // Certifique-se de que o CSS do grid está aqui

function App() {
  // 1. Criamos o "estado" para guardar os alunos. 
  // Ele começa como uma lista vazia []
  const [alunos, setAlunos] = useState([]);

  // 2. O useEffect busca os dados assim que o componente aparece na tela
  useEffect(() => {
    axios.get('http://localhost:3000/api/alunos')
      .then(response => {
        // Guardamos os dados que vieram do Postgres no nosso estado
        setAlunos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar alunos:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>SIGAN - Lista de Discentes</h1>
      
      <div className="military-grid">
        {/* Agora o 'alunos' existe e o erro vai sumir! */}
        {alunos.map(aluno => (
          <CartaoMilitar 
            key={aluno.id} 
            aluno={aluno} 
            onClick={(id) => console.log("Clicou no aluno:", id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;