# LineChart

Linha para tendência no tempo, com o período anterior como comparação.

**O que você fornece:** `labels` (datas curtas, `dd/mm`), `series` (`{ name, values, tone }`, a primeira em `ink` e a de comparação em `line-strong`), `title`, `height` e `max`.

- No máximo duas séries: o período e a comparação. Para mais, use pequenos múltiplos.
- O último valor fica escrito na ponta da linha, e a legenda só aparece com duas séries.
- O gráfico tem rótulo acessível com todos os valores.
