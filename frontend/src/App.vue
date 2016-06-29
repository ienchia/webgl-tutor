<template>
    <header id="app-header" :class="{ 'l-fill': !session }">
        <div class="brand" :class="{ 'is-jumbo': !session }">
            WebGL Tutor
        </div>
        <login-navigation
            :session="session"
            :is-logging-in="isLoggingIn"
            :is-registering="isRegistering"
            :is-register-success="isRegisterSuccess"
            :login-credential="loginCredential"
            :login-error-message="loginErrorMessage"
            :register-error-message="registerErrorMessage"
            @login="login"
            @logout="logout"
            @register="register">
        </login-navigation>
    </header>
    <div id="app-content" :class="{ 'l-fixed': !session }">
        <aside id="navigation-sidebar" v-if="session">
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
        <main id="workspace" v-if="session">
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
                        <button @click="execute">{{ this.sendingSource ? 'Sedang memproses' : 'Lihat hasil' }}</button>
                    </div>
                </div>
            </div>
            <div class="workspace-footer">
                <div class="step-control" v-if="currentStep && runOnce" transition="t-expand">
                    <div class="" v-if="currentStep && currentStep == currentLesson.steps[currentLesson.steps.length - 1]">
                        Apakah Anda sudah mengerti?
                        <button class="step-control-button" type="button" @click="finishLesson">Iya</button>
                        <button class="step-control-button" type="button" @click="selectLesson(currentLesson)">Tidak, ulangi dari awal</button>
                    </div>
                    <div class="" v-if="currentStep && currentStep != currentLesson.steps[currentLesson.steps.length - 1]">
                        Apakah Anda ingin lanjut ke Langkah berikutnya?
                        <button class="step-control-button" type="button" @click="nextStep" v-if="currentStep">Lanjut</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <footer id="app-footer">&copy; 2016</footer>
</template>

<script>
import css from '../css/style.css'
import fa from '../css/font-awesome.min.css'

import ramda from 'ramda'
import request from 'superagent'

