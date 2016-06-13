<template>
    <div class="curriculum-editor">
        <ul class="tree-list">
            <li class="tree-item"
                v-for="chapter in chapters"
                :class="{ 'is-active': activeChapter == chapter }">
                <div class="tree-header expand-tree"
                    :class="{ 'is-active': activeChapter == chapter }"
                    @click="setActiveChapter(chapter)">
                    {{ chapter.title }}
                </div>
                <ul class="tree-list cols"
                    v-if="activeChapter == chapter">
                    <li class="tree-item"
                        v-for="lesson in chapter.lessons">
                        <div class="tree-header expand-tree"
                            :class="{ 'is-active': activeLesson == lesson }"
                            @click="setActiveLesson(lesson)">
                            {{ lesson.title }}
                        </div>
                        <ul class="tree-list cols"
                            v-if="activeLesson == lesson">
                            <li class="tree-item"
                                v-for="step in lesson.steps">
                                <div class="expand-tree"
                                    :class="{ 'is-active': activeStep == step }"
                                    @click="setActiveStep(step)">
                                    {{ step.title }}
                                </div>
                            </li>
                            <button @click="addStep(lesson)">Add New Step</button>
                        </ul>
                    </li>
                    <button @click="addLesson(chapter)">Add New Lesson</button>
                </ul>
            </li>
        </ul>
        <button @click="addChapter">Add Chapter</button>
        <button @click="refreshChapters">Refresh</button>
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
.curriculum-editor {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.tree-list {
    padding: 1em;
}

.tree-header {
    padding: .5em;
}

.tree-item {
    list-style: none;
    margin: 0 0 .5em 0;
}

.tree-item:last-child {
    margin-bottom: 0;
}

.tree-header:hover {
    background: whitesmoke;
}

.tree-header.is-active {
}

.expand-tree {
    cursor: pointer;
    position: relative;
}

.expand-tree.is-active {
    text-decoration: underline;
}
</style>
