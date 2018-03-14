import util from './util.js'
import {Interpret} from './interpret.js'

// var dataElePair = {}

function Welement(option) {
    var opt = option || {}
    this.root = opt.root;
    this.data = opt.data

    let data = this.data
    // data element 数据对象    
    // var dataElePair = initPair(data)
    var rootEle = document.querySelector(opt.root)
    var interpret = new Interpret(opt)    
}

export {Welement}




