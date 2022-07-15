function setidval(id, val) {
    var el = document.getElementById(id);
    if (el) {
        el.value = val;
        return true;
    } else {
        return false;
    }
}

function getdomstate() {
    return document.readyState;
}

function isdomready() {
    return document.readyState == 'complete';
}

function isIdExist(id) {
    return Boolean(document.getElementById(id));
}
function isClassExist(classname) {
    return Boolean(document.getElementsByClassName(classname).length > 0);
}

function bodyappend(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el);
}

function bodyAppendTipTop(txt) {
    bodyappend(`
<div style="
padding: 10px;
position: fixed;
text-align: center;
width: 100%;
top: 0;
left: 0;
z-index: 9999999;
">
<div style="
display: inline-block;
padding: 10px 30px;
border-radius: 5px;
font-size: 13px;
background-color: #ff0000cc;
color: #ffffe5;
">
        ${txt}
    </div>
</div>
`);
}