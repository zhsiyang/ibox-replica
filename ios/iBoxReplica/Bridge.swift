import Foundation
import WebKit

/// 自定义 scheme 处理器：把 Bundle 内的 client/dist 当静态站点托管，
/// 并把 /api/* 反向代理到外层 Python 服务。
/// 这样前端一行都不用改：fetch('/api/...') 在 ibox://app/ 下自动落到本处理器。
final class IBoxSchemeHandler: NSObject, WKURLSchemeHandler {
    static let scheme = "ibox"
    static let host = "app"

    /// 后端地址：Info.plist 的 IBoxAPIBase > UserDefaults > 默认回环。
    /// 真机必须改成开发机局域网地址，例如 http://192.168.1.20:8788 。
    var apiBase: String = {
        if let v = Bundle.main.object(forInfoDictionaryKey: "IBoxAPIBase") as? String, !v.isEmpty {
            return v
        }
        if let v = UserDefaults.standard.string(forKey: "ibox_api_base"), !v.isEmpty {
            return v
        }
        return "http://127.0.0.1:8788"
    }()

    private let lock = NSLock()
    private var tasks: [ObjectIdentifier: URLSessionDataTask] = [:]

    private var distURL: URL? {
        Bundle.main.url(forResource: "dist", withExtension: nil)
    }

    private static func mime(_ path: String) -> String {
        switch (path as NSString).pathExtension.lowercased() {
        case "html", "htm": return "text/html"
        case "js", "mjs": return "application/javascript"
        case "css": return "text/css"
        case "json", "webmanifest": return "application/json"
        case "png": return "image/png"
        case "jpg", "jpeg": return "image/jpeg"
        case "svg": return "image/svg+xml"
        case "ico": return "image/x-icon"
        case "txt": return "text/plain"
        default: return "application/octet-stream"
        }
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: WKURLSchemeTask) {
        guard let url = urlSchemeTask.request.url else {
            urlSchemeTask.didFailWithError(IBoxError.badURL)
            return
        }
        if url.path.hasPrefix("/api/") || url.path == "/health" {
            proxy(urlSchemeTask, url)
        } else {
            serveStatic(urlSchemeTask, url)
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: WKURLSchemeTask) {
        let key = ObjectIdentifier(urlSchemeTask)
        lock.lock()
        let t = tasks.removeValue(forKey: key)
        lock.unlock()
        t?.cancel()
    }

    // MARK: - 静态资源

    private func serveStatic(_ task: WKURLSchemeTask, _ url: URL) {
        var rel = url.path
        if rel == "/" || rel.isEmpty { rel = "/index.html" }
        rel = rel.hasPrefix("/") ? String(rel.dropFirst()) : rel
        guard let root = distURL else { return fail(task, 500, "dist not bundled") }
        let file = root.appendingPathComponent(rel)
        let fm = FileManager.default
        var isDir: ObjCBool = false
        if fm.fileExists(atPath: file.path, isDirectory: &isDir), isDir.boolValue {
            return serveStatic(task, URL(string: "ibox://app/" + rel + "/index.html")!)
        }
        guard let data = try? Data(contentsOf: file) else { return fail(task, 404, "not found: " + rel) }
        respond(task, url, 200, Self.mime(rel), data)
    }

    // MARK: - API 反向代理

    private func proxy(_ task: WKURLSchemeTask, _ url: URL) {
        let base = apiBase.replacingOccurrences(of: "/+$", with: "", options: .regularExpression)
        var comps = URLComponents(string: base + url.path)
        comps?.query = url.query
        guard let target = comps?.url else { return fail(task, 400, "bad api base") }
        var r = URLRequest(url: target, timeoutInterval: 20)
        r.httpMethod = task.request.httpMethod
        r.httpBody = task.request.httpBody
        for (k, v) in task.request.allHTTPHeaderFields ?? [:] {
            if k.lowercased() != "host" { r.setValue(v, forHTTPHeaderField: k) }
        }
        let key = ObjectIdentifier(task)
        let t = URLSession.shared.dataTask(with: r) { [weak self] data, response, error in
            guard let self = self else { return }
            self.lock.lock(); self.tasks.removeValue(forKey: key); self.lock.unlock()
            let http = response as? HTTPURLResponse
            let code = http?.statusCode ?? (error == nil ? 200 : 502)
            let body = data ?? Data(("proxy error: " + (error?.localizedDescription ?? "")).utf8)
            self.respond(task, url, code, http?.allHeaderFields["Content-Type"] as? String ?? "application/json", body)
        }
        lock.lock(); tasks[key] = t; lock.unlock()
        t.resume()
    }

    // MARK: - 响应工具

    private func respond(_ task: WKURLSchemeTask, _ url: URL, _ code: Int,
                         _ mime: String, _ data: Data) {
        let headers: [String: String] = [
            "Content-Type": mime,
            "Content-Length": String(data.count),
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store",
        ]
        guard let resp = HTTPURLResponse(url: url, statusCode: code,
                                         httpVersion: "HTTP/1.1", headerFields: headers) else {
            task.didFailWithError(IBoxError.badURL)
            return
        }
        task.didReceive(resp)
        task.didReceive(data)
        task.didFinish()
    }

    private func fail(_ task: WKURLSchemeTask, _ code: Int, _ msg: String) {
        respond(task, task.request.url ?? URL(string: "ibox://app/")!, code,
                "application/json", Data(("{\"ok\":false,\"error\":\"\(msg)\"}").utf8))
    }
}

enum IBoxError: LocalizedError {
    case badURL
    var errorDescription: String? { "iBox: invalid URL" }
}

/// JS → 原生桥：window.webkit.messageHandlers.ibox.postMessage(...)
/// 支持 setApiBase / getApiBase / reload，参数全部外置，不在原生里写业务地址。
final class IBoxBridge: NSObject, WKScriptMessageHandler {
    static let name = "ibox"
    weak var handler: IBoxSchemeHandler?
    weak var webView: WKWebView?

    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any],
              let action = body["action"] as? String else { return }
        switch action {
        case "setApiBase":
            if let v = body["value"] as? String, !v.isEmpty {
                handler?.apiBase = v
                UserDefaults.standard.set(v, forKey: "ibox_api_base")
            }
        case "getApiBase":
            let v = handler?.apiBase ?? ""
            webView?.evaluateJavaScript("window.__IBOX_NATIVE_BASE__=" + jsQuote(v), completionHandler: nil)
        case "reload":
            webView?.reload()
        default:
            break
        }
    }

    private func jsQuote(_ s: String) -> String {
        let d = try? JSONSerialization.data(withJSONObject: [s], options: [])
        let arr = String(data: d ?? Data(), encoding: .utf8) ?? "[\"\"]"
        return String(arr.dropFirst().dropLast())
    }
}
