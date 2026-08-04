-- =========================================================
-- EDKRAFT - Schema do Supabase
-- Cole este SQL no editor de SQL do Supabase (Dashboard > SQL Editor > New query > Run)
-- =========================================================

-- Tabela de turmas
create table if not exists turmas (
  codigo      text primary key,
  nome        text not null,
  escola      text not null,
  serie       text not null,
  professor   text not null,
  criada_em   timestamptz not null default now()
);

create index if not exists turmas_professor_escola_idx
  on turmas (professor, escola);

-- Tabela de resultados dos diagnosticos
create table if not exists resultados (
  turma_codigo   text not null references turmas(codigo) on delete cascade,
  aluno_nome     text not null,
  top3           jsonb not null,
  feito_em       timestamptz not null,
  atualizado_em  timestamptz not null default now(),
  primary key (turma_codigo, aluno_nome)
);

create index if not exists resultados_turma_idx
  on resultados (turma_codigo);

-- =========================================================
-- POLICIES - Row Level Security
-- Como e um MVP publico (aluno entra so com codigo, sem login),
-- deixamos leitura e escrita abertas. Em producao vale amarrar
-- por auth.uid() ou por API key custom.
-- =========================================================
alter table turmas    enable row level security;
alter table resultados enable row level security;

drop policy if exists "turmas open read"   on turmas;
drop policy if exists "turmas open write"  on turmas;
drop policy if exists "turmas open update" on turmas;
drop policy if exists "turmas open delete" on turmas;

create policy "turmas open read"   on turmas for select using (true);
create policy "turmas open write"  on turmas for insert with check (true);
create policy "turmas open update" on turmas for update using (true);
create policy "turmas open delete" on turmas for delete using (true);

drop policy if exists "resultados open read"   on resultados;
drop policy if exists "resultados open write"  on resultados;
drop policy if exists "resultados open update" on resultados;
drop policy if exists "resultados open delete" on resultados;

create policy "resultados open read"   on resultados for select using (true);
create policy "resultados open write"  on resultados for insert with check (true);
create policy "resultados open update" on resultados for update using (true);
create policy "resultados open delete" on resultados for delete using (true);
