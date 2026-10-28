# CommitteeTable

A tabela do comitê com todas as colunas do Odoo: prioridade, nome, cargo, papel, área, e-mail com status, telefone, WhatsApp, LinkedIn, conexão, cadência e opt-out. É a tela de edição em massa e o lugar das pessoas "fora do ICP".

**O que você fornece:** `rows` (`{ id, priority, name, title, role, roleSource: 'ia' | 'humano', area, email, emailStatus: 'verificado' | 'extrapolado' | 'indisponivel' | 'bounce', phone, whatsapp, linkedin, connection: 'conectado' | 'pendente' | 'nao', cadence, optOut }`), `defaultSelected` e `label`.

- Selecionar linhas abre a barra de lote: aceitar papéis sugeridos pela IA, revelar e-mail (com o custo em créditos escrito no botão), tirar da cadência.
- Papel sugerido pela IA aparece tracejado em `jacaranda` até alguém aceitar.
- Status de e-mail sempre com ícone e palavra: verificado (check, `mata`), extrapolado (alerta, neutro), indisponível, bounce (×, `risco`).
- Linha de opt-out fica apagada e não gera missão. Números em Instrument Sans tabular, nunca em mono.
- A tabela rola na horizontal dentro do próprio painel; a página não rola de lado.
