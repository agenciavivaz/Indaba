# AccountMap

O mapa da conta: o comitê de compra em três rotas (Decisão, Influência, Operação) sobre curvas de nível finas. É o elemento memorável do sistema e o único lugar centralizado da interface.

**O que você fornece:** `routes` (lista de `{ id, label, hint?, seats }`, onde cada assento recebe as props do `CommitteeSeat`), `vision` (`{ level, source }` para o `VisionLevel` no rodapé), `selectedId` e `onSeatClick` para abrir a pessoa, `onSearch` para a ação "Buscar no Apollo" dos assentos em névoa, `compact` para telas estreitas, `presentation` para o modo apresentação e `legend` para mostrar a legenda dos seis estados.

- O padrão das rotas é decisor em Decisão, influenciador em Influência e usuário ou técnico em Operação. Quem está "fora do ICP" não aparece no mapa, só na `CommitteeTable`.
- A névoa vem do programa: todo papel-alvo sem pessoa mapeada vira um assento em névoa com o cargo esperado. Nunca preencha a névoa com uma pessoa duvidosa só para fechar o mapa.
- O relevo usa `relevo` sobre `surface`, a 1px, com uma linha-mestra a cada quatro. Ele é textura: nada de estado pode depender dele.
- A visão é da conta e aparece uma vez no rodapé. Nunca coloque barra de visão em pessoa.
- Movimento: quando um assento sai da névoa (`revealed`), a hachura se dissolve uma vez em `dur-reveal`. Não anime mais nada no mapa.
- Mantenha o mapa em cerca de 2/3 da largura, com o `NextMoveRail` à direita. Abaixo de 720px, use `compact`.
