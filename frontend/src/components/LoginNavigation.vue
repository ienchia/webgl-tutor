<template>
    <nav class="login-navigation">
        <div class="login-control controls" v-show="!isLoggedIn">
            <form id="login-form">
                <h3>Login</h3>
                <label>Username</label>
                <input class="control-item" type="text" placeholder="username" v-model="loginCredential.username" />
                <label>Password</label>
                <input class="control-item" type="password" placeholder="password" v-model="loginCredential.password" />
                <div class="message is-error" v-if="loginErrorMessage">
                    <p>
                        {{ loginErrorMessage }}
                    </p>
                </div>
                <button type="button" class="control-item" v-on:click="login">
                    <div class="" v-if="isLoggingIn">
                        <span class="fa fa-spin fa-circle-o-notch"></span> Sedang mencoba masuk
                    </div>
                    <div class="" v-else>
                        Masuk
                    </div>
                </button>
            </form>
            <div class="separator">
                Atau
            </div>
            <form id="register-form">
                <h3>Daftar baru</h3>
                <label>Nama lengkap Anda</label>
                <input class="control-item" type="text" placeholder="Nama Lengkap" v-model="registerCredential.fullname" />
                <label>Username yang diinginkan</label>
                <input class="control-item" type="text" placeholder="username" v-model="registerCredential.username" />
                <label>Password</label>
                <input class="control-item" type="password" placeholder="password" v-model="registerCredential.password" />
                <label>Ulangi Password</label>
                <input class="control-item" type="password" placeholder="ulangi password" v-model="registerCredential.confirmPassword" />
                <div class="message is-error" v-if="validationMessages">
                    <p v-for="message in validationMessages">
                        {{ message }}
                    </p>
                </div>
                <div class="message is-error" v-if="registerErrorMessage">
                    {{ registerErrorMessage }}
                </div>
                <div class="message is-success" v-if="isRegisterSuccess">
                    Anda telah terdaftar
                </div>
                <button type="button" class="is-secondary"
                    @click="register"
                    :disabled="usernameValidMessage || passwordValidMessage">
                    <div class="" v-if="isRegistering">
                        <span class="fa fa-spin fa-cog"></span> Sedang mendaftarkan Anda
                    </div>
                    <div class="" v-else>
                        Daftarkan
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

import check from '../../../common/lib/validate.js'

export default {
    computed: {
        username() {
            return this.session ? this.session.username : ''
        },
        isLoggedIn() {
            return this.session ? true : false
        },
        validationMessages() {
            const usernameValidMessage
            = check.username(this.registerCredential.username)
            const passwordValidMessage
            = check.password(
                this.registerCredential.password,
                this.registerCredential.confirmPassword
            )
            const fullnameValidMessage
            = check.fullname(this.registerCredential.fullname)
            return [
                fullnameValidMessage,
                usernameValidMessage,
                passwordValidMessage
            ]
            .map(
                error => error.err ? error.message : null
            )
            .filter(
                msg => msg != null
            )
        },
        passwordValidMessage() {
            const error = check.password(
                this.registerCredential.password,
                this.registerCredential.confirmPassword
            )

            if (error.err) {
                return error.message
            }
        }
    },
    data: function () {
        return {
            registerCredential: {
                fullname: '',
                username: '',
                password: '',
                confirmPassword: ''
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
        'loginErrorMessage',
        'isRegistering',
        'isRegisterSuccess',
        'registerErrorMessage'
    ]
}

</script>

<style>
.login-navigation {
    display: flex;
    flex: 1;
}

.dropdown {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
}

.dropdown-header {
    margin: auto 0;
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
    align-items: flex-end;
    min-height: 1.6em;
}

.login-control.controls {
    align-items: center;
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
