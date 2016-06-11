<template id="">
    <div class="tabs">
        <ul class="tabs-nav">
            <li :class="{ 'is-active': activeIndex == $index }"
                @click="setActive($index)"
                v-for="tab in tabs">
                {{ tab.header }}
            </li>
        </ul>
        <div class="tabs-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            tabs: []
        }
    },
    methods: {
        setActive(index) {
            this.$children.forEach(d => {
                d.toggle = false
            })
            this.$children[index].toggle = true
            this.activeIndex = index
        }
    },
    props: [ 'activeIndex'],
    ready() {
        this.setActive(this.activeIndex)
    }
}
</script>

<style media="screen">
.tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.tabs-nav {
    flex: 0 0 auto;
    display: flex;
    margin: 0;
    padding: 0;
    background: royalblue;
}

.tabs-nav > li {
    cursor: pointer;
    flex: 1;
    display: flex;
    margin: 0 5px;
    padding: 5px;
    background: rgba(255, 255, 255, .5);
}

.tabs-nav > li.is-active {
    background: white;
}

.tabs-content {
    flex: 1;
    display: flex;
    background: white;
}
</style>
