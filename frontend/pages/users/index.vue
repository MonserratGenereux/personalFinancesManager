<template>
    <div>
        <input
        v-model.trim="newTodoText"
        @keyup.enter="addTodo"
        placeholder="Add new todo"
        >
        <ul>
            <li v-for="(todo, index) in todos" :key='index'>
              <input
                :value="todo.text"
                @input="updateTodoText(todo, $event.target.value)"
              >
              <button @click="removeTodo(todo)">X</button>
            </li>
        </ul>
        {{todos}}
    </div>
</template>

<script>
import firebase from 'firebase'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDGDCny8Rw_rEhM7NlwazhVfjgfPyTC77U",
    authDomain: "personal-finances-manager.firebaseapp.com",
    databaseURL: "https://personal-finances-manager.firebaseio.com",
    projectId: "personal-finances-manager",
    storageBucket: "personal-finances-manager.appspot.com",
    messagingSenderId: "969076333881"
}
var firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
var db = firebaseApp.database()
var todosRef = db.ref('todos')
export default {
    data () {
        return{
            newTodoText: ''
        }
    },
    firebase: {
        todos: todosRef.limitToLast(25)
    },
    methods: {
        addTodo: function () {
            if (this.newTodoText) {
                todosRef.push({
                    text: this.newTodoText
                })
                this.newTodoText = ''
            }
        },
        updateTodoText: function (todo, newText) {
            todosRef.child(todo['.key']).child('text').set(newText)
        },
        removeTodo: function (todo) {
            todosRef.child(todo['.key']).remove()
        }
    }
}
</script>
