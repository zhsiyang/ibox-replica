#import "AppDelegate.h"
#import "RootViewController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
        didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.window.backgroundColor = [UIColor colorWithRed:0.043 green:0.059 blue:0.078 alpha:1.0];
    self.window.rootViewController = [[RootViewController alloc] init];
    [self.window makeKeyAndVisible];
    return YES;
}

// 播放器页要横屏；Root 层竖屏由 RootViewController 控制，这里放开全局 mask。
- (UIInterfaceOrientationMask)application:(UIApplication *)application
        supportedInterfaceOrientationsForWindow:(UIWindow *)window {
    return UIInterfaceOrientationMaskPortrait
         | UIInterfaceOrientationMaskLandscapeLeft
         | UIInterfaceOrientationMaskLandscapeRight;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // 回前台刷新当前页，保证接口状态与后端一致。
    [[NSNotificationCenter defaultCenter] postNotificationName:@"ibox.reload" object:nil];
}

@end
