var util = new Util()
const mark = 'bind-data-element'
var dataElePair = {}

function Welement(option) {
    var opt = option || {}
    this.root = opt.root;
    this.data = opt.data
    
    var rootEle = document.querySelector(opt.root)
    formatNode(rootEle)
    dataWithDom(dataElePair, this.data)
    // this.data.title = 'testTitle'
    // this.data.message = 'hell msg'
}

// 将 DOM 中 {{xxx}} 变量变成一个单独的节点
function formatNode(rootEle) {
    var src = rootEle.innerHTML
    var result = util.replaceBrace(src, tpl)
    rootEle.innerHTML = result
}

function tpl(match, name) {
    dataElePair[name] = {}
    dataElePair[name]['dom'] = []
    return `<span ${mark}="${name}"></span>`
}

// 移除之前添加的自定义节点，添加相应的 data 文本值
// function updateNode(srcEle, insertEle) {
//     srcEle.insertAdjacentElement('beforebegin', element);
//     srcEle.
// }
// 构造成这样的数据结构 {title: {value: 'hello', dom: node}}
function dataWithDom(pair, srcData) {
    for (const key in pair) {        
        if (pair.hasOwnProperty(key)) {            
            var attr = `[${mark}=${key}]`            
            var eleList = document.querySelectorAll(attr)
            log('elelist', eleList)
            pair[key]['dom'] = eleList
            pair[key]['value'] = srcData[key]
           
            Object.defineProperty(srcData, key, {
                set: function (newVal) {
                    log('new', newVal)               
                    Array.prototype.forEach.call(pair[key]['dom'], function(ele) {                        
                        // ele.textContent = newVal
                        var newNode = document.createTextNode(newVal)
                        ele.parentNode.replaceChild(newNode, ele);
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
    log('origin', dataElePair)
    return pair
}




