<template>
    <div>
        <div>Chapter</div>
        <ul class="tree">
            <li v-for="chapter in chapters" :class="{ isActive: activeChapter == chapter }">
                <div>
                    <a id="chapter-{{ chapter.id }}"
                        href="#chapter-{{ chapter.id }}"
                        @click="setActiveChapter(chapter)">
                        {{ chapter.title }}
                    </a>
                    <button @click="addLesson(chapter)">+</button>
                </div>
                <ul v-if="activeChapter == chapter">
                    <li v-for="lesson in chapter.lessons">
                        <div class="">
                            <a id="lesson-{{ lesson.id }}"
                                href="#lesson-{{ lesson.id }}"
                                @click="setActiveLesson(lesson)">
                                {{ lesson.title }}
                            </a>
                            <button @click="addStep(lesson)">+</button>
                        </div>
                        <ul v-if="activeLesson == lesson">
                            <li v-for="step in lesson.steps">
                                {{ step.title }}
                            </li>
                        </ul>
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
        addChapter() {
            this.$dispatch('add-chapter')
        },
        addLesson(chapter) {
            this.$dispatch('add-lesson', chapter)
        },
        addStep(lesson) {
            this.$dispatch('add-step', lesson)
        },
        setActiveChapter(chapter) {
            this.$dispatch('set-active-chapter', chapter)
        },
        refreshChapters() {
            this.$dispatch('refresh-chapters')
        },
        setActiveLesson(lesson) {
            this.$dispatch('set-active-lesson', lesson)
        }
    },
    props: [ 'chapters', 'activeChapter', 'activeLesson' ]
}

</script>

<style media="screen">
.tree > li.isActive {
    background: whitesmoke;
}
</style>
