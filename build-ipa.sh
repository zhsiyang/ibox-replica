#!/usr/bin/env bash
# ============================================================================
# 编译未签名 .ipa（侧载 / 自签用）。纯 Swift + WKWebView 壳，无 CocoaPods。
#
# 产物：ios/build/iBoxReplica.ipa
# 未签名，装之前用 Sideloadly / AltStore / TrollStore 自签。
# ============================================================================
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
IOS="$HERE/ios"
DD="$IOS/build/dd"
PROJECT="iBoxReplica"

cd "$IOS"
rm -rf "$IOS/build"
mkdir -p "$IOS/build"

echo "▶ xcodebuild (Release / iphoneos / 不签名) …"
LOG="$IOS/build/xcodebuild.log"
set +e
xcodebuild \
    -project "$IOS/$PROJECT.xcodeproj" \
    -scheme "$PROJECT" \
    -configuration Release \
    -sdk iphoneos \
    -derivedDataPath "$DD" \
    CODE_SIGNING_ALLOWED=NO \
    CODE_SIGNING_REQUIRED=NO \
    CODE_SIGN_IDENTITY="" \
    AD_HOC_CODE_SIGNING_ALLOWED=YES \
    ENABLE_BITCODE=NO \
    > "$LOG" 2>&1
XCODE_RC=$?
set -e
tail -40 "$LOG"

# 退出码必须为 0，防止 .app 目录先建好但编译中途失败被误判成功
if [ "$XCODE_RC" -ne 0 ]; then
    echo ""
    echo "✗ xcodebuild 失败 rc=$XCODE_RC"
    echo "--- 错误行 ---"
    grep -nE "error:|BUILD FAILED|failed with" "$LOG" | tail -25 || true
    exit 1
fi

APP="$DD/Build/Products/Release-iphoneos/$PROJECT.app"
if [ ! -d "$APP" ]; then
    echo "✗ 没找到 $APP（xcodebuild rc=$XCODE_RC）"
    ls -R "$DD" 2>/dev/null | head -40
    exit 1
fi

# 产物完整性检查：Info.plist、主二进制、Web 资源目录
for need in "$APP/Info.plist" "$APP/$PROJECT" "$APP/dist/index.html"; do
    if [ ! -e "$need" ]; then
        echo "✗ 产物缺 $need —— 编译没真正完成"
        exit 1
    fi
done

BIN_SIZE=$(wc -c < "$APP/$PROJECT" | tr -d ' ')
if [ "$BIN_SIZE" -lt 100000 ]; then
    echo "✗ 主二进制只有 ${BIN_SIZE} B，明显是空壳"
    exit 1
fi
echo "   主二进制 $(($BIN_SIZE / 1024)) KB"

echo "▶ 打包 .ipa …"
rm -rf "$IOS/build/Payload"
mkdir -p "$IOS/build/Payload"
cp -R "$APP" "$IOS/build/Payload/"

# 去掉旧签名目录，避免自签时校验冲突
rm -rf "$IOS/build/Payload/$PROJECT.app/_CodeSignature"

(
    cd "$IOS/build"
    rm -f "$PROJECT.ipa"
    zip -qry "$PROJECT.ipa" Payload
)

IPA="$IOS/build/$PROJECT.ipa"
if [ -f "$IPA" ]; then
    echo ""
    echo "✅ $IPA"
    echo "   大小：$(du -h "$IPA" | awk '{print $1}')"
    echo "   自签：Sideloadly / AltStore / TrollStore 任选"
else
    echo "✗ 打包失败，$IPA 不存在"
    exit 1
fi
