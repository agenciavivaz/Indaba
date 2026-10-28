# MissionGroupHeader

Cabeçalho de grupo da fila de missões. Os grupos têm ordem fixa: **Agora** (SLA de 1 hora útil: formulário, resposta, braço erguido), **Janela aberta** (a conta virou Engajada ou Quente), **Ofensiva** (passos de cadência do dia) e **Preparação** (dossiê, comitê, asset).

**O que você fornece:** `group` (`agora`, `janela`, `ofensiva` ou `preparacao`), `count`, e opcionalmente `label`, `hint` e `level` (nível de heading, padrão 3).

- Os nomes dos grupos são vocabulário fixo. Não renomeie por cliente.
- O grupo vazio some da fila em vez de mostrar "0".
- A dica fica à direita no desktop e some no mobile.
