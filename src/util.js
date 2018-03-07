// 实用方法

function Uitl() {
    
}
Uitl.prototype.rmSpace = function(str) {
    var result = null

    if (typeof str === 'string') {
        result = str.replace(/\s*/g, '')
    }
    // 如果为空字符串
    if (result.length === 0) {
        result = null
    }

    return result
}