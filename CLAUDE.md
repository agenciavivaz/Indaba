# CLAUDE.md

Guia para o Claude Code trabalhar neste repositório. A fonte da verdade do produto é `PRD-indaba-mvp.md` (raiz). A fonte da verdade visual é `design-system/` (README, `implementacao.md`, `tokens.json`, previews em `components/`). Se este arquivo divergir do PRD, vale o PRD; registre a divergência em `docs/decisoes.md`.

## Produto em uma frase

Plataforma de ABM para vendas B2B complexas (3+ pessoas decidindo). Mostra a conta-alvo como um mapa: quem decide, quem já viu a marca e qual é a próxima jogada, para o BDR chegar no decisor sem spam. **SaaS por baixo, jogo por cima.**

- **Modo Mapa** (BDR, tema escuro "Carta"): Missões do dia, Território, Mapa da conta.
- **Modo Relatório** (gestor/board, tema claro "Papel"): Relatório, Programa, ADM.
- Hierarquia: Cliente → Workspace → Programa (Território) → Contas → Comitê (contatos).
- Papéis: `admin_vivaz` (tudo, todos os clientes, ADM), `gestor` (tudo no workspace), `bdr` (contas atribuídas), `viewer` (só relatório).
- Camada sobre o CRM: opera da prospecção até a reunião realizada e devolve ao CRM por webhook (Make).
- Piloto: Sétima e Brandspot (design partners). Referência funcional: operação ABM da Sétima no Odoo (PRD seção 1).

Dicionário (metodologia → jogo): programa = Território; conta = Partida; comitê = peças em três rotas (Decisão, Influência, Operação); papel sem pessoa = Névoa; exposição a anúncios = Visão (**da conta, nunca da pessoa**); atividade da cadência = Missão; marcos = Objetivos; histórico = Replay; progresso = % de cerco.

## Stack

- Next.js (App Router) + TypeScript + React Server Components, deploy na Vercel via GitHub.
- Tailwind (v4, `@theme inline`) + shadcn/ui, com os tokens do design system em variáveis CSS.
- Supabase: Postgres + RLS, Auth (magic link), Storage, Vault, pg_cron, pgmq, Edge Functions.
- Claude API (SDK oficial). Modelos **sempre** de `AI_MODEL_FAST` e `AI_MODEL_SMART`; nunca fixe ID de modelo no código.
- Apollo API, chamada **só no servidor** (Edge Function / route handler), chave por workspace no Vault.
- zod em toda borda (API, upload, IA, webhook).
- Testes: Vitest (regras puras), Playwright (fluxos), testes SQL (pgTAP) para RLS.

## Estrutura

```
/app            Next.js: (mapa)/, (relatorio)/, (adm)/, api/, r/[token]/, login/
/components     ui/ (shadcn), mapa/, missoes/, relatorio/
/lib            score/, cerco/, estagios/, linkedin-upload/, apollo/, ia/, supabase/, env.ts
/supabase       config.toml, migrations/, functions/, seed.sql, tests/ (pgTAP)
/tests          e2e/ (Playwright)
/docs           adr/, decisoes.md, backlog.md, setup-make.md
/design-system  export do Claude Design (referência; não importar em runtime)
/samples        ads/ com exports reais do LinkedIn (fora do git se houver dado pessoal)
```

## Comandos

> Preenchidos no M0 conforme forem criados. Manter esta lista atualizada.

```bash
npm install                 # dependências
npm run dev                 # Next.js local (http://localhost:3000)
npm run lint                # ESLint
npm run typecheck           # tsc --noEmit
npm test                    # Vitest (lib/ e regras puras)
npm run test:e2e            # Playwright
npx supabase start          # stack local (Docker)
npx supabase db reset       # recria o banco local: migrations + seed.sql
npx supabase test db        # testes SQL/pgTAP (RLS)
npx supabase migration new <nome>
npx supabase gen types typescript --local > lib/supabase/database.types.ts
```

## Convenções

- **Banco em inglês, interface em português do Brasil.** Tabelas no singular (`account`, `contact`, `signal`). IDs `uuid`, datas `timestamptz`. Toda tabela de negócio tem `workspace_id` e RLS.
- **Migrations versionadas** em `supabase/migrations/`. Desenvolver no local com a CLI. **Nunca aplicar migration em staging/produção sem pedir ao Diego.**
- **Regras de negócio em funções puras com teste** em `lib/score`, `lib/cerco`, `lib/estagios`, `lib/linkedin-upload`. Nenhuma regra mora em componente; componentes recebem valores prontos.
- **Cada marco começa pelos testes das regras dele.**
- **Seeds só com dados fictícios** (domínios `.example`). Dados reais da Sétima entram só pelo importador do Odoo (M3), primeiro em staging.
- **Front-end:** usar tokens e componentes do design system. Não inventar cor, fonte nem espaçamento. Faltou componente: criar no padrão do sistema e anotar em `docs/decisoes.md`. Ler `design-system/README.md` e `design-system/implementacao.md` antes de qualquer tela.
- Tipografia: Bricolage Grotesque (títulos, nomes de conta), Instrument Sans (interface, `tabular-nums` em números), JetBrains Mono **só** no HUD (score, % de cerco).
- Cor tem um significado só: `brasa` = calor (nunca botão/link), `ambar` = objetivo/gate, `visao` = visão/foco, `mata` = positivo, `risco` = risco, `jacaranda` = IA. Botão primário é `ink`. Estado nunca só por cor (forma + rótulo).
- Voz: "você", frases curtas, sem emoji, sem exclamação. Nunca chamar conta de "lead" nem missão de "tarefa".
- **Nada de nome fixo no código:** usar `NEXT_PUBLIC_APP_NAME` e `NEXT_PUBLIC_METHOD_NAME` (interface, e-mails, prompts).
- Ambiguidade sem impacto em dados ou segurança: escolher o mais simples, registrar em `docs/decisoes.md` e seguir. Com impacto: perguntar.
- Escopo novo vai para `docs/backlog.md`, não para o código.
- Commits pequenos e descritivos; **um PR por marco**, com prints das telas e o checklist "pronto quando" preenchido. Não avançar de marco sem aprovação.

