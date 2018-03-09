var util = new Util()
const mark = 'bind-data-element'

function Welement(option) {
    var opt = option || {}
    this.root = opt.root;
    this.data = opt.data
    
    var rootEle = document.querySelector(opt.root)
    formatNode(rootEle)
    dataWithDom(this.data)
    var nodeList = Array.prototype.slice.call(rootEle.children)
    
    // Object.defineProperty(this.data, variable, {
    //     set: function (newVal) {
    //         [].forEach.call(bindings[variable].els, function (e) {
    //             bindings[variable].value = e.textContent = newVal
    //         })
    //     },
    //     get: function () {
    //         return bindings[variable].value
    //     }
    // })
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
    log('reult', result)
    rootEle.innerHTML = result
}

function tpl(match, name) {   
    return `<span ${mark}="${name}"></span>`
}
// {title: 'test'} => {title: {value: 'hello', dom: node}}
function dataWithDom(dataObj) {
    log('datawith')
    var attr = `[${mark}]`
    var eleList = document.querySelectorAll(attr)
    log('ele list', eleList)
    // var result = {}
    // for (const key in dataObj) {
    //     if (dataObj.hasOwnProperty(key)) {
    //         var attr = `[${mark}=${key}]`
    //         var ele = document.querySelector(attr)
    //         const item = dataObj[key];            
    //         result[key] = {value: item}            
    //         result[key]['dom'] = []            
    //     }
    // }
    // log('result', result)
}




