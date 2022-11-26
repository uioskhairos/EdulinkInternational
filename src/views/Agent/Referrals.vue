<template>
  <v-card>
    <v-row>
      <v-col>
        <h3 class="warning font-weight-bold">Referred Agents</h3>
        <v-data-table :headers="referralHeaders" :items="referrals" :items-per-page="20"></v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import moment from "moment";
const fb = require("@/firebaseConfig.js");
export default {
  name: "agentReferrals",
  data() {
    return {
      role: this.$store.state.role,
      referralHeaders: [
        {
          text: "First Name",
          align: "start",
          value: "firstName",
        },
        {
          text: "Last Name",
          value: "lastName",
        },
        {
          text: "No., Street, Barangay",
          value: "address",
        },
        {
          text: "City/Province",
          value: "city",
        },
        {
          text: "State/Region",
          value: "state",
        },
        {
          text: "Phone Number",
          value: "phone",
        },
        {
          text: "Email",
          value: "email",
        },
      ],
      referrals: [],
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
    formatDate(value) {
      return moment(value).format("MM-DD HH:mm:ss A");
    },
  },
  beforeMount() {
    this.checkRole();
  },
  mounted() {
    fb.userData
      .where("sponsor", "==", this.$store.state.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.referrals.push(doc.data());
        });
      });
  },
};
</script>
<style>
.v-application .text-start {
  text-align: center !important;
}
</style>
