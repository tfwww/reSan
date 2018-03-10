
var expect = chai.expect;
// describe('解析 DOM', function () {
// 	var src = '<ul id="test-id" class="test-class">文本标题<li>1</li><li>2</li><li>3</li></ul>'
//     var result = {
// 		"child": [{
// 			"type": "ul",
// 			"attr": {
// 				"id": "test-id",
// 				"class": "test-class"
// 			},
// 			"text": "文本标题",
// 			"child": [{
// 				"type": "li",
// 				"attr": {},
// 				"text": "1"
// 			}, {
// 				"type": "li",
// 				"attr": {},
// 				"text": "2",
// 				"child": ""
// 			}, {
// 				"type": "li",
// 				"attr": {},
// 				"text": "3",
// 				"child": ""
// 			}]
// 		}]
// 	}    
// 	it('DOM 字符串应该解析成正确的数据结构', function () {
//         var run = JSON.stringify(analysisNode(src))
// 		expect(run).to.be.equal(JSON.stringify(result));
// 	});
// });

var app = new Welement({
    root: '#app',
    data: {
        title: 'test',        
        message: 'Hello Welement',
        tip: '',
    }
})

function eventBind() {
    var ele = document.querySelector('.input')
    ele.addEventListener('input', function(event) {
        log('change')       
        app.data.message = ele.value
    })
}

eventBind()

// var data = {title: 'test', msg: 'hello msg'}
// // var result = dataWithDom(data)
// // log('result', result)

// var rootEle = document.querySelector('#app')
// formatNode(rootEle)