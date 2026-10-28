Indaba é a plataforma de ABM para vendas B2B complexas no Brasil. A ideia é **SaaS por baixo, jogo por cima**: a conta-alvo é um terreno, o comitê de compra são posições em três rotas (Decisão, Influência e Operação), os anúncios dão a visão do alto e o BDR joga uma partida por conta. A referência é uma mesa de campanha ou sala de situação, não um videogame.

O sistema tem dois modos, e os dois funcionam em claro e em escuro:

| | Modo Mapa | Modo Relatório |
|---|---|---|
| Para quem | BDR, horas por dia na tela | Gestor e board, uma vez por semana |
| Telas | Missões do dia, Território, Mapa da conta | Relatório, Programa, ADM |
| Tema padrão | Carta (escuro) | Papel (claro) |
| Densidade | Média, foco num objeto | Alta, tabelas e gráficos |
| Linguagem | Verbos de jogo nos títulos: "Janela aberta", "Próxima jogada" | Linguagem de negócio: "Contas engajadas", "Respostas" |

## Princípios

1. **Uma decisão por tela.** Missões do dia responde "qual agora?", o Mapa da conta responde "qual é a próxima jogada?" e o Relatório responde "onde agir?". Se a tela pede duas decisões, ela vira duas telas.
2. **A recompensa é o mapa mudando.** A névoa se dissolve, um objetivo é conquistado, um assento esquenta. Não existe ponto, medalha, troféu, XP, confete, ranking entre pessoas nem sequência de dias.
3. **Nada cresce por volume de atividade.** Score, temperatura, cerco e objetivos só se movem por estado da conta (cobertura, alcance, visão, sinais de terceiros). Missão concluída sozinha não move nenhum indicador.
4. **Todo número tem porquê.** Score, cerco, temperatura e taxas abrem um `WhyPopover` com os sinais, as datas e os pesos. Número sem porquê não entra em tela de decisão.
5. **Estado nunca é só cor.** Todo estado tem forma, rótulo e cor: tracejado é névoa, anel é cerco, pulso é sinal novo, losango é objetivo.
6. **Quieto por padrão.** Só existe um elemento memorável: o mapa sobre curvas de nível. O resto não tem gradiente, sombra decorativa nem cards idênticos empilhados.
7. **Sério para um diretor de 45 anos.** Se uma tela pareceria infantil impressa num relatório de diretoria, ela está errada.

## Cor

Cada cor tem **um único significado** em todo o produto. Os temas são Carta (escuro, `#0E1A22`) e Papel (claro, `#F5F7F6`), com os mesmos papéis. Todo par de texto declarado nas notas dos tokens passa 4,5:1 nos dois temas; bordas de controle, foco e marcas que carregam sentido passam 3:1.

| Papel | Tokens | Significa | Nunca |
|---|---|---|---|
| Base | `surface`, `surface-raised`, `surface-sunken` | Página, painéis, áreas recuadas | Uma superfície com duas cores ou gradiente |
| Relevo | `relevo` | Curvas de nível, divisores, trilhos vazios | Ser a única pista de um estado ou borda de controle |
| Texto | `ink`, `ink-muted`, `on-ink` | Texto e o botão primário | Hierarquia feita com cor de marca |
| Controle | `line-strong`, alias `nevoa` | Borda de input, contorno e hachura da névoa | Decoração |
| Visão | `visao` (+ `-soft`), alias `focus` | Exposição da conta aos anúncios, anel de foco, informação fria | Calor, link, categoria de gráfico |
| Calor | `brasa` (+ `-soft`, `on-brasa`), aliases `temp-engajada`, `temp-quente` | Score, temperatura, sinal recente, pessoa engajada | Botão, link, alerta, destaque genérico |
| Objetivo e gate | `ambar` (+ `-soft`, `on-ambar`), aliases `objetivo`, `gate` | Marcadores de objetivo, checklist e cadeado de gate | Aviso, "morno", timing |
| Positivo | `mata` (+ `-soft`, `on-mata`) | Resultado bom: verificado, resposta positiva, Reunião realizada, variação boa | Estado do mapa |
| Risco | `risco` (+ `-soft`, `on-risco`) | Bounce, opt-out, objetivo perdido, erro, ação destrutiva, variação ruim | Calor |
| IA | `jacaranda` (+ `-soft`), alias `ai` | Só o que a IA gerou e ninguém aprovou, e botões que chamam um agente | Marca, categoria, destaque |
| Constantes | `carta`, `papel` | Peças de marca e print, iguais nos dois temas | Interface (use `surface` e `ink`) |

Regras:

