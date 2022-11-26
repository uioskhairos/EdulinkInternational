<template>
  <v-row class="ml-15 mr-15" justify="center" v-show="!this.$store.state.status">
    <v-col class="col-sm-6">
      <v-card
        ><h2>STEP 1</h2>
        <h4 style="text-align: left; padding-left: 20px">
          Deposit a total of ₱100.00 (One Hundred Pesos) in any of the accounts below:
          <br />
          <strong>1. BPI</strong> <br />
          Account Number: 0566615254<br />
          Account Name: Jeffty Fucao<br />
          <strong>2. EastWest Bank</strong><br />
          Account Number: 200025103385<br />
          Account Name: Jeffty Fucao<br />
          <strong>3. GCash</strong><br />
          Mobile Number: 09452909167<br /></h4
      ></v-card>
    </v-col>
    <v-col class="col-sm-6">
      <v-card>
        <h2>STEP 2</h2>
        <h4>After making a deposit, fill out form below:</h4>
        <v-card-text>
          <v-form ref="form">
            <v-autocomplete name="method" ref="method" v-model="method" :rules="[() => !!method || 'This field is required']" :error-messages="errorMessages" :items="methods" label="Method of Payment" placeholder="Select ..." outlined required></v-autocomplete>
            <v-text-field name="refnum" ref="refnum" v-model="refnum" :rules="[() => !!refnum || 'This field is required']" :error-messages="errorMessages" label="Reference Number" outlined required></v-text-field>
            <v-alert type="success" v-show="alert" dismissible> Submitted! Please wait for confirmation. </v-alert>
            <v-card-actions>
              <v-col class="d-flex align-end flex-column">
                <v-btn x-large dark color="success" @click="addCashout" v-bind:disabled="isButtonDisabled">
                  <h4>ACTIVATE ACCOUNT</h4>
                </v-btn>
              </v-col>
            </v-card-actions></v-form
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
const fb = require("@/firebaseConfig.js");
export default {
  name: "agentActivate",
  data() {
    return {
      role: this.$store.state.role,
      errorMessages: "",
      refnum: null,
      method: null,
      methods: ["BPI", "EastWest Bank", "GCash"],
      alert: false,
      isButtonDisabled: false,
    };
  },
  methods: {
    checkRole: function () {
      if (this.role == "student") {
        window.location.replace("/student/dashboard");
      }
      if (this.role == "admin") {
        window.location.replace("/admin/dashboard");
      }
      if (this.role == "employee") {
        window.location.replace("/employee/dashboard");
      }
    },
    addCashout() {
      if (this.$refs.form.validate()) {
        fb.tranx
          .add({
            uid: this.$store.state.uid,
            method: this.method,
            refnum: this.refnum,
            type: "activation",
          })
          .then((response) => {
            this.alert = true;
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
        this.isButtonDisabled = true;
      }
    },
  },
  beforeMount() {
    this.checkRole();
  },
  computed: {
    form() {
      return {
        refnum: this.refnum,
        method: this.method,
      };
    },
  },
};
</script>
