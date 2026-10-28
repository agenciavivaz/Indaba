# SiegeRing

O % de cerco da conta: um anel em quatro arcos, um para cada componente (Cobertura, Alcance, Visão e Engajamento, 25% cada). O número no centro é a média dos quatro.

**O que você fornece:** `parts` (`{ cobertura, alcance, visao, engajamento }`, cada um de 0 a 1, já calculados em `lib/cerco`), `details` (uma frase por componente para o porquê), `size` (72 no cabeçalho, 48 em listas, 32 em linhas densas), `label` (`false` para esconder) e `whyOpen`.

- Cada arco se enche pelo seu componente, então dá para ver de longe se o cerco é "comitê mapeado mas sem alcance" ou "muita visão e pouco engajamento".
- O anel é `ink` sobre trilho `relevo`. Ele não usa a brasa, porque cerco não é calor.
- O número usa `hud` (JetBrains Mono) só quando o anel tem 64px ou mais.
- O porquê é obrigatório: um clique ou foco abre o `WhyPopover` com os quatro componentes e o lembrete de que nenhum cresce por volume de missões.
