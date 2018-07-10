import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'julianna-vue-todo',
  databaseURL: 'https://julianna-vue-todo.firebaseio.com'
})
export const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})
