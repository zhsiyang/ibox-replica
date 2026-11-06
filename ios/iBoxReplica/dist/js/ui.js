/* UI 原子组件：全部返回字符串，由 router 统一插入 #view。
   交互优先用原生 <a href="#/..."> 交给 hash 路由，减少事件绑定与内存泄漏。 */
const PATHS = {
  home: 'M3 10.5 12 3l9 7.5V21H3zM9 21v-7h6v7',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  link: 'M10 13a5 5 0 0 0 7.1 0l2-2A5 5 0 0 0 12 4l-1.2 1.2M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20l1.2-1.2',
  book: 'M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  setting: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2h-2.8v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1-2-2 .1-.1A1.7 1.7 0 0 0 6.6 15H6.4v-2.8h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1 2-2 .1.1A1.7 1.7 0 0 0 12.2 7V6.8H15v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1 2 2-.1.1a1.7 1.7 0 0 0-1.2 2.9v.2h.2z',
  play: 'M8 5v14l11-7z',
  chev: 'M9 5l7 7-7 7',
  down: 'M12 3v13M7 12l5 5 5-5M4 20h16',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  netdisk: 'M4 17a4 4 0 0 1 .6-8A6 6 0 0 1 16 8.5 3.5 3.5 0 0 1 20 15H4z',
  scan: 'M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M4 12h16',
  refresh: 'M20 11a8 8 0 1 0-2.3 6.3M20 5v6h-6',
  plus: 'M12 5v14M5 12h14',
  cast: 'M3 18a3 3 0 0 1 3 3M3 14a7 7 0 0 1 7 7M3 10a11 11 0 0 1 11 11M4 6h16v11h-6',
  danmu: 'M3 5h18v12H8l-5 4zM7 9h9M7 12h6',
};

export function icon(name, size = 20) {
  const d = PATHS[name] || PATHS.grid;
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
    '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>';
}

export function esc(s) {
  return String(s === undefined || s === null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function grad(hue) {
  const c = Array.isArray(hue) && hue.length === 2 ? hue : ['#1d3b5c', '#3a8de8'];
  return 'linear-gradient(145deg,' + c[0] + ',' + c[1] + ')';
}

export function nav(o = {}) {
  const left = o.back
    ? '<a class="back" href="' + esc(o.back) + '">‹</a>'
    : (o.brand
        ? '<span class="brand"><i>▶</i>iBox' + (o.badge ? '<em>' + esc(o.badge) + '</em>' : '') + '</span>'
        : '<b>' + esc(o.title || '') + '</b>');
  const right = '<span class="acts">' + (o.acts || '') + '</span>';
  return '<div class="nav">' + left + right + '</div>';
}

const TAB_ICON = { home: 'home', discover: 'grid', interfaces: 'link', books: 'book', mine: 'user' };

export function tabbar(active, list) {
  return (list || []).map(x =>
    '<a class="tb ' + (x.key === active ? 'on' : '') + '" href="#/' + esc(x.key) + '">' +
    icon(TAB_ICON[x.key] || 'grid', 21) + '<span>' + esc(x.label) + '</span></a>'
  ).join('');
}

export function poster(c, opts = {}) {
  const href = '#/detail?id=' + encodeURIComponent(c.id || '') + (opts.line ? '&line=' + encodeURIComponent(opts.line) : '');
  return '<a class="poster" href="' + href + '">' +
    '<div class="poster-art" style="background:' + grad(c.hue) + '">' +
      '<span class="poster-n">' + esc(String(c.id || '').slice(-2)) + '</span>' +
      (c.badge ? '<span class="poster-badge">' + esc(c.badge) + '</span>' : '') +
      (c.score ? '<span class="poster-score">' + esc(c.score) + '</span>' : '') +
    '</div>' +
    '<div class="poster-t">' + esc(c.title) + '</div>' +
    '<div class="poster-s">' + esc(c.subtitle || c.remark || c.tag || '') + '</div>' +
  '</a>';
}

export function grid(list, opts = {}) {
  return '<div class="pgrid' + (opts.two ? ' two' : '') + '">' +
    (list || []).map(c => poster(c, opts)).join('') + '</div>';
}

export function demoTag(data) {
  if (!data || !data.fixture) return '';
  return '<span class="demo-tag">◆ 演示数据</span>';
}

export function sourceNotice(data) {
  if (!data || !data.fixture) return '';
  return '<div class="notice">' + esc(data.notice || '演示夹具') +
    '<br><span style="color:#6fd4c2">接入真实源后此提示自动隐藏</span></div>';
}

export function loading() {
  return nav({ title: '加载中' }) + '<div class="loading">' +
    '<div class="skeleton sk-big"></div>' +
    '<div class="skeleton sk-row" style="width:70%;margin-left:16px"></div>' +
    '<div class="skeleton sk-row" style="width:50%;margin-left:16px"></div>' +
    '<div class="skeleton sk-row" style="width:88%;margin-left:16px"></div>' +
    '</div>';
}

export function empty(title, sub) {
  return '<div class="empty"><b>' + esc(title) + '</b>' + esc(sub || '') + '</div>';
}

let toastTimer = null;
export function toast(msg, ms = 2000) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('on'), ms);
}

export function sheet(title, html) {
  const s = document.getElementById('sheet');
  document.getElementById('sheetTitle').textContent = title;
  document.getElementById('sheetBody').innerHTML = '<div class="sheet-body">' + html + '</div>';
  s.classList.add('on');
}

export function closeSheet() {
  document.getElementById('sheet').classList.remove('on');
}

export function initOverlays() {
  const s = document.getElementById('sheet');
  s.addEventListener('click', e => {
    if (e.target === s || e.target.closest('[data-close]')) closeSheet();
  });
}
