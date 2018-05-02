<template lang="html">
    <div class="row">
        <reminder v-for="payment in reminder_flag" v-bind:info="payment " :key="payment.key"/>

        <div v-if="payments" class="col-md-10 dashboard">
            <h3>Hello!</h3>
            <h5 style="font-size:20px;">{{userMail}}</h5>
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
                                <a href="#" v-on:click="removePayment(payment.alias)" data-toggle="tooltip" data-html="true" title="Delete"><img style="width: 30px; margin-left: 850px;" src="../../assets/delete.png" /></a>
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
                            <a href="#" v-on:click="removePayment(payment.alias)" data-toggle="tooltip" data-html="true" title="Delete"><img style="width: 30px; margin-left: 850px;" src="../../assets/delete.png" /></a>
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
                        <a href="#" v-on:click="removePayment(payment.alias)" data-toggle="tooltip" data-html="true" title="Delete"><img style="width: 30px; margin-left: 850px;" src="../../assets/delete.png" /></a>
                    </b-card>
                </b-card-group>
            </div>
        </b-tab>
    </b-tabs>
    </b-card>
    </div>
    <div v-if="payments" class="col-md-2">
        <hr/>
        <div class="options">
            <b-nav vertical>
                <b-nav-item v-on:click="addPayment()" >Add Payment</b-nav-item>
                <b-nav-item v-on:click="addTransaction()" >Add Transaction</b-nav-item>
                <b-nav-item v-if="transactions.length > 0">
                    <download-excel
                    :data   = "transactions"
                    :fields = "json_fields"
                    type    = "csv"
                    :name    = "fileName">
                    Export CSV
                </download-excel>
            </b-nav-item>
            </b-nav>
        </div>
        <div class="statistics">
            <hr/>
            <h3 v-if="payments">You have {{payments.length}} payment methods</h3>
            <hr/>
            <h3 v-if="transactions">You have done {{transactions.length}} transactions</h3>
            <hr/>
        </div>
    </div>
    </div>

</template>

<script>
import firebase from 'firebase'
import reminder from '~/components/reminder'
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
var transactionsRef = db.ref('transaction')
var userMail = firebase.auth().currentUser
var moment = require('moment')

export default {
    data () {
        this.file_name = moment().format('MM_D_YYYY'),
        this.today = moment().format('D'),
        this.keytem = '.key'
        return {
            transactions: 0,
            reminder_flag: [],
            userMail: 'loading',
            json_fields: {
                'Action': 'action',
                'Amount': 'amount',
                'Method': 'method',
            },
            fileName: this.file_name + ".csv",
            json_meta: [
                [
                    {
                        'key': 'charset',
                        'value': 'utf-8'
                    }
                ]
            ],
        }
    },
    components: {
       reminder
    },
    methods: {
      addPayment () {
          window.location = '../payments/add';
      },
      addTransaction () {
          window.location = '../transactions/add';
      },
      setNotifications: function (paymentsArray) {
          let reminderObject = []
          for (var index in paymentsArray) {
            if (paymentsArray[index].dueDate != "" && paymentsArray[index].dueDate == this.today) {
              reminderObject.push(paymentsArray[index])
            }
          }
          this.reminder_flag = reminderObject
      },
      removePayment (paymentAlias) {
          paymentsRef.orderByChild("alias").equalTo(paymentAlias).on("child_added",function(snapshot) {
              if(confirm('Are you sure?')){
                paymentsRef.child(snapshot.key).remove();
              }

          })
      }
  },
    mounted: function() {
        if (this.payments != "") {
            this.setNotifications(this.payments)
        }
        else {
            setTimeout(this.setNotifications.bind(null, this.payments), 1000);
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.userMail = user.email
            }else{
                this.userMail = 'no user'
            }
        })
    },
    created: function() {

    },
    firebase: function () {
        var userIdNice = localStorage.getItem('user-id')
        return {
          payments: paymentsRef.orderByChild("userId").equalTo(userIdNice),
          transactions: transactionsRef.orderByChild("userId").equalTo(userIdNice)
        }
    }
}
</script>

<style lang="css">
.dashboard{
    width: 650px;
    background-color: rgba(215, 225, 234,0.7);
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
h3{
    font-size: 20px;
}
.statistics{
    width: 200%;
}
.options{
    padding-top: 10px;
    padding-left: 100px;
    width: 350px;
    background-color: rgba(215, 225, 234, 0.7);
}
</style>
