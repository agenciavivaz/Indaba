# ADR-005: IA sem loop autônomo

**Status:** Aceito
**Data:** 28/10/2026
**Decisores:** Diego Rodrigues (Vivaz)
**Fonte:** PRD-indaba-mvp.md, seções 11 e 13

## Contexto

O produto usa IA para dossiê, classificação de comitê, rascunho de mensagem e leitura do período. Score, estágio e prioridade precisam ser explicáveis e determinísticos (regra 5.4). Custo de IA precisa ser medido por workspace.

## Opções consideradas

### Opção A: Chamadas estruturadas (entrada montada pelo código, saída JSON validada)

**Prós:** previsível, barato, testável; saída validada com zod.
**Contras:** menos flexível para pesquisa aberta.

### Opção B: Agentes autônomos com ferramentas

**Prós:** flexível.
**Contras:** custo e comportamento imprevisíveis; difícil de auditar.

## Decisão

**Opção A.** Cada agente é uma chamada (ou poucas) com entrada montada pelo código e saída JSON validada. Nada de agente que decide sozinho quantas ferramentas chamar, **exceto o agente de dossiê, com teto de passos e de custo.** Score, estágio e prioridade são regras, não IA.

## Consequências

- Modelos lidos de `AI_MODEL_FAST` e `AI_MODEL_SMART`; nunca fixos no código.
- Toda chamada grava `ai_run` (agente, modelo, tokens, custo, status); teto mensal por workspace no ADM.
- Todo conteúdo de IA é rascunho até um humano aprovar e aparece com a cor `jacaranda`.
