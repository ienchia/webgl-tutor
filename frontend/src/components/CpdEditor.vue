<template>
    <div class="cpd">
        <div class="cpd-selector">
            <div class="">
                These lessons...
            </div>
            <div class="cpd-section">
                <ul class="cards-selector">
                    <li class="card is-active" v-for="lesson in requiredLessons" @click="removeRequiredLesson(lesson)">
                        <div class="card-content">
                            {{ lesson.isSelected }}
                        </div>
                        <div class="card-header">
                            {{ lesson.id }} {{ lesson.title }}
                        </div>
                    </li>
                    <li class="card" v-for="lesson in lessons | filterRequired | filterTargeted" @click="addRequiredLesson(lesson)">
                        <div class="card-content">
                            {{ lesson.isSelected }}
                        </div>
                        <div class="card-header">
                            {{ lesson.id }} {{ lesson.title }}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="">
                are requirements for...
            </div>
            <div class="cpd-section">
                <ul class="cards-selector">
                    <li class="card" :class="{ 'is-active': lesson == targetLesson }" v-for="lesson in lessons | filterRequired" @click="setTargetLesson(lesson)">
                        <div class="card-content">

                        </div>
                        <div class="card-header">
                            {{ lesson.id }} {{ lesson.title }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cpd-editor" v-if="targetLesson">
            <table v-if="targetLesson.cpd">
                <thead>
                    <tr>
                        <td v-for="rule in targetLesson.cpd[0].rules">
                            Lesson {{ rule.lesson.id }}
                        </td>
                        <td>
                            Know
                        </td>
                        <td>
                            Not Know
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in targetLesson.cpd">
                        <td v-for="rule in row.rules">
                            {{ rule.state ? 'Know' : 'Not Know' }}
                        </td>
                        <td>
                            <input type="number" max="1" min="0" step=".1" v-model="row.probability" />
                        </td>
                        <td>
                            {{ row.negProbability }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="editor-controls" v-else>
                <button type="button" @click="remakeCpd">Make CPD</button>
            </div>
            <div class="editor-controls" v-if="targetLesson">
                <button type="button" @click="saveCpd(targetLesson)">Save Changes</button>
            </div>
        </div>
    </div>
</template>
<script>
import ramda from 'ramda'
import Vue from 'vue'

export default {
    data: function () {
        return {
            cpdDataSet: null,
            requiredLessons: [],
            targetLesson: null
        }
    },
    filters: {
        filterRequired(lessons) {
            if (lessons == null) {
                return []
            }
            return ramda.reject(d => ramda.find(ramda.equals(d), this.requiredLessons), lessons)
        },
        filterTargeted(lessons) {
            if (lessons == null) {
                return []
            }
            return ramda.reject(ramda.equals(this.targetLesson), lessons)
        }
    },
    methods: {
        addRequiredLesson(lesson) {
            this.requiredLessons.push(lesson)
            this.remakeCpd()
        },
        remakeCpd() {
            if (this.targetLesson == null) {
                return null
            }

            const initState = init(this.targetLesson, .7)
            const mergedState = merge(initState, this.requiredLessons)
            this.targetLesson.cpd = mergedState
            function init(lesson, probability) {
                return [
                    {
                        rules: [],
                        probability,
                        get negProbability() {
                            return 1 - this.probability
                        }
                    }
                ]
            }
            function merge(state, lessons) {
                return ramda.reduce((state, lesson) => {
                    return ramda.unnest(ramda.map(record => [
                        {
                            rules: ramda.append({
                                lesson: lesson,
                                state: true
                            }, record.rules),
                            probability: record.probability,
                            get negProbability() {
                                return 1 - this.probability
                            }
                        }, {
                            rules: ramda.append({
                                lesson: lesson,
                                state: false
                            }, record.rules),
                            probability: record.probability,
                            get negProbability() {
                                return 1 - this.probability
                            }
                        }
                    ], state))
                }, state, lessons)
            }
        },
        removeRequiredLesson(lesson) {
            this.requiredLessons.$remove(lesson)
            this.remakeCpd()
        },
        saveCpd(lesson) {
            this.$dispatch('save-cpd', lesson)
        },
        setTargetLesson(lesson) {
            this.targetLesson = lesson
        },
    },
    props: ['lessons']
}
</script>
<style media="screen">
.cpd {
    display: flex;
    flex: 1 1 auto;
    width: 100%;
}

.cpd-selector, .cpd-editor {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    width: 50%;
    overflow: auto;
    padding: .5em;
}

.cpd-selector {
    border-right: thin solid royalblue;
}

.cpd-editor {
}

.cpd-section {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    overflow: auto;
}

.cards-selector {
    display: flex;
    flex: 0 0 auto;
}

.editor-controls {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
}
</style>
