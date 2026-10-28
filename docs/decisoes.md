# Decisões

Registro de escolhas tomadas durante a construção que não estão no PRD, ou que divergem dele. Formato: data, marco, decisão, motivo, impacto. Decisões com impacto em dados ou segurança só entram aqui depois de aprovadas pelo Diego.

| # | Data | Marco | Decisão | Motivo | Impacto |
|---|---|---|---|---|---|
| 1 | 28/10/2026 | Setup | O design system chegou como `indaba-design-system.zip` na raiz. Foi extraído para `design-system/` e o zip removido do repositório (segue no histórico do git). | O pedido referencia `design-system/`; manter o zip duplicaria 150 KB. | Nenhum |
| 2 | 28/10/2026 | Setup | A skill `frontend-design` foi instalada copiando `cli-tool/components/skills/creative-design/frontend-design/` do repositório `davila7/claude-code-templates` para `.claude/skills/frontend-design/`. | A CLI `claude-code-templates` falhou com HTTP 403 na API do GitHub (bloqueada pelo proxy do ambiente). O conteúdo é o mesmo que a CLI instalaria. | Nenhum |
| 3 | 28/10/2026 | Setup | Skills da Supabase instaladas por `npx skills add supabase/agent-skills` em `.agents/skills/`, com symlink em `.claude/skills/` e lock em `skills-lock.json`. | Padrão da própria CLI. | Nenhum |
| 4 | 28/10/2026 | Setup | Tokens: vale o `design-system/` (v2, contraste validado) e não os hex propostos na seção 14.3 do PRD. | O PRD 14.3 diz que os hex são propostas a reconciliar na etapa de DS; o DS fez isso (ex.: `brasa` claro `#B8370F`). | Nenhum |
| 5 | 28/10/2026 | Setup | Nomes de estágio na interface = os do Odoo (Alvo, Aquecendo, Engajada, Em cadência, Conversa, Reunião agendada, Reunião realizada, Nutrição, Descartada). | Recomendação do PRD (9.5, 18.4) e do DS. Configurável por programa. | Nenhum |
