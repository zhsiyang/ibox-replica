#import "RootViewController.h"
#import "IBoxSchemeHandler.h"

@interface RootViewController () <WKNavigationDelegate>
@property (nonatomic, strong) WKWebView *webView;
@property (nonatomic, strong) IBoxSchemeHandler *handler;
@property (nonatomic, strong) IBoxBridge *bridge;
@end

@implementation RootViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor colorWithRed:0.043 green:0.059 blue:0.078 alpha:1.0];

    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.handler = [[IBoxSchemeHandler alloc] init];
    [cfg setURLSchemeHandler:self.handler forURLScheme:@"ibox"];
    cfg.allowsInlineMediaPlayback = YES;
    cfg.mediaTypesRequiringUserActionForPlayback = WKAudiovisualMediaTypeNone;

    WKWebpagePreferences *prefs = [[WKWebpagePreferences alloc] init];
    prefs.allowsContentJavaScript = YES;
    cfg.defaultWebpagePreferences = prefs;

    self.bridge = [[IBoxBridge alloc] init];
    self.bridge.handler = self.handler;
    [cfg.userContentController addScriptMessageHandler:self.bridge name:@"ibox"];

    // 告诉前端跑在原生壳里；实际请求仍走 /api/ 相对路径，由 scheme handler 反代
    WKUserScript *inject = [[WKUserScript alloc]
        initWithSource:@"window.__IBOX_NATIVE__=true;window.__IBOX_API_BASE__='';"
         injectionTime:WKUserScriptInjectionTimeAtDocumentStart
      forMainFrameOnly:YES];
    [cfg.userContentController addUserScript:inject];

    WKWebView *wv = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:cfg];
    wv.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    wv.scrollView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    wv.scrollView.bounces = YES;
    wv.opaque = NO;
    wv.backgroundColor = self.view.backgroundColor;
    wv.navigationDelegate = self;
    [self.view addSubview:wv];
    self.webView = wv;
    self.bridge.webView = wv;

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(reloadIfLoaded)
                                                 name:@"ibox.reload"
                                               object:nil];
    [self loadApp];
}

- (void)loadApp {
    NSURL *u = [NSURL URLWithString:@"ibox://app/index.html"];
    if (u) [self.webView loadRequest:[NSURLRequest requestWithURL:u]];
}

- (void)reloadIfLoaded {
    if (self.webView.URL) [self.webView reload];
}

- (UIStatusBarStyle)preferredStatusBarStyle { return UIStatusBarStyleLightContent; }
- (BOOL)prefersStatusBarHidden { return NO; }

// 自定义 scheme 加载失败时给可读错误页，不留白屏
- (void)webView:(WKWebView *)webView didFailNavigation:(WKNavigation *)navigation
      withError:(NSError *)error {
    [self showError:webView error:error];
}

- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation
      withError:(NSError *)error {
    [self showError:webView error:error];
}

- (void)showError:(WKWebView *)webView error:(NSError *)error {
    NSString *html = [NSString stringWithFormat:
        @"<html><body style='background:#0b0f14;color:#eef3f8;font:14px -apple-system;padding:40px'>"
        @"<h2>iBox 加载失败</h2><p>%@</p>"
        @"<p>检查 dist 是否已随构建同步进 Bundle。</p></body></html>",
        error.localizedDescription ?: @"unknown"];
    [webView loadHTMLString:html baseURL:nil];
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
