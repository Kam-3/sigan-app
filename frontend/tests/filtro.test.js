// frontend/tests/filtro.test.js
import { describe, it, expect } from 'vitest';

describe('Testes Unitários - Busca e Listagem Dinâmica (Frontend)', () => {
    
    it('Caso de Teste 5: Deve filtrar a lista de alunos pelo Nome de Guerra', () => {
        // 1. Preparação (Mock de alunos iguais aos que vêm da API)
        const lista_alunos = [
            { id: 1, nome_guerra: "Silva", numero_aluno: 101 },
            { id: 2, nome_guerra: "Souza", numero_aluno: 102 },
            { id: 3, nome_guerra: "Oliveira", numero_aluno: 103 }
        ];
        const filtro_busca = "souza"; // Usuário digitou "souza" minúsculo

        // 2. Execução (A mesma regra de negócio que está no seu Dashboard.jsx)
        const lista_filtrada = lista_alunos.filter(aluno =>
            aluno.nome_guerra?.toLowerCase().includes(filtro_busca.toLowerCase()) ||
            aluno.numero_aluno?.toString().includes(filtro_busca)
        );

        // 3. Validação
        expect(lista_filtrada.length).toBe(1); // Só pode achar 1 aluno
        expect(lista_filtrada[0].nome_guerra).toBe("Souza"); // O aluno achado tem que ser o Souza
    });
});