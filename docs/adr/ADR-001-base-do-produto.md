# ADR-001: Base do produto — construir sobre CRM open source ou do zero?

**Status:** Proposto
**Data:** 28/10/2026
**Decisores:** Diego Rodrigues (Vivaz)
**Fonte:** PRD-indaba-mvp.md, seção 11

## Contexto

A diferenciação do produto está na UX (mapa da conta, missões do dia). O MVP precisa de pouco "CRM genérico": empresas, pessoas, tarefas, notas e import CSV. A stack desejada é Next.js + Supabase + Vercel. O produto será vendido a terceiros, então a licença da base importa.

## Opções consideradas

### Opção A: Do zero (Next.js + Supabase)

| Dimensão | Avaliação |
|---|---|
| Complexidade | Média |
| Licença para produto comercial | Própria |
| Aderência à stack | Total |
| Liberdade de UX | Total |

**Prós:** UX do mapa sem amarras; uma stack só.
**Contras:** telas de CRUD feitas à mão.

### Opção B: Fork do Atomic CRM (React + shadcn/ui + Supabase, react-admin, Vite)

| Dimensão | Avaliação |
|---|---|
| Complexidade | Baixa no início, média depois |
| Licença para produto comercial | MIT: pode usar e modificar |
| Aderência à stack | Supabase sim; Vite SPA em vez de Next.js |
| Liberdade de UX | Limitada pelo react-admin, pensado para telas de admin |

**Prós:** CRUD pronto, padrões de RLS e migrations reaproveitáveis.
**Contras:** SPA em Vite; react-admin atrapalha o Modo Mapa.

### Opção C: Twenty

| Dimensão | Avaliação |
|---|---|
| Complexidade | Alta (stack própria, Postgres + Redis + workers) |
| Licença para produto comercial | AGPL-3.0: abrir o código ou comprar licença |
| Aderência à stack | Não usa Supabase |
| Liberdade de UX | Média |

**Prós:** CRM completo e moderno.
**Contras:** licença e stack incompatíveis com o produto.

### Opção D: Odoo Community

| Dimensão | Avaliação |
|---|---|
| Complexidade | Alta (Python/OWL) |
| Licença para produto comercial | Open source; a Sétima já usa |
| Aderência à stack | Nenhuma |
| Liberdade de UX | Baixa: refazer a UX dentro do Odoo é brigar com o framework |

**Prós:** a operação de referência já roda nele.
**Contras:** a UX do mapa é justamente o que o Odoo não entrega.

## Análise de trade-offs

O valor está no Modo Mapa, que nenhuma base de CRM entrega. As opções C e D trazem custo de stack e licença sem ajudar na diferenciação. A opção B economiza CRUD, mas o react-admin e o Vite conflitam com o App Router e com a liberdade de UX. Aproveitar o código commodity do Atomic CRM (MIT) sem adotar o framework captura a maior parte do ganho.

## Decisão

**A, usando o Atomic CRM como doador de código e referência (B parcial).** Construir o app em Next.js do zero e copiar do Atomic CRM, com atribuição (MIT), o que for commodity: migrations de empresas/contatos/tarefas/notas, import CSV, padrões de RLS. Não adotar o react-admin.

## Consequências

- **Mais fácil:** UX do mapa sem amarras; uma stack só.
- **Mais difícil:** telas de CRUD feitas à mão (mitigado por shadcn/ui).
- **Revisitar:** se em 6 meses o produto precisar de CRM completo (negócios, propostas), reavaliar o Atomic CRM como módulo, não o Twenty (licença).

## Itens de ação

1. [ ] Ao copiar código do Atomic CRM, manter o aviso de licença MIT e registrar a origem em `docs/decisoes.md`.
2. [ ] Diego confirma a decisão (status "Proposto" → "Aceito").
