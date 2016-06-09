<template>
    <div>
        <div>Chapter</div>
        <ul class="curriculum-tree">
            <li v-for="chapter in chapters">
                <div>
                    <a id="{{ chapter.id }}"
                        href="#{{ chapter.id }}"
                        @click="setActiveChapter(chapter)">{{ chapter.title }}</a>
                    <button @click="addLesson(chapter)">+</button>
                </div>
                <ul v-if="activeChapter && chapter == activeChapter">
                    Lessons
                    <li v-for="lesson in chapter.lessons">
                        Lesson {{ lesson.id }}
                    </li>
                </ul>
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
            this.$dispatch('add-lesson', chapter)
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
