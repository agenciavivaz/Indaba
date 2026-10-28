# ADR-002: Dados do LinkedIn Ads

**Status:** Aceito para o MVP
**Data:** 28/10/2026
**Decisores:** Diego Rodrigues (Vivaz)
**Fonte:** PRD-indaba-mvp.md, seções 11 e 12

## Contexto

A "visão" da conta (exposição aos anúncios) é o principal motor de sinais da operação atual: 99% dos sinais da Sétima vêm de LinkedIn Ads. O produto precisa desses dados por empresa, mas o acesso às APIs do LinkedIn é restrito.

## Opções consideradas

### Opção A: Upload do export do Campaign Manager (aba Companies)

**Prós:** disponível hoje, sem aprovação; já é o que a operação faz.
**Contras:** agrega a conta de anúncios inteira (não separa por campanha); formato pode mudar; depende de rotina manual (~1x por semana).

### Opção B: Advertising API (`adAnalytics` com pivot `MEMBER_COMPANY`)

**Prós:** automático e por campanha.
**Contras:** exige revisão manual do LinkedIn (semanas a meses); valores aproximados e pode incluir empresas não segmentadas.

### Opção C: Company Intelligence API

**Prós:** orgânico + pago + score por empresa.
**Contras:** privada, sem novos pedidos aceitos (out/2026).

## Decisão

- **MVP:** upload do export da aba **Companies** do Campaign Manager (impressões, cliques, engajamentos, leads e nível de engajamento por empresa) e, quando útil, do relatório demográfico por empresa.
- **V2:** Advertising API com `adAnalytics` e pivot `MEMBER_COMPANY`. **Pedir acesso em paralelo ao MVP.**
- **Fora:** Company Intelligence API.
- **Públicos:** export CSV para upload manual; Matched Audiences API só depois da Advertising API.

## Consequências

- **Mais fácil:** começar sem dependência externa; mesma fonte da operação atual (paridade no M3).
- **Mais difícil:** casamento de nomes de empresa (aliases + fila de revisão); mapeamento de colunas salvo e editável por workspace para resistir a mudanças de formato.
- **Regra de produto:** o sinal do relatório é **da conta** (sem `contact_id`). Não existe visão por pessoa.
- **Revisitar:** quando a Advertising API for aprovada.

## Itens de ação

1. [ ] Diego pede acesso à Advertising API (caso de uso: reporting de ABM, somente leitura) pela página da Vivaz (PRD 12.3).
2. [ ] Diego coloca exports reais em `samples/ads/` antes do M2.
