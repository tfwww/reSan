function analysis(source) {
    var src = source.slice(0)
    var start = '<'
    var end = '>'
    var space = ' '
    var type = ''
    // 错误情况判断
    if (src[0] != start) {
        throw 'wrong string format, shoud be the beginning of <'
    }
    var firstSpace = src.indexOf(space)
    type = src.slice(1, firstSpace)
    return type
}