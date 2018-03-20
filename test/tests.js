import {Welement} from '../src/welement.js'
import {log} from '../src/log.js'

// var expect = chai.expect;
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
    el: 'app',
    // template
    data: {
        // msg: 'hellowinter',
        // hello: 'hello',
        // changeMessage: function () {
        //     app.data.msg = 'msg'
        // }
        'msg.wow': 'wowa',
        hello: 'hello',
        changeMessage: function () {
            app.data['msg.wow'] = 'hola'
        },
        remove: function () {
            app.destroy()
        },
        todos: [
            {
                title: 'make this shit work',
                done: false
            },
            {
                title: 'make this shit kinda work',
                done: true
            }
        ]
    }    
})

// function eventBind() {
//     var ele = document.querySelector('.input')
//     ele.addEventListener('input', function(event) {
//         log('change')       
//         app.data.message = ele.value
//     })
// }

// eventBind()


// var data = {title: 'test', msg: 'hello msg'}
// // var result = dataWithDom(data)
// // log('result', result)

// var rootEle = document.querySelector('#app')
// formatNode(rootEle)

// Seed.filter('money', function (value) {
//     return '$' + value.toFixed(2)
// })

// // define a seed
// var Todos = Seed.extend({
//     id: 0,
//     changeMessage: function () {
//         this.scope['msg.wow'] = 'hola'
//     },
//     remove: function () {
//         this.destroy()
//     }
// })

// var todos = new Todos('#test', {
//     total     : 1000,
//     'msg.wow' : 'wow',
//     hello     : 'hello',
//     todos     : [
//         {
//             title: 'make this shit work',
//             done: false
//         },
//         {
//             title: 'make this shit kinda work',
//             done: true
//         }
//     ]
// })