<template>
  <v-card v-show="role == 'student'">
   <a v-show="!this.$store.state.emailVerified" @click="verifyEmail"> <br/> Your email is not yet verified click here to send verification code.</a>
    <v-alert type="success" v-show="alert" dismissible> Verification sent to your email address. </v-alert>
    <v-tabs v-model="tab" grow>
      <v-tab href="#tab-1"> Personal Information </v-tab>
      <!-- <v-tab href="#tab-2"> Submitted Documents </v-tab> -->
      <!-- <v-tab href="#tab-3"> Grades </v-tab> -->
      <v-tab href="#tab-4"> Transactions </v-tab>

      <v-tabs-items v-model="tab" touchless>
        <v-tab-item value="tab-1" id="tab-1">
          <v-card>
            <v-row>
              <v-col class="col-sm-4">
                <v-avatar size="250">
                  <v-img :src="photoURL"></v-img>
                </v-avatar>
                <v-list-item light>
                  <v-list-item-content>
                    <v-list-item-title class="title"> {{ firstName }} {{ lastName }} </v-list-item-title>
                    <v-card-text>Member since {{ creationTime }}</v-card-text>
                    <v-list-item-title>Referred by: {{ referrer }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col class="col-sm-8">
                <div class="col-lg-12">
                  <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Enrollment Information</legend>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="table-responsive hidden-xs">
                          <table class="table table-bordered hidden-xs">
                            <tbody>
                              <tr class="gray">
                                <td class="student-name">
                                  <span class="bold">ID Number</span>
                                </td>
                                <td class="student-name">
                                  <span class="bold">Course &amp; Major</span>
                                </td>
                                <td class="student-name">
                                  <span class="bold">School Year</span>
                                </td>
                                <td class="student-name">
                                  <span class="bold">Payment Status</span>
                                </td>
                              </tr>
                              <tr>
                                <td class="student-name">
                                  <span v-show="this.$store.state.id" class="bold txt-facebook">{{ this.$store.state.id }}</span>
                                  <span v-show="!this.$store.state.id" class="bold txt-facebook">NA</span>
                                </td>
                                <td class="student-name">
                                  <span class="bold txt-facebook">{{ this.$store.state.course }}</span>
                                </td>
                                <td class="student-name">
                                  <span class="bold txt-facebook">2019-2020</span>
                                </td>
                                <td class="student-name">
                                  <p class="bold txt-facebook" v-if="status">
                                    {{ status.toUpperCase() }}
                                  </p>
                                  <p class="bold txt-facebook" v-if="!status">UNREGISTERED</p>
                                  <a class="bold txt-facebook" @click="nextTab('tab-4')">Make a Payment</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="table-responsive visible-xs">
                          <table class="table table-bordered show-xs">
                            <tbody>
                              <tr>
                                <td class="student-name">
                                  <span class="bold">ID Number</span>
                                </td>
                                <td>
                                  <span v-show="this.$store.state.id" class="bold txt-facebook">{{ this.$store.state.id }}</span>
                                  <span v-show="!this.$store.state.id" class="bold txt-facebook">NA</span>
                                </td>
                              </tr>
                              <tr>
                                <td class="student-name">
                                  <span class="bold">Course</span>
                                </td>
                                <td>
                                  <span class="bold txt-facebook">{{ this.$store.state.course }}</span>
                                </td>
                              </tr>
                              <tr>
                                <td class="student-name">
                                  <span class="bold">School Year</span>
                                </td>
                                <td>
                                  <span class="bold txt-facebook">2019-2020</span>
                                </td>
                              </tr>
                              <tr>
                                <td class="student-name">
                                  <span class="bold">Payment Status</span>
                                </td>
                                <td>
                                  <p class="bold txt-facebook" v-if="status">
                                    {{ status.toUpperCase() }}
                                  </p>
                                  <p class="bold txt-facebook" v-if="!status">UNREGISTERED</p>
                                  <a class="bold txt-facebook" @click="nextTab('tab-4')">View Details</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Personal Information</legend>
                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <tbody>
                          <tr>
                            <td><label for="">Fullname : </label></td>
                            <td colspan="4">
                              <span class="bold txt-facebook"
                                >{{ lastName.toUpperCase() }},
                                {{ firstName.toUpperCase() }}
                              </span>
                            </td>
                          </tr>

                          <tr>
                            <td></td>
                            <td>
                              <label for="" class="underline">Lastname</label>
                              <p class="bold txt-facebook">{{ lastName }}</p>
                            </td>
                            <td>
                              <label for="" class="underline">Firstname</label>
                              <p class="bold txt-facebook">{{ firstName }}</p>
                            </td>
                            <td>
                              <label for="" class="underline">Middlename</label>
                              <p class="bold txt-facebook">NA</p>
                            </td>
                          </tr>

                          <tr>
                            <td><label for="">Address : </label></td>
                            <td>
                              <label for="" class="underline">House No./Street/Barangay</label>
                              <p class="bold txt-facebook">
                                {{ this.$store.state.address }}
                              </p>
                            </td>

                            <td>
                              <label for="" class="underline">City/Province</label>
                              <p class="bold txt-facebook">
                                {{ this.$store.state.city }}
                              </p>
                            </td>

                            <td>
                              <label for="" class="underline">Country</label>
                              <p class="bold txt-facebook">
                                {{ this.$store.state.country }}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td></td>
                            <td colspan="2">
                              <label for="" class="underline">Date of Birth</label>
                              <p class="bold txt-facebook">
                                {{ this.$store.state.birthday }}
                              </p>
                            </td>

                            <td>
                              <label for="" class="underline">Gender</label>
                              <p class="bold txt-facebook">NA</p>
                            </td>
                          </tr>

                          <tr>
                            <td><label for="">Contacts : </label></td>
                            <td>
                              <label for="" class="underline">Cp / Tel. No</label>
                              <p class="bold txt-facebook">
                                {{ this.$store.state.phone }}
                              </p>
                            </td>

                            <td colspan="2">
                              <label for="" class="underline">Email</label>
                              <p class="bold txt-facebook">
                                {{ this.$store.state.email }}
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td><label for="">Nationality : </label></td>
                            <td>
                              <label for="" class="underline">Citizenship</label>
                              <p class="bold txt-facebook">Filipino</p>
                            </td>

                            <td colspan="2">
                              <label for="" class="underline">Religion</label>
                              <p class="bold txt-facebook">NA</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </fieldset>

                  <!-- <fieldset class="scheduler-border">
                    <legend class="scheduler-border">
                      Parent's Information
                    </legend>

                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <tbody>
                          <tr>
                            <td width="17%">
                              <label for="">Father's Name : </label>
                            </td>
                            <td width="50%">
                              <p class="bold txt-facebook">VIDASTOS {{lastName}}</p>
                            </td>
                            <td width="10%">
                              <label for="">Contact : </label>
                            </td>
                            <td><p class="bold txt-facebook">NA</p></td>
                          </tr>

                          <tr>
                            <td width="17%">
                              <label for="">Mother's Name : </label>
                            </td>
                            <td width="50%">
                              <p class="bold txt-facebook">MARINA {{lastName}}</p>
                            </td>
                            <td width="10%">
                              <label for="">Contact : </label>
                            </td>
                            <td>
                              <p class="bold txt-facebook">09185259182</p>
                            </td>
                          </tr>

                          <tr>
                            <td width="17%">
                              <label for="">Guardian's Name : </label>
                            </td>
                            <td width="50%">
                              <p class="bold txt-facebook"></p>
                            </td>
                            <td width="10%">
                              <label for="">Contact : </label>
                            </td>
                            <td>
                              <p class="bold txt-facebook">09274872041</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </fieldset>

                  <fieldset class="scheduler-border">
                    <legend class="scheduler-border">
                      Preliminary Education
                    </legend>

                    <div class="table-responsive">
                      <table class="table table-bordered">
                        <tbody>
                          <tr>
                            <td width="17%">
                              <label for="">Elementary : </label>
                            </td>
                            <td width="60%">
                              <label for="" class="underline">School</label>
                              <p class="bold txt-facebook">
                                DONA NICASIA PUYAT ELEM SCHOOL
                              </p>
                            </td>
                            <td>
                              <label for="" class="underline"
                                >Year Graduated</label
                              >
                              <p class="bold txt-facebook">2003</p>
                            </td>
                          </tr>

                          <tr>
                            <td width="17%">
                              <label for="">Secondary : </label>
                            </td>
                            <td width="60%">
                              <label for="" class="underline">School</label>
                              <p class="bold txt-facebook">
                                DONA AURORA ANNEX - BCNHS
                              </p>
                            </td>
                            <td>
                              <label for="" class="underline"
                                >Year Graduated</label
                              >
                              <p class="bold txt-facebook">2007</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </fieldset> -->
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-2" id="tab-2">
          <v-card>
            <div>2</div>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-3" id="tab-3">
          <v-card>
            <div>3</div>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-4" id="tab-4">
          <br />
          <p class="font-weight-bold white--text" style="background-color: #dc9f0c">Make a Payment</p>
          <v-container>
            <v-row justify="center">
              <v-col cols="12"
      sm="10"
      md="8"
      lg="6">
                <v-form ref="form">
                  <v-autocomplete name="method" ref="method" v-model="method" :items="methods" label="Method of Payment" placeholder="Select..." outlined required> </v-autocomplete>
                  <router-link v-show="method == 'Paypal'" to="/paypal"><v-img src="https://amprealtysolutionsdotcom.files.wordpress.com/2018/11/pay-now-button.png?w=256" width="300" style="display: block; margin-left: auto; margin-right: auto"></v-img></router-link>
                  <p v-show="method == 'Stripe'">Stripe Payment is under maintenance.</p>
                  <p v-show="method == 'Cash'">Proceed to any Edulink International Office to settle payment.</p>
                </v-form>
              </v-col></v-row
            ></v-container
          >
          <v-row>
            <v-col>
              <p class="font-weight-bold white--text" style="background-color: #dc9f0c">Payments Made</p>
              <v-data-table :headers="headers" :items="cashins" :items-per-page="10"></v-data-table>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
const fb = require("@/firebaseConfig.js");
export default {
  name: "dashboard",
  data() {
    return {
      role: this.$store.state.role,
      tab: null,
      photoURL: this.$store.state.photoURL,
      creationTime: this.$store.state.creationTime,
      firstName: this.$store.state.firstName,
      lastName: this.$store.state.lastName,
      referrer: null,
      status: this.$store.state.status,
      method: null,
      methods: ["Paypal", "Stripe", "Cash"],
      headers: [
        {
          text: "Amount",
          align: "start",
          value: "amount",
        },
        {
          text: "Mode of Payment",
          value: "method",
        },
        {
          text: "Status",
          value: "status",
        },
      ],
      cashins: [],
      alert: false,
    };
  },
  methods: {
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
    checkRole: function () {
      if (this.role == "agent") {
        window.location.replace("/agent/dashboard");
      }
      if (this.role == "branch") {
        window.location.replace("/agent/dashboard");
      }
      if (this.role == "sub-agent") {
        window.location.replace("/agent/dashboard");
      }
      if (this.role == "admin") {
        window.location.replace("/admin/dashboard");
      }
      if (this.role == "employee") {
        window.location.replace("/employee/dashboard");
      }
    },
    nextTab(next_tab) {
      this.tab = next_tab;
    },
  },
  beforeMount() {
    this.checkRole();
  },
  created() {
    fb.tranx
      .where("uid", "==", this.$store.state.uid)
      .where("type", "==", "cashin")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.cashins.push(doc.data());
        });
      });
    fb.userData
      .where("uid", "==", this.$store.state.referrer)
      .get()
      .then((querySnapshot) => {
        const sponsorData = querySnapshot.docs.map((doc) => doc.data());
        sponsorData.forEach((sponsord) => {
          return (this.referrer = sponsord.firstName + " " + sponsord.lastName);
        });
      });
  },
  computed: {
    form() {
      return {
        method: this.method,
      };
    },
  },
};
</script>

<style>
/* Helper classes */
</style>
