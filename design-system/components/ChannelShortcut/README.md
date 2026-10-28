# ChannelShortcut

O atalho que abre o canal da missão já preenchido: `mailto:` com assunto e corpo, perfil do LinkedIn, `https://wa.me/<número>` ou `tel:`. O Indaba nunca envia nada sozinho.

**O que você fornece:** `channel` (`email`, `linkedin`, `whatsapp` ou `telefone`), `href`, `value` (o endereço ou número visível), `label` para trocar o verbo, `kbd` (padrão O no painel), `missing` e `missingReason`.

- Sem canal válido, o atalho fica desabilitado e diz por quê ("E-mail extrapolado, revele antes de enviar"). Não esconda o atalho.
- O link pessoal rastreado entra no texto do rascunho, não no atalho.
- Sem logos coloridos de terceiros: os ícones são de traço, na cor do texto.
