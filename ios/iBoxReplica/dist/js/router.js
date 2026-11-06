/* Hash 路由。页面契约：
   { tab, immersive?, load(ctx) -> Promise<data>, render(ctx,data) -> html,
     mount(ctx,data,root,signal)? }
   每次切换用 AbortController 取消上一次的事件监听，避免重复绑定。 */
import { tabbar, nav, loading, empty, esc, toast } from './ui.js';

const routes = new Map();
let boot = null;
let current = null;
let seq = 0;

export function register(key, page) { routes.set(key, page); }
export function setBootstrap(b) { boot = b; }
export function getBootstrap() { return boot; }

export function parse(hash) {
  const h = (hash || location.hash || '#/home').replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  const key = (path || 'home').split('/')[0];
  const params = {};
  new URLSearchParams(qs || '').forEach((v, k) => { params[k] = v; });
  return { key, params, raw: h };
}

export function go(hash) {
  if (location.hash === hash) return render(true);
  location.hash = hash;
}

function chrome(page, ctx) {
  document.body.classList.toggle('immersive', !!page.immersive);
  const bar = document.getElementById('tabbar');
  bar.innerHTML = page.immersive ? '' : tabbar(page.tab || ctx.key, (boot && boot.nav) || []);
  bar.style.display = page.immersive ? 'none' : '';
}

export async function render(force = false) {
  const ctx = parse();
  const page = routes.get(ctx.key) || routes.get('home');
  const my = ++seq;
  if (current) current.abort();
  current = new AbortController();
  const root = document.getElementById('view');
  chrome(page, ctx);
  root.innerHTML = loading();
  root.scrollTop = 0;
  try {
    const data = page.load ? await page.load(ctx) : {};
    if (my !== seq) return;                       // 快速连点只认最后一次
    root.innerHTML = page.render(ctx, data);
    root.scrollTop = 0;
    if (page.mount) page.mount(ctx, data, root, current.signal);
    const log = document.getElementById('dsLog');
    if (log) log.textContent = '#' + ctx.raw + '\n' +
      (data && data.source ? 'source: ' + data.source : 'rendered') + '\n' +
      new Date().toLocaleTimeString('zh-CN');
  } catch (e) {
    if (my !== seq) return;
    root.innerHTML = nav({ back: '#/home', title: '出错' }) +
      empty('页面加载失败', (e && e.message) || String(e)) +
      '<div class="pad"><button class="btn ghost" data-retry="1">重试</button></div>';
    root.addEventListener('click', ev => {
      if (ev.target.closest('[data-retry]')) render(true);
    }, { signal: current.signal });
    toast('加载失败：' + ((e && e.message) || '未知错误'));
  }
}

export function start() {
  window.addEventListener('hashchange', () => render());
  if (!location.hash) location.replace('#/home');
  return render();
}
