<template lang="html">
  <div class="dashboard">
      <h3>Hello!</h3>
      <h5>{{userMail}}</h5>
      <b-card no-body>
          <b-tabs card tabs>
            <b-tab title="Cash" active>
                <div v-if="payment.method=='Cash'" v-for="payment in payments" v-bind:info="payment" :key="payment.id">
                    <b-card-group deck class="mb-3">
                        <b-card border-variant="light"
                                header="Cash"
                                class="text-center">
                                <img src="../../assets/cash.png" alt="">
                                <h5>{{payment.alias}}</h5>
                                Available: ${{payment.amount}}
                        </b-card>
                    </b-card-group>
                </div>
            </b-tab>
            <b-tab title="Credit Cards">
                <div v-if="payment.method=='Credit Card'" v-for="payment in payments" v-bind:info="payment" :key="payment.id">
                    <b-card-group deck class="mb-3">
                        <b-card border-variant="light"
                                header="Credit Card"
                                class="text-center">
                                <img v-if="payment.bank=='Santander'" src="../../assets/santander.png" alt="">
                                <img v-if="payment.bank=='Bancomer'" src="../../assets/bancomer.png" alt="">
                                <img v-if="payment.bank=='Banamex'" src="../../assets/banamex.png" alt="">
                                <h5>{{payment.alias}}</h5>
                                <h4>{{payment.bankNumber}}</h4>
                                Available: ${{payment.amount}}
                                <h4>dueDate: {{payment.dueDate}}</h4>
                        </b-card>
                    </b-card-group>
                </div>
            </b-tab>
            <b-tab title="Debit Cards">
                <div v-if="payment.method=='Debit Card'" v-for="payment in payments" v-bind:info="payment" :key="payment.id">
                    <b-card-group deck class="mb-3">
                        <b-card border-variant="light"
                                header="Debit Card"
                                class="text-center">
                                <img v-if="payment.bank=='Santander'" src="../../assets/santander.png" alt="">
                                <img v-if="payment.bank=='Bancomer'" src="../../assets/bancomer.png" alt="">
                                <img v-if="payment.bank=='Banamex'" src="../../assets/banamex.png" alt="">
                                <h5>{{payment.alias}}</h5>
                                <h4>{{payment.bankNumber}}</h4>
                                Available: ${{payment.amount}}
                        </b-card>
                    </b-card-group>
                </div>
            </b-tab>
          </b-tabs>
      </b-card>

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
var userMail = firebase.auth().currentUser


export default {
    data () {
      return {
          userMail
      }
    },
    created: function() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                userMail = user.email
                console.log('userMail', user.email);
            }
        })
    },
    firebase: {
        payments: paymentsRef.orderByChild("userId").equalTo('JsgwgFjLzZWefnO6Aak2Wybe7Wz1')

    }
}
</script>

<style lang="css">
.dashboard{
    width: 650px;
}
img{
    width: 70px;
}
.card{
    background-color: rgba(255,255,255,0.3);
}
h4{
    font-size: 10px;
}
</style>
