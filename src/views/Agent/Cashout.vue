<template>
  <v-card>
    <v-row>
      <v-col>
        <h3 class="warning font-weight-bold">Cashouts</h3>
        <v-data-table :headers="cashoutHeaders" :items="cashouts" :items-per-page="20"
          ><template v-slot:[`item.time`]="{ item }">
            {{ formatDate(item.time) }}
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            <v-chip class="success"> ${{ item.amount }} </v-chip>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <div v-show="item.status"> {{ item.status }} </div>
            <div v-show="!item.status"> pending </div>
          </template>
          </v-data-table
        >
      </v-col></v-row
    >
    <v-row justify="center" v-show="role == 'agent' || role == 'sub-agent' || role == 'branch'">
      <v-col cols="12" sm="6">
        <h2>
          AVAILABLE FOR CASHOUT:
          <v-btn class="success pb-2" x-large rounded
            ><h2>$ {{ balance1 + balance2 + balance3 - cashout }}</h2></v-btn
          >
        </h2>
        <v-form ref="form">
          <v-card>
            <v-card-text>
              <v-text-field name="amount" ref="amount" v-model="amount" :rules="[() => !!amount || 'This field is required']" :error-messages="errorMessages" label="Amount" type="number" outlined required></v-text-field>
              <v-autocomplete name="method" ref="method" v-model="method" :rules="[() => !!method || 'This field is required']" :error-messages="errorMessages" :items="methods" label="Method of Payment" placeholder="Select ..." outlined required></v-autocomplete>
              <v-text-field name="account" ref="account" v-model="account" :rules="[() => !!account || 'This field is required']" :error-messages="errorMessages" label="Account Number / Email for Paypal" outlined required></v-text-field>
              <v-alert type="success" v-show="alert" dismissible> Submitted! Your cashout is being processed. </v-alert>
              <v-card-actions>
                <v-col class="d-flex align-end flex-column">
                  <v-btn x-large dark color="primary" @click="addCashout" v-bind:disabled="isButtonDisabled">
                    <h4>REQUEST CASHOUT</h4>
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card-text>
          </v-card></v-form
        >
      </v-col>
    </v-row></v-card
  >
</template>
<script>
import moment from "moment";
const fb = require("@/firebaseConfig.js");
export default {
  name: "agentCashout",
  data() {
    return {
      role: this.$store.state.role,
      cashoutHeaders: [
        { text: "User ID", align: "start", value: "uid", sortable: false },
        { text: "Account", value: "account" },
        { text: "Amount", value: "amount" },
        { text: "Mode of Payment", value: "method" },
        { text: "Reference Number", value: "refnum", sortable: false },
        { text: "Time of Deposit", value: "time" },
        { text: "Status", value: "status" },
      ],
      cashouts: [],
      errorMessages: "",
      amount: null,
      account: null,
      method: null,
      methods: ["Paypal", "Stripe", "Cash"],
      isButtonDisabled: false,
      alert: false,
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
    addCashout() {
      if (this.balance1 + this.balance2 + this.balance3 - this.cashout >= this.amount && this.amount!=0) {
        if (this.$refs.form.validate()) {
          fb.tranx
            .add({
              uid: this.$store.state.uid,
              amount: parseInt(this.amount),
              method: this.method,
              account: this.account,
              type: "cashout",
              refnum: Date.now(),
            })
            .then((response) => {
              this.alert = true;
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
          this.isButtonDisabled = true;
          this.$refs.form.reset();
        }
      } else {
        alert("Not enough balance!");
      }
    },
    formatDate(value) {
      return moment(value).format("MM-DD HH:mm:ss A");
    },
  },
  beforeMount() {
    this.checkRole();
  },
  computed: {
    form() {
      return {
        amount: this.amount,
        method: this.method,
        account: this.account,
      };
    },
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
    fb.tranx
      .where("uid", "==", this.$store.state.uid)
      .where("type", "==", "cashout")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cashouts.push(doc.data());
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
