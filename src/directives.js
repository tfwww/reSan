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
        }
    }
}

export {Directives}