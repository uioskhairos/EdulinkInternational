<template>
  <!-- Login Modal -->
  <div v-show="this.$store.state.email == null" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" style="text-align: center">Login</h3>
        </div>
        <div class="modal-body">
          <form @submit="login" action="/dashboard" method="post">
            <div class="form-group has-feedback">
              <label for="loginEmail">Email Address</label>
              <input
                type="email"
                name="email"
                v-model="loginEmail"
                required
                class="form-control"
              />
              <span
                class="glyphicon glyphicon-envelope form-control-feedback"
              ></span>
            </div>
            <div class="form-group has-feedback">
              <label for="loginPassword">Your Password</label>
              <input
                type="password"
                v-model="loginPassword"
                required
                class="form-control"
              />
              <span
                class="glyphicon glyphicon-lock form-control-feedback"
              ></span>
            </div>
            <button
              class="btn btn-primary btn-block"
              color="primary"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
const fb = require("@/firebaseConfig.js");
export default {
  name: "agentSignup",
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
    };
  },

  methods: {
    login: function (e) {
      fb.auth
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then(
          (user) => {
            // alert(`You are logged in as ${this.loginEmail}`)
            window.location.replace("/agent/dashboard");
          },
          (err) => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
  },
};
</script>