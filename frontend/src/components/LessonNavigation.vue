<template>
    <nav class="lesson-navigation">
        <ul class="accordion-list">
            <li class="accordion-item"
                :class="{ 'is-active': selectedChapter == chapter }"
                v-for="chapter in chapters | orderBy 'order'"
                v-show="selectedChapter == chapter || !selectedStep">
                <div class="accordion-header"
                    :class="{ 'is-active': selectedChapter == chapter }"
                    @click="selectChapter(chapter)">
                    Chapter {{ chapter.order }}: {{ chapter.title }}
                </div>
                <div class="accordion-content"
                    :class="{ 'is-active': selectedChapter == chapter }"
                    v-if="selectedChapter == chapter">
                    <div class="chapter-description"
                        v-if="selectedChapter == chapter && chapter.description && selectedLesson == null"
                        v-html="chapter.description || '' | marked">
                    </div>
                    <ul class="lesson-list">
                        <li class="lesson-item"
                            :class="{ 'is-active': selectedLesson == lesson }"
                            v-for="lesson in selectedChapter.lessons | orderBy 'order'">
                            <div class="lesson-header"
                                :class="{ 'is-active': selectedLesson == lesson, 'is-done': lesson.lessonHistory, 'is-easy': !lesson.lessonHistory && lesson.difficulty >= .6999, 'is-hard': lesson.difficulty < .6999 }"
                                @click="selectLesson(lesson)">
                                <span class="fa fa-spin fa-pulse fa-spinner" v-if="lesson.isDetermining"></span>
                                <span class="fa fa-check-circle" v-if="lesson.lessonHistory"></span>
                                Lesson {{ lesson.order }}: {{ lesson.title }}
                                <span v-if="lesson.difficulty != null">({{ lesson.difficulty >= .6999 ? 'Coba saya' : 'Agak susah' }})</span>
                                <span class="load ellipsis-loader" v-if="lesson.isCalculatingDifficulty"></span>
                            </div>
                            <div class="lesson-content"
                                v-if="selectedLesson == lesson && selectedStep == null">
                                <div class="lesson-description" v-html="lesson.description || '' | marked"></div>
                                <button @click="beginLesson(lesson)">Mulai Lesson</button>
                            </div>
                            <div class="lesson-content"
                                v-if="selectedLesson == lesson && selectedStep">
                                Langkah ke-{{ selectedStep.order }}: {{ selectedStep.title }}
                                <div class="step-content">
                                    <div v-html="selectedStep.description || '' | marked"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import ramda from 'ramda'
import marked from 'marked'
export default {
    data: function() {
        return {}
    },
    computed: {

    },
    filters: {
        marked
    },
    methods: {
        beginLesson(lesson) {
            this.$dispatch('begin-lesson', lesson)
        },
        selectChapter(chapter) {
            this.$dispatch('select-chapter', chapter)
        },
        selectLesson(lesson) {
            this.$dispatch('select-lesson', lesson)
        }
    },
    props: ['chapters', 'selectedChapter', 'selectedLesson', 'selectedStep']
}
</script>

<style>
/* always present */
.expand-transition {
  transition: all .3s ease;
}

/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
    opacity: 0;
}

.lesson-navigation {
    display: flex;
    flex: 1;
    max-width: 100%;
}

.accordion-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0;
    margin: 0;
    max-width: 100%;
}

.accordion-item {
    display: flex;
    flex-direction: column;
    transition: all .3s ease;
    flex: 0 0 auto;
    max-width: 100%;
}

.accordion-item.is-active {
    flex: 1 1 auto;
}

.accordion-header {
    padding: .5em;
    cursor: pointer;
}

.accordion-header:hover {
    background: whitesmoke;
}

.accordion-header.is-active {
    background-color: royalblue;
    color: white;
}

.accordion-content {
    display: flex;
    flex-direction: column;
    flex: 0 0 0%;
    overflow: hidden;
    height: 0;
    transition: all 1s ease;
}

.accordion-content.is-active {
    flex: 1 1 0%;
    overflow: auto;
}

.chapter-description {
    padding: 1em;
    flex: 1;
}

.lesson-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0;
    margin: 0;
}

.lesson-item {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
}

.lesson-item.is-active {
    flex: 1;
}

.lesson-header {
    flex: 0 0 auto;
    padding: .5em;
    cursor: pointer;
}

.lesson-header.is-easy {
    background: lightgreen;
}

.lesson-header.is-hard {
    background: lightsalmon;
}

.lesson-header.is-done {
    background: paleturquoise;
}

.lesson-header:hover {
    background: whitesmoke;
}

.lesson-header.is-active {
    border-left: thick solid royalblue;
}

.lesson-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: .5em;
}

.lesson-description {
    flex: 1;
}

.step-content {
    flex: 1;
    overflow: auto;
}

@keyframes loading-ellipsis {
    0% {
        content: '(...)'
    }
    33% {
        content: '(.  )'
    }
    66% {
        content: '(.. )'
    }
    100% {
        content: '(...)'
    }
}

.ellipsis-loader {
    display: inline-block;
    min-width: 13px;
}

.ellipsis-loader::before {
    content: '(...)'
}

.load.ellipsis-loader::before {
    animation: 1s loading-ellipsis infinite;
}
</style>
