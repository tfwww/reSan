var Directives = {
    text: function(el, value) {
        el.textContent = value || ''
    },
    show: function(el, value) {
        el.style.display = value ? '' : 'none'
    },
    on: {
        update: function(el, handler, event, directive) {
            el.addEventListener(event, handler) 
            // if (!directive.handlers) {
            //     directive.handlers = {}
            // }
            // var handlers = directive.handlers
            // if (handlers[event]) {
            //     el.removeEventListener(event, handlers[event])
            // }
            // if (handler) {
            //     handler = handler.bind(el)
            //     el.addEventListener(event, handler)
            //     handlers[event] = handler
            // }
        }
    }
}

export {Directives}