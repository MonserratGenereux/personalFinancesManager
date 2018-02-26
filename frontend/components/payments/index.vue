<template lang="html">
  <div class="dashboard">
      <h3>Monserrat Sánchez Genereux</h3>
      <h5>monserratgenereux@gmail.com</h5>
      <b-nav fill tabs>
          <b-nav-item disabled>Cash</b-nav-item>
          <b-nav-item disabled>Credit Cards</b-nav-item>
          <b-nav-item disabled>Debit Cards</b-nav-item>
      </b-nav>

      <div v-for="payment in payments" v-bind:info="payment" :key="payment.id">
          <img v-if="payment.method=='Cash'" src="../../assets/cash.png" alt="">
          <img v-if="payment.bank=='Santander'" src="../../assets/santander.png" alt="">
          <img v-if="payment.bank=='Bancomer'" src="../../assets/bancomer.png" alt="">
          <img v-if="payment.bank=='Banamex'" src="../../assets/banamex.png" alt="">
          alias: {{payment.alias}}
          amount: {{payment.amount}}
          bank: {{payment.bank}}
          dueDate: {{payment.dueDate}}
          bankNumber: {{payment.bankNumber}}
          method: {{payment.method}}
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
var db = firebaseApp.database()
var paymentsRef = db.ref('payments')
var usersRef = db.ref('users')
export default {
    firebase: {
        payments: paymentsRef.limitToLast(25),
        users: usersRef.limitToLast(25)
    },
}
</script>

<style lang="css">
.dashboard{
    height: auto;
}
img{
    width: 50px;
}
</style>
