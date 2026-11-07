/* 后端 API 客户端。所有路径为同源绝对路径（/api/...），
   换域名部署时只需设置 window.__IBOX_API_BASE__ = 'https://host'。
   统一错误对象：{status, code, message, path}，不吞异常。 */
const BASE = (window.__IBOX_API_BASE__ || '').replace(/\/$/, '');

import { OFFLINE } from './offline-data.js';

// 装到手机上时后端（开发机 127.0.0.1:8788）不可达，用内置夹具保证首屏有内容。
// 结构来自 server 真实响应，页面层不需要任何特殊分支。
let offlineMode = false;
export function isOffline() { return offlineMode; }

function offlineHit(method, path, params) {
  // 写操作绝不兜底：假成功比报错更坑
  if (method !== 'GET') return null;
  switch (path) {
    case '/api/app/bootstrap': return OFFLINE.bootstrap;
    case '/api/app/home': {
      const tab = (params && params.tab) || 'movie';
      return OFFLINE.home[tab] || OFFLINE.home._default;
    }
    case '/api/app/category': return OFFLINE.category;
    case '/api/app/search':   return OFFLINE.search;
    case '/api/app/detail':   return OFFLINE.detail;
    case '/api/app/play':     return OFFLINE.play;
    case '/api/app/books':    return OFFLINE.books;
    // 接口管理相关：离线时给空集合 + 明确标记，页面正常渲染「未连接」而不是红字报错
    case '/api/cat/status':
      return { ok: true, offline: true, md5: '', cached: false,
               spider: { online: false, note: '离线演示数据' } };
    case '/api/interfaces':
      return { ok: true, offline: true, items: [], total: 0 };
    case '/api/interfaces/types':
      return { ok: true, offline: true, types: [] };
    case '/api/config/values':
      return { ok: true, offline: true, values: {} };
    default: return null;
  }
}

function qs(params) {
  if (!params) return '';
  const p = new URLSearchParams();
  Object.keys(params).forEach(k => {
    const v = params[k];
    if (v !== undefined && v !== null && v !== '') p.set(k, String(v));
  });
  const s = p.toString();
  return s ? '?' + s : '';
}

async function request(method, path, opts = {}) {
  const url = BASE + path + qs(opts.params);
  const init = { method, headers: { 'Accept': 'application/json' } };
  if (opts.body !== undefined) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(opts.body);
  }
  // 后端不可达的三种表现都算离线：fetch 直接失败、返回非 JSON（静态服务器 404 页）、
  // 5xx（iOS scheme handler 反代失败固定回 502）。只对内容接口兜底，写操作照常报错。
  const fallback = () => {
    const o = offlineHit(method, path, opts.params);
    if (o) { offlineMode = true; return o; }
    return null;
  };

  let res;
  try {
    res = await fetch(url, init);
  } catch (e) {
    const o = fallback();
    if (o) return o;
    throw { status: 0, code: 'NETWORK', message: '无法连接后端：' + e.message, path };
  }
  let doc;
  try {
    doc = await res.json();
  } catch (e) {
    const o = fallback();
    if (o) return o;
    throw { status: res.status, code: 'BAD_JSON', message: '响应不是 JSON', path };
  }
  if (!res.ok || doc.ok === false) {
    if (res.status >= 500) {
      const o = fallback();
      if (o) return o;
    }
    throw { status: res.status, code: doc.error || 'HTTP_' + res.status,
            message: doc.error || ('HTTP ' + res.status), path, doc };
  }
  return doc;
}

export const api = {
  get: (p, params) => request('GET', p, { params }),
  post: (p, body, params) => request('POST', p, { body, params }),
  put: (p, body) => request('PUT', p, { body }),
  del: (p) => request('DELETE', p),
  bootstrap: () => request('GET', '/api/app/bootstrap'),
  home: (tab, page) => request('GET', '/api/app/home', { params: { tab, page } }),
  category: (f) => request('GET', '/api/app/category', { params: f }),
  search: (q, page) => request('GET', '/api/app/search', { params: { q, page } }),
  detail: (id) => request('GET', '/api/app/detail', { params: { id } }),
  play: (id, line, ep) => request('GET', '/api/app/play', { params: { id, line, ep } }),
  books: (kind) => request('GET', '/api/app/books', { params: { kind } }),
  interfaces: (params) => request('GET', '/api/interfaces', { params }),
  types: () => request('GET', '/api/interfaces/types'),
  catStatus: () => request('GET', '/api/cat/status'),
};
