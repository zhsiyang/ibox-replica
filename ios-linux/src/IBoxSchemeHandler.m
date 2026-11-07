#import "IBoxSchemeHandler.h"

static NSString *const kIBoxScheme = @"ibox";
static NSString *const kIBoxHost   = @"app";

@implementation IBoxSchemeHandler {
    NSMutableDictionary<NSValue *, NSURLSessionDataTask *> *_tasks;
    NSMutableSet<NSValue *> *_alive;
    NSLock *_lock;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _tasks = [NSMutableDictionary new];
        _alive = [NSMutableSet new];
        _lock  = [NSLock new];

        // 后端地址：Info.plist 的 IBoxAPIBase > UserDefaults > 默认回环。
        // 真机要改成开发机局域网地址，例如 http://192.168.1.20:8788 。
        NSString *v = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"IBoxAPIBase"];
        if (![v isKindOfClass:[NSString class]] || v.length == 0) {
            v = [[NSUserDefaults standardUserDefaults] stringForKey:@"ibox_api_base"];
        }
        if (v.length == 0) v = @"http://127.0.0.1:8788";
        _apiBase = [v copy];
    }
    return self;
}

- (NSString *)mimeFor:(NSString *)path {
    NSString *ext = [[path pathExtension] lowercaseString];
    if ([ext isEqualToString:@"html"] || [ext isEqualToString:@"htm"]) return @"text/html";
    if ([ext isEqualToString:@"js"]   || [ext isEqualToString:@"mjs"]) return @"application/javascript";
    if ([ext isEqualToString:@"css"])  return @"text/css";
    if ([ext isEqualToString:@"json"] || [ext isEqualToString:@"webmanifest"]) return @"application/json";
    if ([ext isEqualToString:@"png"])  return @"image/png";
    if ([ext isEqualToString:@"jpg"] || [ext isEqualToString:@"jpeg"]) return @"image/jpeg";
    if ([ext isEqualToString:@"svg"])  return @"image/svg+xml";
    if ([ext isEqualToString:@"ico"])  return @"image/x-icon";
    if ([ext isEqualToString:@"txt"])  return @"text/plain";
    return @"application/octet-stream";
}

#pragma mark - WKURLSchemeHandler

- (void)webView:(WKWebView *)webView startURLSchemeTask:(id<WKURLSchemeTask>)urlSchemeTask {
    NSURL *url = urlSchemeTask.request.URL;
    if (!url) { [self fail:urlSchemeTask code:400 msg:@"bad url"]; return; }

    NSValue *key = [NSValue valueWithNonretainedObject:urlSchemeTask];
    [_lock lock]; [_alive addObject:key]; [_lock unlock];

    NSString *path = url.path ?: @"/";
    if ([path hasPrefix:@"/api/"] || [path isEqualToString:@"/health"]) {
        [self proxy:urlSchemeTask url:url key:key];
    } else {
        [self serveStatic:urlSchemeTask url:url];
    }
}

- (void)webView:(WKWebView *)webView stopURLSchemeTask:(id<WKURLSchemeTask>)urlSchemeTask {
    NSValue *key = [NSValue valueWithNonretainedObject:urlSchemeTask];
    [_lock lock];
    NSURLSessionDataTask *t = _tasks[key];
    [_tasks removeObjectForKey:key];
    [_alive removeObject:key];   // 标记失效，回调到达时不再碰 task
    [_lock unlock];
    [t cancel];
}

#pragma mark - 静态资源

- (void)serveStatic:(id<WKURLSchemeTask>)task url:(NSURL *)url {
    NSString *rel = url.path.length ? url.path : @"/index.html";
    if ([rel isEqualToString:@"/"]) rel = @"/index.html";
    if ([rel hasPrefix:@"/"]) rel = [rel substringFromIndex:1];

    NSString *root = [[NSBundle mainBundle] pathForResource:@"dist" ofType:nil];
    if (!root) { [self fail:task code:500 msg:@"dist not bundled"]; return; }

    NSString *file = [root stringByAppendingPathComponent:rel];
    BOOL isDir = NO;
    if ([[NSFileManager defaultManager] fileExistsAtPath:file isDirectory:&isDir] && isDir) {
        // 目录走 index.html，和静态服务器一致
        NSString *next = [NSString stringWithFormat:@"%@://%@/%@/index.html", kIBoxScheme, kIBoxHost, rel];
        NSURL *u = [NSURL URLWithString:next];
        if (u) { [self serveStatic:task url:u]; return; }
    }

    NSData *data = [NSData dataWithContentsOfFile:file];
    if (!data) { [self fail:task code:404 msg:[@"not found: " stringByAppendingString:rel]]; return; }
    [self respond:task url:url code:200 mime:[self mimeFor:rel] data:data];
}

#pragma mark - API 反向代理

