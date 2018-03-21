<template lang="html">
  <div class="welcome">
      <div class="col-md-6 offset-3 register" >
          <h1>Welcome to Finantly</h1>
          <h2>Register</h2>
          <!-- <form class="" action="" method="post">
              First name: <input type="text" name="fname" v-model="form.email"><br>
             Last name: <input type="text" name="lname" v-model="form.password"><br>
             <button type="submit" value="Submit" @click="onSubmit()">enter</button>
          </form> -->
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
          <b-form-group id="exampleInputGroup1"
                        label="Name:"
                        label-for="exampleInput1">
            <b-form-input id="exampleInput1"
                          type="text"
                          v-model="form.name"
                          required
                          placeholder="Your name">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Email:"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                           type="email"
                           v-model="form.email"
                           required
                           placeholder="Enter your email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup3"
                        label="Password"
                        label-for="exampleInput3">
            <b-form-input id="exampleInput3"
                           type="password"
                           v-model="form.password"
                           required
                           placeholder="Enter your password">
            </b-form-input>
          </b-form-group>
          <div class="buttons">
              <div class="register-button">
                  <b-button id="register" class="btn btn-default" type="submit">Register</b-button>

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
import Vue from 'vue'
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
var usersRef = db.ref('users')

export default {
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        show: true
      }
    },
  methods: {

    onSubmit (evt) {
        evt.preventDefault();
        var mail = this.form.email
        var pass = this.form.password
        firebase.auth().createUserWithEmailAndPassword(mail, pass)
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          console.log("Error Msg"  + errorMessage)
          })

          firebase.auth().onAuthStateChanged(user => {
              if(user) {
                //Vue.localStorage.set('user-id', user.uid)
                window.location = '../dashboard';
              }
          })
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.name = '';
      this.form.email = '';
      this.form.password = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<style>
.welcome{
    height: 540px;
}
.register{
    margin-top: 50px;
    background-color: rgba(215, 225, 234,0.7)
}
h1{
    color: rgb(119, 149, 199);
    padding-left: 80px;
    padding-top: 20px;
    font-family: "Palatino Linotype", cursive, sans-serif;
    font-weight: bold;
    font-size: 50px;
}
h2{
    font-family: cursive;
    padding-left: 250px;
    font-size: 30px;
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
#register{
    background-color: rgba(255,255,255,0.5);
    color: rgba(6, 92, 198, 0.8);
    border-color: rgba(215, 225, 234,0);
}
.form{
    padding-bottom: 50px;
}
</style>
