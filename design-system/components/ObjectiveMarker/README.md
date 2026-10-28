# ObjectiveMarker

Um dos cinco marcos binários da conta: Comitê mapeado, Visão estabelecida, Decisor alcançado, Braço erguido e Reunião.

**O que você fornece:** `state` (`conquistado`, `pendente` ou `perdido`), `label`, `date` (para conquistado e perdido), `caption` para trocar a segunda linha, `compact` para a faixa do cabeçalho e `justAchieved` para tocar a transição uma vez.

- O losango é `objetivo` (âmbar): cheio com check quando conquistado, vazado quando pendente. Perdido usa contorno neutro, um traço em `risco` e o rótulo riscado.
- Objetivo perdido aparece. Quando o estado regride, o marcador mostra quando isso aconteceu, e o replay registra.
- `justAchieved` toca uma vez um fundo `ambar-soft` que some em `dur-reveal`. Nada de confete, brilho ou som.
- No modo compacto, a segunda linha vai para leitores de tela.
