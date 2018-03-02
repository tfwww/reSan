var start = '<'
var end = '>'
var space = ' '

function analysis(source) {
    var src = source.slice(0)    
    var type = ''
    // 错误情况判断
    if (src[0] != start) {
        throw 'wrong string format, shoud be the beginning of <'
    }
    
    var type = parseType(source)
    return type
}

// 辅助函数
function parseType(src) {
    var firstSpace = src.indexOf(space)
    var type = src.slice(1, firstSpace)
    return type
}