## Variáveis de ambiente

`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_METHOD_NAME`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`, `AI_MODEL_FAST`, `AI_MODEL_SMART`, `LINK_DOMAIN`, `WEBHOOK_SIGNING_SECRET`, `POSTHOG_KEY`. A chave do Apollo **não** vai em env: fica no Supabase Vault, por workspace.

## Regras que não podem quebrar

1. **O produto nunca envia e-mail, mensagem ou convite.** Missões geram tarefas com atalhos de canal (`mailto:`, perfil do LinkedIn, `wa.me`, `tel:`) e o BDR envia. (Único e-mail permitido: o magic link de autenticação do Supabase Auth.)
2. **Nenhum indicador lê contagem de missões concluídas.** Score, % de cerco, objetivos e temperatura só leem estado da conta e sinais de terceiros. Missão concluída não gera ponto; só a reação do outro lado gera.
3. **Sem ranking entre pessoas, XP, badges, streaks ou confete.** Progresso é por conta e por programa. Missão atrasada é "janela fechando", não sequência perdida.
4. **Score é determinístico:** soma dos pontos de sinais ativos nos últimos 30 dias (expiração configurável por programa). A IA nunca calcula score, estágio ou prioridade; só gera rascunhos e explicações.
5. **Todo conteúdo gerado por IA é rascunho até um humano aprovar**, visualmente marcado com `jacaranda`. **Toda chamada de IA grava em `ai_run`** (agente, modelo, tokens, custo, status).
6. **A visão de anúncios é da conta, nunca da pessoa.** Sinal do relatório do LinkedIn não tem `contact_id`. Não existe barra de visão por pessoa.
7. **Chave do Apollo no Supabase Vault, por workspace**, nunca devolvida ao cliente. Chamada que gasta crédito mostra a estimativa, pede confirmação e grava o gasto em `apollo_credit_ledger`; respeita o teto mensal.
8. **RLS em toda tabela de negócio**, com teste automatizado provando que um workspace não lê (nem escreve em) outro.
9. **Opt-out** bloqueia novas missões para a pessoa, cancela as abertas e tira a pessoa do export de público.
10. **Nada de nome fixo no código:** `NEXT_PUBLIC_APP_NAME` e `NEXT_PUBLIC_METHOD_NAME`.

### Regras anti-armadilha do jogo (PRD 5.4, obrigatórias)

1. **Lei de Goodhart:** nada no jogo cresce por volume de atividade. % de cerco, objetivos e temperatura só se movem por estado da conta (cobertura, alcance, visão, sinais de terceiros).
2. **Sem leaderboard entre pessoas.** Progresso é por conta e por programa. A visão "Execução por BDR" no relatório é só para o gestor e nunca ordenada como ranking.
3. **Sem streaks, sem punição por folga.** Missão atrasada aparece como "janela fechando".
4. **Sem recompensa extrínseca** (badges, troféus, prêmios). A recompensa é ver o território avançar.
5. **Transparência total do cálculo:** todo número (score, cerco, temperatura, taxas) tem "por quê" (`WhyPopover`) com os sinais, datas e pesos.

## Pontos de parada obrigatórios

- **Fim de cada marco:** deploy de preview, prints, checklist "pronto quando"; esperar aprovação.
- **M1:** antes de integrar o Apollo, perguntar o plano e se a chave é master (PRD 18.2).
- **M2:** se `samples/ads/` estiver vazia, parar e pedir os exports reais do LinkedIn. Antes de fechar os pesos, perguntar os limiares do sinal do relatório (PRD 18.1).
- **M3:** importador do Odoo roda primeiro em staging. Só fecha com score do Indaba = score do Odoo, conta por conta, mostrando a comparação.
- **M5:** antes do piloto, preparar o Mapa da conta para o teste de usabilidade da seção 14.7.

## Skills instaladas

- `.claude/skills/frontend-design` (UI/UX; usar junto com o design system, que prevalece).
- `.claude/skills/supabase` e `.claude/skills/supabase-postgres-best-practices` (via `.agents/skills`, lock em `skills-lock.json`).
