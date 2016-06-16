<template>
    <nav class="lesson-navigation">
        <ul class="accordion-list">
            <li class="accordion-item"
                :class="{ 'is-active': selectedChapter == chapter }"
                v-for="chapter in chapters"
                v-show="selectedChapter == chapter || !selectedStep">
                <div class="accordion-header"
                    :class="{ 'is-active': selectedChapter == chapter }"
                    @click="selectChapter(chapter)">
                    Chapter {{ $index + 1 }}: {{ chapter.title }}
                </div>
                <div class="accordion-content"
                    :class="{ 'is-active': selectedChapter == chapter }"
                    v-if="selectedChapter == chapter">
                    <div class="chapter-description"
                        v-if="selectedChapter == chapter && selectedLesson == null"
                        v-html="chapter.description || '' | marked">
                    </div>
                    <ul class="lesson-list">
                        <li class="lesson-item"
                            :class="{ 'is-active': selectedLesson == lesson }"
                            v-for="lesson in selectedChapter.lessons">
                            <div class="lesson-header"
                                :class="{ 'is-active': selectedLesson == lesson }"
                                @click="selectLesson(lesson)">
                                <span class="fa fa-spin fa-pulse fa-spinner" v-if="lesson.isDetermining"></span>
                                <span class="fa fa-check-circle" v-if="lesson.lessonHistory"></span>
                                Lesson {{ $index }}: {{ lesson.title }}
                            </div>
                            <div class="lesson-content"
                                v-if="selectedLesson == lesson && selectedStep == null">
                                <div v-html="lesson.description || '' | marked"></div>
                                <button @click="beginLesson(lesson)">Begin Lesson</button>
                            </div>
                            <div class="lesson-content"
                                v-if="selectedLesson == lesson && selectedStep">
                                Step {{ selectedStep.order }}:
                                <div class="step-content">
                                    {{ selectedStep.description }}
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
}

.accordion-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0;
    margin: 0;
}

.accordion-item {
    display: flex;
    flex-direction: column;
    transition: all .3s ease;
    flex: 0 0 auto;
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

.step-content {
    flex: 1;
}
</style>
