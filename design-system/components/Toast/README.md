# Toast

Aviso curto no canto, depois de uma ação. Some sozinho em 6 segundos, menos o de risco, que espera ser fechado.

**O que você fornece:** `tone` (`neutral`, `positive`, `risk` ou `ai`), `title`, `body`, `action` (`{ label, onClick, kbd }`, normalmente "Desfazer") e `onDismiss`.

- O toast confirma, não comemora. "Resultado registrado", nunca "Mandou bem".
- O de risco usa `role="alert"`; os outros usam `role="status"`.
- O tom `ai` avisa que um agente terminou. O conteúdo continua sendo rascunho até alguém aprovar.
