# Documento de Estratégia de Testes - SIGAN

**Projeto:** SIGAN - Sistema Integrado de Gestão de Alunos do NPOR/5° BE Cmb Bld

## 1. Funcionalidade: Autenticação e Controle de Acesso (Login)
O módulo responsável por garantir que apenas o corpo instrutivo e a administração do NPOR/Batalhão tenham acesso às informações sigilosas dos discentes.

**Regras de Negócio:**
* O acesso ao sistema é restrito a usuários previamente cadastrados no banco de dados pelo Administrador (via script de *seed* ou painel).
* A senha do usuário deve ser validada e comparada utilizando criptografia (hash) por questões de segurança.
* Ao realizar o login com sucesso, o sistema deve gerar e retornar um token JWT (JSON Web Token) válido para manter a sessão ativa.

**Casos de Teste:**

* **Caso de Teste 1 (Positivo) - [E2E]**
* **Cenário:** Realizar login com credenciais válidas na interface do sistema.
* **Ação:** O usuário preenche e-mail e senha corretos na tela de login e clica em "Entrar".
* **Resultado Esperado:** O sistema deve autenticar o usuário, armazenar o token JWT no `localStorage` e redirecionar a tela para o Dashboard principal.

* **Caso de Teste 2 (Negativo) - [Integração]**
* **Cenário:** Tentativa de login com senha incorreta na API.
* **Ação:** Enviar uma requisição POST para a rota de login `/api/login` com um e-mail existente, mas com a senha errada.
* **Resultado Esperado:** O backend deve negar o acesso, não gerar o token e retornar um status HTTP 401 (Unauthorized) com a mensagem "Credenciais inválidas".

---

## 2. Funcionalidade: Cadastro de Discentes (Alunos)
O módulo principal de inserção de dados, contendo informações básicas, militares, contatos de emergência e histórico médico/disciplinar.

**Regras de Negócio:**
* Os campos "Nome Completo", "Nome de Guerra" e "NIM" (Número de Identificação Militar) são de preenchimento obrigatório.
* O sistema não pode permitir o cadastro de dois discentes com o mesmo NIM (chave única).
* O envio de anexos (fotos/documentos) deve respeitar o limite máximo de 50MB estabelecido pelo sistema.

**Casos de Teste:**

* **Caso de Teste 3 (Positivo) - [Integração]**
* **Cenário:** Cadastrar um novo aluno com todos os dados obrigatórios via API.
* **Ação:** Enviar um payload JSON completo (contendo NIM, Nome de Guerra, Nome Completo, etc.) para a rota POST `/api/alunos`.
* **Resultado Esperado:** O banco de dados deve registrar o novo discente e a API deve retornar um status HTTP 201 (Created).

* **Caso de Teste 4 (Negativo) - [Unitário]**
* **Cenário:** Validação de obrigatoriedade do NIM no modelo/controlador.
* **Ação:** Chamar a função de criação de aluno enviando um objeto de dados onde o campo `numero_aluno` (NIM) seja nulo ou vazio.
* **Resultado Esperado:** A função deve lançar uma exceção de validação (ou erro HTTP 400 Bad Request) informando que o campo NIM é obrigatório, sem tentar acessar o banco de dados.

---

## 3. Funcionalidade: Busca e Listagem Dinâmica (Dashboard)
A tela principal do sistema que lista os alunos em forma de cartões militares e permite a filtragem rápida para acesso aos prontuários.

**Regras de Negócio:**
* O Dashboard deve carregar e exibir automaticamente todos os discentes ativos ao ser renderizado.
* A barra de pesquisa deve filtrar os resultados na tela em tempo real (client-side) conforme o usuário digita.
* O filtro de busca deve considerar apenas ocorrências correspondentes ao "Nome de Guerra" ou ao "NIM" do aluno.

**Casos de Teste:**

* **Caso de Teste 5 (Positivo) - [Unitário]**
* **Cenário:** Funcionamento do algoritmo de filtragem da lista.
* **Ação:** Passar uma lista de 5 objetos de alunos simulados (mock) para a função de filtro (`lista__filtrada`), buscando por um "Nome de Guerra" específico contido em apenas um deles.
* **Resultado Esperado:** A função deve retornar um novo array contendo exatamente 1 aluno (o correspondente à busca).

* **Caso de Teste 6 (Negativo) - [E2E]**
* **Cenário:** Busca por discente inexistente na interface do usuário.
* **Ação:** O usuário digita um NIM que não pertence a nenhum aluno matriculado na barra de pesquisa do Dashboard.
* **Resultado Esperado:** O grid de cartões de alunos deve sumir e o sistema deve renderizar o componente de estado vazio, exibindo o ícone e a mensagem "Nenhum discente cadastrado/encontrado".