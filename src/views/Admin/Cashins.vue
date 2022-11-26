<template v-show="this.$store.state.admin">
  <v-card>
    <br />
    <v-dialog v-model="dialog" width="650">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="primary" style="align: right" large v-bind="attrs" v-on="on"><h3 class="pb-2">CREATE AN INVOICE</h3></v-btn>
      </template>

      <v-row>
        <v-form ref="form"
          ><v-card>
            <v-card-text>
              <v-col class="col-sm-6">
                <v-text-field name="uid" ref="uid" v-model="uid" :rules="[() => !!uid || 'This field is required']" :error-messages="errorMessages" label="User ID" outlined required></v-text-field>
              </v-col>
              <v-col class="col-sm-6">
                <v-text-field name="amount" ref="amount" type="number" v-model="amount" :rules="[() => !!amount || 'This field is required']" :error-messages="errorMessages" label="Amount" outlined required></v-text-field>
              </v-col>

              <v-card-actions>
                <v-col class="col-sm-6 d-flex align-start flex-column">
                  <v-btn x-large dark color="error" @click="dialog = false">
                    <h4>CANCEL</h4>
                  </v-btn></v-col
                >
                <v-col class="col-sm-6">
                  <v-btn x-large dark color="primary" @click="addCashin" v-bind:disabled="isButtonDisabled" block>
                    <h4>CREATE</h4>
                  </v-btn>
                  <v-alert type="success" v-show="alert" dismissible> Invoice Created. Please refresh the page.</v-alert>
                </v-col>
              </v-card-actions>
            </v-card-text>
          </v-card></v-form
        >
      </v-row>
    </v-dialog>

    <v-row>
      <v-col>
        <h3 class="warning font-weight-bold">Pending Payments</h3>
        <v-card-title>
          <v-text-field v-model="searchPendingCashin" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table class="text-end" :headers="cashinHeaders" :items="cashinsPending" :items-per-page="20" :search="searchPendingCashin"
          ><template v-slot:[`item.time`]="{ item }">
            {{ formatDate(item.time) }}
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            <v-chip class="success"> ${{ item.amount }} </v-chip>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-btn class="success ma-1" @click="dialogApprove = true"><v-icon small> mdi-check </v-icon>Approve</v-btn>
            <v-btn class="error ma-1" @click="dialogDecline = true"><v-icon small> mdi-close </v-icon>Decline</v-btn>
            <v-dialog v-model="dialogApprove" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to approve this payment?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="closeApprove" text>Cancel</v-btn>
                  <v-btn color="blue darken-1" @click="approveItem(item)" text>OK</v-btn>
                </v-card-actions>
                <v-alert type="success" v-show="alertApprove" dismissible> Payment Approved. Please refresh the page.</v-alert>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDecline" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to decline this payment?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="closeDecline" text>Cancel</v-btn>
                  <v-btn color="blue darken-1" @click="declineItem(item)" text>OK</v-btn>
                </v-card-actions>
                <v-alert type="success" v-show="alertDecline" dismissible> Payment declined. Please refresh the page.</v-alert>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>

        <h3 class="warning font-weight-bold">Approved Payments</h3>
        <v-card-title>
          <v-text-field v-model="searchCompletedCashin" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="cashinHeaders" :items="cashinsCompleted" :items-per-page="20" :search="searchCompletedCashin"
          ><template v-slot:[`item.time`]="{ item }">
            {{ formatDate(item.time) }}
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            <v-chip class="success"> ${{ item.amount }} </v-chip>
          </template></v-data-table
        >
        <h3 class="warning font-weight-bold">Declined Payments</h3>
        <v-card-title>
          <v-text-field v-model="searchDeclinedCashin" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="cashinHeaders" :items="cashinsDeclined" :items-per-page="20" :search="searchDeclinedCashin"
          ><template v-slot:[`item.time`]="{ item }">
            {{ formatDate(item.time) }}
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            <v-chip class="success"> ${{ item.amount }} </v-chip>
          </template></v-data-table
        >
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import moment from "moment";
const fb = require("@/firebaseConfig.js");
export default {
  name: "adminCashins",
  data() {
    return {
      role: this.$store.state.role,
      cashinHeaders: [
        { text: "User ID", align: "start", value: "uid", sortable: false },
        { text: "Amount", value: "amount" },
        { text: "Mode of Payment", value: "method" },
        { text: "Reference Number", value: "refnum", sortable: false },
        { text: "Time of Deposit", value: "time" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      cashinsCompleted: [],
      cashinsPending: [],
      cashinsDeclined: [],
      errorMessages: "",
      formHasErrors: false,
      amount: null,
      uid: null,
      alert: false,
      alertApprove: false,
      alertDecline: false,
      isButtonDisabled: false,
      dialog: false,
      dialogApprove: false,
      dialogDecline: false,
      searchPendingCashin: "",
      searchCompletedCashin: "",
      searchDeclinedCashin: "",
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
    formatDate(value) {
      return moment(value).format("MM-DD HH:mm:ss A");
    },
    addCashin() {
      if (this.$refs.form.validate()) {
        fb.tranx
          .add({
            uid: this.uid,
            amount: parseInt(this.amount),
            method: "cash",
            status: "pending",
            type: "cashin",
            refnum: Date.now(),
            time: Date.now(),
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
    },
    approveItem(item) {
      fb.tranx
        .where("uid", "==", item.uid)
        .where("refnum", "==", item.refnum)
        .limit(1)
        .get()
        .then((query) => {
          const thing = query.docs[0];
          thing.ref.update({ status: "completed" });
        })
        .then((response) => {
          this.alertApprove = true;
          console.log("Document successfully approved!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    declineItem(item) {
      fb.tranx
        .where("uid", "==", item.uid)
        .where("refnum", "==", item.refnum)
        .limit(1)
        .get()
        .then((query) => {
          const thing = query.docs[0];
          thing.ref.update({ status: "declined" });
        })
        .then((response) => {
          this.alertDecline = true;
          console.log("Document successfully declined!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    closeDecline() {
      this.dialogDecline = false;
    },
    closeApprove() {
      this.dialogApprove = false;
    },
  },
  beforeMount() {
    this.checkRole();
  },

  created() {
    fb.tranx
      .where("type", "==", "cashin")
      .where("status", "==", "completed")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cashinsCompleted.push(doc.data());
        });
      });
    fb.tranx
      .where("type", "==", "cashin")
      .where("status", "==", null)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cashinsPending.push(doc.data());
        });
      });
    fb.tranx
      .where("type", "==", "cashin")
      .where("status", "==", "declined")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cashinsDeclined.push(doc.data());
        });
      });
  },
  computed: {
    form() {
      return {
        method: this.method,
        uid: this.uid,
        amount: this.amount,
      };
    },
  },
  watch: {
    dialogDecline(val) {
      val || this.closeDecline();
    },
    dialogApprove(val) {
      val || this.closeApprove();
    },
    name() {
      this.errorMessages = "";
    },
  },
};
</script>

<style>
.v-application .text-start {
  text-align: center !important;
}
</style>
