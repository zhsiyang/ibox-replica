#!/usr/bin/env bash
# ============================================================================
# 在 Linux 上交叉编译出未签名 .ipa（不需要 macOS / Xcode）
#
#   工具链：clang -target arm64-apple-ios12.0 + ld64.lld + theos/sdks 的 iPhoneOS SDK
#   壳语言：Objective-C（Swift 需要 Apple 的 iOS swiftmodule，Linux 工具链没有）
#   产物：  build/iBoxReplica.ipa（未签名，Sideloadly / AltStore / TrollStore 自签）
#
# 用法：
#   ./build-ipa-linux.sh                默认 iPhoneOS16.5 SDK
#   SDK_VER=15.6 ./build-ipa-linux.sh   换 SDK 版本
#   SKIP_ICON=1 ./build-ipa-linux.sh    不生成图标
# ============================================================================
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"

APP_NAME="iBoxReplica"
BUNDLE_ID="com.ibox.replica"
MIN_IOS="12.0"
SDK_VER="${SDK_VER:-16.5}"
SKIP_ICON="${SKIP_ICON:-0}"

OUT="$HERE/build"
SDKS="$HERE/.sdks"
APP="$OUT/Payload/$APP_NAME.app"
SDK="$SDKS/iPhoneOS${SDK_VER}.sdk"

echo "▶ 环境检查"
for bin in clang zip; do
    command -v "$bin" >/dev/null || { echo "✗ 缺 $bin"; exit 1; }
done

# Mach-O 链接要 ld64.lld（GNU ld 不认 Mach-O）。
# Ubuntu 的 lld 只装带版本后缀的 ld64.lld-16/17/18，没有无后缀软链，必须显式找。
find_ld64() {
    for c in ld64.lld ld64.lld-20 ld64.lld-19 ld64.lld-18 ld64.lld-17 ld64.lld-16; do
        p="$(command -v "$c" 2>/dev/null || true)"
        [ -n "$p" ] && { echo "$p"; return 0; }
    done
    for p in /usr/bin/ld64.lld* /usr/local/bin/ld64.lld*; do
        [ -x "$p" ] && { echo "$p"; return 0; }
    done
    return 1
}
LD64="$(find_ld64 || true)"
[ -n "$LD64" ] || { echo "✗ 缺 ld64.lld（apt install lld）"; exit 1; }
echo "   ld64: $LD64"
clang --version | head -1

echo "▶ 准备 iPhoneOS SDK $SDK_VER"
if [ ! -d "$SDK" ]; then
    mkdir -p "$SDKS"
    if [ -d "$SDKS/repo/iPhoneOS${SDK_VER}.sdk" ]; then
        mv "$SDKS/repo/iPhoneOS${SDK_VER}.sdk" "$SDK"
    else
        rm -rf "$SDKS/repo"
        # theos/sdks 是 headers + .tbd 的完整合集（约 110 MB），比整包 Xcode 小得多
        git clone --depth 1 https://github.com/theos/sdks.git "$SDKS/repo"
        mv "$SDKS/repo/iPhoneOS${SDK_VER}.sdk" "$SDK"
        rm -rf "$SDKS/repo"
    fi
fi
[ -d "$SDK/System/Library/Frameworks/WebKit.framework" ] || { echo "✗ SDK 缺 WebKit"; exit 1; }

echo "▶ 清理"
rm -rf "$OUT/Payload" "$OUT/$APP_NAME.ipa"
mkdir -p "$APP"

echo "▶ 编译（arm64 / iOS $MIN_IOS）"
clang \
    -target "arm64-apple-ios${MIN_IOS}" \
    -isysroot "$SDK" \
    -F "$SDK/System/Library/Frameworks" \
    -fobjc-arc -fblocks -O2 \
    -fuse-ld="$LD64" \
    -Wl,-dead_strip \
    -framework UIKit \
    -framework Foundation \
    -framework WebKit \
    -framework CoreGraphics \
    -framework QuartzCore \
    -o "$APP/$APP_NAME" \
    "$HERE/src/main.m" \
    "$HERE/src/AppDelegate.m" \
    "$HERE/src/RootViewController.m" \
    "$HERE/src/IBoxSchemeHandler.m"

file "$APP/$APP_NAME"
SIZE=$(wc -c < "$APP/$APP_NAME" | tr -d ' ')
echo "   主二进制 ${SIZE} B"
[ "$SIZE" -gt 30000 ] || { echo "✗ 二进制太小，编译没真正完成"; exit 1; }

echo "▶ 组装 Bundle"
cp "$HERE/Info.plist" "$APP/Info.plist"
# Web 资源：Xcode 工程里 dist 是 folder reference，这里等价地整目录拷进去
cp -R "$ROOT/client/dist" "$APP/dist"
[ -f "$APP/dist/index.html" ] || { echo "✗ dist/index.html 缺失"; exit 1; }

if [ "$SKIP_ICON" != "1" ] && [ -f "$ROOT/client/dist/assets/icon.png" ]; then
    echo "▶ 生成图标"
    mkdir -p "$OUT/icon"
    SRC="$ROOT/client/dist/assets/icon.png"
    gen() { # $1=尺寸 $2=输出名
        if command -v convert >/dev/null 2>&1; then
            convert "$SRC" -resize "$1x$1" "$OUT/icon/$2"
        elif command -v magick >/dev/null 2>&1; then
            magick "$SRC" -resize "$1x$1" "$OUT/icon/$2"
        else
            cp "$SRC" "$OUT/icon/$2"   # 无缩放工具就直拷，尺寸不符只影响观感
        fi
        cp "$OUT/icon/$2" "$APP/$2"
    }
    gen 40  "AppIcon20x20@2x.png"
    gen 60  "AppIcon20x20@3x.png"
    gen 58  "AppIcon29x29@2x.png"
    gen 87  "AppIcon29x29@3x.png"
    gen 80  "AppIcon40x40@2x.png"
    gen 120 "AppIcon40x40@3x.png"
    gen 120 "AppIcon60x60@2x.png"
    gen 180 "AppIcon60x60@3x.png"
    gen 152 "AppIcon76x76@2x.png"
fi

echo "▶ 签名（ad-hoc，未签名 ipa 也需要 LC_CODE_SIGNATURE）"
if command -v ldid >/dev/null 2>&1; then
    ldid -S "$APP/$APP_NAME" && echo "   ldid ok"
else
    echo "   ⚠ 没装 ldid（apt install ldid），产物为裸二进制，Sideloadly 重签时会补"
fi

echo "▶ 打包 ipa"
chmod +x "$APP/$APP_NAME"
rm -rf "$APP/_CodeSignature"
( cd "$OUT" && rm -f "$APP_NAME.ipa" && zip -qry "$APP_NAME.ipa" Payload )

IPA="$OUT/$APP_NAME.ipa"
[ -f "$IPA" ] || { echo "✗ 打包失败"; exit 1; }
echo ""
echo "✅ $IPA"
echo "   大小：$(du -h "$IPA" | awk '{print $1}')"
echo "   安装：Sideloadly / AltStore / TrollStore 自签"
