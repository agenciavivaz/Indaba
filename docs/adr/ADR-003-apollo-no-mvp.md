# ADR-003: Apollo no MVP

**Status:** Aceito
**Data:** 28/10/2026
**Decisores:** Diego Rodrigues (Vivaz)
**Fonte:** PRD-indaba-mvp.md, seções 2 (D5) e 11

## Contexto

Hoje o comitê é inserido via Claude Code integrando o Apollo. O MVP traz o Apollo por API para empresa, comitê e sinais de timing. Os créditos custam dinheiro, os limites variam por plano e a qualidade de dados para o Brasil é baixa (no export de set/2026, 55 de 572 contatos eram do Brasil).

## Opções consideradas

### Opção A: Apollo por API, servidor-only, com controle de créditos

**Prós:** comitê e enriquecimento dentro do fluxo; custo visível.
**Contras:** gestão de chave, rate limit e créditos.

### Opção B: Import CSV de exports do Apollo

**Prós:** sem integração.
**Contras:** trabalho manual; sem busca por papel-alvo; sem timing.

## Decisão

Opção A:

- Chamadas só no servidor (Edge Function), com **chave por workspace no Supabase Vault**.
- Busca de pessoas pelo endpoint **People API Search**, que não consome crédito (exige chave master).
- Enriquecimento (e-mail, telefone), busca de empresas, vagas e notícias consomem crédito; telefone custa bem mais que e-mail.
- **Toda chamada que gasta crédito:** estimativa antes, confirmação do usuário em lote, registro em `apollo_credit_ledger`, teto mensal por workspace.
- Rate limit: ler o endpoint de uso/limites no início de cada job e respeitar a janela por minuto/hora/dia com fila (pgmq) e backoff.
- Qualidade para o Brasil: filtrar por país no servidor e mostrar o descarte.

## Consequências

- **Mais fácil:** comitê sugerido em minutos, com custo previsível.
- **Mais difícil:** Vault + Edge Functions + ledger desde o M1.
- **Risco:** se a chave não for master, a busca de pessoas consome crédito e o fluxo precisa de confirmação também na busca.

## Itens de ação

1. [ ] **Parada obrigatória no M1:** perguntar ao Diego o plano do Apollo e se a chave é master (PRD 18.2).
