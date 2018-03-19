var Directives = {
    text: function(el, value) {
        el.textContent = value || ''
    },
    show: function(el, value) {
        el.style.display = value ? '' : 'none'
    },
    on: {
        update: function(el, handler, event, directive) {
            if (!directive.handlers) {
                directive.handlers = {}
            }

            var handlers = directive.handlers
            if (handlers[event]) {
                el.removeEventListener(event, handlers[event])
            }

            if (handler) {
                // 绑定作用域
                handler = handler.bind(el)
                el.addEventListener(event, handler)
                handlers[event] = handler                
            }
        },
        unbind: function(el, event, directive) {
            if (directive.handlers) {
                log('unbind')
                el.removeEventListener(event, directive.handlers[event])                
            }
        }
    }
}

export {Directives}