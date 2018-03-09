// var data = {name: 'origin'};
// monitor(data);
// data.name = 'newOrigin'; // 监听到值变化了 origin --> newOrigin
var notify = new NotifyCenter()

// 通知中心，监听 data 变化
function monitor(data) {
    var keyList = Object.keys(data)
    var init = data.name
    Object.defineProperty(data, 'name', {        
        get: function() {
            return this._name || init
        },
        set: function(value) {
            console.log('value change', value)
            notify.addBroadcast()
            this._name = value
        }
    })
}
// log('data', data)

// 订阅者模式
function NotifyCenter() {
    this.center = []
}

NotifyCenter.prototype = {
    // add event listener
    addBroadcast: function(eventName, target, handler) {
        
        var center = this.center
        var obj = {
            name: eventName,
            target: target,
            handler: handler
        }
        // center.push(obj)
        center.push()
    },

    // fire event listener
    fireBroadcast: function(eventName, target) {
        var mapper = this.center
        handleWithEvent(mapper, eventName, target)
    }
}

function handleWithEvent(array, event, target) {    
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item['name'] === event && item['target'] === target) {
            item['handler']()    
        }
    }
}



// var correct = {};
// Object.defineProperty(correct, "newKey", {
// 	get: function() {
// 		return this.newKey;
// 	},
// 	set: function(newValue) {
// 		console.log('set')
// 	}
// });

// var wrong = {existKey: 'test'};
// Object.defineProperty(wrong, "existKey", {
// 	get: function() {
// 		return this._existKey;
// 	},
// 	set: function(newValue) {
// 		console.log('set')
// 	}
// });

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

