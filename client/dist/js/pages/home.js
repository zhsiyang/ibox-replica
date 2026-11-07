/* 首页推荐 · Root 层
   数据：GET /api/app/home?tab=&page=  →  { banners, groups, source }
   homeList 协议映射见 app/adapters.py MAP。 */
import { api } from '../api.js';
import { getBootstrap, go } from '../router.js';
import { nav, esc, grad, grid, sourceNotice, icon, toast } from '../ui.js';

let heroTimer = null;

function hero(data) {
  const b = (data.banners || [])[0];
  if (!b) return '';
  return '<div class="hero"><a class="hero-slide" style="background:' + grad(b.hue) +
    '" href="#/detail?id=' + encodeURIComponent(b.id) + '">' +
    '<span class="hb">01</span><b>' + esc(b.title) + '</b><span>' + esc(b.subtitle || '') + '</span></a>' +
    '<div class="hero-dots">' + (data.banners || []).map((x, i) =>
      '<i class="' + (i === 0 ? 'on' : '') + '"></i>').join('') + '</div></div>';
}

function rank(items) {
  return '<div class="rank">' + items.map((c, i) =>
    '<a class="rank-row" href="#/detail?id=' + encodeURIComponent(c.id) + '">' +
      '<span class="rank-no">' + (i + 1) + '</span>' +
      '<span class="rank-art" style="background:' + grad(c.hue) + '"><span>' + esc(String(c.id).slice(-2)) + '</span></span>' +
      '<span class="rank-main"><b>' + esc(c.title) + '</b><span>' + esc(c.tag) + ' · ' + esc(c.year) + ' · ' + esc(c.area) + '</span></span>' +
      '<span style="color:#ffcf7a;font-size:11px;font-weight:800">' + esc(c.score) + '</span>' +
    '</a>').join('') + '</div>';
}

function group(g) {
  let body;
  if (g.layout === 'rank') body = rank(g.items || []);
  else if (g.layout === 'waterfall') body = '<div class="wf">' + (g.items || []).map(c =>
    '<a class="poster" href="#/detail?id=' + encodeURIComponent(c.id) + '">' +
    '<div class="poster-art" style="background:' + grad(c.hue) + '"><span class="poster-n">' + esc(String(c.id).slice(-2)) +
    '</span><span class="poster-badge">' + esc(c.badge) + '</span></div>' +
    '<div class="poster-t">' + esc(c.title) + '</div>' +
    '<div class="poster-s">' + esc(c.remark || c.subtitle || '') + '</div></a>').join('') + '</div>';
  else body = grid(g.items || []);
  return '<div class="sec"><b>' + esc(g.title) + '</b><span>' + esc(g.subtitle || '') + '</span></div>' + body;
}

export default {
  tab: 'home',
  load(ctx) {
    return api.home(ctx.params.tab || '推荐', ctx.params.page || 1);
  },
  render(ctx, d) {
    const boot = getBootstrap() || { tabs: [] };
    const tab = ctx.params.tab || '推荐';
    return nav({ brand: true, badge: 'v1',
      acts: '<a href="#/search">' + icon('search', 19) + '</a><a href="#/interfaces">' + icon('scan', 19) + '</a>' }) +
      '<div class="tabs">' + (boot.tabs || []).map(t =>
        '<a class="t ' + (t.label === tab ? 'on' : '') + '" data-tab="' + esc(t.label) +
        '" href="#/home?tab=' + encodeURIComponent(t.label) + '">' + esc(t.label) + '</a>').join('') + '</div>' +
      sourceNotice(d) + hero(d) +
      '<div class="quick">' +
        '<a class="q" href="#/discover"><i>▦</i>分类筛选</a>' +
        '<a class="q" href="#/books"><i>▤</i>书城听书</a>' +
        '<a class="q" href="#/interfaces"><i>⌘</i>接口管理</a>' +
        '<a class="q" href="#/mine"><i>◷</i>播放记录</a>' +
      '</div>' +
      (d.groups || []).map(group).join('') +
      '<div class="tail">iBox 复刻第一版 · 数据源：' + esc(d.source || 'demo') + '</div>';
  },
  mount(ctx, d, root, signal) {
    root.addEventListener('click', e => {
      const t = e.target.closest('[data-tab]');
      if (t) toast('切换：' + t.dataset.tab, 900);
    }, { signal });

    // 3 屏轮播：只切文字与渐变，不请求网络；组件销毁时清定时器。
    const bs = d.banners || [];
    if (bs.length > 1) {
      let i = 0;
      heroTimer = setInterval(() => {
        const el = root.querySelector('.hero-slide');
        if (!el) return clearInterval(heroTimer);
        i = (i + 1) % bs.length;
        el.style.background = grad(bs[i].hue);
        el.querySelector('b').textContent = bs[i].title;
        el.querySelector('.hb').textContent = '0' + (i + 1);
        el.href = '#/detail?id=' + encodeURIComponent(bs[i].id);
        root.querySelectorAll('.hero-dots i').forEach((x, j) => x.classList.toggle('on', i === j));
      }, 4000);
      signal.addEventListener('abort', () => clearInterval(heroTimer), { once: true });
    }
  },
};
