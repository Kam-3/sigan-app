-- 1. Tabela de Usuários (Sistema de Permissões)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    nome_usuario VARCHAR(50) UNIQUE NOT NULL, -- Singular!
    senha_usuario TEXT NOT NULL,              -- Singular!
    perfil VARCHAR(20) DEFAULT 'ALUNO'        -- Em vez de 'role'
);

CREATE TABLE IF NOT EXISTS alunos (
    -- Controle do Sistema
    id SERIAL PRIMARY KEY,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dados_foto TEXT, -- Armazena a imagem em Base64 ou o caminho do arquivo

    -- Dados de Identificação
    numero_aluno INTEGER UNIQUE NOT NULL, -- Número do Aluno (NIM)
    id_militar VARCHAR(50),                -- Identidade Militar
    nome_guerra VARCHAR(100) NOT NULL,         -- Nome de Guerra
    nome_completo VARCHAR(255) NOT NULL,        -- Nome Completo
    aniversario DATE NOT NULL,               -- Data de Nascimento
    data_ingresso DATE NOT NULL,           -- Data de Ingresso
    naturalidade VARCHAR(150),               -- Naturalidade (Cidade/UF)
    nacionalidade VARCHAR(100) DEFAULT 'Brasileira',

    -- Documentos Pessoais
    cpf VARCHAR(14),
    rg_civil VARCHAR(50),
    titulo_eleitor VARCHAR(50),                   -- Título de Eleitor
    cert_reservista VARCHAR(100),            -- Certificado de Reservista

    -- Dados Pessoais
    estado_civil VARCHAR(50),             -- Estado Civil (solteiro, casado, etc)
    tipo_sanguineo VARCHAR(5),                  -- Tipo Sanguíneo (A+, O-, etc)
    religiao VARCHAR(100),
    escolaridade VARCHAR(100),           -- Escolaridade

    -- Endereço Residencial
    endereco_comp TEXT,                      -- Endereço Completo
    bairro VARCHAR(100),              -- Bairro
    cidade_uf VARCHAR(150),                -- Cidade/Estado
    cep VARCHAR(10),                   -- CEP
    telefone_residencial VARCHAR(20),                 -- Telefone Residencial

    -- Contatos
    contato_pessoal VARCHAR(20) NOT NULL,   -- Contato Pessoal (Celular)
    email_pessoal VARCHAR(150),            -- E-mail Pessoal
    
    -- Contato Familiar
    contato_familiar_nome VARCHAR(255),
    contato_familiar_telefone VARCHAR(20),
    contato_familiar_email VARCHAR(100),   -- Parentesco

    -- Contato de Emergência (Destacado em vermelho no form)
    contato_emergencia_nome VARCHAR(255),
    contato_emergencia_telefone VARCHAR(20),
    contato_emergencia_email VARCHAR(100),

    -- Filiação
    nome_pai VARCHAR(255),
    nome_mae VARCHAR(255),
    endereco_pais TEXT,                   -- Endereço dos Pais (se diferente)

    -- Status e Comportamento
    class_comportamento VARCHAR(50) DEFAULT 'BOM' -- Classificação de Comportamento
);

-- Trigger para atualizar automaticamente o campo updated_at
CREATE OR REPLACE FUNCTION funcao_atualiza_data_alteracao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER gatilho_atualiza_discente
    BEFORE UPDATE ON alunos
    FOR EACH ROW
    EXECUTE PROCEDURE funcao_atualiza_data_alteracao();

-- 3. Tabela de Fatos Observados (FO+ / FO-)
CREATE TABLE IF NOT EXISTS fos (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
    type VARCHAR(10) CHECK (type IN ('plus', 'minus')), --
    descricao TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Punições
CREATE TABLE IF NOT EXISTS punicoes (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
    
    -- Campos do Formulário
    tipo_punicao VARCHAR(100) NOT NULL, -- Tipo (Advertência, Prisão, etc)
    dias INTEGER DEFAULT 0,                 -- Quantidade de dias (1, 3, 5...)
    motivo TEXT NOT NULL,                   -- Motivo da Punição
    
    -- Controle e Impacto
    pontos_perdidos DECIMAL(5,2),            -- Pontos perdidos (ex: -10.00)
    data_punicao DATE DEFAULT CURRENT_DATE, -- Data da punição
    link_arquivo_anexo TEXT,                   -- Link para o arquivo/anexo
    
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabela de Faltas
CREATE TABLE IF NOT EXISTS faltas (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
    type VARCHAR(20), -- justified ou unjustified
    motivos TEXT,
    pontos_perdidos INTEGER, -- 1 ou 3 pontos
    date DATE NOT NULL
);

-- 6. Tabela de Notas e Desempenho
CREATE TABLE IF NOT EXISTS notas (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
    disciplina_id VARCHAR(50), -- ig, cmb, tfm, conceito, etc.
    nome_disciplina VARCHAR(100),
    nota_final DECIMAL(4,2),
    sub_nota JSONB, -- Armazena o array de subnotas se houver
    is_recuperacao BOOLEAN DEFAULT FALSE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabela de Visitas Médicas
CREATE TABLE IF NOT EXISTS visitas_medicas (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER REFERENCES alunos(id) ON DELETE CASCADE,
    nome_medico VARCHAR(100),
    motivo TEXT,
    convalescenca BOOLEAN DEFAULT FALSE,
    dias_convalescenca INTEGER DEFAULT 0,
    observacao_medica TEXT,
    data_visita DATE NOT NULL,
    hora_visita TIME
);

DROP TABLE usuarios