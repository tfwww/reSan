var util = new Util()
const mark = 'bind-data-element'
const attr = 'w-bothway'
// var dataElePair = {}

function Welement(option) {
    var opt = option || {}
    this.root = opt.root;
    this.data = opt.data

    let data = this.data
    // data element 数据对象    
    var dataElePair = initPair(data)
    var rootEle = document.querySelector(opt.root)

    formatNode(rootEle)    
    dataWithDom(dataElePair, this.data)
    pushAttrData(rootEle, dataElePair)    
    // this.data.title = 'testTitle'
    // this.data.message = 'hell msg'
}

// 将 DOM 中 {{xxx}} 变量变成一个单独的节点
function formatNode(rootEle) {
    var src = rootEle.innerHTML
    var result = util.replaceBrace(src, tpl)
    rootEle.innerHTML = result
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
    // dataElePair[name] = {}
    // dataElePair[name]['dom'] = []
    return `<span ${mark}="${name}"></span>`
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

// 移除之前添加的自定义节点，添加相应的 data 文本值
// function updateNode(srcEle, insertEle) {
//     srcEle.insertAdjacentElement('beforebegin', element);
//     srcEle.
// }

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
    log('pair', pair)    
    return pair
}






