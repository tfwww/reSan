// import 'babel-polyfill'
// import {log} from './log.js'

var start = '<'
var end = '>'
var space = ' '
var close = '</'
var pair = '><'

// revert html source to array
var wmNodeList = []
var wmNodeObj = {}
function formatSrc(source) {    
    var pair = tagPair(source)
    var newSrc = removeTagPair(source, pair)
    // 错误情况判断
    if (source[0] != start) {
        throw 'wrong string format, shoud be the beginning of <'
    }

    // wmNodeList.push(pair.left + pair.right)
    wmNodeList.push(pair.left)    
    if (newSrc === '') {    
        return wmNodeList
    }
    formatSrc(newSrc)
}

// 对单个 html 节点解析
function analysis(source) {
    var src = source.slice(0)
    var type = ''
    
    var child = {
        type: '',
        attr: '',
        text: '',
        child: '',
    }
    
    child.type = parseType(src)
    child.attr = parseAttr(src)
    child.text = parseText(src)    
    // child.child = childObj
    log('child', child)
    return child
}

// 兄弟元素放到同一个数组里
function brotherNode(nodeList) {
    log('bro', nodeList)
    var list = nodeList.map(function(v, i) {
        return analysis(v)
    })
    var typeList = []
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        typeList.push(item.type)
    }
    // 去重
    var typeSet = new Set(typeList)
    var result = []
    typeSet.forEach(function(v) {        
        result.push(v)        
    })

    var brotherNode = result.map(function(v, inx) {
        var arr = []
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.type === v) {
                arr.push(item)
            }            
        }
        return arr
    })
    return brotherNode    
}

function analysisNode(nodeList) {
    log('nodeList in', nodeList)   
    formatSrc(nodeList)
    var list = brotherNode(wmNodeList)
    var obj = {child: list[0]}
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        log('item', item)
        // item.child = list[i + 1]
        item[0].child = list[i + 1]
        if (i + 1 >= list.length) {
            item.child = null
        }         
    }
    log('result', obj)
    return obj
}

/**
 * @param {string} src - the parse html source
 * @returns {string} the html element name
 */
function parseType(src) {
    var newSrc = src.slice(1, src.indexOf(end))
    var result = newSrc.split(space)    
    return result[0]
}

/**
 * @param {string} src - the parse html source
 * @returns {object} the html attribute, like class name, id name.
 */
function parseAttr(src) {    
    var tmp = src.slice(0, src.indexOf(end))
    var list = tmp.split(space)    
    var obj = {}

    list.map(function(item) {        
        if (item.includes('=')) {
            var temp = item.split('=')            
            obj[temp[0]] = temp[1].replace(/"/g, '')
        }
    })
    return obj
}

function parseText(src) {
    var tmp = src.slice(src.indexOf(end) + 1)
    return tmp    
}
// <> pair
function tagPair(source) {
    // 去掉开头的 '<'
    var src = source.slice(1)    
    var tag = parseType(src)
    var left = src.slice(0, src.indexOf(start))
    var right = src.slice(src.lastIndexOf(close))

    return {
        left: start + left,
        right: right
    }
    // return start + left + right
    // var sInx = startInx(src)
    // var pInx = pairInx(src)
    // var beginPart = src.slice(sInx, pInx)
    
    // var endPart = src.slice(endInx(src))
    // log('end', endPart)
    // return beginPart + endPart    
}
// src 原始 html 字符串; pair 要删除的 html 节点 对象
function removeTagPair(src, pair) {
    var result = ''
    var rightStr = src.replace(pair.left, '')

    return rightStr.replace(pair.right, '')
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

// export {wmNodeList, analysisNode, formatSrc}