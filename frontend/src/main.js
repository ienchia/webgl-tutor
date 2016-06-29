import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

window.onbeforeunload = function (e) {
    e = e || window.event

    var message = 'Apakah Anda yakin untuk keluar? Perubahan yang tidak tersimpan akan hilang.'
    if (e) {
        e.returnValue = message
    }

    return message
}

Vue.use(VueResource)
new Vue({
  el: 'body',
  components: { App }
})
