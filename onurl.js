function testurl(url) {
    if (url instanceof RegExp && url.test(window.location.hostname + window.location.pathname)) {
        
    }
}

async function onurlAsync(url, asynccb) {
    var BLACK_URL = 'about:blank';
    var currentUrl = '';
    if (window.location.href == BLACK_URL) {
        currentUrl = BLACK_URL;
    } else {
        currentUrl = window.location.hostname + window.location.pathname;
    }
    console.log('onurlAsync当前判断网址:[  ' + currentUrl + '  ], 被判断网址[' + url + ']')
    var res = null
        // 空白页
        || (currentUrl == BLACK_URL && (url.toLowerCase() == BLACK_URL || url.toLowerCase() == 'blank'))
        // 直接等于
        || (currentUrl == url)
        // 正则判断
        || ((url instanceof RegExp) && url.test(currentUrl));
    res = res && (await asynccb());
    return res
}

function onurl(url, cb) {
    var BLACK_URL = 'about:blank';
    var currentUrl = '';
    if (window.location.href == BLACK_URL) {
        currentUrl = BLACK_URL;
    } else {
        currentUrl = window.location.hostname + window.location.pathname;
    }
    console.log('onurl当前判断网址:[  ' + currentUrl + '  ], 被判断网址[' + url + ']')
    if (window.location.href == 'about:blank') {
        if (url == 'blank' || url == 'about:blank') {
            return cb();
        }
    }
    else if (window.location.hostname + window.location.pathname == url) {
        return cb();
    }
    return null;
}

function onurlblank(cb) {
    var href = window.location.href || (window.location.hostname + window.location.pathname);
    console.log('onurlblank当前判断网址:[  ' +window.location.hostname + window.location.pathname + '  ], 被判断网址[about:blank]')
    if (href == 'about:blank') {
            return cb();
    }
}

async function onurlblankAsync(cb) {
    var href = window.location.href || (window.location.hostname + window.location.pathname);
    console.log('onurlblankAsync当前判断网址:[  ' +window.location.hostname + window.location.pathname + '  ], 被判断网址[about:blank]')
    if (href == 'about:blank') {
        return await cb();
    }
}