- O botão primário é `ink` sobre `on-ink`. A brasa nunca vira botão.
- A temperatura usa a brasa em três intensidades com forma própria: Fria é neutra e vazada (`temp-fria`), Engajada é tint com contorno (`brasa-soft` + `brasa`) e Quente é cheia (`brasa` + `on-brasa`). O número aparece sempre.
- Estágio e tier são neutros. O calor da conta mora só na temperatura.
- `mata` e `risco` têm a mesma luminosidade (1,05:1), e `risco` é vizinho de matiz da `brasa`. Por isso, resultado e risco **sempre** levam ícone (check, ×, alerta) e palavra.
- Texto colorido só sobre `surface`, `surface-raised` ou o próprio `-soft`. Sobre preenchimento sólido, use o `on-…`.
- Links são `ink` sublinhado. O azul é da visão.
- Gráficos usam `ink-muted` e `ink` para dados e `line-strong` para comparação. Cor de significado só entra num gráfico quando quer dizer a mesma coisa (por exemplo, `risco` no limite de 80% por origem).

## Tipografia

Três famílias do Google Fonts (`@import` no topo de `components/bundle.css`; em Next.js, `next/font/google`).

- **Bricolage Grotesque** (`display`): títulos de tela e nomes de conta. Os estilos são `display` (título de tela), `account-lg` (nome no Mapa da conta), `title` (Missões de hoje, diálogos, painel) e `account` (nome de conta em linha, nó e tabela). Nunca em parágrafo, rótulo ou botão.
- **Instrument Sans** (`sans`): toda a interface. O corpo padrão é `body` 14/20. `body-lg` 16/24 é para o rascunho da IA e a instrução da missão. `metric` 28/32 é o número do StatTile. `number` é para números de tabela. Números que se comparam sempre usam `font-variant-numeric: tabular-nums`.
- **JetBrains Mono** (`mono`): **só** `hud-lg` e `hud`, os números grandes do HUD (score e % de cerco). Mono em rótulo, tabela, metadado ou kbd está proibido.
- Rótulos em caixa de frase. Não existe eyebrow em caixa-alta, e o estilo `overline` do sistema anterior foi removido.
- Metadados ficam em linhas próprias ou separados por vírgula ("LinkedIn Ads, 28/10/2026"). Não encadeie com "·".

## Espaço, raio, sombra e movimento

- Grade de 4px: `space-1` (4) a `space-16` (64). Painel com `space-4`, painel da missão e trilho com `space-5`, seções com `space-8`.
- Raios precisos: `radius-xs` (3) em chips, `radius-sm` (6) em controles, `radius-md` (10) em painéis, `radius-lg` (14) em diálogo e painel da missão. `radius-full` só em assentos, nós e pontos.
- **Bordas antes de sombras.** Painéis usam 1px `relevo`. Sombra só no que flutua: `shadow-md` em popover, menu e toast; `shadow-lg` no `MissionPanel` sobre o mapa e no `Dialog`.
- Foco: `focus-ring` (2px na cor da página + 2px sólidos de `visao`) em todo controle e em cada linha da fila. Nunca remova o foco.
- Movimento só em resposta a uma ação ou na abertura do território:
  - `dur-instant` (80ms) para hover, só cor;
  - `dur-state` (160ms) para abrir popover e trocar estado de controle;
  - `dur-reveal` (320ms) para **a** transição: névoa se dissolvendo ou objetivo conquistado;
  - `dur-pulse` (1200ms) para o pulso de sinal, uma vez.
  - As curvas são `ease-out` e `ease-standard`, sem mola. Com `prefers-reduced-motion`, tudo vira 0ms e o pulso fica parado.
- Tracejado tem um significado só: **ainda não é real**. Isso cobre névoa, rascunho da IA e estado vazio. O T3 deixou de ser tracejado.

## O mapa

- O `AccountMap` é o elemento memorável: três rotas sobre curvas de nível finas (`relevo` sobre `surface`, 1px, linha-mestra a cada quatro). É a única área centralizada da interface.
- A névoa é hachura tracejada sobre o assento sem pessoa mapeada, sempre com o cargo esperado e a ação "Buscar no Apollo".
- Os seis estados de pessoa são névoa, mapeada (sem canal), alcançável, em contato, engajada e braço erguido. Veja o `CommitteeSeat`.
- **A visão é da conta, não da pessoa.** Ela aparece uma vez, no rodapé do mapa (`VisionLevel`).
- O layout do Mapa da conta tem o mapa em cerca de 2/3, o `NextMoveRail` em cerca de 1/3 (`rail`, 360px) e as abas embaixo. Abaixo de 720px, use o mapa `compact` e suba a Próxima jogada para logo depois do cabeçalho.
- O modo apresentação troca nomes por cargos, esconde contatos e controles e assina com o nome do produto. É o formato para print no LinkedIn e para o Raio-x do cerco.

