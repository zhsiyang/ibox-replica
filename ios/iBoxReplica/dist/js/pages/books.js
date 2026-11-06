/* 书城 / 听书 · Root 层
   数据：GET /api/app/books?kind=  →  { kind, verified, sections }
   分类词来自拆包 ui_zh.txt，verified 标记是否真的在原 App 文案里出现。 */
import { api } from '../api.js';
import { go } from '../router.js';
import { nav, esc, grad, sourceNotice, icon } from '../ui.js';

const KINDS = ['书城', '小说', '漫画', '听书', '直播', '网盘'];

function row(c) {
  return '<div class="bcard"><span class="bc-art" style="background:' + grad(c.hue) + '"></span>' +
    '<div class="bc-main"><b>' + esc(c.title) + '</b><span>' + esc(c.tag) + ' · ' +
    esc(c.remark || '') + '</span></div><span style="color:#ffcf7a;font-size:11px">' + esc(c.score) + '</span></div>';
}

export default {
  tab: 'books',
  load(ctx) { return api.books(ctx.params.kind || '书城'); },
  render(ctx, d) {
    const kind = d.kind || '书城';
    return nav({ title: '书城', acts: '<a href="#/search">' + icon('search', 19) + '</a>' }) +
      '<div class="chips" style="padding-top:4px">' + KINDS.map(k =>
        '<a class="chip ' + (k === kind ? 'on' : '') + '" href="#/books?kind=' + encodeURIComponent(k) + '">' + esc(k) + '</a>').join('') + '</div>' +
      '<div class="notice">' + esc(kind) + ' · 拆包文案校验：' + (d.verified ? '命中 ✓' : '未命中') +
      '<br>模块来自 UI/Book、UI/Comic、UI/Read、Live、UI/YunPan</div>' +
      sourceNotice(d) +
      (d.sections || []).map(s =>
        '<div class="sec"><b>' + esc(s.title) + '</b><span>' + (s.items || []).length + ' 条</span></div>' +
        '<div class="bsection">' + (s.items || []).map(row).join('') + '</div>').join('') +
      '<div class="tail">书城 / 听书 / 直播 / 网盘模块 · 第一版结构占位</div>';
  },
};
