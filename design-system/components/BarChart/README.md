# BarChart

Barras horizontais para comparar categorias no Modo Relatório: pontos por origem, contas por temperatura, missões por canal.

**O que você fornece:** `data` (`{ label, value, note, highlight }`), `title`, `unit`, `max`, `digits`, `threshold` e `thresholdLabel`.

- As barras são `ink-muted`, e `highlight` passa a `ink`. Não pinte categoria com cor de significado (brasa, âmbar, visão) só para enfeitar.
- O valor fica escrito ao lado de cada barra, com algarismos tabulares.
- O limite de 80% por origem aparece como linha `risco`, e a barra que passa ganha ícone de alerta e valor em `risco`.
- Em "Execução", por BDR, use barras por pessoa sem ordenar como ranking (ordem alfabética).
