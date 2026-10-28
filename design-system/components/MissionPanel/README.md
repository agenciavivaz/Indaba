# MissionPanel

O painel que abre sobre o Mapa da conta quando o BDR escolhe uma missão. De cima para baixo: o que é, por que agora, a instrução, o rascunho da IA, o atalho do canal e o resultado obrigatório.

**O que você fornece:** `mission` (`{ title, channel, step, due, closing, person: { name, title }, account: { name, tier }, why, instruction, draft, shortcut, outcomeChannel }`), `outcome` e `onOutcome`, `onUndo`, `onSkip`, `onClose` e `footer`.

- "Por que agora" traz de 1 a 3 motivos com fatos (sinal, estágio, passo). Se não houver motivo, a missão não deveria existir.
- A instrução é o texto do modelo de cadência, escrito pela Vivaz por trilha e papel. O rascunho é da IA e vem marcado como tal.
- O resultado é obrigatório para concluir. Registrar leva um clique (ou uma tecla de 1 a 6), e pular exige motivo.
- Ao registrar, a próxima missão da fila abre sozinha. O painel não comemora.
- Largura `panel` (480px), com `shadow-lg` quando flutua sobre o mapa. `Esc` fecha.
