/* iBox v1 启动入口。
   顺序：初始化浮层 → bootstrap → 注册页面 → 启动 hash 路由 → 注册 Service Worker。
   bootstrap 失败时降级为最小配置，App 仍可进入并显示错误，不白屏。 */
import { api } from './api.js';
import { register, setBootstrap, start } from './router.js';
import { initOverlays, toast, tabbar } from './ui.js';

import home from './pages/home.js';
import discover from './pages/discover.js';
import search from './pages/search.js';
import detail from './pages/detail.js';
import player from './pages/player.js';
import interfaces from './pages/interfaces.js';
import books from './pages/books.js';
import mine from './pages/mine.js';

const PAGES = { home, discover, search, detail, player, interfaces, books, mine };
const FALLBACK = {
  version: '1.0.0', bundle: 'com.super.tvbox.replica',
  tabs: [{ key: 't0', label: '推荐', verified: false }],
  nav: [{ key: 'home', label: '首页' }, { key: 'discover', label: '频道' },
        { key: 'interfaces', label: '接口' }, { key: 'books', label: '书城' },
        { key: 'mine', label: '我的' }],
  filters: {}, hot_search: [], source: { mode: 'offline', interface_count: 0 },
};

function desktop(b, ok) {
  const dot = document.getElementById('dbDot');
  const txt = document.getElementById('dbText');
  const src = document.getElementById('srcText');
  const ver = document.getElementById('buildVer');
  if (dot) dot.className = 'dot ' + (ok ? 'ok' : 'bad');
  if (txt) txt.textContent = ok ? '服务已连接' : '后端未连接';
  if (src) src.textContent = b.source && b.source.mode === 'spider' ? 'Spider 在线' : '演示数据';
  if (ver) ver.textContent = 'v' + (b.version || '1.0.0') + (window.__IBOX_BUILD__ ? ' · ' + window.__IBOX_BUILD__.trace : '');
  document.getElementById('tabbar').innerHTML = tabbar('home', b.nav || FALLBACK.nav);
}

async function boot() {
  initOverlays();
  let b = FALLBACK, ok = false;
  try {
    b = await api.bootstrap();
    ok = true;
  } catch (e) {
    toast('后端未连接：' + e.message + '（仍可浏览页面）', 4000);
  }
  setBootstrap(b);
  desktop(b, ok);
  Object.keys(PAGES).forEach(k => register(k, PAGES[k]));
  await start();

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(() => { const l = document.getElementById('dsLog');
        if (l) l.textContent += '\nService Worker 已注册'; })
      .catch(() => {});   // 非 HTTPS / 被策略禁用时静默降级，不影响主流程
  }
}

boot();
