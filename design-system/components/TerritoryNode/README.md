# TerritoryNode

Uma conta no Território. O nó junta quatro informações sem texto extra: o tamanho dá o tier, o anel dá o cerco, o miolo dá a temperatura e o cadeado mostra gate pendente.

**O que você fornece:** `name`, `tier` (1, 2 ou 3), `score` ou `temperature`, `siege` (0 a 100), `locked`, `pulse` (sinal nas últimas 24h, toca uma vez ao abrir a tela), `selected`, `onClick`, `presentation` com `alias`, e `showLabel`.

| Canal | Codificação |
|---|---|
| Tier | Diâmetro `node-t1` 56, `node-t2` 40, `node-t3` 28 |
| Cerco | Anel `ink` sobre trilho `relevo`, de 0 a 360° |
| Temperatura | Miolo vazado (Fria), tint com contorno brasa (Engajada), brasa cheia (Quente) |
| Gate pendente | Selo de cadeado `gate` |

- O rótulo acessível descreve tudo em palavras: nome, tier, temperatura com o número, cerco, gate e sinal recente.
- Nada pisca em loop. O pulso de 24h toca uma vez ao abrir o território.
