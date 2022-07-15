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
    console.log('onurl当前判断网址:[' + currentUrl + ']')
    var res = false
        // 空白页
        || (currentUrl == BLACK_URL && (url.toLowerCase() == BLACK_URL || url.toLowerCase() == 'blank'))
        // 直接等于
        || (currentUrl == url)
        // 正则判断
        || ((url instanceof RegExp) && url.test(currentUrl));
    res = res && (await asynccb());

}

function onurl(url, cb) {
    
    if (window.location.href == 'about:blank') {
        console.log('onurl当前判断网址:[' + window.location.href + ']')
        if (url == 'blank' || url == 'about:blank') {
            return cb();
        }
    }
    else if (window.location.hostname + window.location.pathname == url) {
        console.log('onurl当前判断网址:[' + (window.location.hostname + window.location.pathname) + ']')
        return cb();
    }
    else {
        console.log('onurl当前判断网址:[' + (window.location.hostname + window.location.pathname) + ']')
        // throw Error('未知的网址' + (window.location.hostname + window.location.pathname));
    }
}
