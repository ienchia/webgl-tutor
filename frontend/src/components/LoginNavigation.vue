<template>
    <nav class="login-navigation">
        <span v-show="isLoggedIn">
            <div class="dropdown">
                {{ username }}
                <ul>
                    <li>
                        <button v-on:click="logout">Logout</button>
                    </li>
                </ul>
            </div>
        </span>
        <span v-else>
            <button v-on:click="login">Login</button>
        </span>
    </nav>
</template>

<script type="text/javascript">
import ramda from 'ramda'

export default {
    data: function () {
        return {
            user: null
        }
    },
    computed: {
        username() {
            return this.user ? this.user.name : ''
        },
        isLoggedIn() {
            return this.user ? true : false
        }
    },
    methods: {
        login() {
            this.user = {
                name: 'ienchia'
            }
        },
        logout() {
            this.user = null
        }
    }
}

</script>

<style>
@keyframes in {
    from {
        top: -100px;
    }
    to {
        top: 0;
    }
}


.login-navigation {
    display: inline;
}

.dropdown {
    display: inline-block;
    position: relative;
    z-index: 10;
}

.dropdown > ul {
    display: none;
    position: absolute;
}

.dropdown:hover > ul {
    display: block;
    position: absolute;
}

.dropdown:hover > ul > li {
    animation: in 0.5s ease;
    position: relative;
}
</style>
