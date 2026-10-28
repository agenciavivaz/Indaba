# Implementação em Next.js, Tailwind e shadcn/ui

O app é Next.js (App Router) com Tailwind e shadcn/ui. Os tokens viram variáveis CSS nos dois temas; o shadcn lê as suas variáveis a partir delas, e os componentes de domínio usam os nomes do Indaba direto.

## Temas e modos

- Tema claro (Papel) em `:root` e tema escuro (Carta) em `.dark`, como o shadcn espera.
- O **modo** define o tema padrão da rota: o grupo `(mapa)` (Missões do dia, Território, Mapa da conta) abre em `.dark`, e os grupos `(relatorio)` e `(adm)` abrem em claro. A pessoa pode trocar; guarde a escolha por pessoa e por modo.
- O modo apresentação é uma rota de print do Mapa da conta (`?apresentacao=1`) que troca nomes por cargos no servidor, não no cliente.

## globals.css

```css
@import "tailwindcss";

:root {
  --surface: #F5F7F6;  --surface-raised: #FFFFFF;  --surface-sunken: #E8EDEF;
  --relevo: #D2DCE1;   --line-strong: #71838F;
  --ink: #0E1A22;      --ink-muted: #4A5C69;        --on-ink: #F5F7F6;
  --visao: #2D5D8C;    --visao-soft: #E2ECF6;
  --brasa: #B8370F;    --brasa-soft: #FCE6DC;       --on-brasa: #FFFFFF;
  --ambar: #855800;    --ambar-soft: #F8EDCF;       --on-ambar: #FFFFFF;
  --mata: #246B3B;     --mata-soft: #E0F0E4;        --on-mata: #FFFFFF;
  --risco: #B0202F;    --risco-soft: #FBE3E3;       --on-risco: #FFFFFF;
  --jacaranda: #6B3D91; --jacaranda-soft: #F0E6F7;
  --carta: #0E1A22;    --papel: #F5F7F6;

  /* shadcn/ui */
  --background: var(--surface);         --foreground: var(--ink);
  --card: var(--surface-raised);        --card-foreground: var(--ink);
  --popover: var(--surface-raised);     --popover-foreground: var(--ink);
  --primary: var(--ink);                --primary-foreground: var(--on-ink);
  --secondary: var(--surface-sunken);   --secondary-foreground: var(--ink);
  --muted: var(--surface-sunken);       --muted-foreground: var(--ink-muted);
  --accent: var(--surface-sunken);      --accent-foreground: var(--ink);
  --destructive: var(--risco);
  --border: var(--relevo);              --input: var(--line-strong);
  --ring: var(--visao);
  --radius: 6px;
}

.dark {
  --surface: #0E1A22;  --surface-raised: #14242F;  --surface-sunken: #0A141B;
  --relevo: #22384A;   --line-strong: #6A8397;
  --ink: #E6EDF0;      --ink-muted: #9AAFBD;        --on-ink: #0E1A22;
  --visao: #8FB3D9;    --visao-soft: #172C40;
  --brasa: #F05A28;    --brasa-soft: #3B1A0E;       --on-brasa: #0E1A22;
  --ambar: #E9B949;    --ambar-soft: #33290E;       --on-ambar: #0E1A22;
  --mata: #7CC58F;     --mata-soft: #14291D;        --on-mata: #0E1A22;
  --risco: #FF8F8F;    --risco-soft: #3D1519;       --on-risco: #0E1A22;
  --jacaranda: #C5A1E1; --jacaranda-soft: #2A1F3A;
}

@theme inline {
  --color-background: var(--background);  --color-foreground: var(--foreground);
  --color-card: var(--card);              --color-popover: var(--popover);
  --color-primary: var(--primary);        --color-primary-foreground: var(--primary-foreground);
  --color-muted: var(--muted);            --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);          --color-input: var(--input);  --color-ring: var(--ring);
  --color-destructive: var(--destructive);

  --color-surface: var(--surface);  --color-surface-raised: var(--surface-raised);  --color-surface-sunken: var(--surface-sunken);
  --color-relevo: var(--relevo);    --color-line-strong: var(--line-strong);
  --color-ink: var(--ink);          --color-ink-muted: var(--ink-muted);   --color-on-ink: var(--on-ink);
  --color-visao: var(--visao);      --color-visao-soft: var(--visao-soft);
  --color-brasa: var(--brasa);      --color-brasa-soft: var(--brasa-soft); --color-on-brasa: var(--on-brasa);
  --color-ambar: var(--ambar);      --color-ambar-soft: var(--ambar-soft); --color-on-ambar: var(--on-ambar);
  --color-mata: var(--mata);        --color-mata-soft: var(--mata-soft);
  --color-risco: var(--risco);      --color-risco-soft: var(--risco-soft);
  --color-ia: var(--jacaranda);     --color-ia-soft: var(--jacaranda-soft);

  --font-display: var(--font-bricolage), "Instrument Sans", system-ui, sans-serif;
  --font-sans: var(--font-instrument), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, monospace;

  --radius-xs: 3px; --radius-sm: 6px; --radius-md: 10px; --radius-lg: 14px;
  --ease-out: cubic-bezier(0.2, 0, 0, 1); --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0ms !important; transition-duration: 0ms !important; }
}
```

