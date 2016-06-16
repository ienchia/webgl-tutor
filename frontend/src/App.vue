<template>
    <header id="app-header">
        <div class="brand">
            WebGL Tutor
        </div>
        <login-navigation
            :session="session"
            @login="login"
            @logout="logout">
        </login-navigation>
    </header>
    <div id="app-content">
        <aside id="navigation-sidebar">
            <lesson-navigation
                :chapters="chapters"
                :selected-chapter="currentChapter"
                :selected-lesson="currentLesson"
                :selected-step="currentStep"
                @begin-lesson="beginLesson"
                @select-chapter="selectChapter"
                @select-lesson="selectLesson">
            </lesson-navigation>
        </aside>
        <main id="workspace">
            <div class="workspace-nav">
                <div class="file-navigation" v-if="currentStep && currentStep.sources">
                    <ul class="tab-list">
                        <li class="tab-item"
                            :class="{ 'is-active': currentSource == source }"
                            @click="selectSource(source)"
                            v-for="source in currentStep.sources">
                            {{ source.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="workspace-content">
                <div class="file-editor" v-if="currentSource">
                    <div class="file-editor" v-source-editor.html="currentSource.content"
                        v-if="/\.html$/.test(currentSource.name)">
                    </div>
                    <div class="file-editor" v-source-editor.javascript="currentSource.content"
                        v-if="/\.js$/.test(currentSource.name)">
                        </div>
                    <div id="viewer">
                        <div id="viewer-main">
                            <iframe :src="executeUrl" width="320" height="240"></iframe>
                        </div>
                        <button @click="execute">{{ this.sendingSource ? 'Sending' : 'Run' }}</button>
                    </div>
                </div>
            </div>
            <div class="workspace-footer">
                <div class="step-control" :class="{ 'is-active': runOnce }">
                    Do You want to continue?
                    <button class="step-control-button" type="button" @click="nextStep" v-if="currentStep">Next Step</button>
                    <button class="step-control-button" type="button" @click="finishLesson" v-if="currentStep && currentStep == currentLesson.steps[currentLesson.steps.length - 1]">Done</button>
                </div>
            </div>
        </main>
    </div>
    <footer id="app-footer">&copy; 2016</footer>
</template>

<script>
import css from '../css/style.css'
import fa from '../css/font-awesome.min.css'

import request from 'superagent'

import LoginNavigation from './components/LoginNavigation.vue'
import LessonNavigation from './components/LessonNavigation.vue'
import SourceEditor from './directives/SourceEditor.js'

export default {
    components: {
        LessonNavigation,
        LoginNavigation,
    },
    directives: {
        SourceEditor
    },
    data: function () {
        return {
            chapters: [],
            currentChapter: null,
            currentLesson: null,
            currentStep: null,
            currentSource: null,
            executeUrl: null,
            runOnce: false,
            sendingSource: false,
            session: null
        }
    },
    methods: {
        beginLesson(lesson) {
            request
            .get(`http://${process.env.API_URL}/lessons/${lesson.id}/steps`)
            .end((err, res) => {
                if (!err && res.ok) {
                    lesson.steps = res.body.map(
                        step => {
                            step.sources = null
                            return step
                        }
                    )
                    const step = lesson.steps[0] || null
                    this.refreshStepSources(step)
                    this.currentStep = step
                }
            })
        },
        execute() {
            !this.sendingSource
            && this.currentStep
            && this.currentStep.sources
            && this.currentStep.sources.map(source => {
                return () => {
                    console.log('sending ' + source.name)
                    return new Promise((resolve, reject) => {
                        request
                        .post(`http://${process.env.API_URL}/users/${this.session.id}/sandbox`)
                        .send({ filename: source.name, content: source.content })
                        .end((err, res) => {
                            console.log(err)
                            console.log(res)
                            !err && res.ok
                            ? console.log('end ' + source.name)
                            : console.log(source.name + err)
                            !err && res.ok && resolve()
                        })
                    })
                }
            })
            .reduce((a, b) => {
                return a.then(() => b())
            }, Promise.resolve())
            .then(
                () => {
                    console.log('view')
                    this.executeUrl = null
                    this.$nextTick(() => {
                        this.executeUrl = `http://${process.env.API_URL}/users/${this.session.id}/sandbox`
                        this.sendingSource = false
                        this.runOnce = true
                    })
                },
                err => {
                    console.log(err)
                    this.sendingSource = false
                }
            )
            this.sendingSource = true
        },
        finishLesson() {
            this.selectChapter(this.currentChapter)
        },
        login(credentials) {
            setTimeout(() => {
                this.$nextTick(() => {
                    this.session = {
                        id: 1,
                        username: 'ienchia'
                    }
                })
            }, 1000)
        },
        logout() {
            this.session = null
        },
        nextStep() {
            if (!this.currentLesson || !this.currentLesson.steps) return null
            const steps = this.currentLesson.steps
            var i = 0
            for (i = 0; i < steps.length; i++) {
                if (steps[i] == this.currentStep) break
            }
            this.selectStep(steps[i + 1])
        },
        run() {
            if (!this.editor) return null

            const newScript = document.createElement('script')
            newScript.appendChild(
                document.createTextNode(this.editor.getValue())
            )
            const container = document.querySelector('#viewer-main')
            if (this.script) {
                container.replaceChild(newScript, this.script)
            }
            else {
                var result = container.appendChild(newScript)
            }
            this.script = newScript
        },
        refreshChapterLessons(chapter) {
            this.currentLesson = null
            request
            .get(`http://${process.env.API_URL}/chapters/${chapter.id}/lessons`)
            .end((err, res) => {
                if (!err && res.ok) {
                    chapter.lessons = res.body.map(
                        lesson => {
                            lesson.steps = null
                            return lesson
                        }
                    )
                }
            })
        },
        refreshLessonSteps(lesson) {
            this.currentStep = null
            request
            .get(`http://${process.env.API_URL}/lessons/${lesson.id}/steps`)
            .end((err, res) => {
                if (!err && res.ok) {
                    lesson.steps = res.body.map(
                        step => {
                            step.sources = null
                            return step
                        }
                    )
                }
            })
        },
        refreshStepSources(step) {
            request
            .get(`http://${process.env.API_URL}/steps/${step.id}/sources`)
            .end((err, res) => {
                if (!err && res.ok) {
                    step.sources = res.body.map(
                        source => {
                            return source
                        }
                    )
                }
            })
        },
        selectChapter(chapter) {
            this.refreshChapterLessons(chapter)
            this.currentChapter = chapter
            this.currentLesson = null
            this.currentStep = null
            this.currentSource = null
            this.runOnce = false
        },
        selectLesson(lesson) {
            this.refreshLessonSteps(lesson)
            this.currentLesson = lesson
            this.currentStep = null
            this.currentSource = null
            this.runOnce = false
        },
        selectStep(step) {
            this.refreshStepSources(step)
            this.currentStep = step
            this.currentSource = null
            this.runOnce = false
        },
        selectSource(source) {
            this.currentSource = source
        }
    },
    ready: function () {
        request
        .get(`http://${process.env.API_URL}/chapters`)
        .end((err, res) => {
            if (!err && res.ok) {
                this.chapters = res.body.map(
                    d => {
                        d.lessons = null
                        return d
                    }
                )
            }
        })
    }
}
</script>

<style>
#app-header {
    display: flex;
    flex: 0 0 auto;
    padding: 1em;
}

#app-content {
    display: flex;
    flex: 1;
}

