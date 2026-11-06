/* 频道 / 分类筛选 · Root 层
   数据：GET /api/app/category?type=&area=&year=&sort= */
import { api } from '../api.js';
import { go } from '../router.js';
import { nav, esc, grid, icon, sourceNotice, empty } from '../ui.js';

const FK = ['type', 'area', 'year', 'sort'];

export default {
  tab: 'discover',
  load(ctx) { return api.category(ctx.params); },
  render(ctx, d) {
    const f = d.filters || {};
    const cur = d.active || {};
    const groups = FK.filter(k => (f[k] || []).length).map(k =>
      '<div class="fgroup"><div class="fl">' + esc({
        type: '类型', area: '地区', year: '年份', sort: '排序'
      }[k]) + '</div><div class="frow">' + (f[k] || []).map(v =>
        '<button class="f ' + (cur[k] === v ? 'on' : '') + '" data-fk="' + k +
        '" data-fv="' + esc(v) + '">' + esc(v) + '</button>').join('') + '</div></div>').join('');
    const list = d.list || [];
    return nav({ title: '频道', acts: '<a href="#/search">' + icon('search', 19) + '</a>' }) +
      '<div class="sec"><b>分类筛选</b><span>共 ' + (d.total || 0) + ' 条 · ' + esc(d.source || '') + '</span></div>' +
      groups + sourceNotice(d) +
      (list.length ? grid(list) : empty('没有匹配条目', '调整筛选条件或切换真实数据源')) +
      '<div class="tail">分类资源不代表全部资源</div>';
  },
  mount(ctx, d, root, signal) {
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-fk]');
      if (!b) return;
      const p = { ...(ctx.params || {}) };
      p[b.dataset.fk] = b.dataset.fv;
      const q = Object.keys(p).filter(k => p[k] && p[k] !== '全部')
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(p[k])).join('&');
      go('#/discover' + (q ? '?' + q : ''));
    }, { signal });
  },
};
