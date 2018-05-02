<template lang="html">
    <div class="all-container">
        <div class="row">
            <div class="col-md-12 all-info">
                <hr/>
                <div class="info">
                    <allPayments/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import allPayments from '~/components/payments/index'

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
    components: {
        allPayments,
    },
    methods: {
      addPayment () {
          window.location = '../payments/add';
      },
      addTransaction () {
          window.location = '../transactions/add';
      }
  },
  firebase: {
      payments: paymentsRef.orderByChild("userId").equalTo('JsgwgFjLzZWefnO6Aak2Wybe7Wz1')
  }
}
</script>

<style lang="css">
.info{
    padding-top: 10px;
    /* background-color: rgba(215, 225, 234,0.7); */
    padding-left: 50px;
    width: 1200px;
}
.options{
    padding-top: 10px;
    padding-left: 100px;
    width: 350px;
    background-color: rgba(215, 225, 234, 0.7);
}
.all-info{
    padding-left: 50px;
}
.all-container{
    height: 590px;
}
</style>
