import util from './util'
import {Directives} from './directives'
import {Filter} from './filter'

var prefix = 'v'
var selectors = Object.keys(Directives).map(function(key) {
    return `[${prefix}-${key}]`
}).join()

function Welement(option) {    
    var self = this    
    var opt = option || {}    
    var bindings = {}

    self.data = {}
    self.el = document.getElementById(opt.el)
    
    var data = opt.data
    var rootEl = document.getElementById(opt.el)
    var els = rootEl.querySelectorAll(selectors)

    Array.prototype.forEach.call(els, processNode)
    processNode(rootEl)

    // 初始设置触发 set 存取器
    for (var key in bindings) {        
        self.data[key] = opt.data[key]
    }
    
    function processNode(el) {
        var attrs = cloneAttrs(el.attributes)
        attrs.forEach(function(attr) {
            var directive = parseDirective(attr)
            log('directive', directive)
            if (directive) {
                bindDirective(self, el, bindings, directive)
            }
        })
    }
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
    var name = attr.name
    var value = attr.value

    // 解析出指令内容
    var barInx = value.indexOf('|')
    var key = barInx === -1 ? value.trim() : value.slice(0, barInx).trim()
    var filter = barInx === -1 ? null : value.slice(barInx + 1).split('|').map(function(item){
        return item.trim()
    })

    // 解析指令名 key
    var noprefix = name.slice(prefix.length + 1)
    var symInx = noprefix.indexOf('-')
    var dirName = symInx === -1 ? noprefix : noprefix.slice(0, symInx)
    var def = Directives[dirName]
    // 取第二个 - 的参数, 事件
    var arg = symInx === -1 ? null : noprefix.slice(symInx + 1)
    
    return def === undefined ? null : {
        attr: attr,
        key: key,
        filter: Filter[filter],
        definition: def,
        argument: arg,
        update: typeof def === 'function' ? def : def.update
    }
}

// 将指令放到 bindings 对象中
function bindDirective(welement, el, bindings, directive) {
    el.removeAttribute(directive.attr.name)
    var key = directive.key
    var binding = bindings[key]    
    
    if (!binding) {
        bindings[key] = {
            value: undefined,
            directives: []
        }
        binding = {
            value: undefined,
            directives: []
        }
    }
    directive.el = el
    binding.directives.push(directive)
    var data = welement.data
    if (!data.hasOwnProperty(key)) {   
        bindAccessor(welement, key, binding)
    }
}

function bindAccessor(obj, key, binding) {    
    Object.defineProperty(obj.data, key, {
        get: function() {
            return binding.value
        },
        set: function(newValue) {            
            var oldValue = binding.value
            if (oldValue != newValue) {
                binding.value = newValue                
                binding.directives.forEach(function(directive) {                    
                    if (newValue && directive.filter) {
                        newValue = directive.filter(newValue)
                    }
                    directive.update(directive.el, newValue, directive.argument, directive)
                })
            }
        }
    })
}

export {Welement}




