function Welement(option) {
    var opt = option || {}
    this.el = opt.el;
    this.data = opt.data
    
    var rootEle = document.querySelector(opt.el)
    var nodeList = Array.prototype.slice.call(rootEle.children)
    var textStr = parseText(rootEle)    
    log('text str', textStr)
    nodeList.map(function(v, i) {
        // 切掉花括号
        var text = v.innerText.replace(/\{\{|\}\}/g, '')        
        v.innerText = opt.data[text]
    })    
}

function parseText(node) {
    // 去掉空格
    var text = node.innerText.replace(/\s*/g, '')
    var list = text.match(/(\{\{.*?\}\}?)/g)    
    
    return list
}