#app-footer {
    flex: 0;
    padding: 1em;
}

#navigation-sidebar {
    display: flex;
    flex: 0 0 auto;
    width: 240px;
}

#workspace {
    display: flex;
    flex: 1;
}

#app {
    display: flex;
    position: relative;
    flex: 1;
}

#viewer {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    margin: 1em;
    flex-direction: column;
    background-color: white;
    opacity: .1;
    transition: all 1s ease;
    z-index: 5;
}

#viewer:hover {
    opacity: 1;
}

#editor {
    flex: 1;
}

#workspace {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.brand {
    flex: 1;
}

.file-navigation {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
}

.tab-list {
    display: flex;
    flex: 0 0 auto;
    padding: 0;
    margin: 0;
    background: yellowgreen;
}

.tab-item {
    display: flex;
    flex: 0 0 auto;
    background: white;
    opacity: .5;
    padding: .2em 1em;
    margin-top: 4px;
    margin-right: 4px;
    cursor: pointer;
}

.tab-item:first-child {
    margin-left: 4px;
}

.tab-item.is-active {
    opacity: 1;
}

.file-editor {
    position: relative;
    display: flex;
    flex: 1;
}

.workspace-header, .workspace-footer {
    display: flex;
    flex: 0 0 auto;
}

.workspace-content {
    display: flex;
    flex: 1;
}

.step-control {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    padding: 0px 6em;
    max-height: 0em;
    overflow: hidden;
    transition: all .5s ease;
}

.step-control.is-active {
    padding: 0px 6em;
    max-height: 2em;
}

.step-control-button {
    overflow: hidden;
    padding-left: 1em;
    padding-right: 1em;
}
</style>
