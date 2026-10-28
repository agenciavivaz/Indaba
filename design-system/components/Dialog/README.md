# Dialog

Diálogo modal para decisões que custam algo ou não têm volta: gastar créditos, descartar conta, reverter upload.

**O que você fornece:** `open`, `title` (uma pergunta), `description` (o custo ou a consequência), `children`, `actions` (botões, com o primário por último e o verbo repetido do título) e `onClose`. Use `inline` só em documentação.

- Abre com foco no primeiro controle, fecha com Esc e com clique fora.
- Registrar resultado de missão nunca abre diálogo: isso é `OutcomePicker` com "Desfazer".
