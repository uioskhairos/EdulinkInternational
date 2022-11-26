<template>
  <div id="app" class="text-center">
    <!-- App.vue -->
    <v-app>
      <v-app-bar app text color="blue darken-4" dark fixed height="100">
        <v-container class="mx-auto py-0 ml-4 mr-4">
          <v-row align="center">
            <v-img
              :src="require('@/assets/logo.png')"
              class="mr-5 hidden-md-and-up"
              contain
              max-height="90"
              max-width="190"
            />
            <v-img
              :src="require('@/assets/logo.png')"
              class="mr-5 hidden-sm-and-down"
              contain
              max-height="95"
              max-width="200"
            />
            <v-spacer />
            <v-toolbar-items class="hidden-sm-and-down">
              <!-- Home Navigators -->
              <v-btn text v-show="email == null">
                <h4>
                  <router-link
                    to="/home"
                    class="white--text"
                    style="text-decoration: none"
                    >HOME</router-link
                  >
                </h4>
              </v-btn>
              <v-btn text v-show="email == null">
                <h4>
                  <a
                    @click="$vuetify.goTo('#courses')"
                    class="white--text"
                    style="text-decoration: none"
                    >Courses</a
                  >
                </h4>
              </v-btn>
              <v-btn text v-show="email == null">
                <h4>
                  <a
                    @click="$vuetify.goTo('#about-us')"
                    class="white--text"
                    style="text-decoration: none"
                    >About Us</a
                  >
                </h4>
              </v-btn>
              <v-btn text v-show="email == null">
                <h4>
                  <a
                    @click="$vuetify.goTo('#contact-us')"
                    class="white--text"
                    style="text-decoration: none"
                    >Contact Us</a
                  >
                </h4>
              </v-btn>
              <v-btn text v-show="email == null">
                <h4>
                  <v-dialog v-model="dialog" width="650">
                    <template v-slot:activator="{ on, attrs }">
                      <p
                        class="white--text"
                        style="text-decoration: none"
                        v-bind="attrs"
                        v-on="on"
                      >
                        PRE-REGISTER NOW
                      </p>
                    </template>

                    <v-row v-show="this.$store.state.email == null">
                      <v-form ref="form"
                        ><v-card>
                          <v-card-text>
                            <v-col class="col-sm-12">
                              You were referred by: {{ this.referrerName }}
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                name="firstName"
                                ref="firstName"
                                v-model="firstName"
                                :rules="[() => !!firstName || 'This field is required']"
                                :error-messages="errorMessages"
                                label="First Name"
                                outlined
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                name="lastName"
                                ref="lastName"
                                v-model="lastName"
                                :rules="[() => !!lastName || 'This field is required']"
                                :error-messages="errorMessages"
                                label="Last Name"
                                outlined
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                name="email"
                                v-model="emailSignup"
                                :rules="emailRules"
                                :error-messages="errorMessages"
                                label="E-mail"
                                outlined
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                name="phone"
                                ref="phone"
                                v-model="phone"
                                :rules="[() => !!phone || 'This field is required']"
                                :error-messages="errorMessages"
                                label="Phone Number"
                                outlined
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    name="birthday"
                                    ref="birthday"
                                    v-model="birthday"
                                    :rules="[
                                      () => !!birthday || 'This field is required',
                                    ]"
                                    :error-messages="errorMessages"
                                    label="Birthday"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    required
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  ref="picker"
                                  v-model="birthday"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  min="1950-01-01"
                                  @change="save"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                name="address"
                                ref="address"
                                v-model="address"
                                :rules="[
                                  () => !!address || 'This field is required',
                                  () =>
                                    (!!address && address.length <= 50) ||
                                    'Address must be less than 50 characters',
                                ]"
                                label="House No. | Street | Barangay"
                                outlined
                                counter="50"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                name="city"
                                ref="city"
                                v-model="city"
                                :rules="[() => !!city || 'This field is required']"
                                label="City or Province"
                                outlined
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                name="state"
                                ref="state"
                                v-model="state"
                                :rules="[() => !!state || 'This field is required']"
                                label="State or Region"
                                required
                                outlined
                              ></v-text-field>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-autocomplete
                                name="country"
                                ref="country"
                                v-model="country"
                                :rules="[() => !!country || 'This field is required']"
                                :items="countries"
                                label="Country"
                                placeholder="Select..."
                                outlined
                                required
                              ></v-autocomplete>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-autocomplete
                                name="course"
                                ref="course"
                                v-model="course"
                                :rules="[() => !!course || 'This field is required']"
                                :items="courses"
                                label="Desired Course"
                                placeholder="Select..."
                                outlined
                                required
                              ></v-autocomplete>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                ref="signupPassword"
                                v-model="signupPassword"
                                :rules="[
                                  () => !!signupPassword || 'This field is required',
                                ]"
                                label="Password"
                                type="password"
                                outlined
                                required
                              >
                              </v-text-field>
                            </v-col>
                            <v-col class="col-sm-6">
                              <v-text-field
                                ref="confirmPassword"
                                v-model="confirmPassword"
                                :rules="[
                                  () => !!signupPassword || 'This field is required',
                                  passwordConfirmationRule,
                                ]"
                                label="Confirm Password"
                                type="password"
                                outlined
                                required
                              >
                              </v-text-field>
                            </v-col>

                            <v-card-actions>
                              <v-col class="col-sm-6 d-flex align-start flex-column">
                                <v-btn x-large dark color="error" @click="dialog = false">
                                  <h4>CANCEL</h4>
                                </v-btn></v-col
                              >
                              <v-col class="col-sm-6">
                                <v-btn x-large dark color="primary" @click="submit" block>
                                  <h4>PRE-REGISTER NOW</h4>
                                </v-btn>
                              </v-col>
                            </v-card-actions>
                          </v-card-text>
                        </v-card></v-form
                      >
                    </v-row>
                  </v-dialog>
                </h4>
              </v-btn>
              <v-btn text v-show="email == null" class="white--text">
                <h4
                  href="#"
                  class="modal-trigger"
                  data-toggle="modal"
                  data-target="#loginModal"
                >
                  Login
                </h4>
              </v-btn>
              <!-- Admin Navigators -->
              <v-btn text v-show="role == 'admin'">
                <h4>
                  <router-link
                    to="/admin/dashboard"
                    class="white--text"
                    style="text-decoration: none"
                    >Dashboard</router-link
                  >
                </h4>
              </v-btn>
              <v-btn text v-show="role == 'admin'">
                <h4>
                  <router-link
                    to="/admin/cashins"
                    class="white--text"
                    style="text-decoration: none"
                    >Student Payments</router-link
                  >
                </h4>
              </v-btn>
              <v-btn text v-show="role == 'admin'">
                <h4>
                  <router-link
                    to="/admin/cashouts"
                    class="white--text"
                    style="text-decoration: none"
                    >Agent Cashouts</router-link
                  >
                </h4>
              </v-btn>

              <!-- Student Navigators -->
              <v-btn text v-show="role == 'student'">
                <h4>
                  <router-link
                    to="/dashboard"
                    class="white--text"
                    style="text-decoration: none"
                    >My Profile</router-link
                  >
                </h4>
              </v-btn>
              <v-btn text v-show="role == 'student'">
                <h4>
                  <router-link
                    to="/settings"
                    class="white--text"
                    style="text-decoration: none"
                  >
                    <v-icon color="white">mdi-cogs</v-icon>
                  </router-link>
                </h4>
              </v-btn>
              <!-- Agent Navigators -->
              <v-btn
                text
                v-show="role == 'agent' || role == 'sub-agent' || role == 'branch'"
              >
                <h4>
                  <router-link
                    to="/agent/dashboard"
                    class="white--text"
                    style="text-decoration: none"
                    >Dashboard</router-link
                  >
                </h4>
              </v-btn>

              <v-btn
                text
                v-show="role == 'agent' || role == 'sub-agent' || role == 'branch'"
              >
                <h4>
                  <router-link
                    to="/agent/settings"
                    class="white--text"
                    style="text-decoration: none"
                  >
                    <v-icon color="white">mdi-cogs</v-icon>
                  </router-link>
                </h4>
              </v-btn>
              <!-- Common Logout Button -->
              <v-btn text v-show="email != null">
                <h4 v-on:click="logout" class="white--text">
                  <v-icon color="white">mdi-logout</v-icon>
                </h4>
              </v-btn>
            </v-toolbar-items>
            <!-- Mobile View -->
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text class="hidden-md-and-up" v-bind="attrs" v-on="on">
                  <v-app-bar-nav-icon></v-app-bar-nav-icon>
                </v-btn>
              </template>
              <v-list class="primary">
                <v-list-item-group>
                  <v-list-item-title>
                    <v-btn text v-show="email == null" class="white--text">
                      <h4
                        href="#"
                        class="modal-trigger"
                        data-toggle="modal"
                        data-target="#loginModal"
                      >
                        Login
                      </h4>
                    </v-btn>
                  </v-list-item-title>
                  <v-list-item-title>
                    <v-btn text v-show="email == null">
                      <h4>
                        <router-link
                          to="/register"
                          class="white--text"
                          style="text-decoration: none"
                          >Enroll</router-link
                        >
                      </h4>
                    </v-btn>
                  </v-list-item-title>
                  <!-- Student Mobile View -->
                  <v-list-item-title>
                    <router-link to="/dashboard">
                      <v-avatar size="40" v-show="role == 'student'">
                        <img :src="photoURL" alt="Profile" />
                      </v-avatar>
                    </router-link>
                  </v-list-item-title>
                  <!-- Admin Mobile View -->
                  <v-list-item-title v-show="role == 'admin'">
                    <router-link to="/admin/dashboard">
                      <v-avatar size="40">
                        <img :src="photoURL" alt="Profile" />
                      </v-avatar>
                    </router-link>
                  </v-list-item-title>

                  <v-list-item-title>
                    <v-btn text v-show="role == 'student'">
                      <router-link class="white--text" to="/settings">
                        <v-icon color="white">mdi-cogs</v-icon>
                      </router-link>
                    </v-btn>
                  </v-list-item-title>
                  <v-list-item-title>
                    <router-link to="/agent/dashboard">
                      <v-avatar
                        size="40"
                        v-show="
                          role == 'agent' || role == 'sub-agent' || role == 'branch'
                        "
                      >
                        <img :src="photoURL" alt="Profile" />
                      </v-avatar>
                    </router-link>
                  </v-list-item-title>
                  <v-list-item-title>
                    <v-btn
                      text
                      v-show="role == 'agent' || role == 'sub-agent' || role == 'branch'"
                    >
                      <router-link class="white--text" to="/agent/settings">
                        <v-icon color="white">mdi-cogs</v-icon>
                      </router-link>
                    </v-btn>
                  </v-list-item-title>
                  <v-list-item-title>
                    <v-btn text v-show="email != null">
                      <v-icon v-on:click="logout" color="white">mdi-logout</v-icon>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-row>
        </v-container>
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer dark padless>
        <v-card class="flex" text tile>
          <v-card-title class="blue darken-4 white--text pa-3">
            <strong class="headline font-weight-bold ma-3"
              >Get connected with us on social networks!</strong
            >

            <v-spacer></v-spacer>

            <v-btn color="white" class="mx-4" dark icon>
              <a
                href="https://www.facebook.com/edulinkint"
                class="white--text"
                style="text-decoration: none"
                ><v-icon size="30px"> mdi-facebook </v-icon></a
              >
            </v-btn>
            <v-btn color="white" class="mx-4" dark icon>
              <a
                href="http://m.me/edulinkint"
                class="white--text"
                style="text-decoration: none"
                ><v-icon size="30px"> mdi-email </v-icon></a
              >
            </v-btn>
            <v-btn color="white" class="mx-4" dark icon>
              <v-icon size="30px"> mdi-twitter </v-icon>
            </v-btn>
            <v-btn color="white" class="mx-4" dark icon>
              <v-icon size="30px"> mdi-instagram </v-icon>
            </v-btn>
          </v-card-title>

          <v-row>
            <v-col class="col-sm-2 pt-5" style="text-align: center; font-size: 10px">
              <strong dark class="ml-10"
                >{{ new Date().getFullYear() }} — Edulink International</strong
              >
            </v-col>
            <v-col class="pr-15">
              <v-img
                style="float: right"
                :src="require('@/assets/logo2.png')"
                contain
                max-height="60"
                max-width="130"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-footer>
      <!-- Scroller to TOP -->
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-app>
    <!-- Login Modal -->
    <div class="modal fade" id="loginModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h3 class="modal-title" style="text-align: center">Login</h3>
          </div>
          <div class="modal-body">
            <form @submit="login" action="/dashboard" method="post">
              <div class="form-group has-feedback">
                <label for="loginEmail">Email Address</label>
                <input
                  type="email"
                  name="email"
                  v-model="loginEmail"
                  required
                  class="form-control"
                />
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <label for="loginPassword">Your Password</label>
                <input
                  type="password"
                  v-model="loginPassword"
                  required
                  class="form-control"
                />
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <v-btn
                block
                x-large
                dark
                style="background-color: rgb(0, 102, 204)"
                type="submit"
                v-bind:disabled="isButtonDisabled"
              >
                <h4>LOGIN</h4>
              </v-btn>
            </form>
            <router-link to="/reset" data-dismiss="modal">Forgot Password</router-link>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
