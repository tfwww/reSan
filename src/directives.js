var Directives = {
    text: function(value) {        
        this.el.textContent = value || ''
    },
    show: function(value) {
        this.el.style.display = value ? '' : 'none'
    },
    on: {
        // update: function(el, handler, event, directive) {
        update: function(handler) {                
            // if (!directive.handlers) {
            //     directive.handlers = {}
            // }

            // var handlers = directive.handlers
            // if (handlers[event]) {
            //     this.el.removeEventListener(event, handlers[event])
            // }

            // if (handler) {
            //     // 绑定作用域
            //     handler = handler.bind(el)
            //     this.el.addEventListener(event, handler)
            //     handlers[event] = handler                
            // }
            var event = this.arg
            if (!this.handlers) {
                this.handlers = {}
            }
            var handlers = this.handlers
            if (handlers[event]) {
                this.el.removeEventListener(event, handlers[event])
            }
            if (handler) {
                handler = handler.bind(this.el)
                this.el.addEventListener(event, handler)
                handlers[event] = handler
            }
        },
        unbind: function(el, event, directive) {
            if (directive.handlers) {               
                this.el.removeEventListener(event, directive.handlers[event])                
            }
        }
    }
}

export {Directives}