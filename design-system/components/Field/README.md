# Field

Campo de texto com rótulo, ajuda, erro e contador de caracteres.

**O que você fornece:** `label`, `hint`, `error`, `multiline`, `counter` (300 no convite do LinkedIn, 700 no WhatsApp, 1.200 no e-mail), `required` e as props nativas de input ou textarea.

- O rótulo fica sempre visível, acima do campo. Placeholder é exemplo, não rótulo.
- O erro diz o que fazer e traz um exemplo. A borda vira `risco` e o texto ganha ícone.
- O contador mostra "123 de 300" e fica em `risco` quando passa do limite.
