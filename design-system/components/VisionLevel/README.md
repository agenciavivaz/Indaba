# VisionLevel

Quanto a conta já viu da sua marca, segundo o último relatório da aba Companies do LinkedIn Ads. São seis níveis: nenhuma, muito baixa, baixa, média, alta e muito alta.

**O que você fornece:** `level` (de 0 a 5, vindo do relatório), `source` (origem e data do relatório, numa linha só), `compact` para linhas e tabelas, e `emptyHint` para trocar o convite do nível zero.

- A visão é **da conta, nunca da pessoa**. O relatório é agregado por empresa, então não invente uma barra de visão por pessoa.
- A cor é sempre `visao`. Não use a brasa aqui: ser visto não é calor.
- O nível zero vira convite ("Envie o relatório do LinkedIn") em vez de barra vazia muda.
- No cerco, a visão pesa 25% (nenhuma 0, muito baixa 0,2, baixa 0,4, média 0,6, alta 0,8, muito alta 1,0).
