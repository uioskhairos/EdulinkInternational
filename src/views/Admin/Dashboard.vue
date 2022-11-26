<template>
  <v-card v-show="role == 'admin'">
    <v-tabs v-model="tab" grow>
      <v-tab href="#tab-1"> Students </v-tab>
      <v-tab href="#tab-3"> Agents </v-tab>
      <v-tabs-items v-model="tab" touchless>
        <v-tab-item value="tab-1" id="tab-1">
          <v-row>
            <v-col>
              <h3 class="warning font-weight-bold">Students</h3>
              <router-link to="/admin/cashins"> <span style="font-size: 20px">View Payments</span></router-link>
              <v-card-title>
                <v-text-field v-model="searchStudents" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
              </v-card-title>
              <v-data-table :headers="studentHeaders" :items="students" :items-per-page="20" :search="searchStudents"></v-data-table>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item value="tab-2" id="tab-2">
          <v-card>
            <br />
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-3" id="tab-3">
          <v-row>
            <v-col>
              <h3 class="warning font-weight-bold">Agents</h3>
              <router-link to="/admin/cashouts"> <span style="font-size: 20px">View Cashouts</span></router-link>
              <v-card-title>
                <v-text-field v-model="searchAgents" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
              </v-card-title>
              <v-data-table :headers="agentHeaders" :items="agents" :items-per-page="20" :search="searchAgents"></v-data-table>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
import moment from "moment";
const fb = require("@/firebaseConfig.js");
export default {
  name: "dashboard",
  data() {
    return {
      tab: null,
      role: this.$store.state.role,
      searchStudents: "",
      searchAgents: "",

      studentHeaders: [
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
          text: "No, Street, Barangay",
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
      students: [],
      agentHeaders: [
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
      agents: [],
    };
  },
  methods: {
    checkRole: function () {
      if (this.role == "agent") {
        window.location.replace("/agent/dashboard");
      }
      if (this.role == "sub-agent") {
        window.location.replace("/agent/dashboard");
      }
      if (this.role == "branch") {
        window.location.replace("/agent/dashboard");
      }
      if (this.role == "student") {
        window.location.replace("/dashboard");
      }
      if (this.role == "employee") {
        window.location.replace("/employee/dashboard");
      }
    },
    nextTab(next_tab) {
      this.tab = next_tab;
    },
  },
  created() {
    fb.userData
      .where("role", "==", "student")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.students.push(doc.data());
        });
      });
    fb.userData
      .where("sponsor", "!=", null)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.agents.push(doc.data());
        });
      });
  },
  beforeMount() {
    this.checkRole();
  },
};
</script>

<style>
.v-application .text-start {
  text-align: center !important;
}
</style>
