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