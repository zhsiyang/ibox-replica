/* 播放器 · Immersive 层（隐藏状态栏与 TabBar）
   数据：GET /api/app/play?id=&line=&ep=  →  { url, playable, controls }
   无真实地址时不伪造播放：中央给出明确提示，控制层仍可操作（倍速/清晰度/选集）。 */
import { api } from '../api.js';
import { go } from '../router.js';
import { esc, toast, sheet, icon } from '../ui.js';

export default {
  tab: 'home',
  immersive: true,
  load(ctx) { return api.play(ctx.params.id || '', ctx.params.line || '', ctx.params.ep || ''); },
  render(ctx, d) {
    const c = d.controls || { speeds: ['1.0x'], qualities: ['高清'], toggles: [] };
    const tools = [
      { k: 'speed', i: '⏩', t: '倍速' }, { k: 'quality', i: '◈', t: '清晰度' },
      { k: 'danmu', i: '▤', t: '弹幕' }, { k: 'cast', i: '⬡', t: '投屏' },
      { k: 'eps', i: '☰', t: '选集' }, { k: 'line', i: '⌁', t: '线路' },
    ];
    return '<div class="player"><div class="pstage">' +
      '<div class="ptop"><a class="back" href="#/detail?id=' + encodeURIComponent(ctx.params.id || '') +
      '">‹</a><b>' + esc(ctx.params.ep || '演示片源') + '</b><span>' + esc(ctx.params.line || '默认线路') + '</span></div>' +
      '<div class="pwatermark"><i>▶</i><b>' + (d.playable ? '准备播放' : '演示模式 · 无播放地址') + '</b>' +
      '<span>' + esc(d.message || '') + '</span></div>' +
      '<button class="pcenter" data-center="1">▶</button>' +
      '<div class="pbottom"><div class="pbar"><i></i></div>' +
      '<div class="ptime"><span>00:00</span><span>' + (d.playable ? '45:20' : '--:--') + '</span></div>' +
      '<div class="ptools">' + tools.map(t =>
        '<button class="pt" data-tool="' + t.k + '"><i>' + t.i + '</i>' + t.t + '</button>').join('') + '</div></div>' +
      '</div>' +
      '<div class="psheet" id="psheet"><button class="close" data-pclose="1">✕</button>' +
      '<h4 id="psTitle">控制面板</h4><div id="psBody"></div></div>' +
      '<div style="display:none" id="pconf">' + esc(JSON.stringify(c)) + '</div>' +
      '</div>';
  },
  mount(ctx, d, root, signal) {
    const conf = JSON.parse(root.querySelector('#pconf').textContent || '{}');
    const sh = root.querySelector('#psheet');
    const body = root.querySelector('#psBody');
    const title = root.querySelector('#psTitle');
    const open = (k) => {
      title.textContent = { speed: '倍速', quality: '清晰度', danmu: '弹幕设置',
        cast: '投屏设备', eps: '选集', line: '线路' }[k] || '控制面板';
      let html = '';
      if (k === 'speed' || k === 'quality') {
        const list = k === 'speed' ? conf.speeds : conf.qualities;
        html = (list || []).map((x, i) =>
          '<div class="opt ' + (i === (k === 'speed' ? 1 : 2) ? 'on' : '') + '" data-opt="' + esc(x) + '">' +
          esc(x) + '</div>').join('');
      } else if (k === 'eps') {
        html = '<div class="eps">' + Array.from({ length: 12 }, (_, i) =>
          '<button class="ep ' + (i === 0 ? 'on' : '') + '" data-pep="' + (i + 1) + '">' + (i + 1) + '</button>').join('') + '</div>';
      } else if (k === 'line') {
        html = ['默认线路', '备用线路 01', '备用线路 02'].map((x, i) =>
          '<div class="opt ' + (i === 0 ? 'on' : '') + '" data-opt="' + esc(x) + '">' + esc(x) + '</div>').join('');
      } else {
        html = '<div class="opt" data-toggle="1">开关 ' + (k === 'danmu' ? '弹幕' : '投屏') +
          '</div><div class="opt" data-toggle="1">扫描附近设备</div>';
      }
      body.innerHTML = html;
      sh.classList.add('on');
    };
    root.addEventListener('click', e => {
      const t = e.target.closest('[data-tool]');
      if (t) return open(t.dataset.tool);
      if (e.target.closest('[data-pclose]') || e.target === sh) return sh.classList.remove('on');
      const o = e.target.closest('[data-opt],[data-pep],[data-toggle]');
      if (o) {
        body.querySelectorAll('.on').forEach(x => x.classList.remove('on'));
        o.classList.add('on');
        toast('已选：' + o.textContent.trim(), 1000);
        return;
      }
      if (e.target.closest('[data-center]')) {
        return d.playable ? toast('开始播放') : toast('当前无真实播放地址，请先在接口页配置源', 2600);
      }
    }, { signal });
  },
};
