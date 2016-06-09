<template>
    <div class="markedit">
        <div
            id="markedit-editor-{{ instanceId }}"
            class="markedit-editor"></div>
        <div
            class="markedit-viewer"
            v-html="content | marked"></div>
    </div>
</template>

<script>
import marked from 'marked'
import ace from 'brace'
import 'brace/mode/markdown'

export default {
    computed: {
        // content: {
        //     get() {
        //         console.log(content)
        //         return this.contentValue || '*none*'
        //     }
        // }
        // content: function () {
        //     return this.contentValue || '*none*'
        // }
        content: {
            get() {
                if (!this.isSilentUpdate) {
                    this.isSilentUpdate = true
                    this.editor ? this.editor
                        .getSession()
                        .getDocument()
                        .setValue(this.contentValue || '') : null
                    this.isSilentUpdate = false
                }
                return this.contentValue || '*none*'
            }
        }
    },
    data: function () {
        return {
            isSilentUpdate: false,
            instanceId: Math.floor(Math.random() * 100000000)
        }
    },
    filters: {
        marked
    },
    methods: {
        toggle() {
            this.editMode = !this.editMode
        },
    },
    //props: [ 'contentValue' ],
    props: [ 'contentValue' ],
    ready() {
        this.editor = ace.edit('markedit-editor-' + this.instanceId)
        this.editor.getSession().setMode('ace/mode/markdown')
        this.editor.setValue(this.contentValue || '')
        this.editor.on('change', change => {
            if (!this.isSilentUpdate) {
                this.isSilentUpdate = true
                this.contentValue = this.editor.getValue()
                this.isSilentUpdate = false
            }
        })
    }
}

</script>

<style>
.markedit {
    display: flex;
    flex: 1 1 0%;
    height: 100%;
}

.markedit-editor, .markedit-viewer {
    flex: 0 0 auto;
    width: 50%;
}

.markedit-viewer {
    overflow-y: auto;
}
</style>
