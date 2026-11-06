/* 我的 · Root 层
   数据：/api/cat/status + /api/interfaces（统计），收藏数取 localStorage。
   所有入口都有落地页或浮层，不设空链接。 */
import { api } from '../api.js';
import { getBootstrap } from '../router.js';
import { nav, esc, toast, sheet, icon } from '../ui.js';

const FK = 'ibox.favorites';
function favCount() {
  try { return JSON.parse(localStorage.getItem(FK) || '[]').length; } catch (e) { return 0; }
}
function histCount() {
  try { return JSON.parse(localStorage.getItem('ibox.search.history') || '[]').length; } catch (e) { return 0; }
}

export default {
  tab: 'mine',
  async load() {
    const [cat, list] = await Promise.all([api.catStatus(), api.interfaces()]);
    return { cat, items: list.items || [] };
  },
  render(ctx, d) {
    const boot = getBootstrap() || {};
    const sp = d.cat.spider || {};
    const rows = [
      { i: '⌘', t: '接口管理', e: d.items.length + ' 个接口', href: '#/interfaces' },
      { i: '◷', t: '播放记录', e: '本地记录', act: 'log' },
      { i: '★', t: '我的收藏', e: favCount() + ' 条', act: 'fav' },
      { i: '↓', t: '下载管理', e: '第一版未开放下载', act: 'soon' },
      { i: '☁', t: '网盘 Token', e: '凭据键值', act: 'token' },
      { i: '⚙', t: '播放器设置', e: '倍速 / 清晰度', href: '#/detail?id=demo-01' },
      { i: 'ⓘ', t: '关于本版本', e: 'v' + (boot.version || '1.0.0'), act: 'about' },
    ];
    return nav({ title: '我的', acts: '<i data-act="about" style="font-style:normal">' + icon('setting', 19) + '</i>' }) +
      '<div class="profile"><div class="av">🐷</div><div><b>点击登录</b>' +
      '<span>本地模式 · 数据源 ' + esc(sp.online ? 'Spider 在线' : '演示夹具') + '</span></div></div>' +
      '<div class="stats">' +
        '<div class="st"><b>' + favCount() + '</b><span>收藏</span></div>' +
        '<div class="st"><b>' + histCount() + '</b><span>搜索历史</span></div>' +
        '<div class="st"><b>' + d.items.filter(x => x.enabled).length + '</b><span>启用接口</span></div>' +
      '</div>' +
      '<div class="mlist">' + rows.map(r =>
        r.href ? '<a class="mrow" href="' + r.href + '"><i>' + r.i + '</i><span>' + esc(r.t) +
          '</span><em>' + esc(r.e) + '</em><span class="chev">›</span></a>'
          : '<div class="mrow" data-act="' + r.act + '"><i>' + r.i + '</i><span>' + esc(r.t) +
          '</span><em>' + esc(r.e) + '</em><span class="chev">›</span></div>').join('') + '</div>' +
      '<div class="tail">com.super.tvbox.replica · iBox v' + esc(boot.version || '1.0.0') + '</div>';
  },
  mount(ctx, d, root, signal) {
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const a = b.dataset.act;
      if (a === 'about') {
        return sheet('关于 iBox 第一版', '<pre>' + esc(JSON.stringify({
          version: (getBootstrap() || {}).version,
          bundle: (getBootstrap() || {}).bundle,
          source: (getBootstrap() || {}).source,
          build: window.__IBOX_BUILD__,
        }, null, 2)) + '</pre>');
      }
      if (a === 'fav') {
        let f = [];
        try { f = JSON.parse(localStorage.getItem(FK) || '[]'); } catch (err) { f = []; }
        return sheet('我的收藏', '<pre>' + esc(f.length ? f.join('\n') : '暂无收藏') + '</pre>');
      }
      if (a === 'log') {
        let h = [];
        try { h = JSON.parse(localStorage.getItem('ibox.search.history') || '[]'); } catch (err) { h = []; }
        return sheet('播放记录 / 搜索历史', '<pre>' + esc(h.length ? h.join('\n') : '暂无记录') +
          '\n\n播放记录需接真实播放源后写入。</pre>');
      }
      if (a === 'token') {
        return api.get('/api/config/values').then(r =>
          sheet('网盘 Token / 凭据键值', '<pre>' + esc(JSON.stringify(r.values, null, 2)) + '</pre>'))
          .catch(err => toast('读取失败：' + err.message));
      }
      if (a === 'soon') return toast('第一版未开放下载，接口与播放链路已就绪', 2200);
    }, { signal });
  },
};
