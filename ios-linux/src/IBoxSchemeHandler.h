#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

// 自定义 scheme 处理器：把 Bundle 内的 dist 当静态站点托管，
// 并把 /api/* 反代到外层 Python 服务，前端零改动。
@interface IBoxSchemeHandler : NSObject <WKURLSchemeHandler>
@property (nonatomic, copy) NSString *apiBase;
@end

// JS → 原生桥：window.webkit.messageHandlers.ibox.postMessage({action:...})
@interface IBoxBridge : NSObject <WKScriptMessageHandler>
@property (nonatomic, weak) IBoxSchemeHandler *handler;
@property (nonatomic, weak) WKWebView *webView;
@end
