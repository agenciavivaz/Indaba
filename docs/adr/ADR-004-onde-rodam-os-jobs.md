# ADR-004: Onde rodam os jobs

**Status:** Aceito
**Data:** 28/10/2026
**Decisores:** Diego Rodrigues (Vivaz)
**Fonte:** PRD-indaba-mvp.md, seção 11

## Contexto

O produto tem trabalho assíncrono: expirar sinais e recalcular score, buscar sinais de timing no Apollo, enriquecer em lote, reentregar webhooks com backoff, gerar rascunhos de IA. Funções serverless da Vercel têm timeout e ficam longe do banco.

## Opções consideradas

### Opção A: pg_cron + pgmq + Supabase Edge Functions

**Prós:** jobs perto do banco; fila transacional; sem timeout da Vercel em lotes do Apollo.
**Contras:** runtime Deno nas Edge Functions (código compartilhado precisa ser portável).

### Opção B: Vercel Cron + route handlers

**Prós:** uma plataforma só.
**Contras:** timeout de função; sem fila nativa; mais idas e voltas ao banco.

### Opção C: Worker dedicado (ex.: fila externa)

**Prós:** controle total.
**Contras:** mais uma peça para operar no MVP.

## Decisão

**Opção A.** pg_cron dispara, pgmq enfileira, Edge Functions executam. A Vercel fica só com UI, API síncrona e o redirecionador `/r/:token`.

## Consequências

- **Mais fácil:** lotes longos e reentregas sem timeout; tudo observável no banco.
- **Mais difícil:** regras puras em `lib/` precisam rodar tanto no Node (Next.js) quanto no Deno (Edge Functions): manter `lib/score`, `lib/cerco`, `lib/estagios` sem dependências de runtime.
