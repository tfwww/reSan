import util from './util'
import {directives} from './directives'

var prefix = 'v'
var selectors = Object.keys(directives).map(function(key) {
    return `[${prefix}-${key}]`
}).join()

log('sel', selectors)
// var dataElePair = {}

function Welement(option) {
    var opt = option || {}
    var data = opt.data
    var bindings = {}
    var rootEl = document.getElementById(opt.el)
    var els = rootEl.querySelectorAll(selectors)

    Array.prototype.forEach.call(els, function(el) {        
        var attrs = cloneAttrs(el.attributes)
        attrs.forEach(function(attr) {
            parseDirective(attr)
        })
    })
}

/**
 * 
 * @param {node array like} attrs 一个节点的所有属性
 * @returns {array} list 一个数组，元素为 {name: 属性名, value: 属性值}
 */
function cloneAttrs(attrs) {
    var list = Array.prototype.map.call(attrs, function(attr) {
        return {
            name: attr.name,
            value: attr.value
        }
    })    
    return list
}

/**
 * 
 * @param {object} attr {name: 属性名, value: 属性值}
 */
function parseDirective(attr) {
    log('attr', attr)
}

export {Welement}




