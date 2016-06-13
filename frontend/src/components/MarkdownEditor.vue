<template>
    <div class="markedit">
        <div class="markedit-editor"
            v-source-editor.markdown="contentValue">
        </div>
        <div
            class="markedit-viewer"
            v-html="content | marked">
        </div>
    </div>
</template>

<script>
import marked from 'marked'
import SourceEditor from '../directives/SourceEditor'

export default {
    computed: {
        content: {
            get() {
                return this.contentValue || '*none*'
            },
        }
    },
    data: function () {
        return {
            a: ''
        }
    },
    directives: {
        SourceEditor
    },
    filters: {
        marked
    },
    props: [ 'contentValue' ]
}

</script>

<style>
.markedit {
    display: flex;
    flex: 1;
    height: 100%;
}

.markedit-editor, .markedit-viewer {
    flex: 1;
    max-width: 100%;
    padding: 1em;
}

.markedit-viewer {
    overflow-y: auto;
}
</style>
