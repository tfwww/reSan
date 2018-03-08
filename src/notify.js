var data = {name: 'origin'};
Notify(data);
data.name = 'newOrigin'; // 监听到值变化了 origin --> newOrigin


// 通知中心，监听 data 变化
function Notify(data) {
    var keyList = Object.keys(data)
    Object.defineProperty(data, 'name', {        
        get: function() {
            return 'sdf'
        },
        set: function(value) {
            console.log('value change', value)
            // this.name = value
        }
    })
}
log('data', data)

var correct = {};
Object.defineProperty(correct, "newKey", {
	get: function() {
		return this.newKey;
	},
	set: function(newValue) {
		console.log('set')
	}
});

var wrong = {existKey: 'test'};
Object.defineProperty(wrong, "existKey", {
	get: function() {
		return this._existKey;
	},
	set: function(newValue) {
		console.log('set')
	}
});

// var data = {name: 'kindeng'};
// observe(data);
// // data.name = 'dmq'; // 哈哈哈，监听到值变化了 kindeng --> dmq

// function observe(data) {
//     if (!data || typeof data !== 'object') {
//         return;
//     }
//     // 取出所有属性遍历
//     Object.keys(data).forEach(function(key) {
//         log('key', key)
// 	    defineReactive(data, key, data[key]);
// 	});
// };

// var test = {test: '121'}
// function defineReactive(data, key, val) {
//     // observe(val); // 监听子属性    
//     Object.defineProperty(data, key, {
//         // enumerable: true, // 可枚举
//         // configurable: false, // 不能再define
//         get: function() {
//             return val;
//         },
//         set: function(newVal) {
//             console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
//             val = newVal;
//         }
//     });
// }

// defineReactive(test, 'test', 'sdf')