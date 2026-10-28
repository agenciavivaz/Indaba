# StatTile

Um número do Modo Relatório com rótulo, comparação com o período anterior e, quando é calculado, o porquê.

**O que você fornece:** `label`, `value` (já formatado em pt-BR), `unit`, `delta` (`{ value, direction: 'up' | 'down', good: true | false | null, label }`), `footnote` e `why` (as props do `WhyPopover`).

- O número usa o estilo `metric` (Instrument Sans com algarismos tabulares). JetBrains Mono fica só no HUD do Modo Mapa.
- A cor da variação diz se é bom ou ruim (`mata`, `risco` ou neutro), não se subiu. A seta diz a direção.
- Separe tiles de execução (missões, prazo) de tiles de resultado (respostas, braços erguidos), para o gestor ver se o problema é a operação ou a oferta.
- Não empilhe tiles idênticos sem hierarquia: no máximo seis por linha, agrupados por pergunta.