## Conteúdo e voz

- Português do Brasil, "você", frases curtas, tom de estrategista. Direto como um colega sênior de vendas, nunca como um gamer ou um anúncio. Sem emoji, sem exclamação, sem "Ops!".
- Botões em verbo e caixa de frase: "Iniciar ofensiva", "Buscar no Apollo", "Registrar resultado", "Revelar 6 e-mails". Nunca "Clique aqui" ou "OK".
- A linguagem de jogo entra em **títulos e microcopy**, nunca em nome de estágio ou de dado.
- O nome do produto e o da metodologia vêm de configuração (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_METHOD_NAME`). Nunca escreva "Indaba" fixo em código, e-mail ou prompt.
- Formatos: datas `28/10/2026`; relativas só quando recentes ("há 3 horas"); decimal com vírgula; milhar com ponto ("1.204"); percentual sem espaço ("52%"); pontos com sinal ("+30", "−15").
- Exemplos reais:
  - Vazio: "Comitê ainda em névoa" + "Buscar comitê no Apollo".
  - Erro: "Não achamos 3 empresas do relatório. Revise os nomes na fila de revisão."
  - Atraso: "Venceu ontem", com relógio. Nunca "Você perdeu a sequência".
  - Porquê: "Respondeu e-mail, Renata Ilha, 27/10/2026, +30".

### Vocabulário fixo

| Termo | Uso |
|---|---|
| Território | O programa ABM e o mapa de todas as suas contas |
| Conta, partida | A conta-alvo; "partida" só em microcopy |
| Rotas | Decisão, Influência, Operação |
| Assento, posição | Um papel do comitê no mapa |
| Névoa | Papel-alvo sem pessoa mapeada |
| Visão | Exposição da conta aos anúncios (do relatório do LinkedIn) |
| Sinal | Evento que soma pontos por 30 dias |
| Score, temperatura | Soma dos sinais ativos; Fria (< 30), Engajada (30–59), Quente (≥ 60) |
| Cerco | Indicador composto de 0 a 100% (cobertura, alcance, visão, engajamento) |
| Objetivos | Comitê mapeado, Visão estabelecida, Decisor alcançado, Braço erguido, Reunião |
| Pré-requisitos, gate | Checklist que libera a próxima fase |
| Missão | Atividade da cadência, com resultado obrigatório |
| Próxima jogada | A única recomendação das regras para a conta |
| Janela aberta, Ofensiva | Microcopy para Engajada e Em cadência |
| Braço erguido | Resposta positiva de qualquer pessoa do comitê |
| Replay | Linha do tempo de sinais e toques |
| Estágios (rótulo) | Alvo, Aquecendo, Engajada, Em cadência, Conversa, Reunião agendada, Reunião realizada, Nutrição, Descartada |

Nunca chame conta de "lead", missão de "tarefa" ou "atividade" (atividade é o registro no CRM), nem resultado de "pontos ganhos".

## O que nunca fazer

- Mascote, medalha, troféu, badge, XP, confete, barra de nível do BDR, ranking entre pessoas, streak, contagem regressiva de sequência.
- Indicador que cresce com número de missões concluídas.
- Brasa em botão, link, banner ou destaque. Roxo fora da IA. Âmbar como "atenção".
- Barra de visão por pessoa.
- Eyebrow em caixa-alta, metadados com "·", mono fora do HUD.
- Gradiente, glow, sombra decorativa, cards idênticos empilhados, card com borda colorida à esquerda.
- Animação em loop, pulso em hover, número "contando" até o valor, transição de página.
- Marca de terceiros no produto (logos coloridos de canais, referências a jogos conhecidos).
- Dado real de cliente em material de conteúdo. Para print, use o modo apresentação.

## Iconografia

- Traço de 2px, pontas arredondadas, grade de 24px, monocromático (`currentColor`). Em produção use **Lucide** (`lucide-react`); o mapeamento está no guia do `Icon`. O conjunto deste sistema foi desenhado no mesmo traço só para os previews.
- Canais: `email`, `linkedin`, `whatsapp`, `phone`. Sem logos coloridos.
- `sparkle` é reservado para a IA. `eye` é da visão, `lock` e `unlock` são de gate.
- Tamanhos: 14px em rótulos, 16px em botões e linhas, 20px em cabeçalhos, 24px em estados vazios. Sem emoji.

## Marca

Ainda não há símbolo. Escreva o nome em Bricolage Grotesque 700, `ink` sobre `surface`. O motivo da marca são as curvas de nível com as três rotas (veja a capa). Use-o em peças de marca e no modo apresentação; dentro do app, o relevo aparece só no mapa da conta e no território.
