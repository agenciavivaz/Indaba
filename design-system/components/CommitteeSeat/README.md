# CommitteeSeat

Uma posição do comitê de compra no mapa. São seis estados, e cada um tem forma, rótulo e cor próprios, para nunca depender só da cor.

**O que você fornece:** `state` (`nevoa`, `mapeada`, `alcancavel`, `contato`, `engajada` ou `braco`), `name` e `title` da pessoa, `expected` (o cargo esperado, só na névoa), `missing` (o canal que falta quando o estado é `mapeada`: `email`, `phone` ou `linkedin`), `pulse` e `pulseLabel` para sinal novo, `revealed` para a transição de saída da névoa, `presentation`, `size` (`md` ou `sm`), `selected`, `onClick` e `onSearch`.

| Estado | Forma | Rótulo | Cor |
|---|---|---|---|
| Névoa | Disco tracejado com hachura | Não mapeado, com o cargo esperado | `nevoa` |
| Mapeada | Anel fino, iniciais apagadas, selo do canal que falta | Sem e-mail, sem telefone… | `line-strong`, `ink-muted` |
| Alcançável | Anel de 2px | Alcançável | `ink` |
| Em contato | Anel de 2px com miolo recuado e selo de envio | Em contato | `ink`, `surface-sunken` |
| Engajada | Disco cheio | Engajada | `brasa` |
| Braço erguido | Disco cheio com anel duplo e selo de seta | Braço erguido | `brasa`, `ink` |

- A pessoa só avança por estado da conta. Missão concluída não muda o assento; a resposta do outro lado, sim.
- "Engajada" significa sinal próprio da pessoa nos últimos 30 dias. Sinal de conta (anúncios) não pinta nenhum assento.
- No modo apresentação, o nome some e o cargo vira a linha principal. Contatos nunca aparecem.
- O assento é um botão quando há `onClick`, e o rótulo acessível junta nome, estado e "sinal novo".
