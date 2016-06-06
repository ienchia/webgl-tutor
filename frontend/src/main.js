import Vue from 'vue'
import css from '../css/style.css'
import App from './App.vue'
import LessonNavigation from './components/LessonNavigation.vue'
import LoginNavigation from './components/LoginNavigation.vue'

new Vue({
  el: 'body',
  components: { App, LessonNavigation, LoginNavigation }
})
