/* 自动生成，勿手改：tools/make_offline.py
   App 内后端不可达时的兜底数据，结构与 /api/app/* 在线响应完全一致。*/
export const OFFLINE = {
  "bootstrap": {
    "ok": true,
    "version": "1.0.0",
    "bundle": "com.super.tvbox.replica",
    "tabs": [
      {
        "key": "t0",
        "label": "推荐",
        "verified": true
      },
      {
        "key": "t1",
        "label": "电影",
        "verified": true
      },
      {
        "key": "t2",
        "label": "电视剧",
        "verified": true
      },
      {
        "key": "t3",
        "label": "综艺",
        "verified": true
      },
      {
        "key": "t4",
        "label": "动漫",
        "verified": true
      },
      {
        "key": "t5",
        "label": "少儿",
        "verified": false
      },
      {
        "key": "t6",
        "label": "纪录片",
        "verified": true
      },
      {
        "key": "t7",
        "label": "短剧",
        "verified": true
      }
    ],
    "modules": [
      {
        "label": "音乐",
        "verified": true
      },
      {
        "label": "听书",
        "verified": true
      },
      {
        "label": "小说",
        "verified": true
      },
      {
        "label": "漫画",
        "verified": true
      },
      {
        "label": "直播",
        "verified": true
      },
      {
        "label": "网盘",
        "verified": true
      },
      {
        "label": "书城",
        "verified": true
      },
      {
        "label": "频道",
        "verified": true
      }
    ],
    "filters": {
      "type": [
        "全部",
        "电影",
        "电视剧",
        "综艺",
        "动漫",
        "纪录片",
        "短剧"
      ],
      "area": [
        "全部",
        "内地",
        "港台",
        "日韩",
        "欧美",
        "其他"
      ],
      "year": [
        "全部",
        "2025",
        "2024",
        "2023",
        "2022",
        "2021"
      ],
      "sort": [
        "综合排序",
        "评分最高",
        "最新上线"
      ]
    },
    "hot_search": [
      "演示热词 01",
      "演示热词 02",
      "演示热词 03",
      "演示热词 04",
      "演示热词 05",
      "演示热词 06"
    ],
    "nav": [
      {
        "key": "home",
        "label": "首页"
      },
      {
        "key": "discover",
        "label": "频道"
      },
      {
        "key": "interfaces",
        "label": "接口"
      },
      {
        "key": "books",
        "label": "书城"
      },
      {
        "key": "mine",
        "label": "我的"
      }
    ],
    "source": {
      "mode": "demo",
      "spider_online": false,
      "spider_base": "http://127.0.0.1:9988",
      "active_interface": {
        "id": 1,
        "name": "CatVod JS 订阅（用户指定）",
        "type": "subscribe_js",
        "url": "https://9280.kstore.vip/cat/index.js"
      },
      "interface_count": 10,
      "enabled_count": 4,
      "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换"
    },
    "ui_text_source": "analysis/cstrings.txt + ui_zh.txt（Mach-O __cstring）+ remote/index.js（用户指定订阅源）"
  },
  "home": {
    "movie": {
      "tab": "movie",
      "page": 1,
      "banners": [
        {
          "id": "bn-0",
          "title": "本期推荐 · 演示轮播 01",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#1d3b5c",
            "#3a8de8"
          ]
        },
        {
          "id": "bn-1",
          "title": "本期推荐 · 演示轮播 02",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#123f3b",
            "#22c9b4"
          ]
        },
        {
          "id": "bn-2",
          "title": "本期推荐 · 演示轮播 03",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#3b2352",
            "#8b5cf6"
          ]
        }
      ],
      "groups": [
        {
          "key": "hot",
          "title": "正在热播",
          "subtitle": "首页推荐位 · homeList.groups[0]",
          "layout": "grid",
          "items": [
            {
              "id": "hot-01",
              "title": "慢镜头 · 短剧 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "精选",
              "remark": "第 1 期",
              "score": "8.7",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2023",
              "area": "内地",
              "type": "短剧"
            },
            {
              "id": "hot-02",
              "title": "午后剧场 · 短剧 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "hot-03",
              "title": "光影剧场 · 纪录片 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "精选",
              "remark": "第 3 期",
              "score": "9.2",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2023",
              "area": "其他",
              "type": "纪录片"
            },
            {
              "id": "hot-04",
              "title": "极限视界 · 电影 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.0",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2021",
              "area": "其他",
              "type": "电影"
            },
            {
              "id": "hot-05",
              "title": "慢镜头 · 动漫 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "动漫",
              "badge": "上新",
              "remark": "第 5 期",
              "score": "9.7",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2023",
              "area": "日韩",
              "type": "动漫"
            },
            {
              "id": "hot-06",
              "title": "星夜档 · 综艺 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "演示",
              "remark": "第 6 期",
              "score": "7.8",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2024",
              "area": "其他",
              "type": "综艺"
            }
          ]
        },
        {
          "key": "rank",
          "title": "榜单精选",
          "subtitle": "分组卡片 · homeList.groups[1]",
          "layout": "rank",
          "items": [
            {
              "id": "rank-01",
              "title": "光影剧场 · 综艺 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "上新",
              "remark": "第 1 期",
              "score": "7.8",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2024",
              "area": "欧美",
              "type": "综艺"
            },
            {
              "id": "rank-02",
              "title": "声浪现场 · 综艺 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.2",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2023",
              "area": "内地",
              "type": "综艺"
            },
            {
              "id": "rank-03",
              "title": "星夜档 · 电影 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "精选",
              "remark": "第 3 期",
              "score": "8.2",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2023",
              "area": "欧美",
              "type": "电影"
            },
            {
              "id": "rank-04",
              "title": "极限视界 · 纪录片 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "上新",
              "remark": "第 4 期",
              "score": "8.0",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2021",
              "area": "港台",
              "type": "纪录片"
            },
            {
              "id": "rank-05",
              "title": "午后剧场 · 动漫 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "动漫",
              "badge": "上新",
              "remark": "第 5 期",
              "score": "8.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "动漫"
            }
          ]
        },
        {
          "key": "new",
          "title": "最新上线",
          "subtitle": "分组卡片 · homeList.groups[2]",
          "layout": "grid",
          "items": [
            {
              "id": "new-01",
              "title": "声浪现场 · 综艺 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "热播",
              "remark": "第 1 期",
              "score": "7.2",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2023",
              "area": "内地",
              "type": "综艺"
            },
            {
              "id": "new-02",
              "title": "光影剧场 · 综艺 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.8",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2024",
              "area": "欧美",
              "type": "综艺"
            },
            {
              "id": "new-03",
              "title": "慢镜头 · 电视剧 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电视剧",
              "badge": "演示",
              "remark": "第 3 期",
              "score": "7.1",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2022",
              "area": "其他",
              "type": "电视剧"
            },
            {
              "id": "new-04",
              "title": "极限视界 · 纪录片 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.4",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2025",
              "area": "欧美",
              "type": "纪录片"
            },
            {
              "id": "new-05",
              "title": "城市纪录 · 短剧 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "热播",
              "remark": "第 5 期",
              "score": "9.3",
              "hue": [
                "#123f3b",
                "#22c9b4"
              ],
              "year": "2024",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "new-06",
              "title": "光影剧场 · 电影 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 6 期",
              "score": "8.2",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2023",
              "area": "其他",
              "type": "电影"
            }
          ]
        },
        {
          "key": "like",
          "title": "猜你喜欢",
          "subtitle": "homeMore 分页入口",
          "layout": "waterfall",
          "items": [
            {
              "id": "like-01",
              "title": "午后剧场 · 短剧 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "上新",
              "remark": "第 1 期",
              "score": "7.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "like-02",
              "title": "山海纪实 · 电视剧 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电视剧",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.7",
              "hue": [
                "#4a2a20",
                "#e07a45"
              ],
              "year": "2023",
              "area": "港台",
              "type": "电视剧"
            },
            {
              "id": "like-03",
              "title": "光影剧场 · 电影 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "演示",
              "remark": "第 3 期",
              "score": "7.0",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "电影"
            },
            {
              "id": "like-04",
              "title": "极限视界 · 电影 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.6",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2022",
              "area": "内地",
              "type": "电影"
            },
            {
              "id": "like-05",
              "title": "光影剧场 · 电影 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "演示",
              "remark": "第 5 期",
              "score": "9.4",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2025",
              "area": "港台",
              "type": "电影"
            },
            {
              "id": "like-06",
              "title": "星夜档 · 电影 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "精选",
              "remark": "第 6 期",
              "score": "8.8",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2024",
              "area": "其他",
              "type": "电影"
            },
            {
              "id": "like-07",
              "title": "声浪现场 · 综艺 07",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "上新",
              "remark": "第 7 期",
              "score": "9.6",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2022",
              "area": "其他",
              "type": "综艺"
            },
            {
              "id": "like-08",
              "title": "极限视界 · 纪录片 08",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "精选",
              "remark": "第 8 期",
              "score": "9.8",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2024",
              "area": "日韩",
              "type": "纪录片"
            }
          ]
        }
      ],
      "ok": true,
      "source": "demo",
      "fixture": true,
      "protocol": "homeList",
      "path": "/homeVod",
      "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换",
      "reason": "local spider offline: URLError: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>",
      "hint": "启动 CatVod index.js（127.0.0.1:9988）或在「接口」页激活源后自动切换真实数据"
    },
    "tv": {
      "tab": "tv",
      "page": 1,
      "banners": [
        {
          "id": "bn-0",
          "title": "本期推荐 · 演示轮播 01",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#1d3b5c",
            "#3a8de8"
          ]
        },
        {
          "id": "bn-1",
          "title": "本期推荐 · 演示轮播 02",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#123f3b",
            "#22c9b4"
          ]
        },
        {
          "id": "bn-2",
          "title": "本期推荐 · 演示轮播 03",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#3b2352",
            "#8b5cf6"
          ]
        }
      ],
      "groups": [
        {
          "key": "hot",
          "title": "正在热播",
          "subtitle": "首页推荐位 · homeList.groups[0]",
          "layout": "grid",
          "items": [
            {
              "id": "hot-01",
              "title": "慢镜头 · 短剧 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "精选",
              "remark": "第 1 期",
              "score": "8.7",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2023",
              "area": "内地",
              "type": "短剧"
            },
            {
              "id": "hot-02",
              "title": "午后剧场 · 短剧 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "hot-03",
              "title": "光影剧场 · 纪录片 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "精选",
              "remark": "第 3 期",
              "score": "9.2",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2023",
              "area": "其他",
              "type": "纪录片"
            },
            {
              "id": "hot-04",
              "title": "极限视界 · 电影 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.0",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2021",
              "area": "其他",
              "type": "电影"
            },
            {
              "id": "hot-05",
              "title": "慢镜头 · 动漫 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "动漫",
              "badge": "上新",
              "remark": "第 5 期",
              "score": "9.7",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2023",
              "area": "日韩",
              "type": "动漫"
            },
            {
              "id": "hot-06",
              "title": "星夜档 · 综艺 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "演示",
              "remark": "第 6 期",
              "score": "7.8",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2024",
              "area": "其他",
              "type": "综艺"
            }
          ]
        },
        {
          "key": "rank",
          "title": "榜单精选",
          "subtitle": "分组卡片 · homeList.groups[1]",
          "layout": "rank",
          "items": [
            {
              "id": "rank-01",
              "title": "光影剧场 · 综艺 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "上新",
              "remark": "第 1 期",
              "score": "7.8",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2024",
              "area": "欧美",
              "type": "综艺"
            },
            {
              "id": "rank-02",
              "title": "声浪现场 · 综艺 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.2",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2023",
              "area": "内地",
              "type": "综艺"
            },
            {
              "id": "rank-03",
              "title": "星夜档 · 电影 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "精选",
              "remark": "第 3 期",
              "score": "8.2",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2023",
              "area": "欧美",
              "type": "电影"
            },
            {
              "id": "rank-04",
              "title": "极限视界 · 纪录片 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "上新",
              "remark": "第 4 期",
              "score": "8.0",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2021",
              "area": "港台",
              "type": "纪录片"
            },
            {
              "id": "rank-05",
              "title": "午后剧场 · 动漫 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "动漫",
              "badge": "上新",
              "remark": "第 5 期",
              "score": "8.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "动漫"
            }
          ]
        },
        {
          "key": "new",
          "title": "最新上线",
          "subtitle": "分组卡片 · homeList.groups[2]",
          "layout": "grid",
          "items": [
            {
              "id": "new-01",
              "title": "声浪现场 · 综艺 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "热播",
              "remark": "第 1 期",
              "score": "7.2",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2023",
              "area": "内地",
              "type": "综艺"
            },
            {
              "id": "new-02",
              "title": "光影剧场 · 综艺 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.8",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2024",
              "area": "欧美",
              "type": "综艺"
            },
            {
              "id": "new-03",
              "title": "慢镜头 · 电视剧 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电视剧",
              "badge": "演示",
              "remark": "第 3 期",
              "score": "7.1",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2022",
              "area": "其他",
              "type": "电视剧"
            },
            {
              "id": "new-04",
              "title": "极限视界 · 纪录片 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.4",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2025",
              "area": "欧美",
              "type": "纪录片"
            },
            {
              "id": "new-05",
              "title": "城市纪录 · 短剧 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "热播",
              "remark": "第 5 期",
              "score": "9.3",
              "hue": [
                "#123f3b",
                "#22c9b4"
              ],
              "year": "2024",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "new-06",
              "title": "光影剧场 · 电影 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 6 期",
              "score": "8.2",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2023",
              "area": "其他",
              "type": "电影"
            }
          ]
        },
        {
          "key": "like",
          "title": "猜你喜欢",
          "subtitle": "homeMore 分页入口",
          "layout": "waterfall",
          "items": [
            {
              "id": "like-01",
              "title": "午后剧场 · 短剧 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "上新",
              "remark": "第 1 期",
              "score": "7.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "like-02",
              "title": "山海纪实 · 电视剧 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电视剧",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.7",
              "hue": [
                "#4a2a20",
                "#e07a45"
              ],
              "year": "2023",
              "area": "港台",
              "type": "电视剧"
            },
            {
              "id": "like-03",
              "title": "光影剧场 · 电影 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "演示",
              "remark": "第 3 期",
              "score": "7.0",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "电影"
            },
            {
              "id": "like-04",
              "title": "极限视界 · 电影 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.6",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2022",
              "area": "内地",
              "type": "电影"
            },
            {
              "id": "like-05",
              "title": "光影剧场 · 电影 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "演示",
              "remark": "第 5 期",
              "score": "9.4",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2025",
              "area": "港台",
              "type": "电影"
            },
            {
              "id": "like-06",
              "title": "星夜档 · 电影 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "精选",
              "remark": "第 6 期",
              "score": "8.8",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2024",
              "area": "其他",
              "type": "电影"
            },
            {
              "id": "like-07",
              "title": "声浪现场 · 综艺 07",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "上新",
              "remark": "第 7 期",
              "score": "9.6",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2022",
              "area": "其他",
              "type": "综艺"
            },
            {
              "id": "like-08",
              "title": "极限视界 · 纪录片 08",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "精选",
              "remark": "第 8 期",
              "score": "9.8",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2024",
              "area": "日韩",
              "type": "纪录片"
            }
          ]
        }
      ],
      "ok": true,
      "source": "demo",
      "fixture": true,
      "protocol": "homeList",
      "path": "/homeVod",
      "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换",
      "reason": "local spider offline: URLError: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>",
      "hint": "启动 CatVod index.js（127.0.0.1:9988）或在「接口」页激活源后自动切换真实数据"
    },
    "_default": {
      "tab": "movie",
      "page": 1,
      "banners": [
        {
          "id": "bn-0",
          "title": "本期推荐 · 演示轮播 01",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#1d3b5c",
            "#3a8de8"
          ]
        },
        {
          "id": "bn-1",
          "title": "本期推荐 · 演示轮播 02",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#123f3b",
            "#22c9b4"
          ]
        },
        {
          "id": "bn-2",
          "title": "本期推荐 · 演示轮播 03",
          "subtitle": "iBox 复刻第一版 · 演示条目",
          "hue": [
            "#3b2352",
            "#8b5cf6"
          ]
        }
      ],
      "groups": [
        {
          "key": "hot",
          "title": "正在热播",
          "subtitle": "首页推荐位 · homeList.groups[0]",
          "layout": "grid",
          "items": [
            {
              "id": "hot-01",
              "title": "慢镜头 · 短剧 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "精选",
              "remark": "第 1 期",
              "score": "8.7",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2023",
              "area": "内地",
              "type": "短剧"
            },
            {
              "id": "hot-02",
              "title": "午后剧场 · 短剧 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "hot-03",
              "title": "光影剧场 · 纪录片 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "精选",
              "remark": "第 3 期",
              "score": "9.2",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2023",
              "area": "其他",
              "type": "纪录片"
            },
            {
              "id": "hot-04",
              "title": "极限视界 · 电影 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.0",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2021",
              "area": "其他",
              "type": "电影"
            },
            {
              "id": "hot-05",
              "title": "慢镜头 · 动漫 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "动漫",
              "badge": "上新",
              "remark": "第 5 期",
              "score": "9.7",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2023",
              "area": "日韩",
              "type": "动漫"
            },
            {
              "id": "hot-06",
              "title": "星夜档 · 综艺 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "演示",
              "remark": "第 6 期",
              "score": "7.8",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2024",
              "area": "其他",
              "type": "综艺"
            }
          ]
        },
        {
          "key": "rank",
          "title": "榜单精选",
          "subtitle": "分组卡片 · homeList.groups[1]",
          "layout": "rank",
          "items": [
            {
              "id": "rank-01",
              "title": "光影剧场 · 综艺 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "上新",
              "remark": "第 1 期",
              "score": "7.8",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2024",
              "area": "欧美",
              "type": "综艺"
            },
            {
              "id": "rank-02",
              "title": "声浪现场 · 综艺 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.2",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2023",
              "area": "内地",
              "type": "综艺"
            },
            {
              "id": "rank-03",
              "title": "星夜档 · 电影 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "精选",
              "remark": "第 3 期",
              "score": "8.2",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2023",
              "area": "欧美",
              "type": "电影"
            },
            {
              "id": "rank-04",
              "title": "极限视界 · 纪录片 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "上新",
              "remark": "第 4 期",
              "score": "8.0",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2021",
              "area": "港台",
              "type": "纪录片"
            },
            {
              "id": "rank-05",
              "title": "午后剧场 · 动漫 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "动漫",
              "badge": "上新",
              "remark": "第 5 期",
              "score": "8.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "动漫"
            }
          ]
        },
        {
          "key": "new",
          "title": "最新上线",
          "subtitle": "分组卡片 · homeList.groups[2]",
          "layout": "grid",
          "items": [
            {
              "id": "new-01",
              "title": "声浪现场 · 综艺 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "热播",
              "remark": "第 1 期",
              "score": "7.2",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2023",
              "area": "内地",
              "type": "综艺"
            },
            {
              "id": "new-02",
              "title": "光影剧场 · 综艺 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.8",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2024",
              "area": "欧美",
              "type": "综艺"
            },
            {
              "id": "new-03",
              "title": "慢镜头 · 电视剧 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电视剧",
              "badge": "演示",
              "remark": "第 3 期",
              "score": "7.1",
              "hue": [
                "#3d3520",
                "#c9a227"
              ],
              "year": "2022",
              "area": "其他",
              "type": "电视剧"
            },
            {
              "id": "new-04",
              "title": "极限视界 · 纪录片 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.4",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2025",
              "area": "欧美",
              "type": "纪录片"
            },
            {
              "id": "new-05",
              "title": "城市纪录 · 短剧 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "热播",
              "remark": "第 5 期",
              "score": "9.3",
              "hue": [
                "#123f3b",
                "#22c9b4"
              ],
              "year": "2024",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "new-06",
              "title": "光影剧场 · 电影 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 6 期",
              "score": "8.2",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2023",
              "area": "其他",
              "type": "电影"
            }
          ]
        },
        {
          "key": "like",
          "title": "猜你喜欢",
          "subtitle": "homeMore 分页入口",
          "layout": "waterfall",
          "items": [
            {
              "id": "like-01",
              "title": "午后剧场 · 短剧 01",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "短剧",
              "badge": "上新",
              "remark": "第 1 期",
              "score": "7.5",
              "hue": [
                "#40233a",
                "#d2568c"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "短剧"
            },
            {
              "id": "like-02",
              "title": "山海纪实 · 电视剧 02",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电视剧",
              "badge": "精选",
              "remark": "第 2 期",
              "score": "7.7",
              "hue": [
                "#4a2a20",
                "#e07a45"
              ],
              "year": "2023",
              "area": "港台",
              "type": "电视剧"
            },
            {
              "id": "like-03",
              "title": "光影剧场 · 电影 03",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "演示",
              "remark": "第 3 期",
              "score": "7.0",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2021",
              "area": "日韩",
              "type": "电影"
            },
            {
              "id": "like-04",
              "title": "极限视界 · 电影 04",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "热播",
              "remark": "第 4 期",
              "score": "7.6",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2022",
              "area": "内地",
              "type": "电影"
            },
            {
              "id": "like-05",
              "title": "光影剧场 · 电影 05",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "演示",
              "remark": "第 5 期",
              "score": "9.4",
              "hue": [
                "#1d3b5c",
                "#3a8de8"
              ],
              "year": "2025",
              "area": "港台",
              "type": "电影"
            },
            {
              "id": "like-06",
              "title": "星夜档 · 电影 06",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "电影",
              "badge": "精选",
              "remark": "第 6 期",
              "score": "8.8",
              "hue": [
                "#1f3550",
                "#4f8fd8"
              ],
              "year": "2024",
              "area": "其他",
              "type": "电影"
            },
            {
              "id": "like-07",
              "title": "声浪现场 · 综艺 07",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "综艺",
              "badge": "上新",
              "remark": "第 7 期",
              "score": "9.6",
              "hue": [
                "#3b2352",
                "#8b5cf6"
              ],
              "year": "2022",
              "area": "其他",
              "type": "综艺"
            },
            {
              "id": "like-08",
              "title": "极限视界 · 纪录片 08",
              "subtitle": "iBox 复刻第一版 · 演示条目",
              "tag": "纪录片",
              "badge": "精选",
              "remark": "第 8 期",
              "score": "9.8",
              "hue": [
                "#233f2c",
                "#4fae6a"
              ],
              "year": "2024",
              "area": "日韩",
              "type": "纪录片"
            }
          ]
        }
      ],
      "ok": true,
      "source": "demo",
      "fixture": true,
      "protocol": "homeList",
      "path": "/homeVod",
      "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换",
      "reason": "local spider offline: URLError: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>",
      "hint": "启动 CatVod index.js（127.0.0.1:9988）或在「接口」页激活源后自动切换真实数据"
    }
  },
  "category": {
    "filters": {
      "type": [
        "全部",
        "电影",
        "电视剧",
        "综艺",
        "动漫",
        "纪录片",
        "短剧"
      ],
      "area": [
        "全部",
        "内地",
        "港台",
        "日韩",
        "欧美",
        "其他"
      ],
      "year": [
        "全部",
        "2025",
        "2024",
        "2023",
        "2022",
        "2021"
      ],
      "sort": [
        "综合排序",
        "评分最高",
        "最新上线"
      ]
    },
    "active": {
      "type": "movie",
      "area": "all",
      "year": "all",
      "sort": "hot"
    },
    "list": [
      {
        "id": "cat-01",
        "title": "慢镜头 · 短剧 01",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "短剧",
        "badge": "上新",
        "remark": "第 1 期",
        "score": "9.9",
        "hue": [
          "#3d3520",
          "#c9a227"
        ],
        "year": "2025",
        "area": "日韩",
        "type": "短剧"
      },
      {
        "id": "cat-02",
        "title": "午后剧场 · 动漫 02",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "动漫",
        "badge": "热播",
        "remark": "第 2 期",
        "score": "7.9",
        "hue": [
          "#40233a",
          "#d2568c"
        ],
        "year": "2025",
        "area": "港台",
        "type": "动漫"
      },
      {
        "id": "cat-03",
        "title": "声浪现场 · 综艺 03",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "综艺",
        "badge": "上新",
        "remark": "第 3 期",
        "score": "9.6",
        "hue": [
          "#3b2352",
          "#8b5cf6"
        ],
        "year": "2022",
        "area": "其他",
        "type": "综艺"
      },
      {
        "id": "cat-04",
        "title": "光影剧场 · 电影 04",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "电影",
        "badge": "演示",
        "remark": "第 4 期",
        "score": "8.2",
        "hue": [
          "#1d3b5c",
          "#3a8de8"
        ],
        "year": "2023",
        "area": "其他",
        "type": "电影"
      },
      {
        "id": "cat-05",
        "title": "星夜档 · 综艺 05",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "综艺",
        "badge": "精选",
        "remark": "第 5 期",
        "score": "7.8",
        "hue": [
          "#1f3550",
          "#4f8fd8"
        ],
        "year": "2024",
        "area": "其他",
        "type": "综艺"
      },
      {
        "id": "cat-06",
        "title": "光影剧场 · 综艺 06",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "综艺",
        "badge": "热播",
        "remark": "第 6 期",
        "score": "9.0",
        "hue": [
          "#1d3b5c",
          "#3a8de8"
        ],
        "year": "2021",
        "area": "内地",
        "type": "综艺"
      }
    ],
    "total": 6,
    "page": 1,
    "pagecount": 1,
    "ok": true,
    "source": "demo",
    "fixture": true,
    "protocol": "category",
    "path": "/category",
    "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换",
    "reason": "local spider offline: URLError: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>",
    "hint": "启动 CatVod index.js（127.0.0.1:9988）或在「接口」页激活源后自动切换真实数据"
  },
  "search": {
    "query": "爱",
    "hot_search": [
      "演示热词 01",
      "演示热词 02",
      "演示热词 03",
      "演示热词 04",
      "演示热词 05",
      "演示热词 06"
    ],
    "list": [
      {
        "id": "q-爱-01",
        "title": "午后剧场 · 动漫 01",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "动漫",
        "badge": "精选",
        "remark": "第 1 期",
        "score": "9.7",
        "hue": [
          "#40233a",
          "#d2568c"
        ],
        "year": "2023",
        "area": "其他",
        "type": "动漫"
      },
      {
        "id": "q-爱-02",
        "title": "午后剧场 · 动漫 02",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "动漫",
        "badge": "演示",
        "remark": "第 2 期",
        "score": "9.7",
        "hue": [
          "#40233a",
          "#d2568c"
        ],
        "year": "2023",
        "area": "日韩",
        "type": "动漫"
      },
      {
        "id": "q-爱-03",
        "title": "光影剧场 · 纪录片 03",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "纪录片",
        "badge": "演示",
        "remark": "第 3 期",
        "score": "7.4",
        "hue": [
          "#1d3b5c",
          "#3a8de8"
        ],
        "year": "2025",
        "area": "港台",
        "type": "纪录片"
      },
      {
        "id": "q-爱-04",
        "title": "城市纪录 · 动漫 04",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "动漫",
        "badge": "精选",
        "remark": "第 4 期",
        "score": "8.5",
        "hue": [
          "#123f3b",
          "#22c9b4"
        ],
        "year": "2021",
        "area": "港台",
        "type": "动漫"
      },
      {
        "id": "q-爱-05",
        "title": "山海纪实 · 动漫 05",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "动漫",
        "badge": "演示",
        "remark": "第 5 期",
        "score": "9.7",
        "hue": [
          "#4a2a20",
          "#e07a45"
        ],
        "year": "2023",
        "area": "港台",
        "type": "动漫"
      },
      {
        "id": "q-爱-06",
        "title": "星夜档 · 综艺 06",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "综艺",
        "badge": "精选",
        "remark": "第 6 期",
        "score": "9.0",
        "hue": [
          "#1f3550",
          "#4f8fd8"
        ],
        "year": "2021",
        "area": "欧美",
        "type": "综艺"
      },
      {
        "id": "q-爱-07",
        "title": "午后剧场 · 动漫 07",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "动漫",
        "badge": "演示",
        "remark": "第 7 期",
        "score": "9.1",
        "hue": [
          "#40233a",
          "#d2568c"
        ],
        "year": "2022",
        "area": "欧美",
        "type": "动漫"
      },
      {
        "id": "q-爱-08",
        "title": "午后剧场 · 短剧 08",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "短剧",
        "badge": "热播",
        "remark": "第 8 期",
        "score": "7.5",
        "hue": [
          "#40233a",
          "#d2568c"
        ],
        "year": "2021",
        "area": "内地",
        "type": "短剧"
      },
      {
        "id": "q-爱-09",
        "title": "星夜档 · 电影 09",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "电影",
        "badge": "上新",
        "remark": "第 9 期",
        "score": "8.8",
        "hue": [
          "#1f3550",
          "#4f8fd8"
        ],
        "year": "2024",
        "area": "其他",
        "type": "电影"
      }
    ],
    "total": 9,
    "page": 1,
    "pagecount": 1,
    "sources": [
      {
        "name": "演示源 A",
        "count": 5
      },
      {
        "name": "演示源 B",
        "count": 4
      }
    ],
    "ok": true,
    "source": "demo",
    "fixture": true,
    "protocol": "search",
    "path": "/search",
    "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换",
    "reason": "local spider offline: URLError: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>",
    "hint": "启动 CatVod index.js（127.0.0.1:9988）或在「接口」页激活源后自动切换真实数据"
  },
  "detail": {
    "vod": {
      "id": "demo-01",
      "title": "午后剧场 · 动漫 01",
      "subtitle": "iBox 复刻第一版 · 演示条目",
      "tag": "动漫",
      "badge": "上新",
      "remark": "第 1 期",
      "score": "7.9",
      "hue": [
        "#40233a",
        "#d2568c"
      ],
      "year": "2025",
      "area": "港台",
      "type": "动漫",
      "description": "这是第一版演示详情页。字段结构来自拆包得到的插件协议 detail / parseSub / prepare：线路切换、选集网格、播放入口、相关推荐。接入真实源后本段替换为 vod_content。",
      "actors": "演示演员 A / 演示演员 B / 演示演员 C",
      "director": "演示导演"
    },
    "lines": [
      {
        "key": "line-0",
        "name": "默认线路",
        "episodes": [
          "第 01 集",
          "第 02 集",
          "第 03 集",
          "第 04 集",
          "第 05 集",
          "第 06 集",
          "第 07 集",
          "第 08 集",
          "第 09 集",
          "第 10 集",
          "第 11 集",
          "第 12 集"
        ]
      },
      {
        "key": "line-1",
        "name": "备用线路 01",
        "episodes": [
          "第 01 集",
          "第 02 集",
          "第 03 集",
          "第 04 集",
          "第 05 集",
          "第 06 集",
          "第 07 集",
          "第 08 集",
          "第 09 集",
          "第 10 集",
          "第 11 集",
          "第 12 集"
        ]
      },
      {
        "key": "line-2",
        "name": "备用线路 02",
        "episodes": [
          "第 01 集",
          "第 02 集",
          "第 03 集",
          "第 04 集",
          "第 05 集",
          "第 06 集",
          "第 07 集",
          "第 08 集",
          "第 09 集",
          "第 10 集",
          "第 11 集",
          "第 12 集"
        ]
      }
    ],
    "line_count": 3,
    "episode_count": 36,
    "related": [
      {
        "id": "rel-demo-01-01",
        "title": "光影剧场 · 纪录片 01",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "纪录片",
        "badge": "热播",
        "remark": "第 1 期",
        "score": "8.6",
        "hue": [
          "#1d3b5c",
          "#3a8de8"
        ],
        "year": "2022",
        "area": "欧美",
        "type": "纪录片"
      },
      {
        "id": "rel-demo-01-02",
        "title": "声浪现场 · 电影 02",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "电影",
        "badge": "热播",
        "remark": "第 2 期",
        "score": "9.4",
        "hue": [
          "#3b2352",
          "#8b5cf6"
        ],
        "year": "2025",
        "area": "其他",
        "type": "电影"
      },
      {
        "id": "rel-demo-01-03",
        "title": "慢镜头 · 动漫 03",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "动漫",
        "badge": "精选",
        "remark": "第 3 期",
        "score": "7.9",
        "hue": [
          "#3d3520",
          "#c9a227"
        ],
        "year": "2025",
        "area": "其他",
        "type": "动漫"
      },
      {
        "id": "rel-demo-01-04",
        "title": "城市纪录 · 短剧 04",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "短剧",
        "badge": "演示",
        "remark": "第 4 期",
        "score": "9.3",
        "hue": [
          "#123f3b",
          "#22c9b4"
        ],
        "year": "2024",
        "area": "其他",
        "type": "短剧"
      },
      {
        "id": "rel-demo-01-05",
        "title": "城市纪录 · 短剧 05",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "短剧",
        "badge": "演示",
        "remark": "第 5 期",
        "score": "8.1",
        "hue": [
          "#123f3b",
          "#22c9b4"
        ],
        "year": "2022",
        "area": "内地",
        "type": "短剧"
      },
      {
        "id": "rel-demo-01-06",
        "title": "星夜档 · 电影 06",
        "subtitle": "iBox 复刻第一版 · 演示条目",
        "tag": "电影",
        "badge": "上新",
        "remark": "第 6 期",
        "score": "9.4",
        "hue": [
          "#1f3550",
          "#4f8fd8"
        ],
        "year": "2025",
        "area": "内地",
        "type": "电影"
      }
    ],
    "ok": true,
    "source": "demo",
    "fixture": true,
    "protocol": "detail",
    "path": "/detail",
    "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换",
    "reason": "local spider offline: URLError: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>",
    "hint": "启动 CatVod index.js（127.0.0.1:9988）或在「接口」页激活源后自动切换真实数据"
  },
  "play": {
    "vod_id": "demo-01",
    "line": "1",
    "episode": "1",
    "url": "",
    "playUrl": "",
    "parse": 1,
    "from": "",
    "playable": false,
    "message": "演示模式：当前没有真实播放地址。在「接口」页配置并激活采集站或本地 Spider 后，play 端点返回 url 即可播放。",
    "controls": {
      "speeds": [
        "0.75x",
        "1.0x",
        "1.25x",
        "1.5x",
        "2.0x"
      ],
      "qualities": [
        "标清",
        "高清",
        "超清",
        "蓝光"
      ],
      "toggles": [
        "弹幕",
        "投屏",
        "倍速",
        "清晰度",
        "选集",
        "线路"
      ]
    },
    "ok": true,
    "source": "demo",
    "fixture": true,
    "protocol": "play",
    "path": "/play",
    "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换",
    "reason": "local spider offline: URLError: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>",
    "hint": "启动 CatVod index.js（127.0.0.1:9988）或在「接口」页激活源后自动切换真实数据"
  },
  "books": {
    "ok": true,
    "source": "demo",
    "fixture": true,
    "notice": "演示夹具 · 非真实业务数据 · 在接口页激活源或启动本地 Spider 后自动切换",
    "kind": "book",
    "verified": true,
    "sections": [
      {
        "key": "novel",
        "title": "小说 · 热门",
        "items": [
          {
            "id": "book-novel-01",
            "title": "慢镜头 · 短剧 01",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "短剧",
            "badge": "上新",
            "remark": "第 1 期",
            "score": "8.7",
            "hue": [
              "#3d3520",
              "#c9a227"
            ],
            "year": "2023",
            "area": "内地",
            "type": "短剧"
          },
          {
            "id": "book-novel-02",
            "title": "星夜档 · 电影 02",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "电影",
            "badge": "精选",
            "remark": "第 2 期",
            "score": "8.8",
            "hue": [
              "#1f3550",
              "#4f8fd8"
            ],
            "year": "2024",
            "area": "其他",
            "type": "电影"
          },
          {
            "id": "book-novel-03",
            "title": "山海纪实 · 电视剧 03",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "电视剧",
            "badge": "上新",
            "remark": "第 3 期",
            "score": "7.1",
            "hue": [
              "#4a2a20",
              "#e07a45"
            ],
            "year": "2022",
            "area": "内地",
            "type": "电视剧"
          },
          {
            "id": "book-novel-04",
            "title": "山海纪实 · 电视剧 04",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "电视剧",
            "badge": "精选",
            "remark": "第 4 期",
            "score": "8.9",
            "hue": [
              "#4a2a20",
              "#e07a45"
            ],
            "year": "2025",
            "area": "港台",
            "type": "电视剧"
          },
          {
            "id": "book-novel-05",
            "title": "光影剧场 · 电影 05",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "电影",
            "badge": "上新",
            "remark": "第 5 期",
            "score": "8.8",
            "hue": [
              "#1d3b5c",
              "#3a8de8"
            ],
            "year": "2024",
            "area": "内地",
            "type": "电影"
          },
          {
            "id": "book-novel-06",
            "title": "光影剧场 · 纪录片 06",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "纪录片",
            "badge": "精选",
            "remark": "第 6 期",
            "score": "7.4",
            "hue": [
              "#1d3b5c",
              "#3a8de8"
            ],
            "year": "2025",
            "area": "其他",
            "type": "纪录片"
          }
        ]
      },
      {
        "key": "comic",
        "title": "漫画 · 更新",
        "items": [
          {
            "id": "book-comic-01",
            "title": "光影剧场 · 综艺 01",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "综艺",
            "badge": "精选",
            "remark": "第 1 期",
            "score": "7.8",
            "hue": [
              "#1d3b5c",
              "#3a8de8"
            ],
            "year": "2024",
            "area": "内地",
            "type": "综艺"
          },
          {
            "id": "book-comic-02",
            "title": "声浪现场 · 综艺 02",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "综艺",
            "badge": "热播",
            "remark": "第 2 期",
            "score": "9.0",
            "hue": [
              "#3b2352",
              "#8b5cf6"
            ],
            "year": "2021",
            "area": "内地",
            "type": "综艺"
          },
          {
            "id": "book-comic-03",
            "title": "午后剧场 · 电视剧 03",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "电视剧",
            "badge": "热播",
            "remark": "第 3 期",
            "score": "7.1",
            "hue": [
              "#40233a",
              "#d2568c"
            ],
            "year": "2022",
            "area": "欧美",
            "type": "电视剧"
          },
          {
            "id": "book-comic-04",
            "title": "极限视界 · 电影 04",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "电影",
            "badge": "精选",
            "remark": "第 4 期",
            "score": "7.6",
            "hue": [
              "#233f2c",
              "#4fae6a"
            ],
            "year": "2022",
            "area": "内地",
            "type": "电影"
          },
          {
            "id": "book-comic-05",
            "title": "极限视界 · 纪录片 05",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "纪录片",
            "badge": "上新",
            "remark": "第 5 期",
            "score": "7.4",
            "hue": [
              "#233f2c",
              "#4fae6a"
            ],
            "year": "2025",
            "area": "欧美",
            "type": "纪录片"
          },
          {
            "id": "book-comic-06",
            "title": "城市纪录 · 电视剧 06",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "电视剧",
            "badge": "演示",
            "remark": "第 6 期",
            "score": "7.7",
            "hue": [
              "#123f3b",
              "#22c9b4"
            ],
            "year": "2023",
            "area": "港台",
            "type": "电视剧"
          }
        ]
      },
      {
        "key": "audio",
        "title": "听书 · 精选",
        "items": [
          {
            "id": "book-audio-01",
            "title": "光影剧场 · 综艺 01",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "综艺",
            "badge": "热播",
            "remark": "第 1 期",
            "score": "8.4",
            "hue": [
              "#1d3b5c",
              "#3a8de8"
            ],
            "year": "2025",
            "area": "其他",
            "type": "综艺"
          },
          {
            "id": "book-audio-02",
            "title": "光影剧场 · 纪录片 02",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "纪录片",
            "badge": "精选",
            "remark": "第 2 期",
            "score": "8.6",
            "hue": [
              "#1d3b5c",
              "#3a8de8"
            ],
            "year": "2022",
            "area": "欧美",
            "type": "纪录片"
          },
          {
            "id": "book-audio-03",
            "title": "声浪现场 · 纪录片 03",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "纪录片",
            "badge": "精选",
            "remark": "第 3 期",
            "score": "9.2",
            "hue": [
              "#3b2352",
              "#8b5cf6"
            ],
            "year": "2023",
            "area": "内地",
            "type": "纪录片"
          },
          {
            "id": "book-audio-04",
            "title": "山海纪实 · 动漫 04",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "动漫",
            "badge": "上新",
            "remark": "第 4 期",
            "score": "8.5",
            "hue": [
              "#4a2a20",
              "#e07a45"
            ],
            "year": "2021",
            "area": "日韩",
            "type": "动漫"
          },
          {
            "id": "book-audio-05",
            "title": "城市纪录 · 短剧 05",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "短剧",
            "badge": "热播",
            "remark": "第 5 期",
            "score": "8.1",
            "hue": [
              "#123f3b",
              "#22c9b4"
            ],
            "year": "2022",
            "area": "日韩",
            "type": "短剧"
          },
          {
            "id": "book-audio-06",
            "title": "声浪现场 · 纪录片 06",
            "subtitle": "iBox 复刻第一版 · 演示条目",
            "tag": "纪录片",
            "badge": "热播",
            "remark": "第 6 期",
            "score": "7.4",
            "hue": [
              "#3b2352",
              "#8b5cf6"
            ],
            "year": "2025",
            "area": "日韩",
            "type": "纪录片"
          }
        ]
      }
    ]
  }
};
