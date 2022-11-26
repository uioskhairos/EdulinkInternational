<template>
  <!-- Content Wrapper. Contains page content -->
  <v-card v-show="role == 'agent' || role == 'sub-agent' || role == 'branch'">
    <h2>
      Total Earned From Direct Referrals: <span style="color: green; font-weight: bold">$ {{ balance1 }}</span>
    </h2>
    <h2 v-show="role == 'agent' || role == 'branch'">
      Total Earned From 2nd Level: <span style="color: green; font-weight: bold">$ {{ balance2 }}</span>
    </h2>
    <h2 v-show="role == 'agent'">
      Total Earned From 3rd Level: <span v-show="balance3 != null" style="color: green; font-weight: bold">$ {{ balance3 }}</span
      ><span v-show="balance3 == null" style="color: green; font-weight: bold">$ {{ 0 }}</span>
    </h2>
    <h2>
      Total Cashouts: <span style="color: green; font-weight: bold">$ {{ cashout }}</span>
    </h2>
    <h2>
      Available Balance: <span style="color: green; font-weight: bold">$ {{ balance1 + balance2 + balance3 - cashout }}</span>
    </h2>
  </v-card>
</template>
<script>
const fb = require("@/firebaseConfig.js");
export default {
  name: "agentCashout",
  data() {
    return {
      role: this.$store.state.role,
      cashout: null,
      balance1: null,
      balance2: null,
      balance3: null,
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
  },
  beforeMount() {
    this.checkRole();
  },
  mounted() {
    //cashout
    this.$store.state.cashout
      .then((result) => {
        this.cashout = result;
      })
      .catch(function (error) {
        console.error(error);
      });
    //total level1
    this.$store.state.balance1
      .then((result1) => {
        this.balance1 = result1;
      })
      .catch(function (error) {
        console.error(error);
      });
    //balance for level 2 and 3
    fb.userData
      .where("sponsor", "==", this.$store.state.uid)
      .get()
      .then((querySnapshot) => {
        const sponsoredData = querySnapshot.docs.map((doc) => doc.data());
        //foreach agents lookup database where referrer is the agent you referred and status is not null foreach student++ *500 if agent *300 if branch
        sponsoredData.forEach((sponsored) => {
          fb.userData
            .where("referrer", "==", sponsored.uid)
            .get()
            .then((querySnapshot) => {
              const sponsoredData1 = querySnapshot.docs.map((doc) => doc.data());
              let sum2 = 0;
              sponsoredData1.forEach((sponsored1) => {
                if (sponsored1.status != null) {
                  sum2++;
                }
              });
              if (this.$store.state.role == "agent") {
                this.balance2 = sum2 * 500;
              }
              if (this.$store.state.role == "branch") {
                this.balance2 = sum2 * 300;
              } else {
                this.balance2 = 0;
              }
            });
          //compute balance 3rd level
          fb.userData
            .where("sponsor", "==", sponsored.uid)
            .get()
            .then((querySnapshot) => {
              const sponsoredData2 = querySnapshot.docs.map((doc) => doc.data());
              let sum3 = 0;
              sponsoredData2.forEach((sponsored2) => {
                //for each DL check if they have a referred student
                fb.userData
                  .where("referrer", "==", sponsored2.uid)
                  .get()
                  .then((querySnapshot) => {
                    const sponsoredData3 = querySnapshot.docs.map((doc) => doc.data());
                    sponsoredData3.forEach((sponsored3) => {
                      // sum3++
                      if (sponsored3.status != null) {
                        sum3++;
                      }
                    });
                    if (this.$store.state.role == "agent") {
                      this.balance3 = sum3 * 200;
                    } else {
                      this.balance3 = 0;
                    }
                  });
              });
            });
        });
      });
  },
};
</script>
