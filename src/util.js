// 实用方法

function Util() {
    
}

Util.prototype.rmSpace = function(str) {
    var result = null

    if (typeof str === 'string') {
        result = str.replace(/\s*/g, '')
    }   

    return result === '' ? null : result
}

Util.prototype.rmBrace = function(str) {
    var result = null
    
    if (typeof str === 'string') {
        result = str.replace(/\{\{|\}\}/g, '')
    }

    return result === '' ? null : result
}