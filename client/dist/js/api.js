/* 后端 API 客户端。所有路径为同源绝对路径（/api/...），
   换域名部署时只需设置 window.__IBOX_API_BASE__ = 'https://host'。
   统一错误对象：{status, code, message, path}，不吞异常。 */
const BASE = (window.__IBOX_API_BASE__ || '').replace(/\/$/, '');

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
  let res;
  try {
    res = await fetch(url, init);
  } catch (e) {
    throw { status: 0, code: 'NETWORK', message: '无法连接后端：' + e.message, path };
  }
  let doc;
  try {
    doc = await res.json();
  } catch (e) {
    throw { status: res.status, code: 'BAD_JSON', message: '响应不是 JSON', path };
  }
  if (!res.ok || doc.ok === false) {
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
