/*
    仅用于浏览器, 输出函数, 隐藏 控制台输出 object 中的 [[prototype]]
    console.debug( {a:1, b: {c: 2}} )
*/
console.debug = function() {
    function clear(o) {
        var obj = JSON.parse(JSON.stringify(o));
        // [!] clone
        if (obj && typeof obj === 'object') {
            obj.__proto__ = null;
            // clear
            for (var j in obj) {
                obj[j] = clear(obj[j]); // recursive
            }
        }
        return obj;
    }
    for (var i = 0, args = Array.prototype.slice.call(arguments, 0); i < args.length; i++) {
        args[i] = clear(args[i]);
    }
    console.log.apply(console, args);
};