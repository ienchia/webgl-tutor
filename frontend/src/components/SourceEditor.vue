<template>
    <form class="source-editor">
        <label>File name</label>
        <input type="text" v-model="source.name" />
        <label>Code</label>
        <div class="source-editor"
            v-if="/\.html$/.test(source.name)"
            v-source-editor.html="source.content">
        </div>
        <div class="source-editor"
            v-if="/\.js$/.test(source.name)"
            v-source-editor.javascript="source.content">
        </div>
        <div class="source-editor"
            v-if="/\.vert$/.test(source.name) || /\.frag$/.test(source.name)"
            v-source-editor.glsl="source.content">
        </div>
        <button type="button" @click="saveChanges">Save Changes</button>
    </form>
</template>

<script>
import SourceEditor from '../directives/SourceEditor'

export default {
    data: function () {
        return {}
    },
    directives: {
        SourceEditor
    },
    methods: {
        saveChanges() {
            this.$dispatch('save-source', this.source)
        }
    },
    props: ['source']
}
</script>

<style media="screen">
.source-editor {
    flex: 1;
}
</style>
