<template>
  <!-- Content Wrapper. Contains page content -->
  <v-card>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Settings
        <small>Account Info</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/agent/dashboard"><i class="fa fa-dashboard"></i> Dashboard</router-link>
        </li>
        <li class="active">Settings</li>
      </ol>
    </section>
    <!-- Main content -->
    <v-form>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-text-field :placeholder="this.$store.state.photoURL" v-model="photoURL" label="Profile Photo URL" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6"> <v-btn @click="update" block x-large dark style="background-color: rgb(0, 102, 204)" v-bind:disabled="isButtonDisabled"> UPDATE </v-btn></v-col></v-row
      >
    </v-form>
    <!-- /.content -->
  </v-card>
  <!-- /.content-wrapper -->
</template>

<script>
import firebase from "firebase/app";
const fb = require("@/firebaseConfig.js");
export default {
  name: "agentSettings",
  data() {
    return {
      email: null,
      photoURL: null,
      isButtonDisabled: false,
      status: null,
    };
  },
  methods: {
    update: function (e) {
      this.isButtonDisabled = true;
      var user = firebase.auth().currentUser;
      if (this.photoURL != null) {
        user
          .updateProfile({
            photoURL: this.photoURL,
          })
          .then(function () {
            // Update successful.
            alert("Photo URL updated!");
          })
          .catch(function (error) {
            // An error happened.
            alert(error);
          });
      }
      // if (this.status != null) {
      //   fb.userData
      //   .where("uid", "==", this.$store.state.uid)
      //   .get()
      //   .then((query) => {
      //     const thing = query.docs[0];
      //     thing.ref.update({ status: this.status });
      //   })
      //   .then((response) => {
      //     this.alertApprove = true;
      //     console.log("Document successfully approved!");
      //   })
      //   .catch(function (error) {
      //     console.error("Error writing document: ", error);
      //   });
      // }
    },
  },
};
</script>
