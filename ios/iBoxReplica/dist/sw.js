/* iBox v1 Service Worker。
   1.0.0 / 9d286adb / [
  "./",
  "./assets/icon.png",
  "./assets/splash.png",
  "./css/app.css",
  "./index.html",
  "./js/api.js",
  "./js/app.js",
  "./js/pages/books.js",
  "./js/pages/detail.js",
  "./js/pages/discover.js",
  "./js/pages/home.js",
  "./js/pages/interfaces.js",
  "./js/pages/mine.js",
  "./js/pages/player.js",
  "./js/pages/search.js",
  "./js/router.js",
  "./js/ui.js",
  "./manifest.webmanifest"
] 由 tools/build_client.js 注入真实值。
   策略：/api/ 与 /health 永远走网络（no-store，避免拿到过期接口状态）；
        静态资源 cache-first + 后台更新（stale-while-revalidate）。 */
const CACHE = 'ibox-v1-1.0.0-9d286adb';
const PRECACHE = [
  "./",
  "./assets/icon.png",
  "./assets/splash.png",
  "./css/app.css",
  "./index.html",
  "./js/api.js",
  "./js/app.js",
  "./js/pages/books.js",
  "./js/pages/detail.js",
  "./js/pages/discover.js",
  "./js/pages/home.js",
  "./js/pages/interfaces.js",
  "./js/pages/mine.js",
  "./js/pages/player.js",
  "./js/pages/search.js",
  "./js/router.js",
  "./js/ui.js",
  "./manifest.webmanifest"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.indexOf('ibox-v1-') === 0 && k !== CACHE).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.pathname.indexOf('/api/') === 0 || url.pathname === '/health') return;
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
