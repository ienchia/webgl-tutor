<template>
    <header class="main-header">This is a header</header>
    <div class="rows">
        <aside class="primary-sidebar">
            <curriculum-editor
                :chapters="chapters"
                :active-chapter="selectedChapter"
                :lessons="selectedChapterLessons"
                :active-lesson="selectedLesson"
                @add-chapter="addChapter"
                @add-lesson="addLessonToChapter"
                @add-step="addStepToLesson"
                @refresh-chapters="refreshChapters"
                @set-active-chapter="selectChapter"
                @set-active-lesson="selectLesson"></curriculum-editor>
            <!-- DEBUG -->
            <div>
                <pre style="font-size: 8px">
                    <br />{{ selectedChapter | json }}
                    <br />{{ selectedChapterLessons | json }}
                </pre>
                <button type="button" @click="test">Test</button>
            </div>
        </aside>
        <main class="content rows">
            <div class="cols" v-if="selectedChapter || selectedLesson">
                <div class="col"
                    v-if="selectedChapter">
                    <chapter-editor
                        :chapter="selectedChapter"
                        @save="updateChapter">
                    </chapter-editor>
                </div>
                <div class="col"
                    v-if="selectedLesson">
                    <lesson-editor
                        :lesson="selectedLesson"
                        @save-lesson="updateLesson">
                    </lesson-editor>
                </div>
            </div>
            <div class="cols">
                <div class="" style="background-color: whitesmoke; height: 100%">

                </div>
            </div>
        </main>
        <aside class="secondary-sidebar">
            {{ chapter.description }}
        </aside>
    </div>
    <footer class="main-footer">This is a footer</footer>
</template>

<script>
import css from '../css/style.css'

import request from 'superagent'
import Vue from 'vue'

import ChapterEditor from './components/ChapterEditor.vue'
import CurriculumEditor from './components/CurriculumEditor.vue'
import LessonEditor from './components/LessonEditor.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import UserGrid from './components/UserGrid.vue'

export default {
    components: {
        ChapterEditor,
        CurriculumEditor,
        LessonEditor,
        MarkdownEditor,
        UserGrid
    },
    data: function () {
        return {
            chapter: null,
            chapterTitle: null,
            chapters: null,
            selectedChapter: null,
            selectedChapterLessons: null,
            selectedLesson: null
        }
    },
    methods: {
        //DEBUG
        test() {
            console.log('test')
            if (this.selectedChapter.lessons) {
                this.selectedChapter.lessons.push({msg: 'hello', id: this.selectedChapter.lessons.map(d => 1).reduce((a, b) => a + b)})
            }
            else {
                this.selectedChapter.lessons = [{msg: 'hello', id: 1}]
            }
        },
        addChapter() {
            request
                .post(`http://${process.env.API_URL}/chapters`)
                .send({})
                .end((err, res) => {
                    if (!err && res.ok) {
                        this.refreshChapters()
                    }
                })
        },
        addLessonToChapter(chapter) {
            request
                .post(`http://${process.env.API_URL}/chapters/${chapter.id}/lessons`)
                .send({})
                .end((err, res) => {
                    if (!err && res.ok) {
                        this.selectChapter(chapter)
                    }
                })
        },
        addStepToLesson(lesson) {
            request
            .post(`http://${process.env.API_URL}/lessons/${lesson.id}/steps`)
            .send({})
            .end((err, res) => {
                if (!err && res.ok) {
                    this.selectLesson(lesson)
                }
            })
        },
        refreshChapters() {
            console.log('retrieving chapters')
            this.selectedChapter = null
            request
            .get(`http://${process.env.API_URL}/chapters`)
            .end((err, res) => {
                if (!err && res.ok) {
                    this.chapters
                    = res.body.map(d => {
                        d.lessons = null
                        return d
                    })
                }
            })
        },
        refreshLessonSteps(lesson) {
            request
            .get(`http://${process.env.API_URL}/lessons/${lesson.id}/steps`)
            .end((err, res) => {
                if (!err && res.ok) {
                    lesson.steps = res.body
                }
            })
        },
        retrieveLessons(chapter) {
            request
            .get(`http://${process.env.API_URL}/chapters/${chapter.id}/lessons`)
            .end((err, res) => {
                if (!err && res.ok) {
                    chapter.lessons = res.body.map(d => {
                        d.steps = null
                        return d
                    })
                }
            })
        },
        selectChapter(chapter) {
            this.selectedChapter = chapter
            this.retrieveLessons(chapter)
        },
        selectLesson(lesson) {
            this.selectedLesson = lesson
            this.refreshLessonSteps(lesson)
        },
        updateChapter(chapter) {
            request
                .put(`http://${process.env.API_URL}/chapters/${chapter.id}`)
                .send(chapter)
                .end(function (err, res) {
                     if (err || !res.ok) {
                         console.log(err)
                     }
                     else {
                         this.refreshChapters()
                     }
                })
        },
        updateLesson(lesson) {
            console.log(lesson)
            request
            .put(`http://${process.env.API_URL}/lessons/${lesson.id}`)
            .send(lesson)
            .end((err, res) => {
                if (!err && res.ok) {
                    console.log(res.body)
                }
            })
        }
    },
    ready: function () {
        this.refreshChapters()
    }
}
</script>

<style media="screen">
.fixed {
    flex: 0 0 auto;
}

.rows {
    flex: 1;
    display: flex;
}

.row {
    flex: 1 1 0%;
}

.row.fixed {
    flex: 0 0 auto;
    display: flex;
}

.cols {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.col {
    flex: 1;
    display: flex;
}

.col.fixed {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
}

.main-header {
    flex: 0 0 auto;
    padding: 1em 1em 0.5em;
    color: white;
    background-color: #3169f5;
    border-bottom: 2px solid #4E81FF;
}

.main-footer {
    flex: 0 0 auto;
}

.primary-sidebar, .secondary-sidebar {
    flex: 0 0 auto;
    width: 20%;
    overflow-x: auto;
}

.secondary-sidebar {
    width: 0%;
}

.content {
    flex: 1 1 auto;
}
</style>
