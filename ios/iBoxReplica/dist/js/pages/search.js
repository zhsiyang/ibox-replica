/* 多源搜索 · Task 层
   数据：GET /api/app/search?q=&page=  →  { query, sources, list, hot_search }
   搜索历史写 localStorage，键 ibox.search.history。 */
import { api } from '../api.js';
import { go } from '../router.js';
import { nav, esc, grid, icon, sourceNotice, empty, toast } from '../ui.js';

const HK = 'ibox.search.history';
function history() {
  try { return JSON.parse(localStorage.getItem(HK) || '[]'); } catch (e) { return []; }
}
function remember(q) {
  const h = [q, ...history().filter(x => x !== q)].slice(0, 8);
  localStorage.setItem(HK, JSON.stringify(h));
}

export default {
  tab: 'discover',
  load(ctx) { return api.search(ctx.params.q || '', ctx.params.page || 1); },
  render(ctx, d) {
    const q = d.query || '';
    const bar = '<div class="searchbar">' + icon('search', 16) +
      '<input id="q" type="search" value="' + esc(q) + '" placeholder="搜索片名 / 演员 / 关键词" autocomplete="off">' +
      '<button class="go" data-go="1">搜索</button></div>';
    let body;
    if (!q) {
      const h = history();
      body = '<div class="sec"><b>热门搜索</b><span>演示词 · 来自 bootstrap</span></div>' +
        '<div class="hot">' + (d.hot_search || []).map(x =>
          '<a href="#/search?q=' + encodeURIComponent(x) + '">' + esc(x) + '</a>').join('') + '</div>' +
        (h.length ? '<div class="sec"><b>搜索历史</b><span data-clear="1" style="color:#8493a6">清空</span></div>' +
          '<div class="hot">' + h.map(x =>
            '<a href="#/search?q=' + encodeURIComponent(x) + '">' + esc(x) + '</a>').join('') + '</div>' : '') +
        '<div class="tail">接入采集站后按多源分组返回结果</div>';
    } else {
      const srcs = d.sources || [];
      body = '<div class="src-head"><b>「' + esc(q) + '」</b><span>' + (d.total || 0) +
        ' 条结果</span><em>' + esc(d.source || '') + '</em></div>' +
        srcs.map(s => '<div class="src-head" style="padding-top:10px"><b style="font-size:12px">' +
          esc(s.name) + '</b><em>' + s.count + ' 条</em></div>').join('') +
        sourceNotice(d) +
        ((d.list || []).length ? grid(d.list) : empty('没有结果', '换个关键词试试'));
    }
    return nav({ back: '#/home', title: '搜索' }) + bar + body;
  },
  mount(ctx, d, root, signal) {
    const submit = () => {
      const el = root.querySelector('#q');
      const v = (el && el.value || '').trim();
      if (!v) return toast('请输入关键词');
      remember(v);
      go('#/search?q=' + encodeURIComponent(v));
    };
    root.addEventListener('click', e => {
      if (e.target.closest('[data-go]')) return submit();
      if (e.target.closest('[data-clear]')) {
        localStorage.removeItem(HK);
        toast('已清空');
        return go('#/search');
      }
      const a = e.target.closest('.hot a');
      if (a) remember(a.textContent);
    }, { signal });
    root.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.id === 'q') submit();
    }, { signal });
  },
};
