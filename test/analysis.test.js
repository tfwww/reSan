// add.test.js
import {analysisNode} from '../src/analysis.js'
import {expect} from 'chai'

describe('解析 DOM 的测试', function () {
	var src = '<ul id="test-id" class="test-class">文本标题<li>1</li><li>2</li><li>3</li></ul>'
	var result = `{
		"child": [{
			"type": "ul",
			"attr": {
				"id": "test-id",
				"class": "test-class"
			},
			"text": "文本标题",
			"child": [{
				"type": "li",
				"attr": {},
				"text": "1"
			}, {
				"type": "li",
				"attr": {},
				"text": "2",
				"child": ""
			}, {
				"type": "li",
				"attr": {},
				"text": "3",
				"child": ""
			}]
		}]
	}`
	it('DOM 字符串应该解析成正确的数据结构', function () {
		expect(analysisNode(src)).to.be.equal(JSON.parse(result));
	});
});