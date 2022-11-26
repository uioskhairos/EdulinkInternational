<template v-show="role == 'admin'">
  <v-card>
    <v-row>
      <v-col>
        <h3 class="warning font-weight-bold">Pending Cashouts</h3>
        <v-card-title>
          <v-text-field v-model="searchPendingCashout" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table class="text-end" :headers="cashoutHeaders" :items="cashoutsPending" :items-per-page="20" :search="searchPendingCashout"
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

        <h3 class="warning font-weight-bold">Approved Cashouts</h3>
        <v-card-title>
          <v-text-field v-model="searchCompletedCashout" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="cashoutHeaders" :items="cashoutsCompleted" :items-per-page="20" :search="searchCompletedCashout"
          ><template v-slot:[`item.time`]="{ item }">
            {{ formatDate(item.time) }}
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            <v-chip class="success"> ${{ item.amount }} </v-chip>
          </template></v-data-table
        >
        <h3 class="warning font-weight-bold">Declined Cashouts</h3>
        <v-card-title>
          <v-text-field v-model="searchDeclinedCashout" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="cashoutHeaders" :items="cashoutsDeclined" :items-per-page="20" :search="searchDeclinedCashout"
          ><template v-slot:[`item.time`]="{ item }">
            {{ formatDate(item.time) }}
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            <v-chip class="success"> ${{ item.amount }} </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn class="error ma-1" @click="dialogDelete = true"><v-icon small> mdi-delete </v-icon>Delete</v-btn>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this payment?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="closeDelete" text>Cancel</v-btn>
                  <v-btn color="blue darken-1" @click="deleteItem(item)" text>OK</v-btn>
                </v-card-actions>
                <v-alert type="success" v-show="alertDelete" dismissible> Payment deleted. Please refresh the page.</v-alert>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import moment from "moment";
const fb = require("@/firebaseConfig.js");
export default {
  name: "adminCashouts",
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
        { text: "Actions", value: "actions", sortable: false },
      ],
      cashoutsCompleted: [],
      cashoutsPending: [],
      cashoutsDeclined: [],
      alertApprove: false,
      alertDecline: false,
      alertDelete: false,
      dialogApprove: false,
      dialogDecline: false,
      dialogDelete: false,
      searchPendingCashout: "",
      searchCompletedCashout: "",
      searchDeclinedCashout: "",
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
    approveItem(item) {
      fb.tranx
        .where("uid", "==", item.uid)
        .where("amount", "==", item.amount)
        .where("method", "==", item.method)
        .where("status", "==", item.status)
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
        .where("amount", "==", item.amount)
        .where("method", "==", item.method)
        .where("status", "==", item.status)
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
          console.error("Error declining document: ", error);
        });
    },
    deleteItem(item) {
      fb.tranx
        .where("uid", "==", item.uid)
        .where("amount", "==", item.amount)
        .where("method", "==", item.method)
        .where("status", "==", item.status)
        .where("refnum", "==", item.refnum)
        .limit(1)
        .get()
        .then((query) => {
          const thing = query.docs[0];
          thing.ref.delete();
        })
        .then((response) => {
          this.alertDelete = true;
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error deleting document: ", error);
        });
    },
    closeDelete() {
      this.dialogDelete = false;
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
      .where("type", "==", "cashout")
      .where("status", "==", "completed")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cashoutsCompleted.push(doc.data());
        });
      });
    fb.tranx
      .where("type", "==", "cashout")
      .where("status", "==", null)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cashoutsPending.push(doc.data());
        });
      });
    fb.tranx
      .where("type", "==", "cashout")
      .where("status", "==", "declined")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cashoutsDeclined.push(doc.data());
        });
      });
  },
  watch: {
    dialogDecline(val) {
      val || this.closeDecline();
    },
    dialogApprove(val) {
      val || this.closeApprove();
    },
  },
};
</script>

<style>
.v-application .text-start {
  text-align: center !important;
}
</style>
