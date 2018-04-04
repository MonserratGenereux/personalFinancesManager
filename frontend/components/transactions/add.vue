<template lang="html">
  <div class="add">
      <div class="col-md-6 offset-3 add-form">
          <h1>Add Transaction</h1>
          <b-form @submit="onCalculate" @reset="onReset" v-if="show" class="form">
              <b-form-group id="exampleInputGroup1"
                            label="Payment method"
                            label-for="exampleInput1">
                <b-form-select id="exampleInput1"
                              :options="metodos"
                              required
                              v-model="form.method">
                </b-form-select>
              </b-form-group>
              <b-form-group label="Select an action">
                  <b-form-radio-group id="radios2" v-model="form.action" :options="options" name="radioSubComponent">
                  </b-form-radio-group>
            </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Amount:"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                           type="number"
                           v-model="form.amount"
                           required
                           placeholder="Enter the amount">
            </b-form-input>
          </b-form-group>
          <div class="buttons">
              <div class="login-button">
                  <b-button id="submit" class="btn btn-default" type="submit">Submit</b-button>

              </div>
              <div class="reset-button">
                  <b-button id="reset" type="reset" variant="danger">Reset</b-button>

              </div>
          </div>
        </b-form>
      </div>
      <div class="login-button">
          <b-button v-on:click="back" id="back" class="btn btn-default" type="submit">Go Back</b-button>

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
var transactionsRef = db.ref('transaction')
var paymentsRef = db.ref('payments')

export default {
  data () {
      this.metodos = []
    return {
        metodos: [],
        form: {
          method: '',
          action: '',
          amount: '',
          userId: ''
        },
      options: [
        { text: 'deposit', value: 'deposit' },
        { text: 'withdraw', value: 'withdraw' }
      ],
      show: true
    }
  },
  mounted () {
      console.log('entro al created');
      var metodos2 = []

      paymentsRef.orderByChild("userId").equalTo('JsgwgFjLzZWefnO6Aak2Wybe7Wz1').on("child_added",function(snapshot) {
          metodos2.push(snapshot.child("alias").val());
      })


      // for (var i = 0; i < metodos2.length; i++) {
      //     console.log('entro al for');
      //     this.metodos.push(metodos2[i]);
      // }

      this.metodos = metodos2;
      console.log('thismethods', this.metodos);
   },
  methods: {
      back (evt){
          evt.preventDefault()
          window.location = '../dashboard';
      },
    onCalculate (evt){
        evt.preventDefault()
        console.log('ENTREEEEEEEEEEE');
        var pay, key
        paymentsRef.orderByChild("alias").equalTo(this.form.method).on("child_added",function(snapshot) {
            console.log('entre al snapshot');
            pay = snapshot.child("amount").val();
            key = snapshot.key
            console.log('pay', pay);
        })
        if(this.form.action == 'withdraw'){
            pay -= this.form.amount;
        }else {
            pay = +pay + +this.form.amount;
        }
        console.log('pay', pay);

        var updates = {};
        updates['/payments/' + key + '/amount'] = pay;

        console.log('nuevo pay', pay);
        if (this.form) {
            transactionsRef.push({
                method: this.form.method,
                amount: this.form.amount,
                action: this.form.action,
                userId: localStorage.getItem('user-id')
            })
        }
        this.form.method = '';
        this.form.amount = '';
        this.form.action = '';

        // window.location = '../dashboard';
        return db.ref().update(updates);
    },
    onSubmit (evt) {
        evt.preventDefault()

    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.method = '';
      this.form.amount = '';
      this.form.action = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<style lang="css">
h1{
    color: rgb(119, 149, 199);
    padding-left: 140px;
    padding-top: 20px;
    font-family: "Palatino Linotype", cursive, sans-serif;
    font-weight: bold;
    font-size: 50px;
}
.form{
    padding-bottom: 50px;
}
.add-form{
    margin-top: 50px;
    background-color: rgba(215, 225, 234,0.7);
}
.add{
    height: 800px;
}
.buttons{
    padding-left: 200px;
    padding-top: 20px;
}
#reset{
    background-color: rgba(255,255,255,0.5);
    color: rgba(198, 6, 6, 0.8);
    border-color: rgba(215, 225, 234,0);
}
.reset-button{
    padding-left: 120px;
    margin-top: -37px;
}
#submit{
    background-color: rgba(255,255,255,0.5);
    color: rgba(6, 92, 198, 0.8);
    border-color: rgba(215, 225, 234,0);
}
#back{
    margin-left: 550px;
    background-color: rgba(255,255,255,0.5);
    color: rgba(6, 92, 198, 0.8);
    border-color: rgba(6, 92, 198, 0.8);
}
</style>