import LoginNavigation from './components/LoginNavigation.vue'
import LessonNavigation from './components/LessonNavigation.vue'
import SourceEditor from './directives/SourceEditor.js'
import BayesNet from './lib/bayesian-network.js'

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
            bn: null,
            chapters: [],
            currentChapter: null,
            currentLesson: null,
            currentStep: null,
            currentSource: null,
            executeUrl: null,
            isLoggingIn: false,
            isRegistering: false,
            isRegisterSuccess: false,
            lessonHistory: [],
            loginCredential: {
                username: null,
                password: null
            },
            loginErrorMessage: null,
            registerErrorMessage: null,
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
                    this.executeUrl = null
                    if (step.sources && step.sources.length > 0) {
                        this.currentSource = step.sources[0]
                    }
                }
            })
        },
        createBayesNet() {
            request
            .get(`http://${process.env.API_URL}/cpds`)
            .end((err, res) => {
                if (!err && res.ok) {
                    const dataSet = ramda.map(
                        item => ({
                            name: ramda.prop('lessonId', item),
                            parents: ramda.map(
                                parent => ({
                                    name: ramda.prop('lessonId', parent),
                                    state: ramda.prop('state', parent)
                                }),
                                ramda.prop('rules', item)
                            ),
                            probability: ramda.prop('probability', item)
                        }),
                        res.body
                    )
                    this.bn = BayesNet(dataSet)
                }
            })
        },
        execute() {
            !this.sendingSource
            && this.currentStep
            && this.currentStep.sources
            && this.currentStep.sources.map(source => {
                return () => {
                    return new Promise((resolve, reject) => {
                        request
                        .post(`http://${process.env.API_URL}/users/${this.session.id}/sandbox`)
                        .send({ filename: source.name, content: source.content })
                        .end((err, res) => {
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
                    this.executeUrl = null
                    this.$nextTick(() => {
                        this.executeUrl = `http://${process.env.API_URL}/users/${this.session.id}/sandbox`
                        this.sendingSource = false
                        this.runOnce = true
                    })
                },
                err => {
                    this.sendingSource = false
                }
            )
            this.sendingSource = true
        },
        finishLesson() {
            request
            .post(`http://${process.env.API_URL}/users/${this.session.userId}/lesson-histories`)
            .send({ lessonId: this.currentLesson.id })
            .end((err, res) => {
                if (!err && res.ok) {
                    this.refreshLessonHistories()
                    this.selectChapter(this.currentChapter)
                }
            })
        },
        login(credentials) {
            this.isLoggingIn = true
            this.loginErrorMessage = null
            setTimeout(() => {
                request
                .post(`http://${process.env.API_URL}/login`)
                .withCredentials()
                .send(credentials)
                .end((err, res) => {
                    if (!err && res.ok) {
                        this.session = res.body
                        this.refreshChapters()
                        this.refreshLessonHistories()
                    }
                    if (err && res.notFound) {
                        this.loginErrorMessage = 'User tidak ditemukan. Mungkin username dan password tidak cocok. Apakah Anda pernah mendaftar sebelumnya?'
                    }
                    this.isLoggingIn = false
                })
            }, 1000)
        },
        logout() {
            request
            .delete(`http://${process.env.API_URL}/login`)
            .withCredentials()
            .send({})
            .end((err, res) => {
                if (!err && res.ok) {
                    this.session = null
                }
            })
            this.currentChapter = null
            this.currentLesson = null
            this.currentStep = null
            this.executeUrl = null
            this.currentSource = null
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
        refreshChapters() {
            this.currentChapter = null
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
        },
        refreshChapterLessons(chapter) {
            this.currentLesson = null
            request
            .get(`http://${process.env.API_URL}/chapters/${chapter.id}/lessons`)
            .end((err, res) => {
                if (!err && res.ok) {
                    this.currentChapter.lessons = ramda.map(
                        lesson => {
                            lesson.isDetermining = true
                            lesson.lessonHistory = null
                            lesson.steps = null
                            lesson.difficulty = null
                            lesson.isCalculatingDifficulty = false
                            return lesson
                        },
                        res.body
                    )

                    this.refreshLessonHistories()

                    setTimeout(() => {
                        request
                        .get(`http://${process.env.API_URL}/users/${this.session.userId}/lesson-histories`)
                        .end((err, res) => {
                            if (!err && res.ok) {
                                const knownLessons = res.body
                                this.currentChapter.lessons.map(lesson => {
                                    lesson.isDetermining = false
                                    lesson.lessonHistory = ramda.find(
                                        ramda.propEq('id', lesson.id),
                                        knownLessons
                                    )
                                    return lesson
                                })
                            }
                        })
                    }, 900)
                }
            })
        },
        refreshLessonDifficulties() {
            const knownLessons = ramda.map(
                lesson => ({
                    name: ramda.prop('id', lesson),
                    state: true
                }),
                this.lessonHistories || []
            )
            this.currentChapter.lessons.forEach(
                lesson => {
                    lesson.isCalculatingDifficulty = true
                    if (this.bn) {
                        setTimeout(() => {
                            new Promise((res, rej) => {
                                const difficulty = this.bn.ask(
                                    { name: lesson.id, state: true },
                                    ramda.reject(
                                        ramda.equals({ name: lesson.id, state: true }),
                                        ramda.uniq(knownLessons)
                                    )
                                )
                                res(difficulty)
                            }).then(difficulty => {
                                console.log(difficulty)
                                lesson.difficulty = difficulty
                                lesson.isCalculatingDifficulty = false
                            })
                        }, 2000)
                    }
                }
            )
        },
        refreshLessonHistories() {
            request
            .get(`http://${process.env.API_URL}/users/${this.session.userId}/lesson-histories`)
            .end((err, res) => {
                if (!err && res.ok) {
                    this.lessonHistories = res.body
                    if (this.currentChapter && this.currentChapter.lessons) {
                        this.refreshLessonDifficulties()
                    }
                }
            })
        },
        refreshLessonSteps(lesson) {
            this.currentStep = null
            this.executeUrl = null
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

                    if (step.sources.length > 0) {
                        this.currentSource = step.sources[0]
                    }
                }
            })
        },
        register(user) {
            this.isRegistering = true
            this.registerErrorMessage = null
            this.isRegisterSuccess = false
            setTimeout(() => {
                request
                .post(`http://${process.env.API_URL}/users`)
                .withCredentials()
                .send({
                    fullname: user.fullname,
                    password: user.password,
                    username: user.username
                })
                .end((err, res) => {
                    if (!err && res.ok) {
                        this.isRegisterSuccess = true
                    }
                    else if (err && res.status == 409) {
                        this.registerErrorMessage = 'Username telah didaftarkan sebelumnya. Tolong gunakan username lain.'
                    }
                    else {
                        this.registerErrorMessage = 'Pendaftaran tidak berhasil'
                    }
                    this.isRegistering = false
                })
            }, 1000)
        },
        selectChapter(chapter) {
            this.refreshChapterLessons(chapter)
            this.currentChapter = chapter
            this.currentLesson = null
            this.currentStep = null
            this.executeUrl = null
            this.currentSource = null
            this.runOnce = false
        },
        selectLesson(lesson) {
            this.refreshLessonSteps(lesson)
            this.currentLesson = lesson
            this.currentStep = null
            this.executeUrl = null
            this.currentSource = null
            this.runOnce = false
        },
        selectStep(step) {
            this.refreshStepSources(step)
            this.currentStep = step
            this.executeUrl = null
            this.currentSource = null
            this.runOnce = false
        },
        selectSource(source) {
            this.currentSource = source
        }
    },
    ready: function () {
        this.createBayesNet()
        request
        .get(`http://${process.env.API_URL}/login`)
        .withCredentials()
        .end((err, res) => {
            if (!err && res.ok) {
                this.session = res.body
                this.refreshChapters()
            }
        })
    }
}
</script>

<style>
#app-header {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    padding: 1em;
    background-color: royalblue;
    color: white;
    border-bottom: 2px solid rgba(255, 255, 255, .5);
    transition: all 1s ease;
}

#app-header.l-fill {
    flex: 1 1 0%;
    overflow: hidden;
    background-color: whitesmoke;
    color: black;
}

#app-content {
    display: flex;
    flex: 1;
    transition: all 1s ease;
}

#app-content.l-fixed {
    flex: 0 0 auto;
}

#app-footer {
    flex: 0;
    padding: .5em;
    background: royalblue;
    color: white;
    border-top: 2px solid rgba(255, 255, 255, .5);
}

#navigation-sidebar {
    display: flex;
    flex: 0 0 auto;
    border-right: medium solid yellowgreen;
    width: 360px;
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
    opacity: .4;
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
    font-weight: lighter;
    font-size: 1.4em;
    transition: all 1s ease;
}

.brand.is-jumbo {
    font-size: 6em;
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

.step-control.t-expand-transition {
    background: whitesmoke;
    display: flex;
    flex: 1;
    justify-content: center;
    padding: .5em 0;
    max-height: 2em;
    overflow: hidden;
    transition: all .5s ease;
}

.step-control.t-expand-enter, .step-control.t-expand-leave {
    padding: 0 6em;
    max-height: 0;
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
