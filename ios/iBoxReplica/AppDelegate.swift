import UIKit

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        let w = UIWindow(frame: UIScreen.main.bounds)
        w.backgroundColor = UIColor(red: 0.043, green: 0.059, blue: 0.078, alpha: 1.0)
        w.rootViewController = RootViewController()
        w.makeKeyAndVisible()
        window = w
        return true
    }

    // 播放器页需要横屏；Root 层保持竖屏，由 WKWebView 内容自身适配。
    func application(_ application: UIApplication,
                     supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
        return [.portrait, .landscapeLeft, .landscapeRight]
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // 回到前台时刷新当前页，保证接口状态与后端一致。
        NotificationCenter.default.post(name: .iboxReload, object: nil)
    }
}

extension Notification.Name {
    static let iboxReload = Notification.Name("ibox.reload")
}
