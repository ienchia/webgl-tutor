<template>
    <nav style="position: relative">
        <ul v-show="!selectedChapter">
            <li v-show="!selectedChapter" v-for="chapter in chapters" transition="expand">
                <a href="#" v-on:click="selectChapter(chapter)">
                    {{ chapter.title }}
                </a>
            </li>
        </ul>
        <ul v-else transition="expand">
            <a href="#" v-show="selectedChapter" v-on:click="selectChapter(null)">&lt;&lt;</a>
            <li v-for="lesson in lessons">
                <a href="#" v-on:click="startLesson(lesson)">{{ lesson.title }}</a>
                <p v-show="lesson == selectedChapter.currentLesson">{{ lesson.description }}</p>
            </li>
        </ul>
    </nav>
</template>

<script>
import ramda from 'ramda'
export default {
    data: function() {
        return {
            chapters: ramda.map(
                d => ({
                    title: `Chapter #${d}`,
                    lessons: ramda.map(
                        d => ({
                            title: `Lesson ${d}`,
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultrices tristique ante et tincidunt. Vivamus ac elit maximus, porta arcu sit amet, elementum arcu. Ut interdum lobortis felis, sed luctus nisl ullamcorper id.'
                        }),
                        ramda.range(1, 5)
                    ),
                    currentLesson: null
                }),
                ramda.range(1, 9)
            ),
            selectedChapter: null
        }
    },
    computed: {
        lessons() {
            return this.selectedChapter ? this.selectedChapter.lessons : null
        }
    },
    methods: {
        selectChapter(chapter) {
            this.selectedChapter = chapter
        },
        startLesson(lesson) {
            this.selectedChapter.currentLesson = lesson
        }
    }
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
</style>
