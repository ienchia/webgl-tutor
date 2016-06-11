<template>
    <form>
        <label>Step Title</label>
        <input type="text" v-model="step.title" />
        <label>Step Order</label>
        <input type="number" v-model="step.order" min="0" />
        <label>Step Description</label>
        <div class="cols">
            <markdown-editor :content-value.sync="step.description"></markdown-editor>
        </div>
        <button type="button" @click="saveStep(step)">Save Changes</button>
    </form>
</template>
<script>
import MarkdownEditor from './MarkdownEditor.vue'
export default {
    components: {
        MarkdownEditor
    },
    data: function () {
        return {

        }
    },
    methods: {
        saveStep(step) {
            this.$dispatch('save-step', step)
        }
    },
    props: ['step']
}
</script>
<style>

</style>
