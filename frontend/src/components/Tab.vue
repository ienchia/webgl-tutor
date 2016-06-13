<template id="">
    <div class="tab-content" v-show="toggle">
        <slot></slot>
    </div>
</template>

<script>
export default {
    beforeDestroy() {
        this.$parent.tabs.splice(this.tabIndex, 1)
    },
    created() {
        for (var index = 0; index < this.$parent.$children.length; index++) {
            if (this.$parent.$children[index].$el == this.$el) {
                this.tabIndex = index
            }
        }
    },
    data: function () {
        return {
            tabIndex: -1,
            toggle: false
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
        if (this.$parent.activeIndex == this.tabIndex) {
            this.toggle = true
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
