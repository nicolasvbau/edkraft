-- =========================================================
-- EDKRAFT - Schema completo com autenticação + RLS
-- Cole no SQL Editor do Supabase e RUN.
-- Esse script derruba as tabelas antigas e cria do zero.
-- =========================================================

-- 1) Limpar tudo (idempotente)
drop table if exists resultados cascade;
drop table if exists turmas cascade;

-- 2) Tabela turmas — agora vinculada a auth.users
create table turmas (
  codigo         text primary key,
  nome           text not null,
  escola         text not null,
  serie          text not null,
  professor_id   uuid not null references auth.users(id) on delete cascade,
  criada_em      timestamptz not null default now()
);

create index turmas_professor_id_idx on turmas (professor_id);

-- 3) Tabela resultados — aluno anônimo pode escrever, professor lê da sua turma
create table resultados (
  turma_codigo   text not null references turmas(codigo) on delete cascade,
  aluno_nome     text not null,
  top3           jsonb not null,
  feito_em       timestamptz not null,
  atualizado_em  timestamptz not null default now(),
  primary key (turma_codigo, aluno_nome)
);

create index resultados_turma_idx on resultados (turma_codigo);

-- =========================================================
-- ROW LEVEL SECURITY
-- =========================================================
alter table turmas    enable row level security;
alter table resultados enable row level security;

-- ----- TURMAS -----
-- SELECT: público (aluno precisa validar o código sem estar logado)
create policy "turmas: qualquer um lê"
  on turmas for select
  using (true);

-- INSERT: só professor autenticado, e só cria turma pra si mesmo
create policy "turmas: professor cria a sua"
  on turmas for insert
  with check (auth.uid() = professor_id);

-- UPDATE: só o dono da turma
create policy "turmas: só dono atualiza"
  on turmas for update
  using (auth.uid() = professor_id);

-- DELETE: só o dono da turma
create policy "turmas: só dono deleta"
  on turmas for delete
  using (auth.uid() = professor_id);

-- ----- RESULTADOS -----
-- SELECT: público (aluno vê o próprio, professor vê da turma dele)
create policy "resultados: qualquer um lê"
  on resultados for select
  using (true);

-- INSERT: qualquer um pode inserir, MAS só se a turma existir
create policy "resultados: aluno insere se turma existe"
  on resultados for insert
  with check (
    exists (select 1 from turmas where codigo = turma_codigo)
  );

-- UPDATE: aluno pode reenviar (via upsert) apenas se a turma existir.
-- A chave primária (turma_codigo, aluno_nome) já garante que o aluno
-- só substitui a linha dele mesmo. Isso restringe a permissão sem
-- quebrar o upsert do fluxo de re-fazer diagnóstico.
create policy "resultados: aluno atualiza se turma existe"
  on resultados for update
  using (
    exists (select 1 from turmas where codigo = turma_codigo)
  )
  with check (
    exists (select 1 from turmas where codigo = turma_codigo)
  );

-- DELETE: só o professor dono da turma pode apagar resultados
create policy "resultados: só professor dono deleta"
  on resultados for delete
  using (
    exists (
      select 1 from turmas
      where codigo = turma_codigo and professor_id = auth.uid()
    )
  );

-- =========================================================
-- IMPORTANTE — Configuração no dashboard Supabase:
-- Authentication > Settings > Email Auth
--   • DESABILITE "Confirm email" pra login funcionar sem verificação
--   • (opcional) Ative "Enable email signups"
-- =========================================================