Fontes, em `app/layout.tsx`:

```tsx
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-jetbrains" });
```

Em Tailwind v3, os mesmos nomes vão em `theme.extend.colors` como `"var(--brasa)"` e `darkMode: "class"`.

## Tabela de mapeamento

| Token Indaba | Variável CSS | Classe Tailwind | shadcn/ui |
|---|---|---|---|
| `surface` | `--surface` | `bg-surface` | `--background` |
| `surface-raised` | `--surface-raised` | `bg-surface-raised` | `--card`, `--popover` |
| `surface-sunken` | `--surface-sunken` | `bg-surface-sunken` | `--secondary`, `--muted`, `--accent` |
| `relevo` | `--relevo` | `border-relevo`, `stroke-relevo` | `--border` |
| `line-strong` (`nevoa`) | `--line-strong` | `border-line-strong` | `--input` |
| `ink` | `--ink` | `text-ink`, `bg-ink` | `--foreground`, `--primary` |
| `ink-muted` | `--ink-muted` | `text-ink-muted` | `--muted-foreground` |
| `on-ink` | `--on-ink` | `text-on-ink` | `--primary-foreground` |
| `visao` (`focus`) | `--visao` | `text-visao`, `ring-visao` | `--ring` |
| `brasa` | `--brasa` | `text-brasa`, `bg-brasa` | sem equivalente (não use em `--primary`) |
| `ambar` | `--ambar` | `text-ambar`, `bg-ambar` | sem equivalente |
| `mata` | `--mata` | `text-mata` | sem equivalente |
| `risco` | `--risco` | `text-risco`, `border-risco` | `--destructive` |
| `jacaranda` (`ai`) | `--jacaranda` | `text-ia`, `bg-ia-soft` | sem equivalente |
| `space-1` … `space-16` | | `p-1` … `p-16` (escala de 4px do Tailwind) | |
| `radius-sm` | `--radius` | `rounded-sm` | `--radius` |
| `display`, `account` | | `font-display` | |
| `hud`, `hud-lg` | | `font-mono tabular-nums` (só no HUD) | |
| `number`, `metric` | | `font-sans tabular-nums` | |
| `dur-state`, `ease-out` | | `duration-150 ease-out` | |
| `dur-reveal` | | `duration-300` (a transição única) | |

## Componentes

- **Primitivos do shadcn com o estilo daqui:** Button (`primary` = `bg-ink text-on-ink`; variante `ai` tracejada em `ia`), Input, Select, Tabs, ToggleGroup (o `ViewToggle`), Sonner (o `Toast`), Dialog, Popover (base do `WhyPopover`), Checkbox, Table.
- **Domínio, em `components/mapa/`:** `AccountMap`, `CommitteeSeat`, `VisionLevel`, `SiegeRing`, `TemperatureMeter`, `ObjectiveMarker`, `SignalPulse`, `NextMoveRail`, `GateChecklist`, `TerritoryNode`. O mapa é SVG em React com layout determinístico por rotas; a única transição (névoa e objetivo) usa Framer Motion com `useReducedMotion`.
- **Domínio, em `components/missoes/`:** `MissionRow`, `MissionGroupHeader`, `MissionPanel`, `OutcomePicker`, `ChannelShortcut`, `AIDraft`.
- **Domínio, em `components/relatorio/`:** `StatTile`, `SignalItem`, `CommitteeTable`, `TierBadge`, `StageBadge`, `WhyPopover`, gráficos (Recharts ou visx com as cores daqui), `EmptyState`, `ErrorBanner`.
- Os previews deste sistema são a referência visual e de comportamento. As regras de negócio (score, cerco, estágios) ficam em `lib/` como funções puras; os componentes recebem os valores prontos.

## Atalhos de teclado

`G M` missões, `G T` território, `G R` relatório, `/` busca de conta, `J` e `K` próxima e anterior missão, `Enter` abrir, `R` registrar resultado, `1` a `6` escolher o resultado, `C` copiar o rascunho, `O` abrir o canal, `Esc` fechar o painel. Mostre o atalho no botão (`kbd`) e esconda em telas de toque.
