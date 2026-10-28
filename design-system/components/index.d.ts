import type * as React from 'react';

export type IconName =
  | 'email' | 'linkedin' | 'phone' | 'whatsapp' | 'ads' | 'search' | 'sparkle' | 'signal' | 'check' | 'x' | 'copy'
  | 'external' | 'clock' | 'calendar' | 'skip' | 'users' | 'alert' | 'info' | 'trend-up' | 'trend-down' | 'plus'
  | 'target' | 'pencil' | 'refresh' | 'trash' | 'lock' | 'unlock' | 'eye' | 'map' | 'list' | 'filter'
  | 'chevron-right' | 'chevron-down' | 'chevron-left' | 'raise' | 'send' | 'upload' | 'download' | 'route' | 'flag'
  | 'database' | 'link' | 'form' | 'news' | 'briefcase' | 'keyboard' | 'more' | 'minus' | 'hand';
export type Channel = 'email' | 'linkedin' | 'linkedin_connect' | 'whatsapp' | 'telefone' | 'interagir' | 'dossie' | 'comite' | 'formulario';
export type Stage = 'alvo' | 'aquecendo' | 'engajada' | 'em_cadencia' | 'conversa' | 'reuniao_agendada' | 'reuniao_realizada' | 'nutricao' | 'descartada';
export type Tier = 1 | 2 | 3;
export type Temperature = 'fria' | 'engajada' | 'quente';
export type SeatState = 'nevoa' | 'mapeada' | 'alcancavel' | 'contato' | 'engajada' | 'braco';
export interface WhyItem { label: React.ReactNode; detail?: React.ReactNode; value?: number | string; inactive?: boolean }

/* ---------- Mapa ---------- */

/** One committee position: six states, each with its own shape, label and color. */
export interface CommitteeSeatProps {
  id?: string;
  state: SeatState;
  name?: string;
  title?: string;
  /** Expected role title, only for `nevoa`. */
  expected?: string;
  /** Channel that is missing, only for `mapeada`. */
  missing?: 'email' | 'phone' | 'linkedin';
  pulse?: boolean;
  pulseLabel?: string;
  /** Plays the 320ms fog-out once. */
  revealed?: boolean;
  presentation?: boolean;
  size?: 'md' | 'sm';
  selected?: boolean;
  onClick?: () => void;
  onSearch?: () => void;
  className?: string;
}
export declare function CommitteeSeat(props: CommitteeSeatProps): React.ReactElement;

export interface Route { id: 'decisao' | 'influencia' | 'operacao' | string; label: string; hint?: string; seats: CommitteeSeatProps[] }
/** The account map: three routes over thin contour lines. The one memorable element. */
export interface AccountMapProps {
  routes: Route[];
  vision?: VisionLevelProps;
  selectedId?: string;
  onSeatClick?: (seat: CommitteeSeatProps) => void;
  onSearch?: (seat: CommitteeSeatProps) => void;
  compact?: boolean;
  presentation?: boolean;
  legend?: boolean;
  seed?: number;
  label?: string;
  className?: string;
}
export declare function AccountMap(props: AccountMapProps): React.ReactElement;

/** Account exposure from the LinkedIn Companies report. Account-level, never per person. */
export interface VisionLevelProps { level: 0 | 1 | 2 | 3 | 4 | 5; source?: string; compact?: boolean; emptyHint?: string; className?: string }
export declare function VisionLevel(props: VisionLevelProps): React.ReactElement;

/** Siege %: four arcs (coverage, reach, vision, engagement), 25% each, with the why. */
export interface SiegeRingProps {
  parts: { cobertura: number; alcance: number; visao: number; engajamento: number };
  value?: number;
  details?: Partial<Record<'cobertura' | 'alcance' | 'visao' | 'engajamento', string>>;
  size?: number;
  label?: string | false;
  why?: boolean;
  whyOpen?: boolean;
  align?: 'start' | 'end';
  className?: string;
}
export declare function SiegeRing(props: SiegeRingProps): React.ReactElement;

