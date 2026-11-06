/* 接口管理 · Root 层（第一版核心）
   数据：/api/interfaces CRUD、/api/interfaces/types 动态 schema、/api/cat/status 订阅状态。
   15 类接口可添加；字段由 types.json 驱动，不写死；所有动作真实落 SQLite。 */
import { api } from '../api.js';
import { go } from '../router.js';
import { nav, esc, toast, sheet, closeSheet, icon, demoTag } from '../ui.js';

const ICONS = { link: '⌁', grid: '▦', book: '▤', netdisk: '☁', star: '★', clock: '◷', cast: '⬡', plus: '＋' };
const GLYPH = { '订阅配置': '⌁', '插件能力': '⚙', '内容源': '▦', '网盘凭据': '☁', '自定义': '✎' };

let state = { group: '全部', type: null };

function stateLine(r) {
  const cls = r.status === 'ok' ? 'ok' : (r.status === 'fail' || r.status === 'error' ? 'bad' : '');
  const line = r.status === 'unknown' ? '尚未探测'
    : (r.http_code || '--') + ' · ' + (r.message || r.status) +
      (r.latency_ms ? ' · ' + r.latency_ms + 'ms' : '');
  return { cls, line };
}

function card(r) {
  const s = stateLine(r);
  const t = (state.types || []).find(x => x.key === r.type) || {};
  return '<div class="icard ' + (r.enabled ? '' : 'off') + '" data-id="' + r.id + '">' +
    '<div class="ic-top"><span class="ic-ico">' + (ICONS[t.icon] || GLYPH[t.group] || '⌁') + '</span>' +
    '<div class="ic-main"><div class="ic-name"><b>' + esc(r.name) + '</b>' +
      '<span class="ic-type">' + esc(t.label || r.type) + '</span>' +
      (r.active ? '<span class="ic-cur">当前</span>' : '') + '</div>' +
    '<div class="ic-url">' + esc(r.url || '(无地址)') + '</div></div>' +
    '<button class="sw2 ' + (r.enabled ? 'on' : '') + '" data-act="toggle" data-id="' + r.id + '"></button></div>' +
    '<div class="ic-state"><span class="sdot ' + s.cls + '"></span><span class="stxt">' + esc(s.line) + '</span></div>' +
    '<div class="ic-acts">' +
      '<button data-act="detail" data-id="' + r.id + '">详情</button>' +
      '<button data-act="check" data-id="' + r.id + '">探测</button>' +
      '<button class="pri" data-act="activate" data-id="' + r.id + '">设为当前</button>' +
      '<button data-act="del" data-id="' + r.id + '">删除</button>' +
    '</div></div>';
}

function field(f, value) {
  const v = value === undefined ? (f.default === undefined ? '' : f.default) : value;
  const id = 'f_' + f.name;
  const req = f.required ? ' *' : '';
  const label = '<span>' + esc(f.label) + req + (f.hint ? ' · ' + esc(f.hint) : '') + '</span>';
  let ctl;
  if (f.type === 'textarea') {
    ctl = '<textarea id="' + id + '" rows="2" data-fn="' + esc(f.name) + '">' + esc(v) + '</textarea>';
  } else if (f.type === 'switch') {
    ctl = '<button type="button" class="btn ghost" data-switch="' + esc(f.name) + '" id="' + id +
      '" data-val="' + (v ? '1' : '0') + '" style="width:100%">' + (v ? '开启 ✓' : '关闭') + '</button>';
  } else if (f.type === 'select') {
    ctl = '<select id="' + id + '" data-fn="' + esc(f.name) + '">' + (f.options || []).map(o =>
      '<option ' + (o === v ? 'selected' : '') + '>' + esc(o) + '</option>').join('') + '</select>';
  } else {
    const t = f.type === 'number' ? 'number' : (f.type === 'password' ? 'password' : 'text');
    ctl = '<input id="' + id + '" type="' + t + '" data-fn="' + esc(f.name) + '" value="' + esc(v) + '">';
  }
  return '<label class="fld">' + label + ctl + '</label>';
}

function formHtml(types, picked, edit) {
  const t = types.find(x => x.key === picked) || types[0];
  return '<div class="sec" style="padding-left:0"><b>接口类型</b><span>' + types.length + ' 类可选</span></div>' +
    '<div class="typegrid" style="padding-left:0;padding-right:0">' + types.map(x =>
      '<button class="tg-item ' + (x.key === t.key ? 'on' : '') + '" data-pick="' + esc(x.key) + '">' +
      '<i>' + (ICONS[x.icon] || GLYPH[x.group] || '⌁') + '</i>' + esc(x.label) +
      '<span>' + esc(x.group) + '</span></button>').join('') + '</div>' +
    '<div class="sec" style="padding-left:0"><b>' + esc(t.label) + ' · 参数</b><span>' + esc(t.desc || '') + '</span></div>' +
    '<div id="formFields">' + (t.fields || []).map(f =>
      field(f, edit && (edit.config && edit.config[f.name] !== undefined ? edit.config[f.name] : edit[f.name]))).join('') + '</div>' +
    '<div class="sec" style="padding-left:0"><b>高级</b><span>可选</span></div>' +
    '<label class="fld" style="padding-left:0"><span>请求方法</span><select id="f_method" data-fn="method">' +
      ['GET', 'POST', 'PUT', 'HEAD'].map(m => '<option ' + (m === (edit && edit.method || 'GET') ? 'selected' : '') + '>' + m + '</option>').join('') +
    '</select></label>' +
    '<label class="fld" style="padding-left:0"><span>超时（秒）</span><input id="f_timeout" type="number" data-fn="timeout" value="' +
      esc(edit && edit.timeout || 10) + '"></label>' +
    '<div style="display:flex;gap:9px;margin:6px 0 4px">' +
      '<button class="btn ghost" style="flex:1" data-save="0">仅保存</button>' +
      '<button class="btn primary" style="flex:1" data-save="1">探测并保存</button></div>';
}

