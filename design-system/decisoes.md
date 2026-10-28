# Decisões de tokens

Este sistema evolui o design system do Indaba de outubro de 2026. O PRD do MVP (seção 14) é a fonte da verdade. Abaixo estão os conflitos entre os dois sistemas, como foram resolvidos e a revisão contra os clichês da seção 14.5.

## O que mudou

| Antes (out/2026) | Agora | Por quê |
|---|---|---|
| Neutros quentes: `surface` `#f6f4ef` e `#13120f` | Carta `#0E1A22` (escuro) e Papel `#F5F7F6` (claro), com os mesmos nomes `surface*` | A seção 14 pede ardósia frio, não preto, e branco frio, não creme. Os nomes ficam iguais para não quebrar código. |
| `line` | `relevo` | O divisor e a curva de nível são a mesma linha. |
| `ardosia`: frio, links e foco | `visao`: exposição da conta, foco e informação fria | Os hex quase coincidiam no escuro (`#8db6dc` e `#8FB3D9`). Links passam a `ink` sublinhado para o azul ter um significado só. |
| `brasa` escuro `#f08850` | `#F05A28` | Mais vermelha e saturada, longe do terracota das interfaces de IA. No claro vira `#B8370F` para passar 4,5:1 como texto. |
| `ambar`: morno, timing, Aquecendo | `ambar`: só objetivos e gates | Um significado por cor. Timing vira sinal comum (pontos em brasa). |
| Score Fit + Engajamento + Timing; Quente ≥ 70, Morna 40–69 | Score = soma dos sinais ativos em 30 dias; Fria < 30, Engajada 30–59, Quente ≥ 60 | É a regra do PRD (seção 9) e da operação no Odoo. O `ScoreMeter` sai e o `TemperatureMeter` entra. |
| Estágio com cor de calor (Engajada e Conversa em brasa) | Estágio neutro, com fase em pips | O calor fica só na temperatura. |
| Estágios Oportunidade, Ganha, Perdida, Nutrir | Alvo, Aquecendo, Engajada, Em cadência, Conversa, Reunião agendada, Reunião realizada, Nutrição, Descartada | São os nomes que a SDR já usa no Odoo. |
| `overline` em caixa-alta; caption "Apollo · 14/10/2026" | Removido; metadados separados por vírgula ou em linha própria | Proibido pelo briefing. |
| JetBrains Mono em `data` (tabelas, pesos, %) | Mono só em `hud` e `hud-lg` | Tabelas usam Instrument Sans tabular (`number`). |
| T3 tracejado | T3 só texto | Tracejado agora significa névoa ou "ainda não é real". |
| `TaskCard`, `CoverageMatrix`, "tarefa", "Fila do dia" | `MissionRow` e `MissionPanel`, `AccountMap` e `CommitteeTable`, "missão", "Missões do dia" | Vocabulário do jogo do PRD. |
| Capa com a roda do comitê | Capa com curvas de nível e três rotas | O elemento memorável agora é o mapa. |
| Sem tokens de movimento | `duration` (4) e `easing` (2) | O briefing pede movimento só em resposta a ação, com uma transição. |
| `jacaranda`, `mata`, `risco` | Iguais | Mantidos; ganharam `on-risco` e notas de uso. |

## Contraste (WCAG AA)

Todos os pares de texto passam 4,5:1 nos dois temas. Os mais apertados:

| Par | Carta (escuro) | Papel (claro) |
|---|---|---|
| `brasa` sobre `surface-raised` | 4,68 | 5,85 |
| `brasa` sobre `brasa-soft` | 4,63 | 4,87 |
| `ink-muted` sobre `surface-raised` | 6,98 | 6,94 |
| `on-brasa` sobre `brasa` | 5,21 | 5,85 |
| `line-strong` sobre `surface-sunken` (borda, 3:1) | 4,70 | 3,33 |
| `visao` como anel de foco sobre `surface-raised` | 7,27 | 6,87 |

`relevo` fica entre 1,3:1 e 1,5:1 de propósito: é textura e divisor, nunca a única pista de um estado.

Ponto de atenção: `mata` e `risco` têm praticamente a mesma luminosidade (1,05:1) e `risco` é vizinho de matiz da `brasa`. A regra é que resultado e risco sempre levam ícone e palavra. Se for preciso um tema seguro para daltonismo, ele entra como **tema adicional**, sem trocar as cores da marca.

## Revisão contra o genérico (PRD 14.5)

| Risco | Como o sistema evita |
|---|---|
| Fundo quase preto com um acento vibrante | A Carta é azul-ardósia, com textura de relevo no mapa e cinco cores de papel estrito (visão, calor, objetivo, positivo, risco), mais o roxo da IA. Nenhuma cor é "acento". |
| Laranja-terracota de interface de IA | A brasa `#F05A28` é mais vermelha e aparece só em calor. O botão primário é `ink`. |
| Mono em todo rótulo, eyebrow em caixa-alta, metadados com "·" | Mono só no HUD, rótulos em caixa de frase, metadados em linhas próprias. O `overline` foi removido. |
| Cara de joguinho | Sem mascote, badge, confete ou ilustração. A recompensa é a névoa se dissolvendo em 320ms. O Modo Relatório é sóbrio, no nível de Linear e Vercel. |
| Cards idênticos empilhados | StatTiles agrupados por pergunta (Resultado, Execução); o restante é lista, tabela e mapa. |
