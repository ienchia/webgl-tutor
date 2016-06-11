<template>
    <div class="markedit">
        <div
            id="markedit-editor-{{ instanceId }}"
            class="markedit-editor">
        </div>
        <div
            class="markedit-viewer"
            v-html="content | marked">
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import ace from 'brace'
import 'brace/mode/markdown'

export default {
    computed: {
        content: {
            get() {
                return this.contentValue || '*none*'
            },
            set(value) {
                this.contentValue = value
            }
        }
    },
    data: function () {
        return {
            instanceId: Math.floor(Math.random() * 100000000)
        }
    },
    filters: {
        marked
    },
    methods: {
        toggle() {
            this.editMode = !this.editMode
        }
    },
    //props: [ 'contentValue' ],
    props: [ 'contentValue' ],
    ready() {
        console.log('ready')
        this.editor = ace.edit('markedit-editor-' + this.instanceId)
        this.editor.getSession().setMode('ace/mode/markdown')
        this.editor.setValue(this.contentValue || '')
        this.editor.on('change', change => {
            this.content = this.editor.getValue()
        })
    },
    attached() {
        console.log('attach')
    }
}

</script>

<style>
.markedit {
    display: flex;
    flex: 1;
    height: 100%;
}

.markedit-editor, .markedit-viewer {
    flex: 1;
    max-width: 100%;
}

.markedit-viewer {
    overflow-y: auto;
}
</style>
