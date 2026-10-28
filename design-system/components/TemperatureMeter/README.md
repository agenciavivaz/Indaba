# TemperatureMeter

O calor da conta: o score (soma dos sinais ativos nos últimos 30 dias), a temperatura em palavra e uma barra com as marcas de 30 e 60.

**O que você fornece:** `score` (calculado no servidor), `max` (escala da barra, padrão 90), `size` (`lg` no cabeçalho do Mapa da conta, `md` em painéis, `sm` em tabelas), `why` (lista de sinais `{ label, detail, value, inactive }` para o porquê) e `whyOpen`.

| Temperatura | Faixa | Forma do rótulo | Cor |
|---|---|---|---|
| Fria | menor que 30 | Círculo vazado, contorno neutro | `temp-fria` |
| Engajada | de 30 a 59 | Meio círculo, fundo `brasa-soft` | `temp-engajada` |
| Quente | 60 ou mais | Círculo cheio, fundo `brasa` | `temp-quente` |

- O número aparece sempre. A temperatura nunca é mostrada só por cor.
- O número grande usa `hud-lg` ou `hud`. Em tabela, use `size="sm"`, com Instrument Sans e algarismos tabulares.
- O porquê lista cada sinal com data, origem e pontos, inclusive os expirados (riscados), para o BDR entender por que a conta esfriou.
- A temperatura é o único lugar onde a brasa aparece no cabeçalho da conta. Estágio e tier ficam neutros.
