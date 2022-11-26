<template>
  <v-row justify="center" v-show="this.$store.state.email == null">
    <v-col cols="12" sm="6">
      <v-form ref="form"
        ><v-card>
          <v-card-text>
            <v-text-field name="email" v-model="email" :rules="emailRules" :error-messages="errorMessages" label="E-mail" outlined required></v-text-field>
            <v-alert type="success" v-show="alert" dismissible> Password reset link was successfully sent to your email.</v-alert>
            <v-card-actions>
              <v-btn x-large dark color="error">
                <h4>CANCEL</h4>
              </v-btn>
              <v-spacer></v-spacer>
              <v-col class="d-flex align-end flex-column">
                <v-btn x-large dark color="primary" @click="submit">
                  <h4>RESET PASSWORD</h4>
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card-text>
        </v-card></v-form
      >
    </v-col>
  </v-row>
</template>

<script>
const fb = require("@/firebaseConfig.js");
export default {
  name: "signup",
  data() {
    return {
      email: null,
      errorMessages: "",
      alert: false,
      emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
    };
  },
  methods: {
    submit() {
      fb.auth
        .sendPasswordResetEmail(this.email)
        .then((response) => {
          // Email sent.
          this.alert = true;
          console.log("Email Sent.");
        })
        .catch(function (error) {
          // An error happened.
          alert(error);
        });
    },
  },
  computed: {
    form() {
      return {
        email: this.email,
      };
    },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
  },
};
</script>
