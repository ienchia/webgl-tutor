<template>
    <header class="main-header">This is a header</header>
    <div class="rows">
        <aside class="primary-sidebar">
            <curriculum-editor
                :chapters="chapters"
                :active-chapter="selectedChapter"
                :active-lesson="selectedLesson"
                :active-step="selectedStep"
                @add-chapter="addChapter"
                @add-lesson="addLessonToChapter"
                @add-step="addStepToLesson"
                @refresh-chapters="refreshChapters"
                @set-active-chapter="selectChapter"
                @set-active-lesson="selectLesson"
                @set-active-step="selectStep"></curriculum-editor>
            <!-- DEBUG -->
            <div>
                <pre style="font-size: 8px">
                    <br />{{ selectedChapter | json }}
                    <br />{{ selectedStep | json }}
                </pre>
                <button type="button" @click="test">Test</button>
            </div>
        </aside>
        <main class="content rows">
            <tab-set active-index="0">
                <tab header="Descriptions">
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
                    <div class="cols" v-if="selectedStep">
                        <step-editor
                            :step="selectedStep"
                            @save-step="updateStep">
                        </step-editor>
                    </div>
                </tab>
                <tab header="Sources" v-if="selectedStep">
                    <div class="col">
                        <source-list
                            :selected-source.sync="selectedSource"
                            :sources="selectedStep.sources"
                            @add-source="addSourceToStep"
                            @delete-source="deleteSource">
                        </source-list>
                    </div>
                    <div class="col cols" v-if="selectedSource">
                        <source-editor
                            :source="selectedSource"
                            @save-source="updateSource">
                        </source-editor>
                    </div>
                </tab>
            </tab-set>
        </main>
        <aside class="secondary-sidebar">
        </aside>
    </div>
    <footer class="main-footer">
        <ul class="color-palette">
            <li class="color-block" v-for="i in [1, 2, 3, 4, 5, 6]">&nbsp;</li>
        </ul>
    </footer>
</template>

<script>
import css from '../css/style.css'

import request from 'superagent'
import Vue from 'vue'

import ChapterEditor from './components/ChapterEditor.vue'
import CurriculumEditor from './components/CurriculumEditor.vue'
import LessonEditor from './components/LessonEditor.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import SourceList from './components/SourceList.vue'
import SourceEditor from './components/SourceEditor.vue'
import StepEditor from './components/StepEditor.vue'
import Tab from './components/Tab.vue'
import TabSet from './components/TabSet.vue'
import UserGrid from './components/UserGrid.vue'

export default {
    components: {
        ChapterEditor,
        CurriculumEditor,
        LessonEditor,
        MarkdownEditor,
        SourceList,
        SourceEditor,
        StepEditor,
        Tab,
        TabSet,
        UserGrid
    },
    data: function () {
        return {
            chapter: null,
            chapterTitle: null,
            chapters: null,
            debug: 'hello, world',
            selectedChapter: null,
            selectedChapterLessons: null,
            selectedLesson: null,
            selectedStep: null,
            selectedSource: null,
            sources: [
                {name: 'index.dummy', type: 'text/html', content: '<!DOCTYPE html>'},
                {name: 'vshader.vert', type: 'text/plain', content: 'dummy vertex shader'},
                {name: 'fshader.frag', type: 'text/plain', content: 'dummy fragment shader'},
                {name: 'main.js', type: 'script/javascript', content: 'alert("hello")'}
            ]
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
        addSourceToStep(source) {
            const chapterId = this.selectedChapter.id
            const lessonId = this.selectedLesson.id
            const stepId = this.selectedStep.id
            request
            .post(
                `http://${process.env.API_URL}`
                + `/chapters/${chapterId}`
                + `/lessons/${lessonId}`
                + `/steps/${stepId}`
                + `/sources`
            )
            .send(source)
            .end((err, res) => {
                if (!err && res.ok) {
                    this.refreshStepSources(this.selectedStep)
                }
            })
        },
        deleteSource(source) {
            request
            .delete(`http://${process.env.API_URL}/sources/${source.id}`)
            .end((err, res) => {
                if (!err && res.ok) {
                    this.refreshStepSources(this.selectedStep)
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
                    = res.body.map(chapter => {
                        chapter.lessons = null
                        return chapter
                    })
                }
            })
        },
        refreshChapterLessons(chapter) {
            request
            .get(`http://${process.env.API_URL}/chapters/${chapter.id}/lessons`)
            .end((err, res) => {
                if (!err && res.ok) {
                    chapter.lessons = res.body.map(lesson => {
                        lesson.steps = null
                        return lesson
                    })
                }
            })
        },
        refreshLessonSteps(lesson) {
            request
            .get(`http://${process.env.API_URL}/lessons/${lesson.id}/steps`)
            .end((err, res) => {
                if (!err && res.ok) {
                    lesson.steps = res.body.map(step => {
                        step.sources = null
                        return step
                    })
                }
            })
        },
        refreshStepSources(step) {
            request
            .get(`http://${process.env.API_URL}/steps/${step.id}/sources`)
            .end((err, res) => {
                if (!err && res.ok) {
                    step.sources = res.body
                }
            })
        },
        selectChapter(chapter) {
            this.selectedChapter = null
            this.selectedLesson = null
            this.selectedStep = null
            this.$nextTick(() => {
                this.selectedChapter = chapter
                this.refreshChapterLessons(chapter)
            })
        },
        selectLesson(lesson) {
            this.selectedLesson = null
            this.selectedStep = null
            this.$nextTick(() => {
                this.selectedLesson = lesson
                this.refreshLessonSteps(lesson)
            })
        },
        selectStep(step) {
            this.selectedStep = null
            this.$nextTick(() => {
                this.selectedStep = step
                this.refreshStepSources(step)
            })
        },
        updateChapter(chapter) {
            request
                .put(`http://${process.env.API_URL}/chapters/${chapter.id}`)
                .send(chapter)
                .end((err, res) => {
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
                    this.selectedLesson = null
                }
            })
        },
        updateStep(step) {
            request.put(`http://${process.env.API_URL}/steps/${step.id}`)
            .send(step)
            .end((err, res) => {
                if (!err && res.ok) {
                    this.selectedStep = null
                }
            })
        },
        updateSource(source) {
            request
            .put(
                `http://${process.env.API_URL}/sources/${source.id}`
            )
            .send(source)
            .end((err, res) => {
                if (!err && res.ok) {
                    this.selectedSource = null
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
    background-color: royalblue;
    border-bottom: 2px solid rgba(255, 255, 255, .5);
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




.color-palette {
    margin: 0;
    padding: 0;
    display: flex;
    flex: 1;
}

.color-block {
    display: block;
    flex: 1;
    text-align: center;
}

.color-block:nth-child(5n+1) {
    background: royalblue;
}

.color-block:nth-child(5n+2) {
    background: orangered;
}

.color-block:nth-child(5n+3) {
    background: gold;
}

.color-block:nth-child(5n+4) {
    background: limegreen;
}

.color-block:nth-child(5n+5) {
    background: orchid;
}
</style>
