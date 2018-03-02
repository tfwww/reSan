var start = '<'
var end = '>'
var space = ' '
var close = '</'
var pair = '><'

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

/**
 * @param {string} src - the parse html source
 * @returns {string} the html element name
 */
function parseType(src) {
    var firstSpace = src.indexOf(space)
    var type = src.slice(1, firstSpace)
    return type
}

/**
 * @param {string} src - the parse html source
 * @returns {object} the html attribute, like class name, id name.
 */
function parseAttr(src) {
    var firstSpace = src.indexOf(space)
    var type = src.slice(1, firstSpace)
    return type
}

// <> pair
function tagPair(src) {
    var sInx = startInx(src)
    var pInx = pairInx(src)
    var beginPart = src.slice(sInx, pInx)
    
    var endPart = src.slice(endInx(src))
    log('end', endPart)
    return beginPart + endPart
    
}
// get '><' index, use it to slice
function pairInx(src) {
    var fSrc = src
    var inx = fSrc.indexOf(pair)
    return inx + 1
}

// get '<xxx' index, use it to slice
function startInx(src) {
    var tagName = parseType(src)
    var startTag = start + tagName
    var fSrc = src
    
    return fSrc.indexOf(startTag)
}

// get the '</xxxx>' index, use it to slice
function endInx(src) {
    var tagName = parseType(src)
    var endTag = close + tagName + end
    log('end tag', endTag)
    var fSrc = src
    log('end inde', fSrc.indexOf(endTag))
    return fSrc.indexOf(endTag)
}
// remove the space in the string
function trim(str) {
    var result = ''    
    if(str){        
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        result = result.replace(/\s/g, "");
    }
    return result
}