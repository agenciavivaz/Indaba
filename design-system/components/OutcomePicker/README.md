# OutcomePicker

A lista curta de resultados por canal (tabela 9.4 do PRD), com o efeito de cada um escrito embaixo. É a peça que transforma ação em sinal.

**O que você fornece:** `channel` (`email`, `linkedin`, `linkedin_connect`, `whatsapp`, `telefone` ou `interagir`), `value` e `onChange` (ou `defaultValue`), `onUndo`, `onSkip`, e `options` para trocar a lista.

- Dois cliques no máximo: R abre o painel no resultado e um clique (ou a tecla 1 a 6) registra. A confirmação é a linha "Registrado" com "Desfazer", não um diálogo.
- Cada opção diz o que acontece ("Sinal +30 e conta vai para Conversa"). Missão concluída não gera ponto por si; só a reação do outro lado gera.
- Positivo leva "+" em `mata`; bounce, remoção e canal inválido levam "×" em `risco`. As cores só reforçam o sinal escrito.
- "Pular com motivo" fica abaixo, discreto e sempre disponível.
