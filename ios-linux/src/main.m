// iBox 复刻 · iOS 壳（Objective-C 版）
// 与 ios/iBoxReplica 的 Swift 版功能一一对应：
// 原生壳 + WKWebView + 自定义 ibox:// scheme 托管 Bundle 内 dist + /api/* 反代到后端。
// 用 ObjC 而非 Swift：Linux 上 clang 可交叉编译 Mach-O ObjC，Swift 需要 Apple 的 Swift
// module 才能跨编译，Linux 工具链没有 iOS 的 swiftinterface，成本高且不稳。

#import <UIKit/UIKit.h>
#import "AppDelegate.h"

int main(int argc, char *argv[]) {
    @autoreleasepool {
        return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
    }
}
