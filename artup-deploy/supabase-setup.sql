-- ============================================================
-- ArtUp APS — Setup database Bacheca
-- Incolla questo intero file in Supabase → SQL Editor → New query
-- poi premi RUN. Va fatto una sola volta.
-- ============================================================

-- Tabella che contiene tutti gli annunci e le call per artisti
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'annuncio',
  title text not null,
  author text not null default 'ArtUp',
  content text not null,
  deadline date,
  created_at timestamptz not null default now()
);

-- Attiva la sicurezza a livello di riga (obbligatoria su Supabase)
alter table posts enable row level security;

-- Permessi: dato che il sito non ha un login,
-- chiunque abbia il link può leggere, pubblicare ed eliminare annunci.
-- (Coerente con come funzionava la Bacheca prima: nessuna autenticazione.)
create policy "Chiunque può leggere gli annunci"
  on posts for select
  using (true);

create policy "Chiunque può pubblicare annunci"
  on posts for insert
  with check (true);

create policy "Chiunque può eliminare annunci"
  on posts for delete
  using (true);
