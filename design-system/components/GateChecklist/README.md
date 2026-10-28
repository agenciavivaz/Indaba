# GateChecklist

O checklist de pré-requisitos que libera a fase seguinte. O padrão do programa é dossiê anexado, ficha preenchida e trilha definida.

**O que você fornece:** `items` (`{ label, done, action? }`, onde `action` é o atalho para resolver o item), `title` (padrão "Pré-requisitos da ofensiva") e `action` (o botão que o gate libera).

- Gate é `gate` (âmbar): cadeado, caixas e contagem. Quando completo, o cadeado abre e a contagem fica neutra.
- O botão fica desabilitado até tudo estar feito, e uma linha abaixo diz quantos itens faltam. Nunca deixe o botão desabilitado sem explicação.
- Cada item pendente tem o seu atalho ("Definir", "Preencher"), para resolver sem sair do mapa.
