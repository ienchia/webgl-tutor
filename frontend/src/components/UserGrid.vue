<template>
    <table class="gridtable">
        <thead>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Full Name
                </th>
                <th>
                    Username
                </th>
                <th>
                    Password
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td>
                    {{ user.id }}
                </td>
                <td>
                    {{ user.firstName + user.lastName }}
                </td>
                <td>
                    {{ user.username }}
                </td>
                <td>
                    {{ user.password }}
                </td>
                <td>
                    <button @click="deleteUser(user)">X</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button @click="retrieveUsers()">Retrive Users</button>
    <div>
        New User:
        <input type="text" placeholder="Full Name" v-model="newUser.name" />
        <input type="text" placeholder="username" v-model="newUser.username" />
        <input type="text" placeholder="password" v-model="newUser.password" />
        <button @click="addUser(newUser)">Add User</button>
    </div>
</template>

<script>
import request from 'superagent'
export default {
    data: function () {
        return {
            users: [],
            newUser: {
                name: 'Foo Bar',
                username: 'foo@bar.com',
                password: 'foobar'
            }
        }
    },
    methods: {
        retrieveUsers() {
            request
                .get(`http://${process.env.API_URL}/users`)
                .end((err, res) => { this.users = res.body })
        },
        addUser(user) {
            request
                .post(`http://${process.env.API_URL}/users`)
                .send(user)
                .end((err, res) => { if (!err) this.retrieveUsers() })
        },
        deleteUser(user) {
            request
                .delete(`http://${process.env.API_URL}/users/${user.id}`)
                .end((err, res) => { if (!err) this.retrieveUsers() })
        }
    }
}
</script>

<style media="screen">
table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0px;
}
table, th, td
{
    padding: 5px;
    border: 1px solid black;
}
</style>
