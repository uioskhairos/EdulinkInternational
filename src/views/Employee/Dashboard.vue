<template>
  <v-card v-show="role == 'employee'">
    <v-card-title class="text-center justify-center">
      <h2 class="font-weight-bold">Agent Dashboard</h2>
    </v-card-title>
    <a v-show="!this.$store.state.emailVerified" @click="verifyEmail">Your email is not yet verified click here to send verification code.</a>
    <v-alert type="success" v-show="alert" dismissible> Verification sent to your email address. </v-alert>
    <v-divider></v-divider>
    <v-row v-show="this.$store.state.status == 'inactive'">
      <v-col>
        <h4 class="font-weight-bold">Activate Account to view Dashboard</h4>
        <router-link to="/agent/activate"><v-btn x-large class="success">Activate NOW (₱100.00)</v-btn></router-link>
      </v-col>
    </v-row>
    <v-row v-show="this.$store.state.status == 'active'">
      <v-col class="col-sm-4">
        <v-avatar size="250">
          <v-img :src="photoURL"></v-img>
        </v-avatar>
        <v-list-item light>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ firstName }} {{ lastName }}
              <v-btn dark color="warning" rounded x-small>{{ role.toUpperCase() }}</v-btn>
            </v-list-item-title>
            <v-card-text>Member since {{ creationTime }}</v-card-text>
            <v-list-item-title
              ><p>Referred by: {{ sponsor }}</p></v-list-item-title
            >
            <v-list-item-title v-show="role == 'agent' || role == 'branch'">
              <div class="title">Refer a Sub-agent:</div>
              <div>{{ testingCode }}</div>
              <div class="btn btn-info text-white copy-btn ml-auto" @click.stop.prevent="copyTestingCode">Copy</div>
              <input type="hidden" id="testing-code" :value="testingCode" />
            </v-list-item-title>
            <v-list-item-title>
              <div class="title">Refer a Student:</div>
              <div>{{ testingCode1 }}</div>
              <div class="btn btn-info text-white copy-btn ml-auto" @click.stop.prevent="copyTestingCode1">Copy</div>
              <input type="hidden" id="testing-code1" :value="testingCode1" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col class="col-sm-8">
        <v-row>
          <v-col class="col-sm-6">
            <v-icon color="success" size="100">mdi-cash-multiple</v-icon>
            <h2 class="font-weight-bold">₱{{ new Intl.NumberFormat().format(balance1 + balance2 + balance3 - cashout) }}.00</h2>
            <h4>Account Balance</h4>
            <h5>
              <router-link to="/agent/finance">More Info</router-link>
            </h5>
          </v-col>
          <v-col class="col-sm-6">
            <v-icon color="warning" size="100">mdi-account-group</v-icon>
            <h2 class="font-weight-bold">
              {{ new Intl.NumberFormat().format(sponsored) }}
            </h2>
            <h4>Referrals</h4>
            <h5>
              <router-link to="/agent/referrals">More Info</router-link>
            </h5>
          </v-col>
          <v-col class="col-sm-6">
            <v-icon color="error" size="100">mdi-cash-refund</v-icon>
            <h2 class="font-weight-bold">₱{{ new Intl.NumberFormat().format(cashout) }}.00</h2>
            <h4>Cashouts</h4>
            <h5>
              <router-link to="/agent/cashout">More Info</router-link>
            </h5>
          </v-col>
          <v-col class="col-sm-6">
            <v-icon color="info" size="100">mdi-cogs</v-icon>
            <h2 class="font-weight-bold">Settings</h2>
            <h5>
              <router-link to="/agent/settings">More Info</router-link>
            </h5>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
const fb = require("@/firebaseConfig.js");
export default {
  name: "agentDashboard",
  data() {
    return {
      role: this.$store.state.role,
      tab: null,
      photoURL: this.$store.state.photoURL,
      creationTime: this.$store.state.creationTime,
      firstName: this.$store.state.firstName,
      lastName: this.$store.state.lastName,
      sponsor: null,
      balance1: null,
      balance2: null,
      balance3: null,
      cashout: null,
      sponsored: null,
      testingCode: "edulink-international.com/signup?id=" + this.$store.state.uid,
      testingCode1: "edulink-international.com?id=" + this.$store.state.uid,
      alert: false,
    };
  },
  methods: {
    checkRole: function () {
      if (this.role == "student") {
        window.location.replace("/dashboard");
      }
      if (this.role == "admin") {
        window.location.replace("/admin/dashboard");
      }
    },
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successfully" : "unsuccessfully";
        alert("Referral link was copied " + msg);
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    copyTestingCode1() {
      let testingCodeToCopy = document.querySelector("#testing-code1");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successfully" : "unsuccessfully";
        alert("Referral link was copied " + msg);
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },
    verifyEmail() {
      fb.auth.currentUser
        .sendEmailVerification()
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
  beforeMount() {
    this.checkRole();
  },
  created: function () {
    fb.tranx
      .where("uid", "==", this.$store.state.uid)
      .get()
      .then((querySnapshot) => {
        const cashouts = querySnapshot.docs.map((doc) => doc.data());
        let sum = 0;
        cashouts.forEach((cashout) => {
          sum += cashout.amount;
        });
        this.cashout = sum;
      });
    fb.userData
      .where("uid", "==", this.$store.state.sponsor)
      .get()
      .then((querySnapshot) => {
        const sponsorData = querySnapshot.docs.map((doc) => doc.data());
        sponsorData.forEach((sponsord) => {
          this.sponsor = sponsord.firstName + " " + sponsord.lastName;
        });
      });
    fb.userData
      .where("referrer", "==", this.$store.state.uid)
      .get()
      .then((querySnapshot) => {
        const referred1 = querySnapshot.docs.map((doc) => doc.data());
        let sum1 = 0;
        referred1.forEach((refer1) => {
          if (refer1.status != null) {
            sum1++;
          }
        });
        if (this.$store.state.role == "agent") {
          this.balance1 = sum1 * 1000;
        } else {
          this.balance1 = sum1 * 500;
        }
      });
    // referrer2
    //fetch a student where referrer is your downline
    //select all agents where sponsor is you
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
    //sponsored agents
    fb.userData
      .where("sponsor", "==", this.$store.state.uid)
      .get()
      .then((querySnapshot) => {
        const sponsors = querySnapshot.docs.map((doc) => doc.data());
        let sum = 0;
        sponsors.forEach((sponsor) => {
          sum++;
        });
        this.sponsored = sum;
      });

    return [this.balance1, this.balance2, this.balance3, this.cashout, this.sponsored, this.sponsor];
  },
};
</script>