# WhyPopover

O "por quê" de qualquer número: score, cerco, temperatura, taxa do relatório. Abre ao clicar ou tocar no número, ou com Enter no foco, e fecha com Esc ou ao clicar fora.

**O que você fornece:** `title`, `items` (`{ label, detail, value, inactive }`; números viram "+30" sozinhos), `total` e `totalLabel`, `summary`, `note` (a regra em uma frase), `children` (o gatilho; padrão é um ícone de informação), `triggerLabel`, `align` (`end` para abrir à esquerda), `placement` (`top`) e `defaultOpen` ou `open`.

- Toda tela de decisão usa o porquê. Número sem porquê não entra no Mapa nem no Relatório.
- Itens inativos (expirados) aparecem riscados: explicam por que o número caiu.
- O porquê descreve a regra, não opina. A IA pode explicar, mas não calcula.
