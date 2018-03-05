import {parse} from '../src/parse.js'
import {log} from '../src/log.js'
import {wmNodeList, analysisNode, formatSrc} from '../src/analysis.js'

// 函数入口
function __main() {
    // log('test')
    var a = parse(`<ul id="test-id" class="test-class">test<li>1</li><li>2</li><li>3</li></ul>`)
    // log('a', a)
    // var a = analysis('<ul id="test-id" class="test-class"><li>1</li><li>2</li><li>3</li></ul>')    
    var src = '<ul id="test-id" class="test-class">文本标题<li>1</li><li>2</li><li>3</li></ul>'    
    // var src = '<div><span>sds</span></div>'        
    // var result = analysis(src)
    formatSrc(src) 
    // log('node list', wmNodeList) 
    var result = analysisNode(wmNodeList)
    // brotherNode(wmNodeList)
    // log('node obj', result)
}

__main()