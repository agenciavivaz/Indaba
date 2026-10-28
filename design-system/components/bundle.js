/* @ds-bundle: {"format":4,"namespace":"Indaba","components":[{"name":"AccountMap"},{"name":"CommitteeSeat"},{"name":"VisionLevel"},{"name":"SiegeRing"},{"name":"TemperatureMeter"},{"name":"ObjectiveMarker"},{"name":"SignalPulse"},{"name":"NextMoveRail"},{"name":"GateChecklist"},{"name":"TerritoryNode"},{"name":"MissionRow"},{"name":"MissionGroupHeader"},{"name":"MissionPanel"},{"name":"OutcomePicker"},{"name":"ChannelShortcut"},{"name":"AIDraft"},{"name":"StatTile"},{"name":"SignalItem"},{"name":"CommitteeTable"},{"name":"TierBadge"},{"name":"StageBadge"},{"name":"WhyPopover"},{"name":"BarChart"},{"name":"LineChart"},{"name":"EmptyState"},{"name":"ErrorBanner"},{"name":"Button"},{"name":"Field"},{"name":"Select"},{"name":"Tabs"},{"name":"ViewToggle"},{"name":"Toast"},{"name":"Dialog"},{"name":"Icon"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;

  /* ---------- helpers ---------- */
  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ');
  }
  function omit(obj, keys) {
    var r = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) r[k] = obj[k];
    return r;
  }
  function fmt(n, digits) {
    if (n == null || isNaN(n)) return '–';
    return Number(n).toLocaleString('pt-BR', { maximumFractionDigits: digits == null ? 1 : digits });
  }
  function signed(n) {
    if (n == null) return '';
    return (n > 0 ? '+' : n < 0 ? '−' : '') + fmt(Math.abs(n), 0);
  }
  function initials(name) {
    if (!name) return '';
    var p = String(name).trim().split(/\s+/);
    return ((p[0] || '')[0] + (p.length > 1 ? (p[p.length - 1] || '')[0] : '')).toUpperCase();
  }
  var seq = 0;
  function useId(prefix) {
    var r = useRef(null);
    if (!r.current) r.current = (prefix || 'ib') + '-' + (++seq);
    return r.current;
  }

  /* ---------- Icon: 24px grid, 2px stroke, round caps (Lucide look) ---------- */
  var ICONS = {
    email: [['rect', { x: 3, y: 5, width: 18, height: 14, rx: 2 }], ['path', { d: 'M3 7l9 6 9-6' }]],
    linkedin: [['rect', { x: 3, y: 3, width: 18, height: 18, rx: 3 }], ['path', { d: 'M8 10.5V17M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17M8 7.25v.01' }]],
    phone: [['path', { d: 'M5.5 3.5h3l1.8 4.6-2.3 1.6a11 11 0 0 0 6.3 6.3l1.6-2.3 4.6 1.8v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2z' }]],
    whatsapp: [['path', { d: 'M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.4-4.4a8.5 8.5 0 1 1 15.6-4.6z' }], ['path', { d: 'M9 10.5c.5 1.6 1.9 3 3.5 3.5' }]],
    ads: [['path', { d: 'M3.5 10v4h3l7 4.5v-13L6.5 10z' }], ['path', { d: 'M17 9a4 4 0 0 1 0 6M19.5 6.5a7.5 7.5 0 0 1 0 11' }]],
    search: [['circle', { cx: 11, cy: 11, r: 6.5 }], ['path', { d: 'M16 16l4.5 4.5' }]],
    sparkle: [['path', { d: 'M11 4l1.7 4.8L17.5 10.5l-4.8 1.7L11 17l-1.7-4.8L4.5 10.5l4.8-1.7z' }], ['path', { d: 'M18.5 3v4M16.5 5h4' }]],
    signal: [['path', { d: 'M3 12h4l3-7 4 14 3-7h4' }]],
    check: [['path', { d: 'M5 12.5l4.5 4.5L19 7.5' }]],
    x: [['path', { d: 'M6.5 6.5l11 11M17.5 6.5l-11 11' }]],
    copy: [['rect', { x: 8.5, y: 8.5, width: 12, height: 12, rx: 2 }], ['path', { d: 'M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5' }]],
    external: [['path', { d: 'M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4' }]],
    clock: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7.5V12l3 2' }]],
    calendar: [['rect', { x: 3.5, y: 5, width: 17, height: 15.5, rx: 2 }], ['path', { d: 'M3.5 10h17M8 3v4M16 3v4' }]],
    skip: [['path', { d: 'M6 5.5l9 6.5-9 6.5zM18 5.5v13' }]],
    users: [['circle', { cx: 9, cy: 8.5, r: 3.5 }], ['path', { d: 'M3 20a6 6 0 0 1 12 0M16 5a3.5 3.5 0 0 1 0 7M18 14.5a6 6 0 0 1 3 5.5' }]],
    alert: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7.5v5.5M12 16.5v.01' }]],
    info: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 11v5.5M12 7.5v.01' }]],
    'trend-up': [['path', { d: 'M3.5 16.5l6-6 4 4 7-7.5M15 7h5.5v5.5' }]],
    'trend-down': [['path', { d: 'M3.5 7.5l6 6 4-4 7 7.5M15 17h5.5v-5.5' }]],
    plus: [['path', { d: 'M12 5v14M5 12h14' }]],
    target: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['circle', { cx: 12, cy: 12, r: 4.5 }], ['path', { d: 'M12 12v.01' }]],
    pencil: [['path', { d: 'M15 5l4 4L8.5 19.5H4.5v-4z' }]],
    refresh: [['path', { d: 'M19.5 12a7.5 7.5 0 0 1-13.2 4.9M4.5 12a7.5 7.5 0 0 1 13.2-4.9M18 3.5v4h-4M6 20.5v-4h4' }]],
    trash: [['path', { d: 'M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13' }]],
    lock: [['rect', { x: 5, y: 10.5, width: 14, height: 10, rx: 2 }], ['path', { d: 'M8 10.5V7.5a4 4 0 0 1 8 0v3' }]],
    unlock: [['rect', { x: 5, y: 10.5, width: 14, height: 10, rx: 2 }], ['path', { d: 'M8 10.5V7.5a4 4 0 0 1 7.6-1.7' }]],
    eye: [['path', { d: 'M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z' }], ['circle', { cx: 12, cy: 12, r: 2.75 }]],
    map: [['path', { d: 'M3.5 6.5l5-2.5 7 3 5-2.5v13l-5 2.5-7-3-5 2.5z' }], ['path', { d: 'M8.5 4v13M15.5 7v13' }]],
    list: [['path', { d: 'M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5v.01M4.5 12v.01M4.5 17.5v.01' }]],
    filter: [['path', { d: 'M4 5.5h16l-6.2 7.2v5.8l-3.6 1.5v-7.3z' }]],
    'chevron-right': [['path', { d: 'M9.5 6l6 6-6 6' }]],
    'chevron-down': [['path', { d: 'M6 9.5l6 6 6-6' }]],
    'chevron-left': [['path', { d: 'M14.5 6l-6 6 6 6' }]],
    raise: [['path', { d: 'M12 19.5v-15M6 10.5l6-6 6 6' }]],
    send: [['path', { d: 'M20.5 3.5L10 14M20.5 3.5L14 20.5l-4-6.5-6.5-4z' }]],
    upload: [['path', { d: 'M12 15.5V4M7 8.5l5-5 5 5M4.5 15v3.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V15' }]],
    download: [['path', { d: 'M12 4v11.5M7 10.5l5 5 5-5M4.5 15v3.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V15' }]],
    route: [['circle', { cx: 6, cy: 18, r: 2.5 }], ['circle', { cx: 18, cy: 6, r: 2.5 }], ['path', { d: 'M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5' }]],
    flag: [['path', { d: 'M5 20.5V4M5 4.5h11l-2.5 4 2.5 4H5' }]],
    database: [['ellipse', { cx: 12, cy: 6, rx: 7.5, ry: 2.75 }], ['path', { d: 'M4.5 6v12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75V6M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75' }]],
    link: [['path', { d: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1' }]],
    form: [['rect', { x: 4.5, y: 3.5, width: 15, height: 17, rx: 2 }], ['path', { d: 'M8 8h8M8 12h8M8 16h4.5' }]],
    news: [['rect', { x: 4, y: 4, width: 16, height: 16, rx: 2 }], ['path', { d: 'M8 8.5h8M8 12h8M8 15.5h5' }]],
    briefcase: [['rect', { x: 3.5, y: 7, width: 17, height: 13, rx: 2 }], ['path', { d: 'M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17' }]],
    keyboard: [['rect', { x: 2.5, y: 6, width: 19, height: 12, rx: 2 }], ['path', { d: 'M6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M8 14h8' }]],
    more: [['path', { d: 'M5.5 12h.01M12 12h.01M18.5 12h.01' }]],
    minus: [['path', { d: 'M5.5 12h13' }]],
    hand: [['path', { d: 'M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4.5a1.5 1.5 0 0 1 3 0v6M14 10.5V6a1.5 1.5 0 0 1 3 0v7.5a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L3 15.2a1.5 1.5 0 0 1 2.4-1.8L8 16' }]]
  };
  var CHANNELS = {
    email: { icon: 'email', label: 'E-mail', open: 'Abrir e-mail' },
    linkedin: { icon: 'linkedin', label: 'LinkedIn', open: 'Abrir perfil' },
    linkedin_connect: { icon: 'linkedin', label: 'LinkedIn', open: 'Abrir perfil' },
    whatsapp: { icon: 'whatsapp', label: 'WhatsApp', open: 'Abrir WhatsApp' },
    telefone: { icon: 'phone', label: 'Telefone', open: 'Ligar' },
    interagir: { icon: 'linkedin', label: 'LinkedIn', open: 'Abrir perfil' },
    dossie: { icon: 'search', label: 'Dossiê', open: 'Abrir dossiê' },
    comite: { icon: 'users', label: 'Comitê', open: 'Abrir comitê' },
    formulario: { icon: 'form', label: 'Formulário', open: 'Abrir resposta' }
  };

  function Icon(props) {
    var size = props.size || 16;
    var name = CHANNELS[props.name] ? CHANNELS[props.name].icon : props.name;
    var parts = ICONS[name] || ICONS.target;
    return h('svg', {
      className: cx('ib-icon', props.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: props.strokeWidth || 2, strokeLinecap: 'round', strokeLinejoin: 'round',
      'aria-hidden': props.label ? undefined : 'true', role: props.label ? 'img' : undefined, 'aria-label': props.label, focusable: 'false'
    }, parts.map(function (p, i) { return h(p[0], Object.assign({ key: i }, p[1])); }));
  }
  Icon.names = Object.keys(ICONS);

  /* ---------- Button ---------- */
  function Button(props) {
    var variant = props.variant || 'secondary';
    var size = props.size || 'md';
    var rest = omit(props, ['variant', 'size', 'icon', 'iconRight', 'kbd', 'block', 'className', 'children', 'loading', 'href']);
    var iconSize = size === 'sm' ? 14 : 16;
    var tag = props.href ? 'a' : 'button';
    var base = props.href ? { href: props.href } : { type: 'button' };
    return h(tag, Object.assign(base, rest, {
      className: cx('ib-btn', 'ib-btn--' + variant, 'ib-btn--' + size, props.block && 'ib-btn--block', !props.children && 'ib-btn--icon', props.loading && 'is-loading', props.className),
      'aria-busy': props.loading ? 'true' : undefined
    }),
      props.icon ? h(Icon, { name: props.icon, size: iconSize }) : null,
      props.children ? h('span', { className: 'ib-btn__label' }, props.children) : null,
      props.iconRight ? h(Icon, { name: props.iconRight, size: iconSize }) : null,
      props.kbd ? h('kbd', { className: 'ib-kbd', 'aria-hidden': 'true' }, props.kbd) : null
    );
  }

  /* ---------- Field ---------- */
  function Field(props) {
    var autoId = useId('ib-field');
    var id = props.id || autoId;
    var rest = omit(props, ['label', 'hint', 'error', 'multiline', 'required', 'className', 'id', 'counter']);
    var tag = props.multiline ? 'textarea' : 'input';
    var described = props.error || props.hint ? id + '-help' : undefined;
    var len = typeof props.value === 'string' ? props.value.length : typeof props.defaultValue === 'string' ? props.defaultValue.length : null;
    return h('div', { className: cx('ib-field', props.error && 'ib-field--error', props.className) },
      h('div', { className: 'ib-field__top' },
        h('label', { className: 'ib-field__label', htmlFor: id }, props.label, props.required ? h('span', { className: 'ib-field__req' }, ' (obrigatório)') : null),
        props.counter && len != null ? h('span', { className: cx('ib-field__count', len > props.counter && 'is-over') }, len + ' de ' + props.counter) : null
      ),
      h(tag, Object.assign({ id: id, className: 'ib-field__control', 'aria-invalid': props.error ? 'true' : undefined, 'aria-describedby': described, required: props.required }, rest)),
      props.error ? h('p', { id: described, className: 'ib-field__help ib-field__help--error' }, h(Icon, { name: 'alert', size: 14 }), props.error)
        : props.hint ? h('p', { id: described, className: 'ib-field__help' }, props.hint) : null
    );
  }

  /* ---------- Select ---------- */
  function Select(props) {
    var autoId = useId('ib-select');
    var id = props.id || autoId;
    var rest = omit(props, ['label', 'hint', 'error', 'options', 'className', 'id', 'size', 'inline']);
    var described = props.error || props.hint ? id + '-help' : undefined;
    var control = h('div', { className: cx('ib-select', props.size === 'sm' && 'ib-select--sm') },
      h('select', Object.assign({ id: id, className: 'ib-select__control', 'aria-invalid': props.error ? 'true' : undefined, 'aria-describedby': described, 'aria-label': props.label && props.inline ? undefined : undefined }, rest),
        (props.options || []).map(function (o) { return h('option', { key: o.value, value: o.value, disabled: o.disabled }, o.label); })),
      h(Icon, { name: 'chevron-down', size: 16, className: 'ib-select__chev' }));
    if (props.inline) {
      return h('div', { className: cx('ib-select-inline', props.className) }, h('label', { className: 'ib-field__label', htmlFor: id }, props.label), control);
    }
    return h('div', { className: cx('ib-field', props.error && 'ib-field--error', props.className) },
      h('label', { className: 'ib-field__label', htmlFor: id }, props.label),
      control,
      props.error ? h('p', { id: described, className: 'ib-field__help ib-field__help--error' }, h(Icon, { name: 'alert', size: 14 }), props.error)
        : props.hint ? h('p', { id: described, className: 'ib-field__help' }, props.hint) : null);
  }

  /* ---------- Tabs ---------- */
  function Tabs(props) {
    var items = props.items || [];
    var st = useState(props.defaultValue || (items[0] && items[0].id));
    var value = props.value != null ? props.value : st[0];
    var refs = useRef({});
    function select(id, focus) {
      if (props.value == null) st[1](id);
      if (props.onChange) props.onChange(id);
      if (focus && refs.current[id]) refs.current[id].focus();
    }
    function onKey(e) {
      var i = items.findIndex(function (it) { return it.id === value; });
      if (e.key === 'ArrowRight') { e.preventDefault(); select(items[(i + 1) % items.length].id, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(items[(i - 1 + items.length) % items.length].id, true); }
    }
    return h('div', { className: cx('ib-tabs', props.className), role: 'tablist', 'aria-label': props.label, onKeyDown: onKey },
      items.map(function (it) {
        var on = it.id === value;
        return h('button', {
          key: it.id, type: 'button', role: 'tab', 'aria-selected': on ? 'true' : 'false', tabIndex: on ? 0 : -1,
          ref: function (el) { refs.current[it.id] = el; },
          className: cx('ib-tab', on && 'is-active'), onClick: function () { select(it.id); }
        }, it.label, it.count != null ? h('span', { className: 'ib-tab__count' }, fmt(it.count, 0)) : null);
      })
    );
  }

  /* ---------- ViewToggle (Mapa | Lista) ---------- */
  function ViewToggle(props) {
    var options = props.options || [{ id: 'mapa', label: 'Mapa', icon: 'map' }, { id: 'lista', label: 'Lista', icon: 'list' }];
    var st = useState(props.defaultValue || options[0].id);
    var value = props.value != null ? props.value : st[0];
    function pick(id) { if (props.value == null) st[1](id); if (props.onChange) props.onChange(id); }
    return h('div', { className: cx('ib-toggle', props.className), role: 'radiogroup', 'aria-label': props.label || 'Visualização' },
      options.map(function (o) {
        var on = o.id === value;
        return h('button', {
          key: o.id, type: 'button', role: 'radio', 'aria-checked': on ? 'true' : 'false', className: cx('ib-toggle__opt', on && 'is-on'),
          onClick: function () { pick(o.id); },
          onKeyDown: function (e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
              e.preventDefault();
              var i = options.indexOf(o), n = options[(i + (e.key === 'ArrowRight' ? 1 : -1) + options.length) % options.length];
              pick(n.id);
              var next = e.currentTarget.parentNode.children[options.indexOf(n)]; if (next) next.focus();
            }
          },
          tabIndex: on ? 0 : -1
        }, o.icon ? h(Icon, { name: o.icon, size: 16 }) : null, h('span', null, o.label));
      }));
  }

  /* ---------- Toast ---------- */
  var TONE_ICON = { neutral: 'info', positive: 'check', risk: 'alert', ai: 'sparkle' };
  function Toast(props) {
    var tone = props.tone || 'neutral';
    return h('div', { className: cx('ib-toast', 'ib-toast--' + tone, props.className), role: tone === 'risk' ? 'alert' : 'status' },
      h('span', { className: 'ib-toast__icon' }, h(Icon, { name: props.icon || TONE_ICON[tone], size: 16 })),
      h('div', { className: 'ib-toast__text' },
        h('p', { className: 'ib-toast__title' }, props.title),
        props.body ? h('p', { className: 'ib-toast__body' }, props.body) : null),
      props.action ? h(Button, { size: 'sm', variant: 'ghost', onClick: props.action.onClick, kbd: props.action.kbd }, props.action.label) : null,
      props.onDismiss ? h(Button, { size: 'sm', variant: 'ghost', icon: 'x', 'aria-label': 'Fechar aviso', onClick: props.onDismiss }) : null);
  }

  /* ---------- Dialog ---------- */
  function Dialog(props) {
    var titleId = useId('ib-dlg');
    var boxRef = useRef(null);
    useEffect(function () {
      if (!props.open || props.inline) return;
      var el = boxRef.current;
      var first = el && el.querySelector('button, [href], input, select, textarea');
      if (first) first.focus();
      function onKey(e) { if (e.key === 'Escape' && props.onClose) props.onClose(); }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); };
    }, [props.open]);
    if (!props.open) return null;
    var box = h('div', { ref: boxRef, className: cx('ib-dialog', props.className), role: 'dialog', 'aria-modal': props.inline ? undefined : 'true', 'aria-labelledby': titleId },
      h('div', { className: 'ib-dialog__head' },
        h('h2', { id: titleId, className: 'ib-dialog__title' }, props.title),
        props.onClose ? h(Button, { variant: 'ghost', size: 'sm', icon: 'x', 'aria-label': 'Fechar', onClick: props.onClose }) : null),
      props.description ? h('p', { className: 'ib-dialog__desc' }, props.description) : null,
      props.children ? h('div', { className: 'ib-dialog__body' }, props.children) : null,
      props.actions ? h('div', { className: 'ib-dialog__actions' }, props.actions) : null);
    if (props.inline) return h('div', { className: 'ib-dialog-stage' }, box);
    return h('div', { className: 'ib-dialog-backdrop', onMouseDown: function (e) { if (e.target === e.currentTarget && props.onClose) props.onClose(); } }, box);
  }

  /* ---------- WhyPopover: every number explains itself ---------- */
  function WhyPopover(props) {
    var st = useState(!!props.defaultOpen);
    var open = props.open != null ? props.open : st[0];
    var popId = useId('ib-why');
    var wrap = useRef(null);
    function set(v) { if (props.open == null) st[1](v); if (props.onOpenChange) props.onOpenChange(v); }
    useEffect(function () {
      if (!open || props.open != null) return;
      function onDoc(e) { if (wrap.current && !wrap.current.contains(e.target)) set(false); }
      function onKey(e) { if (e.key === 'Escape') set(false); }
      document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
    }, [open]);
    var items = props.items || [];
    var trigger = h('button', {
      type: 'button', className: cx('ib-why__trigger', props.triggerClassName), 'aria-expanded': open ? 'true' : 'false', 'aria-controls': popId,
      'aria-label': props.triggerLabel, onClick: function () { set(!open); }
    }, props.children || h(Icon, { name: 'info', size: 14 }));
    return h('span', { ref: wrap, className: cx('ib-why', props.align === 'end' && 'ib-why--end', props.placement === 'top' && 'ib-why--top', props.className) },
      trigger,
      open ? h('div', { id: popId, role: 'region', 'aria-label': props.title, className: 'ib-why__pop' },
        h('p', { className: 'ib-why__title' }, props.title),
        props.summary ? h('p', { className: 'ib-why__summary' }, props.summary) : null,
        items.length ? h('ul', { className: 'ib-why__list' }, items.map(function (it, i) {
          return h('li', { key: i, className: cx('ib-why__item', it.inactive && 'is-inactive') },
            h('span', { className: 'ib-why__label' }, it.label, it.detail ? h('span', { className: 'ib-why__detail' }, it.detail) : null),
            it.value != null ? h('span', { className: 'ib-why__val' }, typeof it.value === 'number' ? signed(it.value) : it.value) : null);
        })) : null,
        props.total != null ? h('div', { className: 'ib-why__total' }, h('span', null, props.totalLabel || 'Total'), h('span', { className: 'ib-why__val' }, props.total)) : null,
        props.note ? h('p', { className: 'ib-why__note' }, props.note) : null
      ) : null);
  }

  /* ---------- TemperatureMeter ---------- */
  function tempOf(score) { return score >= 60 ? 'quente' : score >= 30 ? 'engajada' : 'fria'; }
  var TEMP_LABEL = { fria: 'Fria', engajada: 'Engajada', quente: 'Quente' };
  function TempChip(props) {
    var t = props.temp;
    return h('span', { className: cx('ib-temp', 'ib-temp--' + t, props.className) },
      h('svg', { className: 'ib-temp__glyph', width: 10, height: 10, viewBox: '0 0 10 10', 'aria-hidden': 'true' },
        t === 'fria' ? h('circle', { cx: 5, cy: 5, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 })
          : t === 'engajada' ? h('g', null, h('circle', { cx: 5, cy: 5, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }), h('path', { d: 'M5 1a4 4 0 0 1 0 8z', fill: 'currentColor' }))
            : h('circle', { cx: 5, cy: 5, r: 4.5, fill: 'currentColor' })),
      TEMP_LABEL[t]);
  }
  function TemperatureMeter(props) {
    var score = Math.max(0, props.score || 0);
    var max = props.max || 90;
    var t = tempOf(score);
    var size = props.size || 'md';
    var pctW = Math.min(100, (score / max) * 100);
    var number = h('span', { className: cx('ib-tm__num', size === 'lg' ? 'hud-lg' : size === 'md' ? 'hud' : '') }, fmt(score, 0));
    var numberEl = props.why ? h(WhyPopover, {
      title: 'Por que ' + fmt(score, 0) + '?', items: props.why, total: fmt(score, 0) + ' pontos', totalLabel: 'Score',
      note: 'Soma dos sinais ativos dos últimos 30 dias. Fria abaixo de 30, Engajada de 30 a 59, Quente a partir de 60.',
      triggerClassName: 'ib-tm__trigger', triggerLabel: 'Score ' + fmt(score, 0) + ', ver sinais e pesos', align: props.align, defaultOpen: props.whyOpen
    }, number) : number;
    var bar = h('div', { className: 'ib-tm__bar', role: 'img', 'aria-label': 'Score ' + fmt(score, 0) + ' de ' + max + ', ' + TEMP_LABEL[t] },
      h('span', { className: 'ib-tm__fill', style: { width: pctW + '%' } }),
      h('span', { className: 'ib-tm__tick', style: { left: (30 / max * 100) + '%' } }),
      h('span', { className: 'ib-tm__tick', style: { left: (60 / max * 100) + '%' } }));
    if (size === 'sm') {
      return h('div', { className: cx('ib-tm', 'ib-tm--sm', 'ib-tm--' + t, props.className) }, numberEl, bar, props.chip === false ? null : h(TempChip, { temp: t }));
    }
    return h('div', { className: cx('ib-tm', 'ib-tm--' + size, 'ib-tm--' + t, props.className) },
      h('div', { className: 'ib-tm__head' },
        h('span', { className: 'ib-tm__label' }, props.label || 'Temperatura'),
        h('div', { className: 'ib-tm__value' }, numberEl, h(TempChip, { temp: t }))),
      bar,
      h('div', { className: 'ib-tm__scale', 'aria-hidden': 'true' },
        h('span', { style: { left: (30 / max * 100) + '%' } }, '30'),
        h('span', { style: { left: (60 / max * 100) + '%' } }, '60')));
  }
  TemperatureMeter.temperatureOf = tempOf;

  /* ---------- SiegeRing ---------- */
  var SIEGE_PARTS = [
    { key: 'cobertura', label: 'Cobertura', hint: 'papéis-alvo com pessoa mapeada' },
    { key: 'alcance', label: 'Alcance', hint: 'prioridade 1 e 2 com canal válido' },
    { key: 'visao', label: 'Visão', hint: 'nível do último relatório do LinkedIn' },
    { key: 'engajamento', label: 'Engajamento', hint: 'score dividido por 60, até 1' }
  ];
  function arcPath(cx0, cy0, r, a0, a1) {
    var rad = function (a) { return (a - 90) * Math.PI / 180; };
    var x0 = cx0 + r * Math.cos(rad(a0)), y0 = cy0 + r * Math.sin(rad(a0));
    var x1 = cx0 + r * Math.cos(rad(a1)), y1 = cy0 + r * Math.sin(rad(a1));
    return 'M' + x0.toFixed(2) + ' ' + y0.toFixed(2) + ' A' + r + ' ' + r + ' 0 ' + (a1 - a0 > 180 ? 1 : 0) + ' 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2);
  }
  function siegeValue(parts) {
    if (!parts) return 0;
    return Math.round(25 * ((parts.cobertura || 0) + (parts.alcance || 0) + (parts.visao || 0) + (parts.engajamento || 0)));
  }
  function SiegeRing(props) {
    var parts = props.parts || {};
    var value = props.value != null ? props.value : siegeValue(parts);
    var size = props.size || 72;
    var stroke = size >= 64 ? 6 : 4;
    var r = (size - stroke) / 2 - 1, c = size / 2, gap = 8;
    var arcs = SIEGE_PARTS.map(function (p, i) {
      var a0 = i * 90 + gap / 2, a1 = (i + 1) * 90 - gap / 2;
      var v = Math.max(0, Math.min(1, parts[p.key] || 0));
      return h('g', { key: p.key },
        h('path', { d: arcPath(c, c, r, a0, a1), className: 'ib-siege__track', strokeWidth: stroke }),
        v > 0.01 ? h('path', { d: arcPath(c, c, r, a0, a0 + (a1 - a0) * v), className: 'ib-siege__fill', strokeWidth: stroke }) : null);
    });
    var ring = h('span', { className: 'ib-siege__ring', style: { width: size, height: size } },
      h('svg', { width: size, height: size, viewBox: '0 0 ' + size + ' ' + size, 'aria-hidden': 'true' }, arcs),
      h('span', { className: cx('ib-siege__num', size >= 64 ? 'hud' : '') }, fmt(value, 0), h('span', { className: 'ib-siege__pct' }, '%')));
    var items = SIEGE_PARTS.map(function (p) {
      var v = Math.round((parts[p.key] || 0) * 100);
      return { label: p.label + ' ' + v + '%', detail: (props.details && props.details[p.key]) || p.hint, value: 'peso 25%' };
    });
    var body = props.why === false ? ring : h(WhyPopover, {
      title: 'Cerco de ' + fmt(value, 0) + '%', items: items,
      note: 'Média dos quatro componentes. Nenhum cresce por volume de missões concluídas.',
      triggerClassName: 'ib-siege__trigger', triggerLabel: 'Cerco ' + fmt(value, 0) + '%, ver os quatro componentes', align: props.align, defaultOpen: props.whyOpen
    }, ring);
    return h('div', { className: cx('ib-siege', props.className) },
      body,
      props.label !== false ? h('span', { className: 'ib-siege__label' }, props.label || 'Cerco') : null);
  }
  SiegeRing.valueOf = siegeValue;

  /* ---------- VisionLevel (account, never person) ---------- */
  var VISION = ['Nenhuma', 'Muito baixa', 'Baixa', 'Média', 'Alta', 'Muito alta'];
  function VisionLevel(props) {
    var lvl = Math.max(0, Math.min(5, props.level || 0));
    var bars = [];
    for (var i = 1; i <= 5; i++) bars.push(h('span', { key: i, className: cx('ib-vision__bar', i <= lvl && 'is-on'), style: { height: (4 + i * 3) + 'px' } }));
    return h('div', { className: cx('ib-vision', props.compact && 'ib-vision--compact', lvl === 0 && 'is-none', props.className) },
      h(Icon, { name: 'eye', size: 16, className: 'ib-vision__icon' }),
      h('span', { className: 'ib-vision__bars', role: 'img', 'aria-label': 'Visão da conta: ' + VISION[lvl].toLowerCase() + ', nível ' + lvl + ' de 5' }, bars),
      h('span', { className: 'ib-vision__text' },
        h('span', { className: 'ib-vision__label' }, lvl === 0 ? 'Sem visão' : 'Visão ' + VISION[lvl].toLowerCase()),
        !props.compact && (props.source || lvl === 0) ? h('span', { className: 'ib-vision__source' }, lvl === 0 ? (props.emptyHint || 'Envie o relatório do LinkedIn') : props.source) : null));
  }
  VisionLevel.levels = VISION;

  /* ---------- SignalPulse ---------- */
  function SignalPulse(props) {
    return h('span', { className: cx('ib-pulse', props.active !== false && 'is-active', props.className) },
      props.children,
      props.active !== false ? h('span', { className: 'ib-pulse__ring', 'aria-hidden': 'true' }) : null,
      props.active !== false && props.label ? h('span', { className: 'ib-sr' }, props.label) : null);
  }

  /* ---------- CommitteeSeat ---------- */
  var SEAT = {
    nevoa: { label: 'Não mapeado', glyph: null },
    mapeada: { label: 'Sem canal', glyph: 'x' },
    alcancavel: { label: 'Alcançável', glyph: 'check' },
    contato: { label: 'Em contato', glyph: 'send' },
    engajada: { label: 'Engajada', glyph: 'signal' },
    braco: { label: 'Braço erguido', glyph: 'raise' }
  };
  function CommitteeSeat(props) {
    var state = props.state || 'nevoa';
    var meta = SEAT[state];
    var pres = props.presentation;
    var primary = state === 'nevoa' ? (props.expected || props.title) : pres ? props.title : props.name;
    var secondary = state === 'nevoa' ? null : pres ? null : props.title;
    var disc = h('span', { className: 'ib-seat__disc', 'aria-hidden': 'true' },
      state === 'nevoa' ? null : h('span', { className: 'ib-seat__ini' }, pres ? h(Icon, { name: 'users', size: props.size === 'sm' ? 14 : 18 }) : initials(props.name)),
      state === 'mapeada' && props.missing ? h('span', { className: 'ib-seat__badge ib-seat__badge--missing' }, h(Icon, { name: props.missing, size: 11 })) : null,
      state === 'contato' ? h('span', { className: 'ib-seat__badge' }, h(Icon, { name: 'send', size: 11 })) : null,
      state === 'braco' ? h('span', { className: 'ib-seat__badge ib-seat__badge--raise' }, h(Icon, { name: 'raise', size: 11 })) : null,
      props.revealed ? h('span', { className: 'ib-seat__fog' }) : null);
    var discWrap = props.pulse ? h(SignalPulse, { label: props.pulseLabel || 'Sinal novo' }, disc) : disc;
    var Tag = props.onClick ? 'button' : 'div';
    var stateText = state === 'mapeada' && props.missing ? 'Sem ' + (props.missing === 'email' ? 'e-mail' : props.missing === 'phone' ? 'telefone' : props.missing) : meta.label;
    return h('div', { className: cx('ib-seat', 'ib-seat--' + state, props.size === 'sm' && 'ib-seat--sm', props.selected && 'is-selected', props.className) },
      h(Tag, {
        type: props.onClick ? 'button' : undefined, className: 'ib-seat__hit', onClick: props.onClick,
        'aria-pressed': props.onClick && props.selected != null ? (props.selected ? 'true' : 'false') : undefined,
        'aria-label': (primary || '') + ', ' + stateText + (props.pulse ? ', sinal novo' : '')
      },
        discWrap,
        h('span', { className: 'ib-seat__name' }, primary),
        secondary ? h('span', { className: 'ib-seat__title' }, secondary) : null,
        h('span', { className: 'ib-seat__state' }, meta.glyph && state !== 'mapeada' ? h(Icon, { name: meta.glyph, size: 12 }) : null, stateText)),
      state === 'nevoa' && props.onSearch && !pres ? h(Button, { size: 'sm', variant: 'ghost', icon: 'search', onClick: props.onSearch, className: 'ib-seat__action' }, 'Buscar no Apollo') : null);
  }
  CommitteeSeat.states = Object.keys(SEAT);

  /* ---------- Contour relief (deterministic) ---------- */
  function contourRings(seed) {
    var centers = [{ x: 760, y: 170, k: 9 }, { x: 170, y: 520, k: 7 }, { x: 470, y: 330, k: 3 }];
    var out = [];
    centers.forEach(function (c, ci) {
      for (var k = 1; k <= c.k; k++) {
        var R = 34 * k + 10, pts = [];
        for (var i = 0; i < 40; i++) {
          var th = i / 40 * Math.PI * 2;
          var rr = R * (1 + 0.10 * Math.sin(3 * th + k * 0.55 + seed + ci) + 0.06 * Math.sin(5 * th + seed * 1.7 - k * 0.3) + 0.04 * Math.cos(2 * th + ci));
          pts.push([c.x + rr * Math.cos(th) * 1.25, c.y + rr * Math.sin(th) * 0.82]);
        }
        var d = '';
        for (var j = 0; j < pts.length; j++) {
          var p0 = pts[(j - 1 + pts.length) % pts.length], p1 = pts[j], p2 = pts[(j + 1) % pts.length], p3 = pts[(j + 2) % pts.length];
          if (j === 0) d += 'M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1);
          var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
          d += 'C' + c1[0].toFixed(1) + ' ' + c1[1].toFixed(1) + ' ' + c2[0].toFixed(1) + ' ' + c2[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
        }
        out.push({ d: d + 'Z', index: k % 4 === 0 });
      }
    });
    return out;
  }
  function Relief(props) {
    var rings = React.useMemo(function () { return contourRings(props.seed || 1.3); }, [props.seed]);
    return h('svg', { className: cx('ib-relief', props.className), viewBox: '0 0 1000 640', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' },
      rings.map(function (r, i) { return h('path', { key: i, d: r.d, className: r.index ? 'is-index' : null, vectorEffect: 'non-scaling-stroke' }); }));
  }

  /* ---------- AccountMap ---------- */
  var ROUTE_HINT = { decisao: 'Quem assina', influencia: 'Quem convence', operacao: 'Quem usa' };
  function AccountMap(props) {
    var routes = props.routes || [];
    var compact = props.compact;
    return h('section', { className: cx('ib-map', compact && 'ib-map--compact', props.presentation && 'ib-map--presentation', props.className), 'aria-label': props.label || 'Mapa da conta' },
      h(Relief, { seed: props.seed }),
      h('div', { className: 'ib-map__routes' },
        routes.map(function (r) {
          return h('div', { key: r.id, className: 'ib-route', role: 'group', 'aria-label': 'Rota ' + r.label },
            h('div', { className: 'ib-route__head' },
              h('span', { className: 'ib-route__label' }, r.label),
              h('span', { className: 'ib-route__hint' }, r.hint || ROUTE_HINT[r.id] || '')),
            h('div', { className: 'ib-route__seats' },
              h('span', { className: 'ib-route__trail', 'aria-hidden': 'true' }),
              (r.seats || []).map(function (s, i) {
                return h(CommitteeSeat, Object.assign({ key: s.id || i, size: compact ? 'sm' : 'md', presentation: props.presentation }, s, {
                  selected: props.selectedId != null ? props.selectedId === s.id : s.selected,
                  onClick: props.onSeatClick ? function () { props.onSeatClick(s); } : s.onClick,
                  onSearch: props.onSearch && s.state === 'nevoa' ? function () { props.onSearch(s); } : s.onSearch
                }));
              })));
        })),
      props.vision ? h('div', { className: 'ib-map__foot' }, h(VisionLevel, props.vision), props.legend ? h(MapLegend) : null) : null);
  }
  function MapLegend() {
    return h('ul', { className: 'ib-legend', 'aria-label': 'Legenda dos assentos' },
      ['nevoa', 'mapeada', 'alcancavel', 'contato', 'engajada', 'braco'].map(function (s) {
        return h('li', { key: s, className: 'ib-legend__item ib-seat--' + s }, h('span', { className: 'ib-legend__disc' }), SEAT[s].label);
      }));
  }
  AccountMap.Legend = MapLegend;
  AccountMap.Relief = Relief;

  /* ---------- ObjectiveMarker ---------- */
  function ObjectiveMarker(props) {
    var state = props.state || 'pendente';
    var caption = props.caption || (state === 'conquistado' ? (props.date ? 'Conquistado em ' + props.date : 'Conquistado') : state === 'perdido' ? (props.date ? 'Perdido em ' + props.date : 'Perdido') : 'Pendente');
    return h('div', { className: cx('ib-obj', 'ib-obj--' + state, props.justAchieved && 'is-new', props.compact && 'ib-obj--compact', props.className) },
      h('span', { className: 'ib-obj__mark', 'aria-hidden': 'true' },
        state === 'conquistado' ? h(Icon, { name: 'check', size: 10, strokeWidth: 3 }) : null),
      h('span', { className: 'ib-obj__text' },
        h('span', { className: 'ib-obj__label' }, props.label),
        props.compact ? h('span', { className: 'ib-sr' }, ', ' + caption) : h('span', { className: 'ib-obj__caption' }, caption)));
  }

  /* ---------- GateChecklist ---------- */
  function GateChecklist(props) {
    var items = props.items || [];
    var done = items.filter(function (i) { return i.done; }).length;
    var complete = done === items.length && items.length > 0;
    return h('div', { className: cx('ib-gate', complete && 'is-complete', props.className) },
      h('div', { className: 'ib-gate__head' },
        h('span', { className: 'ib-gate__icon' }, h(Icon, { name: complete ? 'unlock' : 'lock', size: 16 })),
        h('span', { className: 'ib-gate__title' }, props.title || 'Pré-requisitos da ofensiva'),
        h('span', { className: 'ib-gate__count' }, done + ' de ' + items.length)),
      h('ul', { className: 'ib-gate__list' }, items.map(function (it, i) {
        return h('li', { key: i, className: cx('ib-gate__item', it.done && 'is-done') },
          h('span', { className: 'ib-gate__box', 'aria-hidden': 'true' }, it.done ? h(Icon, { name: 'check', size: 12, strokeWidth: 3 }) : null),
          h('span', { className: 'ib-gate__label' }, it.label, h('span', { className: 'ib-sr' }, it.done ? ', feito' : ', falta')),
          !it.done && it.action ? h('button', { type: 'button', className: 'ib-gate__fix', onClick: it.action.onClick }, it.action.label) : null);
      })),
      props.action ? h(Button, {
        variant: 'primary', block: true, disabled: !complete, onClick: props.action.onClick, kbd: props.action.kbd,
        'aria-describedby': undefined
      }, props.action.label) : null,
      props.action && !complete ? h('p', { className: 'ib-gate__why' }, 'Libera quando ' + (items.length - done === 1 ? 'o item que falta' : 'os ' + (items.length - done) + ' itens que faltam') + ' estiver' + (items.length - done === 1 ? '' : 'em') + ' feito' + (items.length - done === 1 ? '' : 's') + '.') : null);
  }

  /* ---------- TierBadge ---------- */
  var TIER_MODE = { 1: '1:1', 2: '1:poucos', 3: '1:muitos' };
  function TierBadge(props) {
    var t = Number(props.tier) || 3;
    return h('span', { className: cx('ib-tier', 'ib-tier--' + t, props.className), title: 'Tier ' + t + ', tratamento ' + TIER_MODE[t] },
      'T' + t, props.showMode ? h('span', { className: 'ib-tier__mode' }, TIER_MODE[t]) : null);
  }

  /* ---------- StageBadge (Odoo names) ---------- */
  var STAGES = {
    alvo: { label: 'Alvo', step: 1 }, aquecendo: { label: 'Aquecendo', step: 2 }, engajada: { label: 'Engajada', step: 3 },
    em_cadencia: { label: 'Em cadência', step: 4 }, conversa: { label: 'Conversa', step: 5 },
    reuniao_agendada: { label: 'Reunião agendada', step: 6 }, reuniao_realizada: { label: 'Reunião realizada', step: 7 },
    nutricao: { label: 'Nutrição', icon: 'refresh' }, descartada: { label: 'Descartada', icon: 'x' }
  };
  function StageBadge(props) {
    var s = STAGES[props.stage] || STAGES.alvo;
    var pips = null;
    if (s.step) {
      var arr = [];
      for (var i = 1; i <= 7; i++) arr.push(h('span', { key: i, className: cx('ib-stage__pip', i <= s.step && 'is-on') }));
      pips = h('span', { className: 'ib-stage__pips', 'aria-hidden': 'true' }, arr);
    }
    return h('span', { className: cx('ib-stage', 'ib-stage--' + props.stage, props.className) },
      s.step === 7 ? h(Icon, { name: 'check', size: 12, strokeWidth: 3 }) : s.icon ? h(Icon, { name: s.icon, size: 12 }) : pips,
      h('span', null, s.label),
      s.step ? h('span', { className: 'ib-sr' }, ', fase ' + s.step + ' de 7') : null,
      props.days != null ? h('span', { className: 'ib-stage__days' }, props.days + ' d') : null);
  }
  StageBadge.stages = STAGES;

  /* ---------- TerritoryNode ---------- */
  var NODE_SIZE = { 1: 56, 2: 40, 3: 28 };
  function TerritoryNode(props) {
    var tier = Number(props.tier) || 3;
    var d = NODE_SIZE[tier];
    var temp = props.temperature || (props.score != null ? tempOf(props.score) : 'fria');
    var ring = d + 14, c = ring / 2, r = d / 2 + 4;
    var siege = Math.max(0, Math.min(100, props.siege || 0));
    var name = props.presentation ? (props.alias || 'Conta T' + tier) : props.name;
    var svg = h('svg', { width: ring, height: ring, viewBox: '0 0 ' + ring + ' ' + ring, 'aria-hidden': 'true', className: 'ib-node__svg' },
      h('circle', { cx: c, cy: c, r: r, className: 'ib-node__track' }),
      siege > 0 ? h('path', { d: siege >= 99.5 ? arcPath(c, c, r, 0, 359.9) : arcPath(c, c, r, 0, siege * 3.6), className: 'ib-node__siege' }) : null,
      h('circle', { cx: c, cy: c, r: d / 2 - 1, className: 'ib-node__core' }));
    var body = h('span', { className: 'ib-node__disc', style: { width: ring, height: ring } }, svg,
      props.locked ? h('span', { className: 'ib-node__lock' }, h(Icon, { name: 'lock', size: 10, strokeWidth: 2.5 })) : null);
    var Tag = props.onClick ? 'button' : 'div';
    return h(Tag, {
      type: props.onClick ? 'button' : undefined, onClick: props.onClick,
      className: cx('ib-node', 'ib-node--t' + tier, 'ib-node--' + temp, props.selected && 'is-selected', props.className),
      'aria-label': name + ', T' + tier + ', ' + TEMP_LABEL[temp] + (props.score != null ? ' ' + props.score : '') + ', cerco ' + siege + '%' + (props.locked ? ', gate pendente' : '') + (props.pulse ? ', sinal nas últimas 24 horas' : '')
    },
      props.pulse ? h(SignalPulse, null, body) : body,
      props.showLabel !== false ? h('span', { className: 'ib-node__name' }, name) : null,
      props.showLabel !== false ? h('span', { className: 'ib-node__meta' }, siege + '%') : null);
  }

  /* ---------- AIDraft ---------- */
  function AIDraft(props) {
    var status = props.status || 'pending';
    var copied = useState(false);
    var label = status === 'accepted' ? 'Aprovado por você' : status === 'edited' ? 'Editado por você' : 'Rascunho da IA';
    return h('div', { className: cx('ib-draft', 'ib-draft--' + status, props.className) },
      h('div', { className: 'ib-draft__head' },
        h('span', { className: 'ib-draft__chip' }, h(Icon, { name: status === 'accepted' || status === 'edited' ? 'check' : 'sparkle', size: 14 }), label),
        props.agent && status === 'pending' ? h('span', { className: 'ib-draft__agent' }, props.agent) : null),
      status === 'loading' ? h('div', { className: 'ib-draft__loading', role: 'status' },
        h('span', { className: 'ib-sr' }, 'Escrevendo rascunho'), h('span', { className: 'ib-draft__line' }), h('span', { className: 'ib-draft__line' }), h('span', { className: 'ib-draft__line ib-draft__line--short' })) :
        h('div', { className: 'ib-draft__body' },
          props.subject ? h('p', { className: 'ib-draft__subject' }, h('span', { className: 'ib-draft__k' }, 'Assunto'), props.subject) : null,
          props.editable ? h('textarea', { className: 'ib-draft__edit', defaultValue: props.body, 'aria-label': 'Texto da mensagem', rows: 6 }) : h('div', { className: 'ib-draft__text' }, props.body)),
      status === 'discarded' ? null : h('div', { className: 'ib-draft__actions' },
        h(Button, {
          size: 'sm', variant: status === 'pending' ? 'ai' : 'secondary', icon: copied[0] ? 'check' : 'copy', kbd: 'C', disabled: status === 'loading',
          onClick: function () { copied[1](true); if (props.onCopy) props.onCopy(); setTimeout(function () { copied[1](false); }, 1600); }
        }, copied[0] ? 'Copiado' : 'Copiar'),
        props.onEdit ? h(Button, { size: 'sm', variant: 'ghost', icon: 'pencil', onClick: props.onEdit, disabled: status === 'loading' }, 'Editar') : null,
        props.onRegenerate ? h(Button, { size: 'sm', variant: 'ghost', icon: 'refresh', onClick: props.onRegenerate, disabled: status === 'loading' }, 'Gerar outro') : null),
      props.footnote ? h('p', { className: 'ib-draft__foot' }, props.footnote) : null);
  }

  /* ---------- ChannelShortcut ---------- */
  function ChannelShortcut(props) {
    var ch = CHANNELS[props.channel] || CHANNELS.email;
    var disabled = props.missing || !props.href;
    var inner = [
      h('span', { key: 'i', className: 'ib-chan__icon' }, h(Icon, { name: ch.icon, size: 18 })),
      h('span', { key: 't', className: 'ib-chan__text' },
        h('span', { className: 'ib-chan__label' }, props.label || ch.open),
        h('span', { className: 'ib-chan__value' }, props.missing ? (props.missingReason || 'Sem canal válido') : props.value)),
      props.kbd && !disabled ? h('kbd', { key: 'k', className: 'ib-kbd', 'aria-hidden': 'true' }, props.kbd) : null,
      !disabled ? h(Icon, { key: 'e', name: 'external', size: 14, className: 'ib-chan__ext' }) : null
    ];
    if (disabled) return h('span', { className: cx('ib-chan', 'is-missing', props.className), 'aria-disabled': 'true' }, inner);
    return h('a', { className: cx('ib-chan', props.className), href: props.href, target: props.channel === 'email' || props.channel === 'telefone' ? undefined : '_blank', rel: 'noreferrer', onClick: props.onClick }, inner);
  }

  /* ---------- OutcomePicker ---------- */
  var OUTCOMES = {
    linkedin_connect: [
      { id: 'convite', label: 'Convite enviado', effect: 'Atualiza a conexão' },
      { id: 'ja', label: 'Já conectado', effect: 'Atualiza a conexão' },
      { id: 'nao_encontrado', label: 'Perfil não encontrado', tone: 'risk', effect: 'Pessoa perde o canal' }],
    linkedin: [
      { id: 'enviada', label: 'Enviada', effect: 'Sem pontos' },
      { id: 'positivo', label: 'Respondeu positivo', tone: 'positive', effect: 'Sinal +30 e conta vai para Conversa' },
      { id: 'neutro', label: 'Respondeu neutro', effect: 'Sinal +30' },
      { id: 'agora_nao', label: 'Respondeu agora não', effect: 'Sinal +30 e conta vai para Nutrição' }],
    email: [
      { id: 'enviado', label: 'Enviado', effect: 'Sem pontos' },
      { id: 'positivo', label: 'Respondeu positivo', tone: 'positive', effect: 'Sinal +30 e conta vai para Conversa' },
      { id: 'neutro', label: 'Respondeu neutro', effect: 'Sinal +30' },
      { id: 'bounce', label: 'Bounce', tone: 'risk', effect: 'Marca o e-mail como bounce' },
      { id: 'remocao', label: 'Pediu remoção', tone: 'risk', effect: 'Opt-out da pessoa' }],
    telefone: [
      { id: 'nao_atendeu', label: 'Não atendeu', effect: 'Sem pontos' },
      { id: 'caixa', label: 'Caixa postal', effect: 'Sem pontos' },
      { id: 'conversa', label: 'Conversa', tone: 'positive', effect: 'Sinal +30' },
      { id: 'reuniao', label: 'Conversa com reunião', tone: 'positive', effect: 'Sinal +30 e Reunião agendada' }],
    whatsapp: [
      { id: 'enviada', label: 'Enviada', effect: 'Sem pontos' },
      { id: 'positivo', label: 'Respondeu positivo', tone: 'positive', effect: 'Sinal +30 e conta vai para Conversa' },
      { id: 'neutro', label: 'Respondeu neutro', effect: 'Sinal +30' },
      { id: 'invalido', label: 'Número inválido', tone: 'risk', effect: 'Pessoa perde o canal' }],
    interagir: [{ id: 'feito', label: 'Feito', effect: 'Missão de preparação, sem pontos' }]
  };
  function OutcomePicker(props) {
    var opts = props.options || OUTCOMES[props.channel] || OUTCOMES.email;
    var st = useState(props.defaultValue || null);
    var value = props.value !== undefined ? props.value : st[0];
    var groupId = useId('ib-out');
    function pick(id) { if (props.value === undefined) st[1](id); if (props.onChange) props.onChange(id); }
    function onKey(e) {
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= opts.length) { e.preventDefault(); pick(opts[n - 1].id); }
    }
    var chosen = opts.filter(function (o) { return o.id === value; })[0];
    return h('div', { className: cx('ib-outcome', props.className), onKeyDown: onKey },
      h('p', { id: groupId, className: 'ib-outcome__title' }, props.title || 'Registrar resultado'),
      h('div', { className: 'ib-outcome__grid', role: 'radiogroup', 'aria-labelledby': groupId },
        opts.map(function (o, i) {
          var on = o.id === value;
          return h('button', {
            key: o.id, type: 'button', role: 'radio', 'aria-checked': on ? 'true' : 'false',
            className: cx('ib-outcome__opt', o.tone && 'ib-outcome__opt--' + o.tone, on && 'is-on'), onClick: function () { pick(o.id); }
          },
            h('kbd', { className: 'ib-kbd', 'aria-hidden': 'true' }, String(i + 1)),
            h('span', { className: 'ib-outcome__label' }, o.label),
            h('span', { className: 'ib-outcome__effect' }, o.effect),
            on ? h(Icon, { name: 'check', size: 16, className: 'ib-outcome__check' }) : null);
        })),
      chosen ? h('p', { className: 'ib-outcome__done', role: 'status' }, h(Icon, { name: 'check', size: 14 }), 'Registrado: ' + chosen.label.toLowerCase() + '.',
        props.onUndo ? h('button', { type: 'button', className: 'ib-linkbtn', onClick: function () { pick(null); props.onUndo(); } }, 'Desfazer') : null) : null,
      props.onSkip && !chosen ? h('button', { type: 'button', className: 'ib-linkbtn ib-outcome__skip', onClick: props.onSkip }, 'Pular com motivo') : null);
  }
  OutcomePicker.outcomes = OUTCOMES;

  /* ---------- MissionGroupHeader ---------- */
  var GROUPS = {
    agora: { label: 'Agora', hint: 'Prazo de 1 hora útil', icon: 'clock' },
    janela: { label: 'Janela aberta', hint: 'Conta virou Engajada ou Quente', icon: 'target' },
    ofensiva: { label: 'Ofensiva', hint: 'Passos de cadência de hoje', icon: 'route' },
    preparacao: { label: 'Preparação', hint: 'Dossiê, comitê e asset', icon: 'search' }
  };
  function MissionGroupHeader(props) {
    var g = GROUPS[props.group] || GROUPS.ofensiva;
    return h('div', { className: cx('ib-mgh', 'ib-mgh--' + props.group, props.className), role: 'heading', 'aria-level': props.level || 3 },
      h(Icon, { name: g.icon, size: 16 }),
      h('span', { className: 'ib-mgh__label' }, props.label || g.label),
      props.count != null ? h('span', { className: 'ib-mgh__count' }, fmt(props.count, 0)) : null,
      h('span', { className: 'ib-mgh__hint' }, props.hint || g.hint));
  }
  MissionGroupHeader.groups = GROUPS;

  /* ---------- MissionRow ---------- */
  function MissionRow(props) {
    var ch = CHANNELS[props.channel] || CHANNELS.email;
    var state = props.state || 'aberta';
    var dueText = state === 'concluida' ? 'Concluída' : state === 'pulada' ? 'Pulada' : props.due;
    return h('button', {
      type: 'button', className: cx('ib-mrow', 'is-' + state, props.selected && 'is-selected', props.className),
      'aria-current': props.selected ? 'true' : undefined, onClick: props.onOpen, tabIndex: props.tabIndex, 'data-mission': props.id,
      onFocus: props.onFocus
    },
      h('span', { className: 'ib-mrow__chan', title: ch.label }, h(Icon, { name: ch.icon, size: 16, label: ch.label })),
      h('span', { className: 'ib-mrow__main' },
        h('span', { className: 'ib-mrow__title' }, props.step ? h('span', { className: 'ib-mrow__step' }, props.step) : null, props.title),
        props.reason ? h('span', { className: 'ib-mrow__reason' }, props.fresh ? h('span', { className: 'ib-mrow__fresh' }, h('span', { className: 'ib-sr' }, 'Sinal novo: ')) : null, props.reason) : null),
      h('span', { className: 'ib-mrow__who' },
        h('span', { className: 'ib-mrow__account' }, props.account),
        props.person ? h('span', { className: 'ib-mrow__person' }, props.person) : null),
      h('span', { className: cx('ib-mrow__due', state === 'fechando' && 'is-closing') },
        state === 'fechando' ? h(Icon, { name: 'clock', size: 14 }) : state === 'concluida' ? h(Icon, { name: 'check', size: 14 }) : null,
        dueText));
  }

  /* ---------- MissionPanel ---------- */
  function MissionPanel(props) {
    var m = props.mission || {};
    var ch = CHANNELS[m.channel] || CHANNELS.email;
    var outcomeChannel = m.outcomeChannel || m.channel;
    return h('aside', { className: cx('ib-mpanel', props.className), 'aria-label': 'Missão: ' + (m.title || '') },
      h('header', { className: 'ib-mpanel__head' },
        h('div', { className: 'ib-mpanel__kind' },
          h(Icon, { name: ch.icon, size: 16 }),
          h('span', null, (m.step ? m.step + ', ' : '') + ch.label),
          m.due ? h('span', { className: cx('ib-mpanel__due', m.closing && 'is-closing') }, h(Icon, { name: 'clock', size: 14 }), m.due) : null,
          props.onClose ? h(Button, { variant: 'ghost', size: 'sm', icon: 'x', 'aria-label': 'Fechar missão', className: 'ib-mpanel__close', onClick: props.onClose, kbd: 'Esc' }) : null),
        h('h2', { className: 'ib-mpanel__title' }, m.title),
        h('div', { className: 'ib-mpanel__who' },
          h('span', { className: 'ib-mpanel__person' }, m.person && m.person.name),
          h('span', { className: 'ib-mpanel__role' }, m.person && m.person.title),
          h('span', { className: 'ib-mpanel__account' }, m.account && m.account.name, m.account && m.account.tier ? h(TierBadge, { tier: m.account.tier }) : null))),
      m.why && m.why.length ? h('section', { className: 'ib-mpanel__sec' },
        h('h3', { className: 'ib-mpanel__h' }, 'Por que agora'),
        h('ul', { className: 'ib-reasons' }, m.why.map(function (w, i) { return h('li', { key: i }, w); }))) : null,
      m.instruction ? h('section', { className: 'ib-mpanel__sec' },
        h('h3', { className: 'ib-mpanel__h' }, 'Instrução'),
        h('p', { className: 'ib-mpanel__instr' }, m.instruction)) : null,
      m.draft ? h('section', { className: 'ib-mpanel__sec' }, h(AIDraft, Object.assign({ agent: 'Redator de missão', onRegenerate: function () {}, onEdit: function () {} }, m.draft))) : null,
      m.shortcut ? h('section', { className: 'ib-mpanel__sec' }, h(ChannelShortcut, Object.assign({ channel: m.channel, kbd: 'O' }, m.shortcut))) : null,
      h('section', { className: 'ib-mpanel__sec ib-mpanel__sec--outcome' },
        h(OutcomePicker, { channel: outcomeChannel, value: props.outcome, onChange: props.onOutcome, onUndo: props.onUndo || function () {}, onSkip: props.onSkip || function () {} })),
      props.footer ? h('footer', { className: 'ib-mpanel__foot' }, props.footer) : null);
  }

  /* ---------- NextMoveRail ---------- */
  function NextMoveRail(props) {
    var mv = props.move || {};
    return h('aside', { className: cx('ib-rail', props.className), 'aria-label': 'Próxima jogada' },
      h('section', { className: 'ib-rail__move' },
        h('h2', { className: 'ib-rail__h' }, 'Próxima jogada'),
        h('p', { className: 'ib-rail__title' }, mv.title),
        mv.why && mv.why.length ? h('ul', { className: 'ib-reasons' }, mv.why.map(function (w, i) { return h('li', { key: i }, w); })) : null,
        mv.gate ? h(GateChecklist, Object.assign({ action: mv.action }, mv.gate)) :
          mv.action ? h(Button, { variant: 'primary', block: true, onClick: mv.action.onClick, kbd: mv.action.kbd, icon: mv.action.icon }, mv.action.label) : null),
      props.missions && props.missions.length ? h('section', { className: 'ib-rail__sec' },
        h('h3', { className: 'ib-rail__h3' }, 'Missões da conta'),
        h('ul', { className: 'ib-rail__list' }, props.missions.map(function (m, i) {
          var ch = CHANNELS[m.channel] || CHANNELS.email;
          return h('li', { key: i, className: 'ib-rail__mission' }, h(Icon, { name: ch.icon, size: 14, label: ch.label }),
            h('span', { className: 'ib-rail__mtitle' }, m.title), h('span', { className: 'ib-rail__mdue' }, m.due));
        }))) : null,
      props.signals && props.signals.length ? h('section', { className: 'ib-rail__sec' },
        h('h3', { className: 'ib-rail__h3' }, 'Últimos sinais'),
        h('div', { className: 'ib-rail__signals' }, props.signals.map(function (s, i) { return h(SignalItem, Object.assign({ key: i, compact: true }, s)); }))) : null,
      props.children);
  }

  /* ---------- SignalItem ---------- */
  var ORIGIN_ICON = { 'LinkedIn Ads': 'ads', 'Missão': 'route', 'Manual': 'pencil', 'Apollo': 'database', 'Link pessoal': 'link', 'Formulário': 'form', 'Calculado': 'users' };
  function SignalItem(props) {
    var expired = props.expired;
    var who = [props.person, props.account].filter(Boolean);
    return h('div', { className: cx('ib-sig', props.compact && 'ib-sig--compact', expired && 'is-expired', props.fresh && 'is-fresh', props.className) },
      h('span', { className: 'ib-sig__icon' }, props.fresh ? h(SignalPulse, { label: 'Sinal novo' }, h(Icon, { name: ORIGIN_ICON[props.origin] || 'signal', size: 16 })) : h(Icon, { name: ORIGIN_ICON[props.origin] || 'signal', size: 16 })),
      h('span', { className: 'ib-sig__main' },
        h('span', { className: 'ib-sig__title' }, props.title),
        !props.compact && who.length ? h('span', { className: 'ib-sig__who' }, who.join(', ')) : null,
        h('span', { className: 'ib-sig__meta' }, (props.origin ? props.origin + ', ' : '') + (props.when || ''))),
      props.points != null ? h('span', { className: 'ib-sig__ptswrap' },
        h('span', { className: cx('ib-sig__pts', props.points === 0 && 'is-zero') },
          expired ? h('span', { className: 'ib-sr' }, 'Expirado, ') : null, props.points === 0 ? '0' : signed(props.points)),
        expired && !props.compact ? h('span', { className: 'ib-sig__exp', 'aria-hidden': 'true' }, 'Expirou') : null) : null);
  }

  /* ---------- StatTile ---------- */
  function StatTile(props) {
    var d = props.delta;
    var dTone = d ? (d.good === true ? 'good' : d.good === false ? 'bad' : 'flat') : null;
    return h('div', { className: cx('ib-stat', props.className) },
      h('div', { className: 'ib-stat__head' },
        h('span', { className: 'ib-stat__label' }, props.label),
        props.why ? h(WhyPopover, Object.assign({ triggerLabel: 'Como ' + props.label.toLowerCase() + ' é calculado', align: 'end' }, props.why)) : null),
      h('div', { className: 'ib-stat__value' },
        h('span', { className: 'metric ib-num' }, props.value),
        props.unit ? h('span', { className: 'ib-stat__unit' }, props.unit) : null),
      d ? h('div', { className: cx('ib-stat__delta', 'is-' + dTone) },
        h(Icon, { name: d.direction === 'down' ? 'trend-down' : d.direction === 'up' ? 'trend-up' : 'minus', size: 14 }),
        h('span', { className: 'ib-num' }, d.value),
        h('span', { className: 'ib-stat__vs' }, d.label || 'vs. anterior')) : null,
      props.footnote ? h('p', { className: 'ib-stat__foot' }, props.footnote) : null);
  }

  /* ---------- CommitteeTable ---------- */
  var ROLE_LABEL = { decisor: 'Decisor', influenciador: 'Influenciador', usuario: 'Usuário', tecnico: 'Técnico', fora_icp: 'Fora do ICP' };
  var EMAIL = {
    verificado: { label: 'Verificado', icon: 'check', cls: 'ok' }, extrapolado: { label: 'Extrapolado', icon: 'alert', cls: 'warn' },
    indisponivel: { label: 'Indisponível', icon: 'minus', cls: 'none' }, bounce: { label: 'Bounce', icon: 'x', cls: 'bad' }
  };
  var CONN = { conectado: 'Conectado', pendente: 'Convite enviado', nao: 'Não conectado' };
  function CommitteeTable(props) {
    var rows = props.rows || [];
    var sel = useState(props.defaultSelected || []);
    var selected = sel[0];
    function toggle(id) { sel[1](selected.indexOf(id) >= 0 ? selected.filter(function (x) { return x !== id; }) : selected.concat([id])); }
    var all = rows.length > 0 && selected.length === rows.length;
    var aiCount = rows.filter(function (r) { return selected.indexOf(r.id) >= 0 && r.roleSource === 'ia'; }).length;
    var credit = rows.filter(function (r) { return selected.indexOf(r.id) >= 0 && r.emailStatus !== 'verificado'; }).length;
    function yes(v, label) { return v ? h('span', { className: 'ib-ct__yes' }, h(Icon, { name: 'check', size: 14 }), label || 'Sim') : h('span', { className: 'ib-ct__no' }, 'Não'); }
    return h('div', { className: cx('ib-ct', props.className) },
      selected.length ? h('div', { className: 'ib-ct__bulk', role: 'toolbar', 'aria-label': 'Ações em lote' },
        h('span', { className: 'ib-ct__bulkcount' }, selected.length + (selected.length === 1 ? ' pessoa selecionada' : ' pessoas selecionadas')),
        aiCount ? h(Button, { size: 'sm', variant: 'ai', icon: 'check' }, 'Aceitar ' + aiCount + (aiCount === 1 ? ' papel sugerido' : ' papéis sugeridos')) : null,
        credit ? h(Button, { size: 'sm', variant: 'secondary', icon: 'email' }, 'Revelar e-mail, ' + credit + (credit === 1 ? ' crédito' : ' créditos')) : null,
        h(Button, { size: 'sm', variant: 'ghost' }, 'Tirar da cadência'),
        h(Button, { size: 'sm', variant: 'ghost', onClick: function () { sel[1]([]); } }, 'Limpar seleção')) : null,
      h('div', { className: 'ib-ct__scroll', tabIndex: 0, role: 'region', 'aria-label': props.label || 'Comitê de compra' },
        h('table', { className: 'ib-ct__table' },
          h('thead', null, h('tr', null,
            h('th', { className: 'ib-ct__check' }, h('input', { type: 'checkbox', 'aria-label': 'Selecionar todas', checked: all, onChange: function () { sel[1](all ? [] : rows.map(function (r) { return r.id; })); } })),
            ['Prioridade', 'Nome', 'Cargo', 'Papel', 'Área', 'E-mail', 'Telefone', 'WhatsApp', 'LinkedIn', 'Conexão', 'Cadência', 'Opt-out'].map(function (c, i) {
              return h('th', { key: c, className: i === 0 ? 'ib-ct__num' : null, scope: 'col' }, c);
            }))),
          h('tbody', null, rows.map(function (r) {
            var on = selected.indexOf(r.id) >= 0;
            var em = EMAIL[r.emailStatus] || EMAIL.indisponivel;
            return h('tr', { key: r.id, className: cx(on && 'is-selected', r.optOut && 'is-optout') },
              h('td', { className: 'ib-ct__check' }, h('input', { type: 'checkbox', checked: on, 'aria-label': 'Selecionar ' + r.name, onChange: function () { toggle(r.id); } })),
              h('td', { className: 'ib-ct__num' }, r.priority),
              h('td', { className: 'ib-ct__name' }, r.name),
              h('td', null, r.title),
              h('td', null, r.roleSource === 'ia' ? h('span', { className: 'ib-ct__role ib-ct__role--ai' }, h(Icon, { name: 'sparkle', size: 12 }), ROLE_LABEL[r.role], h('span', { className: 'ib-sr' }, ', sugerido pela IA')) : h('span', { className: 'ib-ct__role' }, ROLE_LABEL[r.role])),
              h('td', null, r.area),
              h('td', null, h('span', { className: 'ib-ct__email' }, r.email ? h('span', { className: 'ib-ct__addr' }, r.email) : null, h('span', { className: 'ib-ct__status ib-ct__status--' + em.cls }, h(Icon, { name: em.icon, size: 12, strokeWidth: 2.5 }), em.label))),
              h('td', { className: 'ib-num' }, r.phone || '–'),
              h('td', null, yes(!!r.whatsapp)),
              h('td', null, r.linkedin ? h('a', { href: r.linkedin, className: 'ib-link' }, 'Perfil') : '–'),
              h('td', null, CONN[r.connection] || '–'),
              h('td', null, yes(r.cadence, 'Ativa')),
              h('td', null, r.optOut ? h('span', { className: 'ib-ct__opt' }, h(Icon, { name: 'x', size: 12, strokeWidth: 2.5 }), 'Opt-out') : h('span', { className: 'ib-ct__no' }, 'Não')));
          })))));
  }

  /* ---------- Charts ---------- */
  function BarChart(props) {
    var data = props.data || [];
    var max = props.max || Math.max.apply(null, data.map(function (d) { return d.value; }).concat([1]));
    var unit = props.unit || '';
    return h('figure', { className: cx('ib-bars', props.className) },
      props.title ? h('figcaption', { className: 'ib-chart__title' }, props.title) : null,
      h('ul', { className: 'ib-bars__list' }, data.map(function (d, i) {
        var over = props.threshold != null && d.value > props.threshold;
        return h('li', { key: i, className: cx('ib-bars__row', d.highlight && 'is-hl', over && 'is-over') },
          h('span', { className: 'ib-bars__label' }, d.label),
          h('span', { className: 'ib-bars__track' },
            h('span', { className: 'ib-bars__fill', style: { width: Math.max(0.5, d.value / max * 100) + '%' } }),
            props.threshold != null ? h('span', { className: 'ib-bars__limit', style: { left: (props.threshold / max * 100) + '%' }, title: props.thresholdLabel }) : null),
          h('span', { className: 'ib-bars__val ib-num' }, over ? h(Icon, { name: 'alert', size: 14 }) : null, fmt(d.value, props.digits) + unit, d.note ? h('span', { className: 'ib-bars__note' }, d.note) : null));
      })),
      props.threshold != null ? h('p', { className: 'ib-chart__foot' }, h('span', { className: 'ib-bars__limitkey', 'aria-hidden': 'true' }), props.thresholdLabel || ('Limite de ' + props.threshold + unit)) : null);
  }

  function LineChart(props) {
    var labels = props.labels || [];
    var series = props.series || [];
    var W = 560, H = props.height || 200, pl = 36, pr = 44, pt = 12, pb = 28;
    var all = [];
    series.forEach(function (s) { all = all.concat(s.values); });
    var max = props.max || Math.max.apply(null, all.concat([1]));
    var niceMax = Math.ceil(max / 10) * 10 || 10;
    var x = function (i) { return pl + (labels.length < 2 ? 0 : i / (labels.length - 1) * (W - pl - pr)); };
    var y = function (v) { return pt + (1 - v / niceMax) * (H - pt - pb); };
    var grid = [0, 0.5, 1].map(function (f) { var v = Math.round(niceMax * f); return h('g', { key: f }, h('line', { x1: pl, x2: W - pr, y1: y(v), y2: y(v), className: 'ib-line__grid' }), h('text', { x: pl - 8, y: y(v) + 4, className: 'ib-line__axis', textAnchor: 'end' }, fmt(v, 0))); });
    var xl = labels.map(function (l, i) { return h('text', { key: i, x: x(i), y: H - 8, className: 'ib-line__axis', textAnchor: i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle' }, l); });
    var lines = series.map(function (s, si) {
      var d = s.values.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(' ');
      var last = s.values.length - 1;
      return h('g', { key: si, className: 'ib-line__s ib-line__s--' + (s.tone || (si ? 'compare' : 'primary')) },
        h('path', { d: d, className: 'ib-line__path' }),
        h('circle', { cx: x(last), cy: y(s.values[last]), r: 3.5, className: 'ib-line__dot' }),
        h('text', { x: x(last) + 8, y: y(s.values[last]) + 4, className: 'ib-line__end' }, fmt(s.values[last], 0)));
    });
    var summary = series.map(function (s) { return s.name + ': ' + s.values.map(function (v, i) { return labels[i] + ' ' + fmt(v, 0); }).join(', '); }).join('. ');
    return h('figure', { className: cx('ib-line', props.className) },
      props.title ? h('figcaption', { className: 'ib-chart__title' }, props.title) : null,
      h('svg', { viewBox: '0 0 ' + W + ' ' + H, className: 'ib-line__svg', role: 'img', 'aria-label': summary }, grid, xl, lines),
      series.length > 1 ? h('ul', { className: 'ib-line__legend' }, series.map(function (s, si) {
        return h('li', { key: si, className: 'ib-line__key ib-line__key--' + (s.tone || (si ? 'compare' : 'primary')) }, h('span', { className: 'ib-line__swatch', 'aria-hidden': 'true' }), s.name);
      })) : null);
  }

  /* ---------- EmptyState ---------- */
  function EmptyState(props) {
    return h('div', { className: cx('ib-empty', props.compact && 'ib-empty--compact', props.className) },
      props.icon ? h('span', { className: 'ib-empty__icon' }, h(Icon, { name: props.icon, size: props.compact ? 20 : 24 })) : null,
      h('p', { className: 'ib-empty__title' }, props.title),
      props.body ? h('p', { className: 'ib-empty__body' }, props.body) : null,
      props.action || props.secondaryAction ? h('div', { className: 'ib-empty__actions' }, props.action, props.secondaryAction) : null);
  }

  /* ---------- ErrorBanner ---------- */
  function ErrorBanner(props) {
    var tone = props.tone || 'risk';
    return h('div', { className: cx('ib-banner', 'ib-banner--' + tone, props.className), role: tone === 'risk' ? 'alert' : 'status' },
      h(Icon, { name: tone === 'risk' ? 'alert' : 'info', size: 18, className: 'ib-banner__icon' }),
      h('div', { className: 'ib-banner__text' },
        h('p', { className: 'ib-banner__title' }, props.title),
        props.body ? h('p', { className: 'ib-banner__body' }, props.body) : null),
      props.action ? h(Button, { size: 'sm', variant: tone === 'risk' ? 'secondary' : 'secondary', onClick: props.action.onClick, href: props.action.href, iconRight: 'chevron-right' }, props.action.label) : null,
      props.onDismiss ? h(Button, { size: 'sm', variant: 'ghost', icon: 'x', 'aria-label': 'Dispensar', onClick: props.onDismiss }) : null);
  }

  window.Indaba = {
    AccountMap: AccountMap, CommitteeSeat: CommitteeSeat, VisionLevel: VisionLevel, SiegeRing: SiegeRing,
    TemperatureMeter: TemperatureMeter, ObjectiveMarker: ObjectiveMarker, SignalPulse: SignalPulse, NextMoveRail: NextMoveRail,
    GateChecklist: GateChecklist, TerritoryNode: TerritoryNode, MissionRow: MissionRow, MissionGroupHeader: MissionGroupHeader,
    MissionPanel: MissionPanel, OutcomePicker: OutcomePicker, ChannelShortcut: ChannelShortcut, AIDraft: AIDraft,
    StatTile: StatTile, SignalItem: SignalItem, CommitteeTable: CommitteeTable, TierBadge: TierBadge, StageBadge: StageBadge,
    WhyPopover: WhyPopover, BarChart: BarChart, LineChart: LineChart, EmptyState: EmptyState, ErrorBanner: ErrorBanner,
    Button: Button, Field: Field, Select: Select, Tabs: Tabs, ViewToggle: ViewToggle, Toast: Toast, Dialog: Dialog, Icon: Icon,
    TempChip: TempChip
  };
})();
