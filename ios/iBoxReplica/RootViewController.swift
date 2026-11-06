import UIKit
import WebKit

final class RootViewController: UIViewController, WKNavigationDelegate {

    private var webView: WKWebView!
    private let handler = IBoxSchemeHandler()
    private let bridge = IBoxBridge()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 0.043, green: 0.059, blue: 0.078, alpha: 1.0)

        let cfg = WKWebViewConfiguration()
        cfg.setURLSchemeHandler(handler, forURLScheme: IBoxSchemeHandler.scheme)
        cfg.allowsInlineMediaPlayback = true
        cfg.mediaTypesRequiringUserActionForPlayback = []
        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        cfg.defaultWebpagePreferences = prefs
        bridge.handler = handler
        cfg.userContentController.add(bridge, name: IBoxBridge.name)
        // 把后端地址注入前端，便于调试信息展示；前端实际请求仍走 /api/ 相对路径。
        let inject = WKUserScript(source: "window.__IBOX_NATIVE__=true;window.__IBOX_API_BASE__='';",
                                  injectionTime: .atDocumentStart, forMainFrameOnly: true)
        cfg.userContentController.addUserScript(inject)

        let wv = WKWebView(frame: .zero, configuration: cfg)
        wv.translatesAutoresizingMaskIntoConstraints = false
        wv.scrollView.contentInsetAdjustmentBehavior = .never
        wv.scrollView.bounces = true
        wv.isOpaque = false
        wv.backgroundColor = view.backgroundColor
        wv.navigationDelegate = self
        view.addSubview(wv)
        NSLayoutConstraint.activate([
            wv.topAnchor.constraint(equalTo: view.topAnchor),
            wv.bottomAnchor.constraint(equalTo: view.bottomAnchor),
            wv.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            wv.trailingAnchor.constraint(equalTo: view.trailingAnchor),
        ])
        webView = wv
        bridge.webView = wv

        NotificationCenter.default.addObserver(self, selector: #selector(reload),
                                               name: .iboxReload, object: nil)
        loadApp()
    }

    private func loadApp() {
        guard let url = URL(string: IBoxSchemeHandler.scheme + "://" + IBoxSchemeHandler.host + "/index.html") else {
            return
        }
        webView.load(URLRequest(url: url))
    }

    @objc private func reload() {
        // 只在前台且已加载完成时刷新，避免打断启动。
        if webView.url != nil { webView.reload() }
    }

    override var preferredStatusBarStyle: UIStatusBarStyle { .lightContent }
    override var prefersStatusBarHidden: Bool { false }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        // 自定义 scheme 加载失败时给出可读的原生错误页，不留白屏。
        let html = "<html><body style='background:#0b0f14;color:#eef3f8;font:14px -apple-system;padding:40px'>" +
            "<h2>iBox 加载失败</h2><p>\(error.localizedDescription)</p>" +
            "<p>检查 client/dist 是否已随构建同步到 Bundle。</p></body></html>"
        webView.loadHTMLString(html, baseURL: nil)
    }

    deinit { NotificationCenter.default.removeObserver(self) }
}
