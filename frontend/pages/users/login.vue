<template lang="html">
  <div class="login">
      <div class="col-md-6 offset-3 login-form" >
          <h1>Welcome to Finantly</h1>
          <h2>Login</h2>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="form">
          <b-form-group id="exampleInputGroup1"
                        label="Email:"
                        label-for="exampleInput1">
            <b-form-input id="exampleInput1"
                           type="email"
                           v-model="form.email"
                           required
                           placeholder="Enter your email">
            </b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup2"
                        label="Password"
                        label-for="exampleInput2">
            <b-form-input id="exampleInput2"
                           type="password"
                           v-model="form.password"
                           required
                           placeholder="Enter your password">
            </b-form-input>
          </b-form-group>
          <div class="buttons">
              <div class="login-button">
                  <b-button id="login" class="btn btn-default" type="submit">Login</b-button>

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
        firebase.auth().signInWithEmailAndPassword(mail,pass)
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          alert(errorMessage);

          console.log("Error Msg"  + errorMessage)
          })

          firebase.auth().onAuthStateChanged(user => {
              if(user) {
                localStorage.setItem('user-id', user.uid)
                window.location = '../dashboard';
              }
          })
    },
    onReset (evt) {
      evt.preventDefault();
      this.form.email = '';
      this.form.password = '';
      this.show = false;
      this.$nextTick(() => { this.show = true });
    }
  }
}
</script>

<style>
.login{
    height: 540px;
}
.login-form{
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
#login{
    background-color: rgba(255,255,255,0.5);
    color: rgba(6, 92, 198, 0.8);
    border-color: rgba(215, 225, 234,0);
}
.form{
    padding-bottom: 50px;
}
</style>
