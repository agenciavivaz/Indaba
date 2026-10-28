# SignalItem

Um sinal: o que aconteceu, com quem, de onde veio, quando e quantos pontos somou.

**O que você fornece:** `title`, `person`, `account`, `origin` (`LinkedIn Ads`, `Missão`, `Manual`, `Apollo`, `Link pessoal`, `Formulário` ou `Calculado`), `when`, `points`, `fresh`, `expired` e `compact`.

- Os pontos ativos aparecem em `brasa`, porque pontos são calor. Zero fica neutro, e expirado fica riscado com "Expirou".
- Origem e data ficam na mesma linha, separadas por vírgula, e quem fica numa linha própria. Nada de "·".
- `fresh` ganha o `SignalPulse` no ícone e toca uma vez.
- Sinal de conta (relatório do LinkedIn, Apollo) não tem pessoa: deixe `person` vazio. Não atribua sinal de conta a ninguém.
