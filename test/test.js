// 函数入口
function __main() {
    log('test')
    // var a = parse(`<ul id="test-id" class="test-class"><li>1</li><li>2</li><li>3</li></ul>`)
    
    // var a = analysis('<ul id="test-id" class="test-class"><li>1</li><li>2</li><li>3</li></ul>')    
    var src = '<ul id="test-id" class="test-class"><li>1</li><li>2</li><li>3</li></ul>'    
    // var result = firstEnd(src)
    var result = tagPair(src)
    log('result', result)
}

__main()