/* -------------------------------------------------------------------*/
function isdomready() {
    return document.readyState == 'complete';
}
/* -------------------------------------------------------------------*/
function elSetStyle(el, style) { /* 清除元素的style */
    el.setAttribute('style', style)
}
function elSetStyleEmpty(el) {  /* 清除元素的style */
    el.setAttribute('style', '')
}
function elSetStyleLT0(el) { /* 将元素置于屏幕左上角 */
    el.setAttribute('style', 'position: fixed; z-index: 99999; left:0;top:0;')
}
function elGetPosRelView(el) { /* 获取元素相对视口坐上角 */
    return {
        x: el.getBoundingClientRect().left,
        y: el.getBoundingClientRect().top
    }
}
function elExistId(id) {
    return Boolean(document.getElementById(id));
}

function elExistClass(class_) {
    return document.getElementsByClassName(class_).length > 0;
}

function setidval(id, val) {
    var el = document.getElementById(id);
    if (el) {
        el.value = val;
        return true;
    } else {
        return false;
    }
}
/* -------------------------------------------------------------------*/
function scrollgetpos() {   /* 获取滚动条坐标 */
    return {
        x: window.scrollX,
        y: widnow.scrollY
    }
}
function scroll2(x, y) {    /* 移动滚动条 */
    window.scrollTo(x, y)
}
function scroll2top() {   
    window.scrollTo(window.scrollX, 0)
}
function scroll2bottom() {
    window.scrollTo(window.scrollX, document.body.scrollHeight)
}
function scroll2left() {
    window.scrollTo(0, widnow.scrollY)
}
function scroll2right() {
    window.scrollTo(document.body.scrollWidth, widnow.scrollY)
}
/* -------------------------------------------------------------------*/
function viewGetSize() { /* 获取视口的尺寸 */
    return {
        w: window.innerWidth,
        h: window.innerHeight
    }
}