/** Score as heat: Fria < 30, Engajada 30–59, Quente ≥ 60, always with the number. */
export interface TemperatureMeterProps { score: number; max?: number; size?: 'lg' | 'md' | 'sm'; label?: string; chip?: boolean; why?: WhyItem[]; whyOpen?: boolean; align?: 'start' | 'end'; className?: string }
export declare function TemperatureMeter(props: TemperatureMeterProps): React.ReactElement;
export declare function TempChip(props: { temp: Temperature; className?: string }): React.ReactElement;

/** One of the five binary account milestones. */
export interface ObjectiveMarkerProps { state: 'conquistado' | 'pendente' | 'perdido'; label: string; date?: string; caption?: string; compact?: boolean; justAchieved?: boolean; className?: string }
export declare function ObjectiveMarker(props: ObjectiveMarkerProps): React.ReactElement;

/** A brasa ring that expands once around a new signal. */
export interface SignalPulseProps { active?: boolean; label?: string; children?: React.ReactNode; className?: string }
export declare function SignalPulse(props: SignalPulseProps): React.ReactElement;

/** Gate checklist that unlocks the next phase. */
export interface GateChecklistProps {
  items: { label: string; done: boolean; action?: { label: string; onClick?: () => void } }[];
  title?: string;
  action?: { label: string; onClick?: () => void; kbd?: string };
  className?: string;
}
export declare function GateChecklist(props: GateChecklistProps): React.ReactElement;

/** The right rail of the account map: one next move, with the why. */
export interface NextMoveRailProps {
  move: { title: string; why?: string[]; action?: { label: string; onClick?: () => void; kbd?: string; icon?: IconName }; gate?: Omit<GateChecklistProps, 'action'> };
  missions?: { channel: Channel; title: string; due?: string }[];
  signals?: SignalItemProps[];
  children?: React.ReactNode;
  className?: string;
}
export declare function NextMoveRail(props: NextMoveRailProps): React.ReactElement;

/** An account on the territory: size = tier, ring = siege, core = temperature, lock = pending gate. */
export interface TerritoryNodeProps {
  name: string; tier: Tier; score?: number; temperature?: Temperature; siege: number;
  locked?: boolean; pulse?: boolean; selected?: boolean; onClick?: () => void;
  presentation?: boolean; alias?: string; showLabel?: boolean; className?: string;
}
export declare function TerritoryNode(props: TerritoryNodeProps): React.ReactElement;

/* ---------- Missões ---------- */

export interface MissionRowProps {
  id?: string; channel: Channel; step?: string; title: string; reason?: string; account: string; person?: string; due?: string;
  state?: 'aberta' | 'fechando' | 'concluida' | 'pulada'; fresh?: boolean; selected?: boolean; tabIndex?: number;
  onOpen?: () => void; onFocus?: () => void; className?: string;
}
export declare function MissionRow(props: MissionRowProps): React.ReactElement;

export interface MissionGroupHeaderProps { group: 'agora' | 'janela' | 'ofensiva' | 'preparacao'; count?: number; label?: string; hint?: string; level?: number; className?: string }
export declare function MissionGroupHeader(props: MissionGroupHeaderProps): React.ReactElement;

export interface Outcome { id: string; label: string; effect?: string; tone?: 'positive' | 'risk' }
/** Record a mission result in up to two clicks; keys 1–6. */
export interface OutcomePickerProps {
  channel?: 'email' | 'linkedin' | 'linkedin_connect' | 'whatsapp' | 'telefone' | 'interagir';
  options?: Outcome[]; value?: string | null; defaultValue?: string; title?: string;
  onChange?: (id: string | null) => void; onUndo?: () => void; onSkip?: () => void; className?: string;
}
export declare function OutcomePicker(props: OutcomePickerProps): React.ReactElement;

