var util = new Util()

function Welement(option) {
    var opt = option || {}
    this.el = opt.el;
    this.data = opt.data
    
    var rootEle = document.querySelector(opt.el)
    var nodeList = Array.prototype.slice.call(rootEle.children)

    nodeList.map(function(v, i) {
        // 切掉花括号
        var text = util.rmBrace(v.innerText)        
        v.innerText = opt.data[text]
        
        var bothway = v.getAttribute('w-bothway')
        var attrValue = util.rmSpace(bothway)
        log('attV', attrValue)
    })
}

function parseText(node) {
    // 去掉空格
    var text = node.innerText.replace(/\s*/g, '')
    var list = text.match(/(\{\{.*?\}\}?)/g)

    return list
}

// 解析
function Parser(str) {
    this.flag = ['w-bothway']

}



