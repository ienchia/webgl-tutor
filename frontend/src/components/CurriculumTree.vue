<template>
    <div>
        <h1>Tree</h1>
        <ul class="curriculum-tree">
            <li v-for="chapter in chapters">
                <a id="{{ chapter.id }}"
                    href="#{{ chapter.id }}"
                    @click="setActiveChapter(chapter)"
                    >{{ chapter.title }}</a>
            </li>
        </ul>
        <button @click="refreshChapters">Refresh</button>
        <button @click="addChapter">Add Chapter</button>
    </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor.vue'

export default {
    components: {
        MarkdownEditor
    },
    data: function () {
        return {
            activeLesson: null,
        }
    },
    computed: {
        save() {
            return JSON.stringify({
                chapters: this.chapters
            }, '', '  ')
        }
    },
    methods: {
        refreshChapters() {
            console.log('refresh chapters')
            this.$dispatch('refresh-chapters')
        },
        addChapter() {
            console.log('add chapter')
            this.$dispatch('add-chapter')
        },
        addLesson(chapter) {
            chapter.lessons.push({ title: 'Click to edit', steps: [] })
        },
        setActiveChapter(chapter) {
            console.log('set active chapter')
            console.log(chapter)
            this.$dispatch('set-active-chapter', chapter)
        },
        setActiveLesson(lesson) {
        }
    },
    props: [ 'chapters', 'activeChapter' ]
}

</script>

<style media="screen">
ul.tree, ul.tree ul {
    padding: 1em;
}
</style>