export interface ChannelShortcutProps { channel: 'email' | 'linkedin' | 'whatsapp' | 'telefone'; href?: string; value?: string; label?: string; kbd?: string; missing?: boolean; missingReason?: string; onClick?: () => void; className?: string }
export declare function ChannelShortcut(props: ChannelShortcutProps): React.ReactElement;

/** Anything the AI wrote, until a human approves it. */
export interface AIDraftProps {
  body?: React.ReactNode; subject?: string; status?: 'pending' | 'loading' | 'accepted' | 'edited' | 'discarded';
  agent?: string; editable?: boolean; footnote?: string;
  onCopy?: () => void; onEdit?: () => void; onRegenerate?: () => void; className?: string;
}
export declare function AIDraft(props: AIDraftProps): React.ReactElement;

export interface MissionPanelProps {
  mission: {
    title: string; channel: Channel; outcomeChannel?: OutcomePickerProps['channel']; step?: string; due?: string; closing?: boolean;
    person?: { name: string; title?: string }; account?: { name: string; tier?: Tier };
    why?: string[]; instruction?: string | null; draft?: AIDraftProps; shortcut?: Omit<ChannelShortcutProps, 'channel'>;
  };
  outcome?: string | null; onOutcome?: (id: string | null) => void; onUndo?: () => void; onSkip?: () => void; onClose?: () => void;
  footer?: React.ReactNode; className?: string;
}
export declare function MissionPanel(props: MissionPanelProps): React.ReactElement;

/* ---------- Dados e relatório ---------- */

export interface StatTileProps {
  label: string; value: React.ReactNode; unit?: string;
  delta?: { value: string; direction?: 'up' | 'down'; good?: boolean | null; label?: string };
  footnote?: string; why?: Partial<WhyPopoverProps>; className?: string;
}
export declare function StatTile(props: StatTileProps): React.ReactElement;

export interface SignalItemProps {
  title: string; person?: string; account?: string;
  origin?: 'LinkedIn Ads' | 'Missão' | 'Manual' | 'Apollo' | 'Link pessoal' | 'Formulário' | 'Calculado';
  when?: string; points?: number; fresh?: boolean; expired?: boolean; compact?: boolean; className?: string;
}
export declare function SignalItem(props: SignalItemProps): React.ReactElement;

export interface CommitteeRow {
  id: string; priority: 1 | 2 | 3 | 4; name: string; title: string;
  role: 'decisor' | 'influenciador' | 'usuario' | 'tecnico' | 'fora_icp'; roleSource: 'ia' | 'humano'; area?: string;
  email?: string; emailStatus: 'verificado' | 'extrapolado' | 'indisponivel' | 'bounce'; phone?: string; whatsapp?: boolean;
  linkedin?: string; connection?: 'conectado' | 'pendente' | 'nao'; cadence?: boolean; optOut?: boolean;
}
export interface CommitteeTableProps { rows: CommitteeRow[]; defaultSelected?: string[]; label?: string; className?: string }
export declare function CommitteeTable(props: CommitteeTableProps): React.ReactElement;

export interface TierBadgeProps { tier: Tier; showMode?: boolean; className?: string }
export declare function TierBadge(props: TierBadgeProps): React.ReactElement;

export interface StageBadgeProps { stage: Stage; days?: number; className?: string }
export declare function StageBadge(props: StageBadgeProps): React.ReactElement;

/** The "why" behind any number: signals, dates and weights. */
export interface WhyPopoverProps {
  title: string; items?: WhyItem[]; total?: React.ReactNode; totalLabel?: string; summary?: string; note?: string;
  children?: React.ReactNode; triggerLabel?: string; triggerClassName?: string; align?: 'start' | 'end'; placement?: 'bottom' | 'top';
  open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; className?: string;
}
export declare function WhyPopover(props: WhyPopoverProps): React.ReactElement;

export interface BarChartProps { data: { label: string; value: number; note?: string; highlight?: boolean }[]; title?: string; unit?: string; max?: number; digits?: number; threshold?: number; thresholdLabel?: string; className?: string }
export declare function BarChart(props: BarChartProps): React.ReactElement;

