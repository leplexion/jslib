/*
    仅用于浏览器
    在浏览器中将 dom 结构生成 object 树结构形式.

    --- 虚荣的倒影 / Leplexion 
    --- 2022-07-10
*/


dom2obj = function(options, cb) {
    /* cb 递归时回调, 符合条件的元素传入cb函数, (elobj, el, options, path)=> { } */
    if (!options || options == window.document) {
        options = {el: window.document}; 
    }
    else if (options instanceof HTMLElement) { 
        options = {el: options}; 
    }
    else if (typeof(options) == 'string') {
        if (options.length < 1) { 
            return null; 
        }
        else if (options.length == 1) { 
            var els =  document.getElementsByTagName(options);
            if (els.length < 1) { return null; }
            options = {el: els[0]};
        }
        else {
            if (options.substr(0, 1) == '#') {
                var el = document.getElementById(options.substr(1));
                if (!el) { return null; }
                options = {el};
            }
            else if (options.substr(0, 1) == '.') {
                var els = document.getElementsByClassName(options.substr(1));
                if (els.length < 1) { return null; }
                options = {el: els[0]};
            }
            else {
                var els =  document.getElementsByTagName(options);
                if (els.length < 1) { return null; }
                options = {el: els[0]};
            }
        }
    }

    options = {
        el:             options.hasOwnProperty('el')            ? options.el                                                            : window.document,

        /* 从子元素起, 不获取包含在此tag列表中的el元素, 小写 */
        ignoreTags:     options.hasOwnProperty('ignoreTags')    ? options.ignoreTags                                                    : ['style', 'svg', 'link', 'script'],

        /* 获取的attrs对象中忽略这些属性 */
        ignoreAttrs:    options.hasOwnProperty('ignoreAttrs')   ? options.ignoreAttrs                                                   : [],   // ['value', 'data-id', 'style']

        /* 从子元素起, 不获取包含class在此class列表中el元素 */
        /* ignoreClass:    options.hasOwnProperty('ignoreClass')   ? options.ignoreClass                                                   : [],   // ['active', 'red'] */
        
        maxlevel:       options.hasOwnProperty('maxlevel')      ? (isNaN(parseInt(options.maxlevel)) ? -1 : parseInt(options.maxlevel)) : -1,

        rootonly:       options.hasOwnProperty('rootonly')      ? Boolean(options.rootonly)                                             : true,

        text:           options.hasOwnProperty('text')          ? Boolean(options.text)                                                 : true,

        innerText:      options.hasOwnProperty('innerText')     ? Boolean(options.innerText)                                            : false,

        path:           options.hasOwnProperty('path')          ? Boolean(options.path)                                                 : true,

        cb:             cb                                      ? cb                                                                    : null,
    };

    

    var tree;

    if (!options.el) { 
        return null; 
    }
    else if (options.el == window.document) {
        tree = {
            options, 
            root : {
                tag: 'document',
                ...(options.path        ? {path: '0'} : {}),
                attrs: {
                    url:document.URL || '',
                    charSet: document.characterSet || '',
                    contentType:document.contentType || '',
                    title: document.title || '',
                    readyState: document.readyState || ''
                },
                childs: [],
                ...(options.text        ? {}: {text: ''}),
                ...(options.innerText   ? {}: {innerText: ''}),
            }
        }
    }
    else if (options.el instanceof HTMLElement){
        tree = {
            options, 
            root : getprops(options.el, options, '0')
        }
    }
    else {
        console.log(options.el);
        throw Error('options选项传入未知的元素类型');
    }

    if (options.cb) { options.cb(tree.root, options.el, '0', options); }

    tree = buildTree(tree);

    return options.rootonly ? tree.root : tree; 
}

function getprops(el, options, curpath) {

    return {
        tag: el.tagName.toLowerCase(),
        ...(options.path        ? {path: curpath} : {}),
        attrs: getEleAttrs(el, options),
        childs: [],
        ...(options.text        ? {text: getEleTextTop(el)}: {}),
        ...(options.innerText   ? {innerText: ( el.hasOwnProperty('innerText') ? el.innerText.trim() : '' )} : {}),
    }

}

/* 获取顶层的文本 */
function getEleTextTop(el) {
    var txt = '';
    for (var i = 0; i < el.childNodes.length; ++i)
        if (el.childNodes[i].nodeType == 3) {
            txt += el.childNodes[i].textContent;
        } else if (el.childNodes[i].nodeType == 1) {
            var name = el.childNodes[i].nodeName || el.childNodes[i].tagName || '';
            if (name.toUpperCase() == 'BR') {
                txt += '\n';
            }
        }
    return txt.trim();
}

function getEleAttrs(el, options) {
    var attrNames = el.getAttributeNames();
    var attrs = {};
    if (options.ignoreAttrs.length > 0) {
        for (var i = 0; i< attrNames.length; i++) {
            var attrName = attrNames[i];
            if (!options.ignoreAttrs.includes(attrName)) {
                attrs[attrName] = el.getAttribute(attrName)
            }
        }
    }
    for (var attrName of attrNames) {
        attrs[attrName] = el.getAttribute(attrName)
    }
    return attrs;
}

function buildTree(tree) {

    var rootel = tree.options.el;
    var rootobj = tree.root;
    var options = tree.options;
    var level = 0
    var path = '0'
    var maxlevel = tree.options.maxlevel;

    if (maxlevel == 0) {
        return tree;
    }
    else {
        build(rootel, rootobj, options, level, maxlevel, path);
        return tree;
    }
    function build(el, obj, options, level, maxlevel, path) {
        level += 1;

        for (var i = 0; i < el.children.length; i++) {
            var cel = el.children[i];
            if ( options.ignoreTags.length > 0 && options.ignoreTags.includes(cel.tagName.toLowerCase()) ) {
                continue
            }
            var curpath = path + ',' + i;
            var cobj = getprops(cel, options, curpath);

            if (options.cb) { options.cb(cobj, cel, curpath, options); }

            obj.childs.push(cobj);
            if ( (maxlevel == -1) || (level < maxlevel) ) {
                build(cel, cobj, options, level, maxlevel, curpath)
            }
        }
    }
}
