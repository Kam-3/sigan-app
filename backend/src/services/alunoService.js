const db = require("../config/database");

class AlunoService {
  async cadastrar(dados) {
    const query = `
            INSERT INTO alunos (
                numero_aluno, id_militar, nome_guerra, nome_completo, aniversario, 
                data_ingresso, naturalidade, nacionalidade, cpf, rg_civil, 
                titulo_eleitor, cert_reservista, estado_civil, tipo_sanguineo, religiao, 
                escolaridade, endereco_comp, bairro, cidade_uf, cep, 
                telefone_residencial, contato_pessoal, email_pessoal, contato_familiar_nome, 
                contato_familiar_telefone, contato_familiar_email, contato_emergencia_nome, 
                contato_emergencia_telefone, contato_emergencia_email, nome_pai, 
                nome_mae, endereco_pais, dados_foto, class_comportamento
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 
                      $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, 
                      $29, $30, $31, $32, $33, $34) 
            RETURNING id;
        `;

    const valores = [
      dados.numero_aluno,
      dados.id_militar,
      dados.nome_guerra,
      dados.nome_completo,
      dados.aniversario,
      dados.data_ingresso,
      dados.naturalidade,
      dados.nacionalidade,
      dados.cpf,
      dados.rg_civil,
      dados.titulo_eleitor,
      dados.cert_reservista,
      dados.estado_civil,
      dados.tipo_sanguineo,
      dados.religiao,
      dados.escolaridade,
      dados.endereco_comp,
      dados.bairro,
      dados.cidade_uf,
      dados.cep,
      dados.telefone_residencial,
      dados.contato_pessoal,
      dados.email_pessoal,
      dados.contato_familiar_nome,
      dados.contato_familiar_telefone,
      dados.contato_familiar_email,
      dados.contato_emergencia_nome,
      dados.contato_emergencia_telefone,
      dados.contato_emergencia_email,
      dados.nome_pai,
      dados.nome_mae,
      dados.endereco_pais,
      dados.dados_foto,
      dados.class_comportamento,
    ];

    const { rows } = await db.query(query, valores);
    return rows[0];
  }

  async listarTodos() {
    const { rows } = await db.query(
      "SELECT * FROM alunos ORDER BY numero_aluno ASC",
    );
    return rows;
  }

  async registrar(dados) {
    const colunas = Object.keys(dados).join(", ");
    const valores = Object.values(dados);
    const placeholders = valores.map((_, i) => `$${i + 1}`).join(", ");

    const query = `
        INSERT INTO alunos (${colunas})
        VALUES (${placeholders})
        RETURNING *;
    `;

    const resultado = await db.query(query, valores);
    return resultado.rows[0];
  }
}

module.exports = new AlunoService();