const fb = require("./firebaseConfig.js");
export default {
  name: "App",
  components: {
    // LoginModal,
  },
  data() {
    return {
      email: this.$store.state.email,
      name: this.$store.state.name,
      photoURL: this.$store.state.photoURL,
      role: this.$store.state.role,
      loginEmail: "",
      loginPassword: "",
      isButtonDisabled: false,
      dialog: false,
      courses: [
        "Diploma in Hospitality & Tourism",
        "Diploma in Hospitality Business",
        "Diploma in Hospitality Management",
      ],
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        `Timor L'Este`,
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      errorMessages: "",
      firstName: null,
      lastName: null,
      emailSignup: null,
      phone: null,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      birthday: null,
      menu: false,
      address: null,
      city: null,
      state: null,
      country: null,
      course: null,
      referrer: null,
      referrerName: null,
      formHasErrors: false,
      signupPassword: null,
      confirmPassword: null,
      fab: false,
    };
  },

  methods: {
    save(birthday) {
      this.$refs.menu.save(birthday);
    },
    getSponsor: function () {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const URLid = urlParams.get("id");
      if (URLid == null) {
        if (this.$cookie.get("id") == null) {
          return (this.referrer = "bE9RrXLQ50PYM5Q3D3mclcIYF2g2");
        } else {
          let ref = this.$cookie.get("id");
          return (this.referrer = ref);
        }
      }
      this.$cookie.set("id", URLid, 1);
      return (this.referrer = URLid);
    },
    submit: function (e) {
      if (this.$refs.form.validate()) {
        fb.auth
          .createUserWithEmailAndPassword(this.emailSignup, this.signupPassword)
          .then(
            (cred) => {
              const { user } = cred;
              user.updateProfile({
                photoURL:
                  "https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png",
                displayName: this.firstName,
              });
              return fb.userData
                .doc(cred.user.uid)
                .set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  uid: cred.user.uid,
                  referrer: this.referrer,
                  phone: this.phone,
                  birthday: this.birthday,
                  role: "student",
                  address: this.address,
                  city: this.city,
                  state: this.state,
                  country: this.country,
                  course: this.course,
                  email: this.emailSignup,
                })
                .then(function () {
                  // Update successful.
                  window.location.replace("/dashboard");
                })
                .catch(function (error) {
                  // An error happened.
                  alert(error.message);
                });
            },
            (err) => {
              alert(err.message);
            }
          );
        e.preventDefault();
      }
    },
    login: function (e) {
      fb.auth.signInWithEmailAndPassword(this.loginEmail, this.loginPassword).then(
        (user) => {
          // alert(`You are logged in as ${this.loginEmail}`)
          this.isButtonDisabled = true;
          window.location.replace("/dashboard");
        },
        (err) => {
          alert(err.message);
        }
      );
      e.preventDefault();
    },
    logout: function () {
      fb.auth.signOut().then(() => {
        window.location.replace("/");
      });
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  computed: {
    form() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        emailSignup: this.emailSignup,
        phone: this.phone,
        birthday: this.birthday,
        address: this.address,
        city: this.city,
        state: this.state,
        country: this.country,
        course: this.course,
        signupPassword: this.signupPassword,
        confirmPassword: this.confirmPassword,
      };
    },
    passwordConfirmationRule() {
      return () => this.signupPassword === this.confirmPassword || "Password must match";
    },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  beforeMount() {
    this.getSponsor();
  },
  mounted() {
    fb.userData
      .where("uid", "==", this.referrer)
      .get()
      .then((querySnapshot) => {
        const sponsorData = querySnapshot.docs.map((doc) => doc.data());
        sponsorData.forEach((sponsord) => {
          this.referrerName = sponsord.firstName + " " + sponsord.lastName;
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  font-family: "Poppins", sans-serif;
}
</style>
