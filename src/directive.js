import {Directives} from './directives'
import {Filter} from './filter'
import {Config} from './config'

var prefix = 'v'
var KEY_RE = /^[^\|]+/
var FILTERS_RE = /\|[^\|]+/g

// 指令类
function Directive(def, attr, arg, key) {
    if (typeof def === 'function') {
        this.definition = def
    } else {
        for (var key in def) {
            if (key === 'update') {
                this.definition = def.update
                continue                
            }  
            this[key] = def[key]
        }
    }
    this.attr = attr
    this.arg = arg
    this.key = key
    
    var filters = attr.value.match(FILTERS_RE)
    if (filters) {
        this.filters = filters.map(function(filter) {
            var tokens = filter.replace('|', '').trim().split(/\s+/)
            var defToken = tokens[0]            
            return {
                name: defToken,
                apply: Filter[defToken],
                args: tokens.length > 1 ? tokens.slice(1) : null
            }            
        })
    }
}

Directive.prototype.update = function(value) {    
    // 调用过滤器
    if (this.filters) {
        value = this.applyFilters(value)
    }
    this.definition(value)
}

Directive.prototype.applyFilters = function(value) {
    log('app', value)
    var result = value
    this.filters.forEach(function(filter) {
        if (!filter.apply) {
            throw new Error('Unknown filter: ' + filter.name)            
        }
        result = filter.apply(result, filter.args)
    });
    return result
}
/**
 * 
 * @param {object} attr {name: 属性名, value: 属性值}
 */
function parse(attr) {
    var name = attr.name
    var value = attr.value
    var prefix = Config.prefix

    if (name.indexOf(prefix) === -1) {
        return null
    }

    // 解析指令名 key
    var noprefix = name.slice(prefix.length + 1)
    var symInx = noprefix.indexOf('-')
    var arg = symInx === -1 ? null : noprefix.slice(symInx + 1)
    var dirName = symInx === -1 ? noprefix : noprefix.slice(0, symInx)
    var def = Directives[dirName]
    // 解析出指令内容
    var key = value.match(KEY_RE)    
    return def && key ? new Directive(def, attr, arg, key[0].trim()) : null
}

export {parse}