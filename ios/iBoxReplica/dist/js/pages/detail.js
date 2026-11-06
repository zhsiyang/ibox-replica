/* 详情 · 选集 / 线路 · Task 层
   数据：GET /api/app/detail?id=  →  { vod, lines, related, source }
   线路与集数为本地状态，切换不额外请求；点播放进入 Immersive 层。 */
import { api } from '../api.js';
import { go } from '../router.js';
import { esc, grad, grid, sourceNotice, toast, icon } from '../ui.js';

const FK = 'ibox.favorites';

export default {
  tab: 'home',
  load(ctx) { return api.detail(ctx.params.id || 'demo-01'); },
  render(ctx, d) {
    const v = d.vod || {};
    const lines = d.lines || [];
    const eps = (lines[0] && lines[0].episodes) || [];
    return '<div class="dhead"><div class="dbg" style="background:' + grad(v.hue) + '"></div>' +
      '<a class="dback" href="#/home">‹</a>' +
      '<div class="dtitle"><b>' + esc(v.title || '演示片源') + '</b>' +
      '<span>' + esc(v.tag || '') + ' · ' + esc(v.year || '') + ' · ' + esc(v.area || '') + '</span></div></div>' +
      '<div class="dbody">' + sourceNotice(d) +
      '<div class="dmeta"><span>评分 ' + esc(v.score || '--') + '</span><span>' + esc(v.tag || '演示') +
      '</span><span>' + esc(v.year || '') + '</span><span>' + esc(v.area || '') +
      '</span><span>' + (d.line_count || 0) + ' 条线路</span><span>' + (d.episode_count || 0) + ' 集</span></div>' +
      '<div class="ddesc">' + esc(v.description || '') + '</div>' +
      '<div class="sec" style="padding-left:0;padding-right:0"><b>演职员</b><span>' + esc(v.director || '') + '</span></div>' +
      '<div class="ddesc" style="margin-top:0">' + esc(v.actors || '') + '</div>' +
      '<div class="dacts"><button class="btn primary" data-play="1">' + icon('play', 16) +
      ' 立即播放</button><button class="btn ghost" data-fav="1">☆ 收藏</button>' +
      '<a class="btn ghost" href="#/interfaces">切源</a></div>' +
      '<div class="sec" style="padding-left:0;padding-right:0"><b>播放线路</b><span>parseSub / prepare</span></div>' +
      '<div class="lines">' + lines.map((l, i) =>
        '<button class="ln ' + (i === 0 ? 'on' : '') + '" data-line="' + i + '">' + esc(l.name) + '</button>').join('') + '</div>' +
      '<div class="sec" style="padding-left:0;padding-right:0"><b>选集</b><span id="epTitle">' + esc(eps[0] || '') + '</span></div>' +
      '<div class="eps" id="eps">' + eps.map((x, i) =>
        '<button class="ep ' + (i === 0 ? 'on' : '') + '" data-ep="' + i + '">' + esc(x) + '</button>').join('') + '</div>' +
      '</div>' +
      '<div class="sec"><b>相关推荐</b><span>homeMore</span></div>' + grid(d.related || []) +
      '<div class="tail">数据源：' + esc(d.source || 'demo') + '</div>';
  },
  mount(ctx, d, root, signal) {
    const lines = d.lines || [];
    let li = 0, ei = 0;
    const epsBox = root.querySelector('#eps');
    const epTitle = root.querySelector('#epTitle');
    const paintEps = () => {
      const list = (lines[li] && lines[li].episodes) || [];
      epsBox.innerHTML = list.map((x, i) =>
        '<button class="ep ' + (i === ei ? 'on' : '') + '" data-ep="' + i + '">' + esc(x) + '</button>').join('');
      epTitle.textContent = list[ei] || '';
    };
    const play = () => {
      const l = lines[li] || {};
      const ep = (l.episodes || [])[ei] || '';
      go('#/player?id=' + encodeURIComponent(ctx.params.id || '') +
         '&line=' + encodeURIComponent(l.name || '') + '&ep=' + encodeURIComponent(ep));
    };
    root.addEventListener('click', e => {
      const lb = e.target.closest('[data-line]');
      if (lb) {
        li = +lb.dataset.line; ei = 0;
        root.querySelectorAll('.ln').forEach(x => x.classList.toggle('on', x === lb));
        return paintEps();
      }
      const eb = e.target.closest('[data-ep]');
      if (eb) { ei = +eb.dataset.ep; return paintEps(); }
      if (e.target.closest('[data-play]')) return play();
      if (e.target.closest('[data-fav]')) {
        let f = [];
        try { f = JSON.parse(localStorage.getItem(FK) || '[]'); } catch (err) { f = []; }
        const id = ctx.params.id || '';
        f = f.includes(id) ? f.filter(x => x !== id) : [...f, id];
        localStorage.setItem(FK, JSON.stringify(f));
        return toast(f.includes(id) ? '已收藏' : '已取消收藏');
      }
    }, { signal });
  },
};
