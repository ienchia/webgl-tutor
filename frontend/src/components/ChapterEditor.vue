<template>
    <form>
        <label>Chapter Title</label>
        <input type="text" v-model="chapter.title" />
        <label>Chapter Order</label>
        <input type="number" min="0" v-model="chapter.order" />
        <label>Chapter Description</label>
        <markdown-editor :content-value.sync="chapter.description"></markdown-editor>
        <button type="button" @click="saveChanges(chapter)">Save Changes</button>
    </form>
</template>

<script>
import MarkdownEditor from './MarkdownEditor.vue'

export default {
    components: {
        MarkdownEditor
    },
    data: function () {
        return {
            editor: null
        }
    },
    methods: {
        saveChanges(chapter) {
            this.$dispatch('save', chapter)
        }
    },
    props: ['chapter'],
    ready: function () {
    }
}
</script>

<style>
</style>
