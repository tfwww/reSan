// 解析 dom
import {commandObj} from './command.js'
import {util} from './util.js'
// import {log} from '../src/log.js'

var prefix = 'w-'
const mark = 'bind-data-element'
const attr = 'w-bothway'
const onReg = /^v-on:|^@/

var attrSel = Object.keys(commandObj).map(function(item) {
    return `[${prefix}${item}]`
}).join()

log('attrSel', attrSel)
/**
 * @param {object} option {root: '#app', data: {name: value}}
 */
function Interpret(option) {
    var opt = option || {}
    var root = opt.root
    var data = opt.data
    var dataElePair = initPair(data)    
    var rootEle = document.querySelector(opt.root)
    var attrEles = rootEle.querySelectorAll(attrSel)
    log('atr eles', attrEles)   
    formatNode(rootEle)
    dataWithDom(dataElePair, data)
    pushAttrData(rootEle, dataElePair)

    // 解析自定义命令
    function parseCommand(attrSel) {
    }
}

// 初始化数据对象
function initPair(srcData) {
    let obj = {}
    for (const key in srcData) {
        if (srcData.hasOwnProperty(key)) {
            obj[key] = {dom: []}
            obj[key]['value'] = srcData[key]            
        }
    }
    return obj
}

function tpl(match, name) {
    return `<span ${mark}="${name}"></span>`
}
// 将 DOM 中 {{xxx}} 变量变成一个单独的节点
function formatNode(rootEle) {
    var src = rootEle.innerHTML
    var result = util.replaceBrace(src, tpl)
    rootEle.innerHTML = result
}

// 构造成这样的数据结构 {title: {value: 'hello', dom: node}}
// 并进行绑定
function dataWithDom(pair, srcData) {
    for (const key in pair) {
        if (pair.hasOwnProperty(key)) {            
            var attr = `[${mark}=${key}]`            
            var eleList = document.querySelectorAll(attr)
            log('elelist', eleList)
            pair[key]['dom'] = Array.from(eleList)
           
            Object.defineProperty(srcData, key, {
                set: function (newVal) {
                    log('new', newVal)               
                    Array.prototype.forEach.call(pair[key]['dom'], function(ele) {                        
                        ele.textContent = newVal
                        // var newNode = document.createTextNode(newVal)
                        // ele.parentNode.replaceChild(newNode, ele);
                    })
                    pair[key].value = newVal
                },
                get: function () {
                    log('get')
                    return pair[key].value
                }
            })
        }
        // 初始情况
        srcData[key] = pair[key]['value']
    }    
    return pair
}

// 将属性的节点也放入构造的数据对象 dataElePair 里
function pushAttrData(rootEle, dataEleObj) {
    log('begin', dataEleObj)
    var attrEleList = rootEle.querySelectorAll(`[${attr}]`)

    Array.prototype.forEach.call(attrEleList, function(ele) {
        var attrVal = ele.getAttribute(attr)        
        dataEleObj[attrVal]['dom'].push(ele)
    })
    log('push', dataEleObj)
}

export {Interpret}