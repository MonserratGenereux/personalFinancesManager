<template lang="html">
  <div class="add">
      <div class="col-md-6 offset-3 add-form">
          <h1>Add Payment</h1>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
              <b-form-group id="exampleInputGroup1"
                            label="Payment Type:"
                            label-for="exampleInput1">
                <b-form-select id="exampleInput1"
                              :options="methods"
                              required
                              v-model="form.method">
                </b-form-select>
              </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Alias:"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                          type="text"
                          v-model="form.alias"
                          required
                          placeholder="Enter alias">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup3" v-if="form.method == 'Debit Card' || form.method == 'Credit Card'"
                        label="Bank:"
                        label-for="exampleInput3">
            <b-form-select id="exampleInput3"
                          :options="banks"
                          required
                          v-model="form.bank">
            </b-form-select>
          </b-form-group>
          <b-form-group id="exampleInputGroup4" v-if="form.method == 'Debit Card' || form.method == 'Credit Card'"
                        label="Bank Number:"
                        label-for="exampleInput4">
            <b-form-input id="exampleInput4"
                           type="text"
                           v-model="form.bankNumber"
                           required
                           placeholder="Enter Card Number">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup5"
                        label="Inicial Amount:"
                        label-for="exampleInput5">
            <b-form-input id="exampleInput5"
                           type="text"
                           v-model="form.amount"
                           required
                           placeholder="Enter the inicial amount">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup6" v-if="form.method == 'Credit Card'"
                        label="Due Date:"
                        label-for="exampleInput6">
            <b-form-input id="exampleInput6"
                           type="text"
                           v-model="form.dueDate"
                           required
                           placeholder="Enter Card due date">
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
      form: {
        alias: '',
        amount: '',
        bankNumber: '',
        method: null,
        bank: null,
        dueDate: ''
      },
      methods: [
        { text: 'Select One', value: null },
        'Credit Card', 'Debit Card', 'Cash'
      ],
      banks: [
        { text: 'Select One', value: null },
        'Santander', 'Bancomer', 'Banamex'
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
                bankNumber: this.form.bankNumber,
                userId: localStorage.getItem('user-id')
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
      this.form.method = null;
      this.form.bank = null;
      this.form.alias = '';
      this.form.amount = '';
      this.form.dueDate = '';
      this.form.bankNumber = '';
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
