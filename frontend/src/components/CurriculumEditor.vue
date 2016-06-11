<template>
    <div>
        <div>Chapter</div>
        <ul class="tree">
            <li v-for="chapter in chapters" :class="{ 'is-active': activeChapter == chapter }">
                <div class="tree-header">
                    <a class="expand-tree"
                        :class="{ 'is-active': activeChapter == chapter }"
                        @click="setActiveChapter(chapter)">
                        {{ chapter.title }}
                    </a>
                    <button @click="addLesson(chapter)">+</button>
                </div>
                <ul v-if="activeChapter == chapter">
                    <li v-for="lesson in chapter.lessons">
                        <div class="tree-header">
                            <a class="expand-tree"
                                :class="{ 'is-active': activeLesson == lesson }"
                                @click="setActiveLesson(lesson)">
                                {{ lesson.title }}
                            </a>
                            <button @click="addStep(lesson)">+</button>
                        </div>
                        <ul v-if="activeLesson == lesson">
                            <li v-for="step in lesson.steps">
                                <a class="expand-tree"
                                    :class="{ 'is-active': activeStep == step }"
                                    @click="setActiveStep(step)">
                                    {{ step.title }}
                                </a>
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
        return { }
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
        refreshChapters() {
            this.$dispatch('refresh-chapters')
        },
        setActiveChapter(chapter) {
            this.$dispatch('set-active-chapter', chapter)
        },
        setActiveLesson(lesson) {
            this.$dispatch('set-active-lesson', lesson)
        },
        setActiveStep(step) {
            this.$dispatch('set-active-step', step)
        }
    },
    props: [ 'chapters', 'activeChapter', 'activeLesson', 'activeStep' ]
}

</script>

<style media="screen">
.tree > li.is-active {
    background: whitesmoke;
}

.tree .expand-tree {
    cursor: pointer;
}

.expand-tree.is-active {
    text-decoration: underline;
}
</style>
