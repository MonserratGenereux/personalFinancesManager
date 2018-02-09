<template lang="html">
  <div class="">
      <h1>All Payment Methods</h1>
      <p>Aqui se van a ver bien padre</p>
      {{payments}}
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
var paymentsRef = db.ref('payments')
export default {
    firebase: {
        payments: paymentsRef.limitToLast(25)
    },
}
</script>

<style lang="css">
</style>
