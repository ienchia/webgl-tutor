import ace from 'brace'
import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/mode/markdown'
import 'brace/mode/glsl'

export default {
    canSetValue: true,
    bind() {
        this.editor = ace.edit(this.el)
        this.editor.$blockScrolling = Infinity
        if (this.modifiers.html) {
            this.editor.getSession().setMode('ace/mode/html')
        }
        if (this.modifiers.javascript) {
            this.editor.getSession().setMode('ace/mode/javascript')
        }
        if (this.modifiers.markdown) {
            this.editor.getSession().setMode('ace/mode/markdown')
        }
        if (this.modifiers.glsl) {
            this.editor.getSession().setMode('ace/mode/glsl')
        }

        /* Editor update cannot call editor set value */
        this.editor.on('change', () => {
            this.vm.$nextTick(() => {
                this.canSetValue = false
                this.vm.$nextTick(() => {
                    this.canSetValue = true
                })
            })
            this.vm.$set(this.expression, this.editor.getValue())
        })
    },
    update(value) {
        if (this.canSetValue) {
            this.editor.setValue(value || '', 1)
        }
    },
    unbind() {
        this.editor.destroy()
    }
}
