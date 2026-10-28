# ErrorBanner

Banner de erro ou aviso com a ação que resolve. Erro sempre diz o que aconteceu, o que já deu certo e o que fazer.

**O que você fornece:** `title`, `body`, `action` (`{ label, onClick | href }`), `onDismiss` e `tone` (`risk`, o padrão, ou `info`).

- O tom `risk` usa `risco-soft` com ícone de alerta e `role="alert"`. O tom `info` usa `visao-soft` para avisos que não são falha.
- Escreva como no exemplo: "Não achamos 3 empresas do relatório. Revise os nomes", e não "Erro 422".
- Um banner por região. Se houver vários erros, agrupe.
