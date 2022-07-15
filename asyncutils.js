async function sleep(msec) {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve(null);
        }, msec)
    })
}

/*
    msec: 尝试间隔, 毫秒
    maxcount: 最大尝试次数, <= 0 时无限制
    cb: 返回true停止尝试
*/
function wait(msec, maxcount, cb) {
    return new Promise((resolve, reject)=>{
        var count = 0;
        var timer = setInterval(() => {
            count += 1;
            if (maxcount > 0 && count > maxcount) {
                clearInterval(timer);
                reject('等待函数超时超时');
            }
            else {
                var res = cb()
                if (res) {
                    clearInterval(timer);
                    resolve(res)
                } else {
                    console.log('进行' + count + '次尝试');
                }
            }
        }, msec)
    })
}

/* 等待webview2 的 python 接口, pyapi4js=Api() */
async function waitPyApi(msec) {
    if (!msec || msec < 1) {
        msec = 100;
    }
    return await wait(msec, 0, ()=> {
        console.log('等待python api');
        if ( window.hasOwnProperty('pywebview') && window.pywebview.hasOwnProperty('api') )  {
            return window.pywebview.api;
        }
    });
}