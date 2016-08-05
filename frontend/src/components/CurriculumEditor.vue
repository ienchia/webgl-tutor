<template>
    <div class="curriculum-editor">
        <h1>Curriculum</h1>
        <ul class="tree-list" v-if="chapters">
            <li class="tree-item"
                v-for="chapter in chapters | orderBy 'order'"
                :class="{ 'is-active': activeChapter == chapter }">
                <div class="tree-header expand-tree"
                    :class="{ 'is-active': activeChapter == chapter }"
                    @click="setActiveChapter(chapter)">
                    Chapter {{ chapter.order }}: {{ chapter.title }}
                    <div class="control-delete" @click="confirmDeleteChapter(chapter)" v-if="!activeLesson && activeChapter == chapter">
                        <button class="is-danger"><i class="fa fa-trash"></i> Delete</button>
                    </div>
                </div>
                <ul class="tree-list cols"
                    v-if="activeChapter == chapter">
                    <li class="tree-item"
                        v-for="lesson in chapter.lessons | orderBy 'order'">
                        <div class="tree-header expand-tree"
                            :class="{ 'is-active': activeLesson == lesson }"
                            @click="setActiveLesson(lesson)">
                            Lesson {{ lesson.order }}: {{ lesson.title }}
                            <div class="control-delete" @click="confirmDeleteLesson(lesson)" v-if="activeLesson == lesson">
                                <button class="is-danger"><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                        <ul class="tree-list cols"
                            v-if="activeLesson == lesson">
                            <li class="tree-item tree-header"
                                v-for="step in lesson.steps | orderBy 'order'">
                                <div class="expand-tree"
                                    :class="{ 'is-active': activeStep == step }"
                                    @click="setActiveStep(step)">
                                    Step {{ step.order }}: {{ step.title }}
                                </div>
                            </li>
                            <button @click="addStep(lesson)">Add New Step</button>
                        </ul>
                    </li>
                    <button @click="addLesson(chapter)">Add New Lesson</button>
                </ul>
            </li>
        </ul>
        <div class="controls">
            <div class="control-item">
                <button @click="addChapter">Add Chapter</button>
            </div>
            <div class="control-item">
                <button @click="refreshChapters">Refresh</button>
            </div>
        </div>
    </div>
    <div class="modal" v-if="lessonToConfirmDelete">
        <div class="modal-content">
            <div class="modal-header">
                Are you sure you want to delete?
            </div>
            <div class="modal-body">
                <table class="table-none">
                    <tbody>
                        <tr><th>Lesson ID</th><td>{{ lessonToConfirmDelete.id }}</td></tr>
                        <tr><th>Lesson Title</th><td>{{ lessonToConfirmDelete.title }}</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button class="modal-control is-danger" @click="deleteLesson(lessonToConfirmDelete)"><i class="fa fa-trash"></i> yes</button>
                <button class="modal-control" @click="cancelDeleteLesson"><i class="fa fa-ban"></i> NO</button>
            </div>
        </div>
    </div>
    <div class="modal" v-if="chapterToConfirmDelete">
        <div class="modal-content">
            <div class="modal-header">
                Are you sure you want to delete?
            </div>
            <div class="modal-body">
                <table class="table-none">
                    <tbody>
                        <tr><th>Chapter ID</th><td>{{ chapterToConfirmDelete.id }}</td></tr>
                        <tr><th>Chapter Title</th><td>{{ chapterToConfirmDelete.title }}</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button class="modal-control is-danger" @click="deleteChapter(chapterToConfirmDelete)"><i class="fa fa-trash"></i> yes</button>
                <button class="modal-control" @click="cancelDeleteChapter"><i class="fa fa-ban"></i> NO</button>
            </div>
        </div>
    </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor.vue'

export default {
    components: {
        MarkdownEditor
    },
    data: function () {
        return {
            chapterToConfirmDelete: null,
            lessonToConfirmDelete: null
        }
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
        cancelDeleteChapter() {
            this.chapterToConfirmDelete = null
        },
        cancelDeleteLesson() {
            this.lessonToConfirmDelete = null
        },
        confirmDeleteChapter(chapter) {
            this.chapterToConfirmDelete = chapter
        },
        confirmDeleteLesson(lesson) {
            this.lessonToConfirmDelete = lesson
        },
        deleteChapter(chapter) {
            this.$dispatch('delete-chapter', chapter)
            this.chapterToConfirmDelete = null
        },
        deleteLesson(lesson) {
            this.$dispatch('delete-lesson', lesson)
            this.lessonToConfirmDelete = null
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
.controls {
    display: flex;
    flex: 1;
    padding: 1em 0;
}

.control-item {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.control-delete {
    display: inline-block;
    text-align: right;
}

.curriculum-editor {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 .5em;
}

.tree-list {
    padding: 0;
    margin: 0;
}

.tree-list .tree-list {
    padding: 0 .5em;
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

.modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 99;
}

.modal-content {
    margin: auto;
    margin-top: 10%;
    width: 24em;
    background: white;
    line-height: 1.5;
}

.modal-header, .modal-body, .modal-footer {
    padding: 1em;
}

.modal-header {
    font-weight: bold;
}

.modal-body {
    height: 10em;
    overflow: auto;
}

.modal-footer {
    text-align: right;
}

button.modal-control {
    padding: 0 2em;
}

.table-none, .table-none th, .table-none td {
    border: none;
}


</style>
