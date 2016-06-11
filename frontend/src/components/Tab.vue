<template id="">
    <div class="tab-content" v-show="toggle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    created() {
        for (var index; index < this.$parent.$children.length; index++) {
            if (this.$parent.$children[index].$el == this.$el) {
                this.tabIndex = index
            }
        }
    },
    data: function () {
        return {
            tabIndex: -1,
            toggle: true
        }
    },
    ready() {
        var notInParent = true;
        for (var index; index < this.$parent.$children.length; index++) {
            if (this.$parent.$children[index].$el == this.$el) {
                notInParent = false;
            }
        }
        if (notInParent) {
            this.$parent.tabs.push({
                header: this.header,
                tabIndex: this.tabIndex
            })
        }
    },
    props: [ 'header' ]
}
</script>

<style media="screen">
.tab-content {
    flex: 1;
    display: flex;
}
</style>
