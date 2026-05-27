// backend/tests/aluno.validation.test.js

// Simulando a regra de negócio do seu Controller de Alunos
const validarDadosAluno = (aluno) => {
    if (!aluno.numero_aluno) {
        throw new Error("O campo NIM (numero_aluno) é obrigatório.");
    }
    return true;
};

describe('Testes Unitários - Cadastro de Discentes (Backend)', () => {
    
    it('Caso de Teste 4: Deve lançar erro se o NIM (numero_aluno) for nulo ou vazio', () => {
        // Preparação (Mock de um aluno incompleto)
        const alunoInvalido = {
            nome_completo: "João Silva",
            nome_guerra: "Silva"
            // numero_aluno não foi enviado
        };

        // Execução e Validação
        expect(() => validarDadosAluno(alunoInvalido)).toThrow("O campo NIM (numero_aluno) é obrigatório.");
    });

    it('Cenário Positivo (Extra): Deve passar na validação se o NIM for enviado', () => {
        const alunoValido = {
            nome_completo: "Maria Souza",
            nome_guerra: "Souza",
            numero_aluno: 1054
        };

        expect(validarDadosAluno(alunoValido)).toBe(true);
    });
});