function collect(root) {
  const o = {};
  root.querySelectorAll('[data-fn]').forEach(el => { o[el.dataset.fn] = el.value; });
  root.querySelectorAll('[data-switch]').forEach(el => { o[el.dataset.switch] = el.dataset.val === '1'; });
  return o;
}

export default {
  tab: 'interfaces',
  async load() {
    const [list, types, cat] = await Promise.all([
      api.interfaces(), api.types(), api.catStatus(),
    ]);
    state.types = types.types || [];
    state.groups = types.groups || [];
    return { items: list.items || [], types: state.types, groups: state.groups, cat };
  },
  render(ctx, d) {
    const sub = (d.cat && d.cat.subscription) || {};
    const sp = (d.cat && d.cat.spider) || {};
    const groups = ['全部', ...(d.groups || [])];
    const items = d.items.filter(r => state.group === '全部' ||
      ((d.types.find(t => t.key === r.type) || {}).group === state.group));
    return nav({ title: '接口管理', acts:
      '<a href="#/interfaces" data-act="refresh">' + icon('refresh', 17) + '</a>' +
      '<i data-act="checkall" title="全部探测">◎</i><i data-act="export" title="导出">↥</i>' +
      '<i data-act="import" title="导入">↧</i>' }) +
      '<div class="icard" style="margin-top:4px"><div class="ic-top">' +
      '<span class="ic-ico">⌁</span><div class="ic-main"><div class="ic-name"><b>当前订阅</b>' +
      '<span class="ic-type">CatVod JS</span>' + (sub.md5_match ? '<span class="ic-cur">校验通过</span>' : '') + '</div>' +
      '<div class="ic-url">9280.kstore.vip/cat/index.js.md5</div></div></div>' +
      '<div class="ic-state"><span class="sdot ' + (sub.md5_match ? 'ok' : 'bad') + '"></span>' +
      '<span class="stxt">MD5 ' + esc(sub.md5_expected || '--') + ' · 主体 ' +
      esc(sub.js_size || '--') + ' B · 配置键 ' + ((sub.config_keys || []).length) + ' 个</span></div>' +
      '<div class="ic-state" style="border:0;padding-top:4px"><span class="sdot ' + (sp.online ? 'ok' : '') + '"></span>' +
      '<span class="stxt">本地 Spider ' + esc(sp.base || '') + ' · ' + (sp.online ? '在线' : '离线（演示数据）') + '</span></div></div>' +
      '<div class="sec"><b>接口列表</b><span>' + d.items.length + ' 个 · ' +
      d.items.filter(x => x.enabled).length + ' 启用</span></div>' +
      '<div class="chips">' + groups.map(g =>
        '<button class="chip ' + (g === state.group ? 'on' : '') + '" data-group="' + esc(g) + '">' + esc(g) + '</button>').join('') + '</div>' +
      items.map(card).join('') +
      '<div class="divider"></div>' +
      '<div style="display:flex;gap:9px;padding:0 16px 10px">' +
        '<button class="btn ghost" style="flex:1" data-act="routes">协议映射</button>' +
        '<a class="btn ghost" style="flex:1;justify-content:center" href="/interface.html" target="_blank">完整管理页 ↗</a>' +
      '</div>' +
      '<div class="tail">参数保存在本地 SQLite · 15 类接口可任意添加</div>' +
      '<button class="fab" data-act="add">＋ 添加接口</button>';
  },
  mount(ctx, d, root, signal) {
    const sh = document.getElementById('sheet');
    const sheetBody = document.getElementById('sheetBody');
    const refresh = () => go(location.hash);   // go 对同 hash 会强制 render(true)

    const openForm = (picked, edit) => {
      state.type = picked || (state.types[0] && state.types[0].key);
      sheet('添加接口', formHtml(state.types, state.type, edit));
      state.edit = edit || null;
    };

    const submit = async (doCheck) => {
      const vals = collect(sheetBody);
      const type = state.type;
      const name = vals.name || (state.types.find(t => t.key === type) || {}).label;
      const payload = {
        name, type, url: vals.url || '', method: vals.method || 'GET',
        timeout: parseInt(vals.timeout || '10', 10), remark: vals.remark || '',
        config: { ...vals },
      };
      try {
        let r;
        if (state.edit) {
          r = await api.put('/api/interfaces/' + state.edit.id, payload);
        } else {
          r = await api.post('/api/interfaces' + (doCheck ? '?check=1' : ''), payload);
        }
        toast(state.edit ? '已更新' : '已添加：' + name);
        closeSheet();
        state.edit = null;
        refresh();
        return r;
      } catch (e) { toast('保存失败：' + e.message, 2800); }
    };

    root.addEventListener('click', async e => {
      const g = e.target.closest('[data-group]');
      if (g) { state.group = g.dataset.group; return refresh(); }
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const act = b.dataset.act, id = b.dataset.id;
      try {
        if (act === 'add') return openForm();
        if (act === 'refresh') return refresh();
        if (act === 'toggle') {
          const r = d.items.find(x => x.id == id);
          await api.put('/api/interfaces/' + id, { enabled: !r.enabled });
          return refresh();
        }
        if (act === 'activate') {
          await api.post('/api/interfaces/' + id + '/activate', {});
          toast('已设为当前源'); return refresh();
        }
        if (act === 'check') {
          toast('探测中…', 1200);
          const r = await api.post('/api/interfaces/' + id + '/check', {});
          toast((r.item && r.item.status) || '完成'); return refresh();
        }
        if (act === 'del') {
          if (!confirm('删除接口 #' + id + '？')) return;
          await api.del('/api/interfaces/' + id);
          toast('已删除'); return refresh();
        }
        if (act === 'checkall') {
          toast('批量探测中…', 1500);
          const r = await api.post('/api/interfaces/check-all', {});
          toast('完成：' + r.checked + ' 个'); return refresh();
        }
        if (act === 'export') {
          const r = await api.get('/api/interfaces/export');
          const txt = JSON.stringify(r.items, null, 2);
          sheet('导出 JSON', '<pre>' + esc(txt) + '</pre><button class="btn primary" data-copy="1" style="width:100%;margin-top:12px">复制到剪贴板</button>');
          state.exportText = txt;
          return;
        }
        if (act === 'import') {
          sheet('导入 JSON', '<div class="fld" style="padding:0"><span>粘贴导出的 items 数组</span>' +
            '<textarea id="impText" rows="7" placeholder=\'[{"name":"...","type":"site","url":"..."}]\'></textarea></div>' +
            '<button class="btn primary" data-import="1" style="width:100%;margin-top:10px">导入</button>');
          return;
        }
        if (act === 'routes') {
          const r = await api.get('/api/cat/routes');
          sheet('插件协议 → CatVod 路由', '<pre>' + esc(JSON.stringify(r.protocol_map, null, 2)) +
            '\n\n路由数：' + (r.routes || []).length + '</pre>');
          return;
        }
        if (act === 'detail') {
          const [r, logs] = await Promise.all([
            api.get('/api/interfaces/' + id), api.get('/api/interfaces/' + id + '/logs', { limit: 10 }),
          ]);
          sheet('接口详情 #' + id, '<pre>' + esc(JSON.stringify(r.item, null, 2)) +
            '\n\n--- 最近探测 ---\n' + esc(JSON.stringify(logs.logs, null, 2)) + '</pre>' +
            '<button class="btn primary" data-edit="1" style="width:100%;margin-top:12px">编辑此接口</button>');
          state.detailItem = r.item;
          return;
        }
      } catch (err) { toast('操作失败：' + err.message, 2800); }
    }, { signal });

    // 浮层内的交互（#sheet 在 #view 之外，单独委托，随路由 abort 自动解绑）
    sh.addEventListener('click', async e => {
      const pick = e.target.closest('[data-pick]');
      if (pick) {
        state.type = pick.dataset.pick;
        const t = state.types.find(x => x.key === state.type);
        sheetBody.innerHTML = '<div class="sheet-body">' + formHtml(state.types, state.type, state.edit) + '</div>';
        return;
      }
      const sw = e.target.closest('[data-switch]');
      if (sw) {
        const on = sw.dataset.val !== '1';
        sw.dataset.val = on ? '1' : '0';
        sw.textContent = on ? '开启 ✓' : '关闭';
        return;
      }
      if (e.target.closest('[data-save]')) return submit(e.target.closest('[data-save]').dataset.save === '1');
      if (e.target.closest('[data-copy]')) {
        try { await navigator.clipboard.writeText(state.exportText || ''); toast('已复制'); }
        catch (err) { toast('复制失败，请手动选择文本'); }
        return;
      }
      if (e.target.closest('[data-import]')) {
        try {
          const v = JSON.parse(document.getElementById('impText').value);
          const r = await api.post('/api/interfaces/import', { items: Array.isArray(v) ? v : (v.items || []) });
          toast('导入 ' + r.imported + ' 个，重复 ' + r.duplicated + ' 个');
          closeSheet(); refresh();
        } catch (err) { toast('导入失败：' + err.message, 2800); }
        return;
      }
      if (e.target.closest('[data-edit]')) {
        const it = state.detailItem;
        closeSheet();
        return openForm(it.type, it);
      }
    }, { signal });
  },
};
