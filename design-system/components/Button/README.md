# Button

Botão de ação. Variantes: `primary` (uma por área, em `ink`), `secondary`, `ghost`, `ai` (só para ações que chamam um agente) e `danger`.

**O que você fornece:** `children` (verbo em caixa de frase), `variant`, `size` (`sm`, `md` ou `lg`, com `lg` como alvo de toque no mobile), `icon`, `iconRight`, `kbd` (atalho mostrado no botão e escondido em telas de toque), `block`, `loading`, `href` e as props nativas de botão.

- O primário é `ink`. A brasa nunca vira botão: ela significa calor, e usá-la em ação genérica apaga o sinal.
- Botão desabilitado sempre vem com o motivo por perto (por exemplo, o `GateChecklist`).
- Botão só de ícone precisa de `aria-label`.
