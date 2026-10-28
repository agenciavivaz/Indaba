# NextMoveRail

O trilho à direita do Mapa da conta. Ele responde "qual é a próxima jogada?" com uma única recomendação, os motivos e a ação.

**O que você fornece:** `move` (`{ title, why, action, gate }`, vindo das regras de 9.5, nunca da IA), `missions` (as missões abertas da conta: `{ channel, title, due }`), `signals` (os últimos sinais, nas props do `SignalItem`) e `children` para blocos extras.

- Uma recomendação só. Se as regras devolverem duas, mostre a de maior prioridade e deixe a outra nas missões.
- Os motivos ficam entre um e três, cada um citando um fato real (score, sinal, estágio). "Por quê" vem antes do botão.
- Quando a jogada depende de gate, o `GateChecklist` entra no lugar do botão solto, e o botão só libera com o checklist completo.
- Largura `rail` (360px), cerca de 1/3 do Mapa da conta. No mobile, o trilho sobe para logo abaixo do cabeçalho.
