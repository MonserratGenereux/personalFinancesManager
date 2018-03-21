<template>
    <div class="default">
    <div class="navbar">
        <b-navbar toggleable type="light" variant="light">
            <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
            <b-navbar-brand>Finantly <h5>Personal Finances Manager</h5></b-navbar-brand>
            <b-collapse is-nav id="nav_text_collapse">
                <b-navbar-nav>
                    <b-nav-item href="/dashboard">Home</b-nav-item>
                    <b-nav-item href="/users/register">Registro</b-nav-item>
                    <b-nav-item href="/users/login">Login</b-nav-item>
                    <b-nav-item v-on:click="logOut">Logout</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    <div >
            <nuxt/>
    </div>
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



export default {
  methods: {
    logOut (evt) {
        evt.preventDefault();
        firebase.auth().signOut()
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          console.log("Error Msg"  + errorMessage)
          })

          firebase.auth().onAuthStateChanged(user => {
              if(!user) {
                // Vue.localStorage.set('user-id', user.uid)
                window.location = '../users/login';
              }
          })
    }
  }
}
</script>
<style>
.default{
    background: url("/assets/bg.png");
    width: 100%;
    height: 800px;
}
.navbar{
    background-color: rgba(215, 225, 234, 0.5);
}
.bg-light{
    background-color: rgba(255,255,255, 0) !important;
}
.navbar-brand{
    padding-left: 10px;
}
h5{
    font-size: 13px;
    color: rgba(0,0,0,0.5);
}
</style>
