<template>
<form>
    <label>Lesson Title</label>
    <input v-model="lesson.title" />
    <label>Lesson Order</label>
    <input type="number" min="0" v-model="lesson.order" />
    <label>Lesson Description</label>
    <markdown-editor :content-value.sync="lesson.description"></markdown-editor>
    <button type="button" @click="saveLesson(lesson)">Save Changes</button>
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

        }
    },
    methods: {
        saveLesson(lesson) {
            this.$dispatch('save-lesson', lesson)
        }
    },
    props: ['lesson']
}
</script>
