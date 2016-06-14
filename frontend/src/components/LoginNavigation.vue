<template>
    <nav class="login-navigation">
        <div class="dropdown login-control" v-show="isLoggedIn">
            <div class="dropdown-header">
                <span class="fa fa-user"></span> {{ username }}
            </div>
            <ul class="dropdown-list">
                <li class="dropdown-item">
                    {{ username }}
                </li>
                <li class="dropdown-item">
                    <button v-on:click="logout">Logout</button>
                </li>
            </ul>
        </div>
        <div class="login-control" v-else>
            <button v-on:click="login">Login</button>
        </div>
    </nav>
</template>

<script type="text/javascript">
import ramda from 'ramda'

export default {
    data: function () {
        return {}
    },
    computed: {
        username() {
            return this.session ? this.session.username : ''
        },
        isLoggedIn() {
            return this.session ? true : false
        }
    },
    methods: {
        login() {
            this.$dispatch('login', { username: '', password: '' })
        },
        logout() {
            this.$dispatch('logout')
        }
    },
    props: ['session']
}

</script>

<style>
.login-navigation {
    display: flex;
    flex: 0 0 auto;
}

.dropdown {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
}

.dropdown-list {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    flex: 0 0 100%;
}

.dropdown:hover .dropdown-list {
}

.dropdown-item {
    background: white;
    display: flex;
    flex: 0 0 auto;
    overflow: hidden;
    padding: 0;
    max-height: 0em;
    transition: all .3s ease;
}

.dropdown-item:hover {
    background: whitesmoke;
}

.dropdown:hover .dropdown-item {
    padding: .5em;
    max-height: 4em;
}

.login-control {
    min-height: 1.6em;
}
</style>
