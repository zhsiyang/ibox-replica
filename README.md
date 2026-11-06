# iBoxReplica — iBox 2.5.0 复刻（iOS）

逆向复刻 `iBox_2.5.0_3_id自签版.ipa` 的成品工程：

- **壳**：原生 Swift + WKWebView（`ios/iBoxReplica/`），加载内置 Web 资源（`dist/`，folder reference 整目录进 bundle）
- **页面**：原生 ES modules 前端（首页 / 片库 / 搜索 / 详情 / 播放器 / 接口管理 / 我的），PWA 预缓存
- **后端协议**：Python 3.13 标准库 `app/server.py`（CatVod 协议适配 + 接口管理 CRUD）；App 内置离线演示夹具，装完就能起
- **接口订阅**：`https://9280.kstore.vip/cat/index.js.md5`（MD5 校验 + 缓存 + 探测），「我的 → 接口管理」可增删改查任意接口
- **广告**：全链路剥离，交付物 0 命中

## GitHub 出包（本仓库用途）

本机没有 macOS，用 GitHub Actions 出未签名 ipa：

1. 仓库 Actions 页 → **Build iOS IPA** → **Run workflow**
2. 跑完后在本次运行页底部 **Artifacts** 下载 `iBoxReplica-unsigned-ipa`
3. Sideloadly / AltStore / TrollStore 自签安装

也可以本地（任意 mac）：`./build-ipa.sh` → `ios/build/iBoxReplica.ipa`

## 结构

```
ios/iBoxReplica/            Swift 壳源码 + Info.plist + Assets + dist(Web 资源)
ios/iBoxReplica.xcodeproj/  Xcode 工程（无 pod、无外部依赖）
build-ipa.sh                未签名 ipa 打包脚本
.github/workflows/          macOS runner 出包 CI
```
