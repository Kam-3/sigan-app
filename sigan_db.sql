--
-- PostgreSQL database dump
--

\restrict IxH1kblecreTDNLYP1W5wIaVqkSoW0sDDuH3m17Sifh2dayB8tQs5GkouwGT5ds

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.1

-- Started on 2026-04-01 23:07:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 233 (class 1255 OID 32891)
-- Name: funcao_atualiza_data_alteracao(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.funcao_atualiza_data_alteracao() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.atualizado_em = now();
    RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 32870)
-- Name: alunos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alunos (
    id integer NOT NULL,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    dados_foto text,
    numero_aluno integer NOT NULL,
    id_militar character varying(50),
    nome_guerra character varying(100) NOT NULL,
    nome_completo character varying(255) NOT NULL,
    aniversario date NOT NULL,
    data_ingresso date NOT NULL,
    naturalidade character varying(150),
    nacionalidade character varying(100) DEFAULT 'Brasileira'::character varying,
    cpf character varying(14),
    rg_civil character varying(50),
    titulo_eleitor character varying(50),
    cert_reservista character varying(100),
    estado_civil character varying(50),
    tipo_sanguineo character varying(5),
    religiao character varying(100),
    escolaridade character varying(100),
    endereco_comp text,
    bairro character varying(100),
    cidade_uf character varying(150),
    cep character varying(10),
    telefone_residencial character varying(20),
    contato_pessoal character varying(20) NOT NULL,
    email_pessoal character varying(150),
    contato_familiar_nome character varying(255),
    contato_familiar_telefone character varying(20),
    contato_familiar_email character varying(100),
    contato_emergencia_nome character varying(255),
    contato_emergencia_telefone character varying(20),
    contato_emergencia_email character varying(100),
    nome_pai character varying(255),
    nome_mae character varying(255),
    endereco_pais text,
    class_comportamento character varying(50) DEFAULT 'BOM'::character varying
);


--
-- TOC entry 219 (class 1259 OID 32869)
-- Name: alunos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.alunos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 219
-- Name: alunos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.alunos_id_seq OWNED BY public.alunos.id;


--
-- TOC entry 226 (class 1259 OID 32932)
-- Name: faltas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.faltas (
    id integer NOT NULL,
    aluno_id integer,
    type character varying(20),
    motivos text,
    pontos_perdidos integer,
    date date NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 32931)
-- Name: faltas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.faltas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 225
-- Name: faltas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.faltas_id_seq OWNED BY public.faltas.id;


--
-- TOC entry 222 (class 1259 OID 32894)
-- Name: fos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fos (
    id integer NOT NULL,
    aluno_id integer,
    type character varying(10),
    descricao text NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fos_type_check CHECK (((type)::text = ANY ((ARRAY['plus'::character varying, 'minus'::character varying])::text[])))
);


--
-- TOC entry 221 (class 1259 OID 32893)
-- Name: fos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.fos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 221
-- Name: fos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.fos_id_seq OWNED BY public.fos.id;


