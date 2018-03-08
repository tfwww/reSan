var util = new Util()

function Welement(option) {
    var opt = option || {}
    this.el = opt.el;
    this.data = opt.data
    
    var rootEle = document.querySelector(opt.el)
    var nodeList = Array.prototype.slice.call(rootEle.children)

    nodeList.map(function(v, i) {        
        var text = util.rmBrace(v.innerText)        
        v.innerText = opt.data[text]
        
        var bothway = v.getAttribute('w-bothway')
        if (bothway) {
            var attrValue = util.rmSpace(bothway)
            Object.defineProperty(v, 'w-bothway', {
                set: function(value) {
                    v.value = value
                },
                get: function() {
                    return v.value
                }
            })            
        }        
    })
}

// 解析
function Parser(str) {
    this.flag = ['w-bothway']

}



