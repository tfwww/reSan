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
    var nodeList = Array.prototype.slice.call(rootEle.children)    
    // nodeList.forEach(v => {        
    //     var text = util.rmBrace(v.innerText)        
    //     v.innerText = opt.data[text]
        
    //     var bothway = v.getAttribute('w-bothway')
    //     if (bothway) {
    //         var attrValue = util.rmSpace(bothway)
    //     }
    // });
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
// 返回 {title: {value: 'hello', dom: node}}
function dataWithDom(pair, srcData) {
    for (const key in pair) {        
        if (pair.hasOwnProperty(key)) {            
            var attr = `[${mark}=${key}]`
            var eleList = document.querySelectorAll(attr)
            pair[key]['dom'] = eleList
            pair[key]['value'] = srcData[key]
        }
    }
    log('pair', pair)
    return pair
}