--
-- TOC entry 228 (class 1259 OID 32948)
-- Name: notas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notas (
    id integer NOT NULL,
    aluno_id integer,
    disciplina_id character varying(50),
    nome_disciplina character varying(100),
    nota_final numeric(4,2),
    sub_nota jsonb,
    is_recuperacao boolean DEFAULT false,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 227 (class 1259 OID 32947)
-- Name: notas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 227
-- Name: notas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notas_id_seq OWNED BY public.notas.id;


--
-- TOC entry 224 (class 1259 OID 32912)
-- Name: punicoes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.punicoes (
    id integer NOT NULL,
    aluno_id integer,
    tipo_punicao character varying(100) NOT NULL,
    dias integer DEFAULT 0,
    motivo text NOT NULL,
    pontos_perdidos numeric(5,2),
    data_punicao date DEFAULT CURRENT_DATE,
    link_arquivo_anexo text,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 223 (class 1259 OID 32911)
-- Name: punicoes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.punicoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 223
-- Name: punicoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.punicoes_id_seq OWNED BY public.punicoes.id;


--
-- TOC entry 232 (class 1259 OID 32983)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome_completo character varying(255) NOT NULL,
    nome_usuario character varying(50) NOT NULL,
    senha_usuario text NOT NULL,
    perfil character varying(20) DEFAULT 'ALUNO'::character varying
);


--
-- TOC entry 231 (class 1259 OID 32982)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 231
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 230 (class 1259 OID 32965)
-- Name: visitas_medicas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visitas_medicas (
    id integer NOT NULL,
    aluno_id integer,
    nome_medico character varying(100),
    motivo text,
    convalescenca boolean DEFAULT false,
    dias_convalescenca integer DEFAULT 0,
    observacao_medica text,
    data_visita date NOT NULL,
    hora_visita time without time zone
);


--
-- TOC entry 229 (class 1259 OID 32964)
-- Name: visitas_medicas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.visitas_medicas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 229
-- Name: visitas_medicas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visitas_medicas_id_seq OWNED BY public.visitas_medicas.id;


--
-- TOC entry 4786 (class 2604 OID 32873)
-- Name: alunos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alunos ALTER COLUMN id SET DEFAULT nextval('public.alunos_id_seq'::regclass);


--
-- TOC entry 4797 (class 2604 OID 32935)
-- Name: faltas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faltas ALTER COLUMN id SET DEFAULT nextval('public.faltas_id_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 32897)
-- Name: fos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fos ALTER COLUMN id SET DEFAULT nextval('public.fos_id_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 32951)
-- Name: notas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notas ALTER COLUMN id SET DEFAULT nextval('public.notas_id_seq'::regclass);


--
-- TOC entry 4793 (class 2604 OID 32915)
-- Name: punicoes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.punicoes ALTER COLUMN id SET DEFAULT nextval('public.punicoes_id_seq'::regclass);


--
-- TOC entry 4804 (class 2604 OID 32986)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4801 (class 2604 OID 32968)
-- Name: visitas_medicas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visitas_medicas ALTER COLUMN id SET DEFAULT nextval('public.visitas_medicas_id_seq'::regclass);


--
-- TOC entry 4979 (class 0 OID 32870)
-- Dependencies: 220
-- Data for Name: alunos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.alunos (id, criado_em, atualizado_em, dados_foto, numero_aluno, id_militar, nome_guerra, nome_completo, aniversario, data_ingresso, naturalidade, nacionalidade, cpf, rg_civil, titulo_eleitor, cert_reservista, estado_civil, tipo_sanguineo, religiao, escolaridade, endereco_comp, bairro, cidade_uf, cep, telefone_residencial, contato_pessoal, email_pessoal, contato_familiar_nome, contato_familiar_telefone, contato_familiar_email, contato_emergencia_nome, contato_emergencia_telefone, contato_emergencia_email, nome_pai, nome_mae, endereco_pais, class_comportamento) FROM stdin;
4	2026-03-22 16:11:08.158526	2026-03-22 16:11:08.158526	\N	101	123456	SILVA	João da Silva	2000-01-01	2000-01-01	\N	Brasileira	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	42988484009	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Bom
5	2026-03-22 16:11:08.158526	2026-03-22 16:11:08.158526	\N	102	789012	OLIVEIRA	Carlos Oliveira	1999-05-15	2000-01-01	\N	Brasileira	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	42988484009	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Excepcional
6	2026-03-22 16:11:08.158526	2026-03-22 16:11:08.158526	\N	103	456789	SANTOS	Ricardo Santos	2001-10-20	2000-01-01	\N	Brasileira	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	42988484009	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Bom
\.


--
-- TOC entry 4985 (class 0 OID 32932)
-- Dependencies: 226
-- Data for Name: faltas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.faltas (id, aluno_id, type, motivos, pontos_perdidos, date) FROM stdin;
\.


--
-- TOC entry 4981 (class 0 OID 32894)
-- Dependencies: 222
-- Data for Name: fos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.fos (id, aluno_id, type, descricao, date) FROM stdin;
\.


--
-- TOC entry 4987 (class 0 OID 32948)
-- Dependencies: 228
-- Data for Name: notas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notas (id, aluno_id, disciplina_id, nome_disciplina, nota_final, sub_nota, is_recuperacao, date) FROM stdin;
\.


--
-- TOC entry 4983 (class 0 OID 32912)
-- Dependencies: 224
-- Data for Name: punicoes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.punicoes (id, aluno_id, tipo_punicao, dias, motivo, pontos_perdidos, data_punicao, link_arquivo_anexo, criado_em) FROM stdin;
\.


--
-- TOC entry 4991 (class 0 OID 32983)
-- Dependencies: 232
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.usuarios (id, nome_completo, nome_usuario, senha_usuario, perfil) FROM stdin;
1	Administrador NPOR	admin	$2b$10$.Y40fn7SlblfQEsatUCsZuN3UD9X5h8M5y9HUEAlR.Q1Chvhj4vHO	ADMIN
\.


--
-- TOC entry 4989 (class 0 OID 32965)
-- Dependencies: 230
-- Data for Name: visitas_medicas; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.visitas_medicas (id, aluno_id, nome_medico, motivo, convalescenca, dias_convalescenca, observacao_medica, data_visita, hora_visita) FROM stdin;
\.


--
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 219
-- Name: alunos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.alunos_id_seq', 6, true);


--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 225
-- Name: faltas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.faltas_id_seq', 1, false);


--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 221
-- Name: fos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.fos_id_seq', 1, false);


--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 227
-- Name: notas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notas_id_seq', 1, false);


--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 223
-- Name: punicoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.punicoes_id_seq', 1, false);


--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 231
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 229
-- Name: visitas_medicas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.visitas_medicas_id_seq', 1, false);


--
-- TOC entry 4808 (class 2606 OID 32890)
-- Name: alunos alunos_numero_aluno_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_numero_aluno_key UNIQUE (numero_aluno);


--
-- TOC entry 4810 (class 2606 OID 32888)
-- Name: alunos alunos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_pkey PRIMARY KEY (id);


--
-- TOC entry 4816 (class 2606 OID 32941)
-- Name: faltas faltas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faltas
    ADD CONSTRAINT faltas_pkey PRIMARY KEY (id);


--
-- TOC entry 4812 (class 2606 OID 32905)
-- Name: fos fos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fos
    ADD CONSTRAINT fos_pkey PRIMARY KEY (id);


--
-- TOC entry 4818 (class 2606 OID 32958)
-- Name: notas notas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_pkey PRIMARY KEY (id);


--
-- TOC entry 4814 (class 2606 OID 32925)
-- Name: punicoes punicoes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.punicoes
    ADD CONSTRAINT punicoes_pkey PRIMARY KEY (id);


--
-- TOC entry 4822 (class 2606 OID 32997)
-- Name: usuarios usuarios_nome_usuario_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_nome_usuario_key UNIQUE (nome_usuario);


--
-- TOC entry 4824 (class 2606 OID 32995)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4820 (class 2606 OID 32976)
-- Name: visitas_medicas visitas_medicas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visitas_medicas
    ADD CONSTRAINT visitas_medicas_pkey PRIMARY KEY (id);


--
-- TOC entry 4830 (class 2620 OID 32892)
-- Name: alunos gatilho_atualiza_discente; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER gatilho_atualiza_discente BEFORE UPDATE ON public.alunos FOR EACH ROW EXECUTE FUNCTION public.funcao_atualiza_data_alteracao();


--
-- TOC entry 4827 (class 2606 OID 32942)
-- Name: faltas faltas_aluno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.faltas
    ADD CONSTRAINT faltas_aluno_id_fkey FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;


--
-- TOC entry 4825 (class 2606 OID 32906)
-- Name: fos fos_aluno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.fos
    ADD CONSTRAINT fos_aluno_id_fkey FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;


--
-- TOC entry 4828 (class 2606 OID 32959)
-- Name: notas notas_aluno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_aluno_id_fkey FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;


--
-- TOC entry 4826 (class 2606 OID 32926)
-- Name: punicoes punicoes_aluno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.punicoes
    ADD CONSTRAINT punicoes_aluno_id_fkey FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;


--
-- TOC entry 4829 (class 2606 OID 32977)
-- Name: visitas_medicas visitas_medicas_aluno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visitas_medicas
    ADD CONSTRAINT visitas_medicas_aluno_id_fkey FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;


-- Completed on 2026-04-01 23:07:58

--
-- PostgreSQL database dump complete
--

\unrestrict IxH1kblecreTDNLYP1W5wIaVqkSoW0sDDuH3m17Sifh2dayB8tQs5GkouwGT5ds

