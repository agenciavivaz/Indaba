# MissionRow

Uma missão na fila de Missões do dia: canal, o que fazer, o motivo numa linha, conta, pessoa e prazo.

**O que você fornece:** `id`, `channel` (`email`, `linkedin`, `whatsapp`, `telefone`, `dossie`, `comite`, `formulario` ou `interagir`), `step` (código da cadência, como `E2` ou `D3`), `title`, `reason` (uma linha, com o fato que justifica a missão), `account`, `person` (nome e cargo), `due`, `state` (`aberta`, `fechando`, `concluida` ou `pulada`), `fresh` (motivo é um sinal recente), `selected`, `tabIndex`, `onOpen` e `onFocus`.

- A linha inteira é um botão. A fila usa tabindex móvel: só a linha selecionada tem `tabIndex=0`, e J/K ou as setas movem a seleção.
- O nome da conta usa Bricolage (estilo `account`). Conta e pessoa ficam em linhas próprias, sem "·".
- Atrasada é "janela fechando", em `risco` com relógio. Não existe contador de sequência nem punição por folga.
- Concluída e pulada ficam na fila até o fim do dia, apagadas, para o BDR ver o que fez sem pontuação.
- Abaixo de 640px, conta e pessoa descem para uma segunda linha.