- (void)proxy:(id<WKURLSchemeTask>)task url:(NSURL *)url key:(NSValue *)key {
    NSString *base = self.apiBase ?: @"";
    while ([base hasSuffix:@"/"]) base = [base substringToIndex:base.length - 1];

    NSMutableString *target = [NSMutableString stringWithFormat:@"%@%@", base, url.path];
    if (url.query.length) [target appendFormat:@"?%@", url.query];

    NSURL *turl = [NSURL URLWithString:target];
    if (!turl) { [self fail:task code:400 msg:@"bad api base"]; return; }

    NSMutableURLRequest *req = [NSMutableURLRequest requestWithURL:turl
                                                      cachePolicy:NSURLRequestReloadIgnoringLocalCacheData
                                                  timeoutInterval:20];
    req.HTTPMethod = task.request.HTTPMethod.length ? task.request.HTTPMethod : @"GET";
    req.HTTPBody   = task.request.HTTPBody;
    [task.request.allHTTPHeaderFields enumerateKeysAndObjectsUsingBlock:^(NSString *k, NSString *v, BOOL *stop) {
        if ([[k lowercaseString] isEqualToString:@"host"]) return;
        [req setValue:v forHTTPHeaderField:k];
    }];

    __weak typeof(self) weakSelf = self;
    NSURLSessionDataTask *t = [[NSURLSession sharedSession]
        dataTaskWithRequest:req
          completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        IBoxSchemeHandler *sf = weakSelf;
        if (!sf) return;

        [sf->_lock lock];
        [sf->_tasks removeObjectForKey:key];
        BOOL alive = [sf->_alive containsObject:key];
        [sf->_alive removeObject:key];
        [sf->_lock unlock];
        // task 已被 WebKit 取消：不能再回调，否则 WebKit 抛异常直接崩
        if (!alive) return;

        NSHTTPURLResponse *http = [response isKindOfClass:[NSHTTPURLResponse class]]
                                ? (NSHTTPURLResponse *)response : nil;
        NSInteger code = http ? http.statusCode : (error ? 502 : 200);
        NSData *body = data;
        if (!body) {
            NSString *m = [NSString stringWithFormat:@"proxy error: %@", error.localizedDescription ?: @"unknown"];
            body = [m dataUsingEncoding:NSUTF8StringEncoding];
        }
        NSString *ct = @"application/json";
        id raw = http.allHeaderFields[@"Content-Type"];
        if ([raw isKindOfClass:[NSString class]] && [raw length]) ct = raw;
        [sf respond:task url:url code:code mime:ct data:body];
    }];

    [_lock lock]; _tasks[key] = t; [_lock unlock];
    [t resume];
}

#pragma mark - 响应工具

- (void)respond:(id<WKURLSchemeTask>)task url:(NSURL *)url
           code:(NSInteger)code mime:(NSString *)mime data:(NSData *)data {
    NSDictionary *headers = @{
        @"Content-Type": mime ?: @"application/octet-stream",
        @"Content-Length": [NSString stringWithFormat:@"%lu", (unsigned long)data.length],
        @"Access-Control-Allow-Origin": @"*",
        @"Cache-Control": @"no-store",
    };
    NSHTTPURLResponse *resp = [[NSHTTPURLResponse alloc] initWithURL:url
                                                         statusCode:code
                                                        HTTPVersion:@"HTTP/1.1"
                                                       headerFields:headers];
    // 这里不 try/catch 兜不住 WebKit 的 ObjC 异常，所有调用点都先查 _alive。
    @try {
        [task didReceiveResponse:resp];
        [task didReceiveData:data];
        [task didFinish];
    } @catch (__unused NSException *e) {
        // task 完成前被取消属于正常竞态，吞掉
    }
}

- (void)fail:(id<WKURLSchemeTask>)task code:(NSInteger)code msg:(NSString *)msg {
    NSString *json = [NSString stringWithFormat:@"{\"ok\":false,\"error\":\"%@\"}", msg];
    NSData *d = [json dataUsingEncoding:NSUTF8StringEncoding];
    NSURL *u = task.request.URL ?: [NSURL URLWithString:@"ibox://app/"];
    [self respond:task url:u code:code mime:@"application/json" data:d];
}

@end

#pragma mark - 桥

@implementation IBoxBridge

- (void)userContentController:(WKUserContentController *)userContentController
      didReceiveScriptMessage:(WKScriptMessage *)message {
    NSDictionary *body = [message.body isKindOfClass:[NSDictionary class]] ? message.body : nil;
    NSString *action = body[@"action"];
    if (![action isKindOfClass:[NSString class]]) return;

    if ([action isEqualToString:@"setApiBase"]) {
        NSString *v = body[@"value"];
        if ([v isKindOfClass:[NSString class]] && v.length) {
            self.handler.apiBase = v;
            [[NSUserDefaults standardUserDefaults] setObject:v forKey:@"ibox_api_base"];
        }
    } else if ([action isEqualToString:@"getApiBase"]) {
        NSString *v = self.handler.apiBase ?: @"";
        NSString *js = [NSString stringWithFormat:@"window.__IBOX_NATIVE_BASE__=%@;", [self jsQuote:v]];
        [self.webView evaluateJavaScript:js completionHandler:nil];
    } else if ([action isEqualToString:@"reload"]) {
        [self.webView reload];
    }
}

// 用 JSON 序列化取引号，避免手写转义把路径里的反斜杠漏掉
- (NSString *)jsQuote:(NSString *)s {
    NSData *d = [NSJSONSerialization dataWithJSONObject:@[s ?: @""] options:0 error:NULL];
    NSString *arr = d ? [[NSString alloc] initWithData:d encoding:NSUTF8StringEncoding] : nil;
    if (arr.length >= 2) return [arr substringWithRange:NSMakeRange(1, arr.length - 2)];
    return @"\"\"";
}

@end
