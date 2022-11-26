<template>
  <v-row justify="center" v-show="this.$store.state.email == null">
    <v-col cols="12" sm="6">
      <v-form ref="form"
        ><v-card>
          <v-card-text>
            You were referred by: {{ this.referrerName }}
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
            <v-text-field
              name="emailSignup"
              v-model="emailSignup"
              :rules="emailRules"
              :error-messages="errorMessages"
              label="E-mail"
              outlined
              required
            ></v-text-field>
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
                  :rules="[() => !!birthday || 'This field is required']"
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
            <v-text-field
              name="city"
              ref="city"
              v-model="city"
              :rules="[() => !!city || 'This field is required']"
              label="City or Province"
              outlined
              required
            ></v-text-field>
            <v-text-field
              name="state"
              ref="state"
              v-model="state"
              :rules="[() => !!state || 'This field is required']"
              label="State or Region"
              required
              outlined
            ></v-text-field>
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
            <v-text-field
              ref="signupPassword"
              v-model="signupPassword"
              :rules="[() => !!signupPassword || 'This field is required']"
              label="Password"
              type="password"
              outlined
              required
            >
            </v-text-field>
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

            <v-card-actions>
              <v-btn x-large dark color="error">
                <h4>CANCEL</h4>
              </v-btn>
              <v-spacer></v-spacer>
              <v-col class="d-flex align-end flex-column">
                <v-btn x-large dark color="primary" @click="submit">
                  <h4>ENROLL NOW</h4>
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-card-text>
        </v-card></v-form
      >
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase/app";
const fb = require("@/firebaseConfig.js");
export default {
  name: "register",
  data: () => ({
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
  }),

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
      return () =>
        this.signupPassword === this.confirmPassword || "Password must match";
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

  methods: {
    save(birthday) {
      this.$refs.menu.save(birthday);
    },
    getReferrer: function () {
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
  },
  beforeMount() {
    this.getReferrer();
  },
  mounted(){
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
