<template>
    <nav class="login-navigation">
        <div class="login-control controls" v-show="!isLoggedIn">
            <form id="login-form">
                <h3>Login</h3>
                <label>Username</label>
                <input class="control-item" type="text" placeholder="username" v-model="loginCredential.username" />
                <label>Password</label>
                <input class="control-item" type="password" placeholder="password" v-model="loginCredential.password" />
                <button type="button" class="control-item" v-on:click="login">
                    <div class="" v-if="isLoggingIn">
                        <span class="fa fa-spin fa-circle-o-notch"></span> Logging In
                    </div>
                    <div class="" v-else>
                        Login
                    </div>
                </button>
            </form>
            <div class="separator">
                Or
            </div>
            <form id="register-form">
                <h3>Register</h3>
                <label>Full name</label>
                <input class="control-item" type="text" placeholder="Firstname Lastname" v-model="registerCredential.fullname" />
                <label>Username</label>
                <input class="control-item" type="text" placeholder="username" v-model="registerCredential.username" />
                <label>Password</label>
                <input class="control-item" type="password" placeholder="password" v-model="registerCredential.password" />
                <label>Confirm Password</label>
                <input class="control-item" type="password" placeholder="confirm password" v-model="registerCredential.confirmPassword" />
                <div class="message is-error" v-if="!isConfirmPasswordCorrect">
                    Confirm password does not match password
                </div>
                <div class="message is-error" v-if="registerErrorMessage">
                    {{ registerErrorMessage }}
                </div>
                <div class="message is-success" v-if="isRegisterSuccess">
                    User registered
                </div>
                <button type="button" class="is-secondary" @click='register'>
                    <div class="" v-if="isRegistering">
                        <span class="fa fa-spin fa-cog"></span> Registering
                    </div>
                    <div class="" v-else>
                        Register
                    </div>
                </button>
            </form>
        </div>
        <div class="dropdown login-control" v-else>
            <div class="dropdown-header">
                <span class="fa fa-user"></span> {{ username }}
            </div>
            <ul class="dropdown-list">
                <li class="dropdown-item" v-if="username == 'admin'">
                    <a class="dropdown-item-link" href="admin">Admin</a>
                </li>
                <li class="dropdown-item">
                    <a class="dropdown-item-link" href="http://google.com">Feedback</a>
                </li>
                <li class="dropdown-item">
                    <button v-on:click="logout">Logout</button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script type="text/javascript">
import ramda from 'ramda'

export default {
    computed: {
        username() {
            return this.session ? this.session.username : ''
        },
        isLoggedIn() {
            return this.session ? true : false
        },
        isConfirmPasswordCorrect() {
            return this.registerCredential.confirmPassword == null || this.registerCredential.password == this.registerCredential.confirmPassword
        }
    },
    data: function () {
        return {
            registerCredential: {
                fullname: null,
                username: null,
                password: null,
                confirmPassword: null
            }
        }
    },
    methods: {
        login() {
            this.$dispatch('login', this.loginCredential)
        },
        logout() {
            this.$dispatch('logout')
        },
        register() {
            this.$dispatch('register', this.registerCredential)
        }
    },
    props: [
        'session',
        'isLoggingIn',
        'loginCredential',
        'isRegistering',
        'isRegisterSuccess',
        'registerErrorMessage'
    ]
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

.dropdown-header {
    margin: auto;
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
    flex-direction: column;
    flex: 0 0 auto;
    overflow: hidden;
    padding: 0;
    max-height: 0em;
    transition: all .3s cubic-bezier(0.680, 0.010, 0.090, 0.900);
}

.dropdown-item:hover {
    background: whitesmoke;
}

.dropdown:hover .dropdown-item {
    padding: .5em;
    max-height: 4em;
}

.dropdown-item-link {

}

.login-control {
    display: flex;
    flex: 1;
    align-items: center;
    min-height: 1.6em;
}

.login-control-item {
    margin: auto;
}

#login-form, #register-form {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 1em;
}

.separator {
    font-weight: lighter;
    font-size: 1.5em;
}

.error-message {
    width: 100%;
    font-size: .8em;
    color: tomato;
}
</style>
