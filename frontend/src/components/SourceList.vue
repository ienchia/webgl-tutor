<template>
    <div class="source-list">
        <ul class="cards">
            <li class="card"
                :class="{ 'is-active': selectedSource == source }"
                v-for="source in sources"
                @click="selectSource(source)">
                <div class="card-content">
                    {{ source.content }}
                </div>
                <div class="card-header">
                    {{ source.name }}
                </div>
            </li>
            <li class="card">
                <label>File name</label>
                <input v-model="newSource.name" />
                <button type="button" @click="addSource(newSource)">Add New Source</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            newSource: {
                name: 'untitled',
                content: ''
            }
        }
    },
    methods: {
        selectSource(source) {
            this.selectedSource = source
        },
        addSource(source) {
            this.$dispatch('add-source', source)
        }
    },
    props: [ 'selectedSource', 'sources' ]
}
</script>

<style media="screen">
.source-list {
    flex: 1;
    display: flex;
}

.cards {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
}

.card {
    margin: 1em;
    display: flex;
    flex-direction: column;
    width: 120px;
    height: 120px;
    border: thin solid lightsteelblue;
    cursor: pointer;
}

.card.is-active {
    border-color: royalblue;
}

.card-content {
    padding: .5em;
    overflow: hidden;
    text-overflow: ellipsis;
    font: .8em "Courier New";
    flex: 1;
}

.card-header {
    flex: 0 1 auto;
    padding: .1em .2em;
    font-weight: lighter;
    border-top: thin solid lightsteelblue;
}
</style>
