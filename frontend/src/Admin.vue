<template>
    <header class="main-header">This is a header</header>
    <div class="rows">
        <aside class="primary-sidebar">
            <curriculum-tree
                :chapters="chapters"
                @add-chapter="addChapter"
                @refresh-chapters="refreshChapters"
                @set-active-chapter="selectChapter"></curriculum-tree>
            <div v-if="selectedChapter">
                {{ selectedChapter | json }}
            </div>
        </aside>
        <main class="content cols">
            <div class="cols">
                <chapter-editor
                    v-if="selectedChapter"
                    :chapter="selectedChapter"
                    @save="updateChapter"></chapter-editor>
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
import CurriculumTree from './components/CurriculumTree.vue'
import MarkdownEditor from './components/MarkdownEditor.vue'
import UserGrid from './components/UserGrid.vue'

export default {
    components: {
        ChapterEditor,
        CurriculumTree,
        MarkdownEditor,
        UserGrid
    },
    data: function () {
        return {
            chapter: null,
            chapterTitle: null,
            chapters: null,
            selectedChapter: null,
        }
    },
    methods: {
        refreshChapters() {
            console.log('retrieving chapters')
            this.selectedChapter = null
            request
                .get(`http://${process.env.API_URL}/chapters`)
                .end((err, res) => err || !res.ok ? console.log(err) : this.chapters = res.body)
        },
        addChapter() {
            console.log('adding new chapter')
            const callRefreshChapter = () => this.refreshChapters()
            request
                .post(`http://${process.env.API_URL}/chapters`)
                .send({})
                .end(function (err, res) {
                     if (err || !res.ok) {
                         console.log(err)
                     }
                     else {
                         console.log(res)
                         callRefreshChapter()
                     }
                })
        },
        updateChapter(chapter) {
            console.log('updating chapter')
            const callRefreshChapter = () => this.refreshChapters()
            request
                .put(`http://${process.env.API_URL}/chapters/${chapter.id}`)
                .send(chapter)
                .end(function (err, res) {
                     if (err || !res.ok) {
                         console.log(err)
                     }
                     else {
                         console.log(res)
                         callRefreshChapter()
                     }
                })
        },
        retrieveLessons(chapter) {
            console.log('retrieving lessons')
            request
                .get(`http://${process.env.API_URL}/chapters/${chapter.id}/lessons`)
                .end(function (err, res) {
                    if (err || !res.ok) {
                        console.log(err)
                    } else {
                        chapter.lessons = res.body
                    }
                })
        },
        selectChapter(chapter) {
            console.log(chapter)
            this.selectedChapter = chapter
            this.retrieveLessons(this.selectedChapter)
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
    flex: 1 1 auto;
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
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
}

.col {
    flex: 1 1 0%;
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
}

.secondary-sidebar {
    width: 5%;
}

.content {
    flex: 1 1 auto;
    min-width: 400px;
}
</style>
