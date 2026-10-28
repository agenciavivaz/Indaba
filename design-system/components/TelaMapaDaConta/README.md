# Tela: Mapa da conta

A tela mais importante do produto. O trabalho dela é mostrar a conta inteira de uma vez e decidir a próxima jogada.

- O cabeçalho traz o nome da conta em Bricolage, tier, estágio, trilha e domínio em elementos separados, os cinco objetivos e o HUD (temperatura com número e % de cerco, em JetBrains Mono). Os dois números abrem o porquê.
- Abaixo, o mapa ocupa cerca de 2/3 e o `NextMoveRail` cerca de 1/3. O mapa alterna com a tabela do comitê pelo `ViewToggle`.
- As abas ficam embaixo: Sinais, Dossiê e assets, Replay, Negócio.
- Teste de usabilidade (PRD 14.7): mostrada sem explicação, a tela precisa responder "qual é a situação dessa conta e o que você faria agora?" em 30 segundos.
