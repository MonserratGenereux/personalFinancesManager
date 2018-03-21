<template lang="html">
  <div class="add">
      <div class="col-md-6 offset-3 add-form">
          <h1>Add Transaction</h1>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
              <b-form-group id="exampleInputGroup1"
                            label="Payment"
                            label-for="exampleInput1">
                <b-form-select id="exampleInput1"
                              :options="methods"
                              required
                              v-model="payment.method">
                </b-form-select>
              </b-form-group>
              <b-form-group label="Radios using sub-components">
                  <b-form-radio-group id="radios2" v-model="selected" name="radioSubComponent">
                    <b-form-radio value="deposit">Deposit</b-form-radio>
                    <b-form-radio value="withdraw">Withdraw</b-form-radio>
                  </b-form-radio-group>
            </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Amount:"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                           type="number"
                           v-model="payment.amount"
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
  data () {
    return {
        selected: 'deposit',
      options: [
        { text: 'deposit', value: 'deposit' },
        { text: 'withdraw', value: 'withdraw' }
    ],
      payment: {
        amount: '',
        method: null
      },
      methods: [
        { text: 'Select One', value: null },
        'Credit Card', 'Debit Card', 'Cash'
        //aqui van todas las tarjetas con el id del cliente
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
        evt.preventDefault()
        if (this.form) {
            paymentsRef.push({
                method: this.form.method,
                bank: this.form.bank,
                alias: this.form.alias,
                amount: this.form.amount,
                dueDate: this.form.dueDate,
                bankNumber: this.form.bankNumber
            })
        }
        this.form.method = null;
        this.form.bank = null;
        this.form.alias = '';
        this.form.amount = '';
        this.form.dueDate = '';
        this.form.bankNumber = '';
        window.location = '../dashboard';
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.method = null;
      this.form.bank = null;
      this.form.alias = '';
      this.form.amount = '';
      this.form.dueDate = '';
      this.form.bankNumber = '';
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
</style>