export interface LineChartProps { labels: string[]; series: { name: string; values: number[]; tone?: 'primary' | 'compare' }[]; title?: string; height?: number; max?: number; className?: string }
export declare function LineChart(props: LineChartProps): React.ReactElement;

export interface EmptyStateProps { icon?: IconName; title: string; body?: string; action?: React.ReactNode; secondaryAction?: React.ReactNode; compact?: boolean; className?: string }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;

export interface ErrorBannerProps { title: string; body?: string; action?: { label: string; onClick?: () => void; href?: string }; onDismiss?: () => void; tone?: 'risk' | 'info'; className?: string }
export declare function ErrorBanner(props: ErrorBannerProps): React.ReactElement;

/* ---------- Base ---------- */

export interface IconProps { name: IconName | Channel; size?: number; strokeWidth?: number; label?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'ai' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName | Channel; iconRight?: IconName;
  /** Shortcut shown in the button; hidden on touch screens. */
  kbd?: string;
  block?: boolean; loading?: boolean; href?: string;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  label: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; multiline?: boolean;
  /** LinkedIn invite 300, WhatsApp 700, e-mail 1200. */
  counter?: number;
}
export declare function Field(props: FieldProps): React.ReactElement;

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string; options: { value: string; label: string; disabled?: boolean }[];
  hint?: React.ReactNode; error?: React.ReactNode; size?: 'sm' | 'md'; inline?: boolean;
}
export declare function Select(props: SelectProps): React.ReactElement;

export interface TabsProps { items: { id: string; label: React.ReactNode; count?: number }[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; label?: string; className?: string }
export declare function Tabs(props: TabsProps): React.ReactElement;

export interface ViewToggleProps { options?: { id: string; label: string; icon?: IconName }[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; label?: string; className?: string }
export declare function ViewToggle(props: ViewToggleProps): React.ReactElement;

export interface ToastProps { tone?: 'neutral' | 'positive' | 'risk' | 'ai'; title: string; body?: string; icon?: IconName; action?: { label: string; onClick?: () => void; kbd?: string }; onDismiss?: () => void; className?: string }
export declare function Toast(props: ToastProps): React.ReactElement;

export interface DialogProps { open: boolean; title: string; description?: string; children?: React.ReactNode; actions?: React.ReactNode; onClose?: () => void; inline?: boolean; className?: string }
export declare function Dialog(props: DialogProps): React.ReactElement;

declare global {
  interface Window {
    Indaba: {
      AccountMap: typeof AccountMap; CommitteeSeat: typeof CommitteeSeat; VisionLevel: typeof VisionLevel; SiegeRing: typeof SiegeRing;
      TemperatureMeter: typeof TemperatureMeter; ObjectiveMarker: typeof ObjectiveMarker; SignalPulse: typeof SignalPulse;
      NextMoveRail: typeof NextMoveRail; GateChecklist: typeof GateChecklist; TerritoryNode: typeof TerritoryNode;
      MissionRow: typeof MissionRow; MissionGroupHeader: typeof MissionGroupHeader; MissionPanel: typeof MissionPanel;
      OutcomePicker: typeof OutcomePicker; ChannelShortcut: typeof ChannelShortcut; AIDraft: typeof AIDraft;
      StatTile: typeof StatTile; SignalItem: typeof SignalItem; CommitteeTable: typeof CommitteeTable; TierBadge: typeof TierBadge;
      StageBadge: typeof StageBadge; WhyPopover: typeof WhyPopover; BarChart: typeof BarChart; LineChart: typeof LineChart;
      EmptyState: typeof EmptyState; ErrorBanner: typeof ErrorBanner; Button: typeof Button; Field: typeof Field;
      Select: typeof Select; Tabs: typeof Tabs; ViewToggle: typeof ViewToggle; Toast: typeof Toast; Dialog: typeof Dialog;
      Icon: typeof Icon; TempChip: typeof TempChip;
    };
  }
}
