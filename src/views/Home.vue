<template>
  <v-container
    style="
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url('https://img.freepik.com/free-vector/watercolor-background_87374-69.jpg?size=626&ext=jpg');
    "
  >
    <v-row
      ><v-img
        src="https://scontent.fcrk1-1.fna.fbcdn.net/v/t1.0-9/130757234_147426043814562_5331434244278844028_o.jpg?_nc_cat=104&ccb=3&_nc_sid=e3f864&_nc_eui2=AeG8f0a1TyPmU1TIblQHq0ZrqbCRNKeIwuGpsJE0p4jC4dlxkrSa6oIB3RB3Mszn7yHdFC3Fq6t7Ze5KcAB5ur7U&_nc_ohc=aIEyKiIechAAX--cKeu&_nc_ht=scontent.fcrk1-1.fna&oh=eb94edd8f588fb899b8a9cfa73e3ca00&oe=605C3798"
      ></v-img
    ></v-row>
    <br />
    <v-row>
      <v-col>
        <h1
          id="courses"
          style="font-family: 'Lobster'; background-color: #daa520; height: 80px"
          class="pt-4"
        >
          <v-icon color="black"> mdi-school</v-icon> Courses Offered
        </h1>
      </v-col>
    </v-row>
    <v-row class="ma-5">
      <v-col>
        <v-row>
          <v-col cols="6" sm="4">
            <v-card>
              <v-img
                src="https://online.jwu.edu/sites/default/files/styles/article_feature_page/public/field/image/iStock-1164197118.jpg?itok=ScGbw7me"
              ></v-img>
              <v-card-title> Diploma in Hospitality & Tourism </v-card-title></v-card
            >
          </v-col>
          <v-col cols="6" sm="4">
            <v-card>
              <v-img
                src="https://www.singaporetech.edu.sg/sites/default/files/SIT_HB_01.jpg"
              ></v-img>
              <v-card-title> Diploma in Hospitality Business </v-card-title></v-card
            > </v-col
          ><v-col cols="6" sm="4">
            <v-card>
              <v-img
                src="https://resources.finalsite.net/images/v1578927378/torontosomca/kwda5s9a5fyderc0cccp/DifferencebetweenHospitalityManagementandHotelManagement.jpg"
              ></v-img>
              <v-card-title> Diploma in Hospitality Management </v-card-title></v-card
            >
          </v-col></v-row
        ></v-col
      >
    </v-row>

    <router-link to="/register" style="text-decoration: none"
      ><v-btn class="warning" x-large
        ><h2 class="pb-2">PRE-REGISTER FOR FREE NOW!</h2></v-btn
      ></router-link
    >
    <br /><br />

    <h1 style="font-family: 'Lobster'; color: #daa520" id="about-us">
      <v-icon color="#DAA520"> mdi-school</v-icon> About Us
    </h1>
    <v-row class="ma-5">
      <v-col>
        <h3>
          Edulink International is an agency that offers assistance to potential students
          who can study in Singapore. Offering Hospitality & Tourism Programmes, students
          can enjoy learning in Singapore and working in partner institutions and
          continuing education in the UK, Australia, Canada and The USA.
        </h3>
      </v-col>
      <v-col>
        <video controls>
          <source
            src="https://firebasestorage.googleapis.com/v0/b/edulink-international.appspot.com/o/edulink.mp4?alt=media&token=b4d111da-3922-4b93-a038-bc296b8fc202"
            type="video/mp4"
          />
        </video>
      </v-col>
    </v-row>
    <br />
    <v-row class="ma-5">
      <v-col>
        <h1 style="font-family: 'Lobster'; color: #daa520">
          <v-icon color="#DAA520"> mdi-school</v-icon> Mission
        </h1>
        <h3>
          To inspire people to continue studying without limitation, we work hard every
          day to make Edulink International the world's most reputable education
          consultancy.
        </h3>
      </v-col></v-row
    ><br />
    <v-row class="ma-5">
      <v-col>
        <h1 style="font-family: 'Lobster'; color: #daa520">
          <v-icon color="#DAA520"> mdi-school</v-icon> Vision
        </h1>
        <h3>Creating a pathway for a brighter future generation.</h3>
      </v-col></v-row
    ><br />
    <v-row class="ml-9 mr-9">
      <v-col>
        <h1 style="font-family: 'Lobster'; color: #daa520">
          <v-icon color="#DAA520"> mdi-school</v-icon> Core Values
        </h1>
        <h3>
          <ul>
            <li>Honesty</li>
            <li>Trustworthy</li>
            <li>Respect</li>
            <li>Integrity</li>
            <li>Efficiency</li>
            <li>Commitment</li>
          </ul>
        </h3>
      </v-col></v-row
    ><br />
    <v-row
      class="white--text"
      style="
        background-image: url('https://img.freepik.com/free-photo/old-book-lies-grass-park_97245-598.jpg?size=626&ext=jpg&ga=GA1.2.1628466600.1595030400');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      "
    >
      <v-col class="pa-10" id="contact-us">
        <h1 style="font-family: 'Lobster'; color: #daa520">
          <v-icon color="#DAA520"> mdi-file-document-edit</v-icon> Contact Us
        </h1>
        <h3>
          <strong>SINGAPORE</strong> : SG Edulink Pte Ltd, 400 Orchard Road, #14-05
          Orchard Towers Singapore 238875 <strong>PHILIPPINES</strong> : Edulink
          International, 43 Assumption Road, #04-05 Corner Gen. Luna Road, Baguio City,
          Philippines 2600 | Unit 504P to 508P, Room 516 Pacific Drive Five Ecom Center
          Bldg. Pacific Drive Extension Block 18 Mall of Asia Complex, Pasay City, 1300
          Philippines.
        </h3>
        <h3>E-MAIL: izza@alegancegroup.com</h3>
      </v-col>
      <v-col class="pa-10">
        <v-container>
          <form class="contact-form" @submit.prevent="sendEmail">
            <v-row class="pb-0">
              <v-col class="pb-0">
                <input type="hidden" name="to" value="izza@alegancegroup.com" />
                <label><h3>NAME</h3></label>
                <v-text-field
                  background-color="white"
                  type="text"
                  name="user_name"
                  solo
                  required
                ></v-text-field>
              </v-col>
              <v-col class="pb-0">
                <label><h3>EMAIL</h3></label>
                <v-text-field
                  background-color="white"
                  type="email"
                  name="user_email"
                  solo
                  required
              /></v-col>
            </v-row>
            <v-row class="pt-0">
              <v-col class="pt-0">
                <label><h3>MESSAGE</h3></label>
                <v-textarea
                  background-color="white"
                  color="black"
                  name="message"
                  height="200"
                ></v-textarea>
                <v-btn
                  type="submit"
                  block
                  dark
                  style="background-color: rgb(218, 165, 32)"
                >
                  <h4>SEND</h4></v-btn
                ></v-col
              ></v-row
            >
          </form></v-container
        ></v-col
      ><br
    /></v-row>
    <v-card class="pa-2">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d956.801370448084!2d120.59692972914054!3d16.4143872857375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a1d5bb1d1651%3A0xfca79a30c9534b8a!2sEdulink%20International%20Baguio!5e0!3m2!1sen!2sph!4v1606233164787!5m2!1sen!2sph"
        width="100%"
        height="450"
        frameborder="0"
        style="border: 0"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </v-card>
    <v-card
      ><img src="https://www.worldflagcounter.com/hpp/" alt="Flag Counter" width="100%"
    /></v-card>
  </v-container>
</template>

<script>
import emailjs from "emailjs-com";
export default {
  name: "Home",
  data() {
    return {
      items: [
        {
          src:
            "https://cadava.s3.amazonaws.com/sites/all/cadava/wp-content/uploads/2020/05/13153115/Cadava-Carousel-image-helping-your-business-to-grow.jpg",
        },
        {
          src:
            "https://cadava.s3.amazonaws.com/sites/all/cadava/wp-content/uploads/2020/05/13153115/Cadava-Carousel-image-helping-your-business-to-grow.jpg",
        },
        {
          src:
            "https://cadava.s3.amazonaws.com/sites/all/cadava/wp-content/uploads/2020/05/13153115/Cadava-Carousel-image-helping-your-business-to-grow.jpg",
        },
      ],
    };
  },
  mounted() {
    if (this.$store.state.email) {
      if (this.$store.state.role == "student") {
        window.location.replace("/dashboard");
      }
      if (this.$store.state.role == "admin") {
        window.location.replace("/admin/dashboard");
      }
      if (
        this.$store.state.role == "agent" ||
        this.$store.state.role == "branch" ||
        this.$store.state.role == "sub-agent"
      ) {
        window.location.replace("/agent/dashboard");
      }
    }
  },
  methods: {
    sendEmail: (e) => {
      emailjs
        .sendForm(
          "service_sods5vr",
          "template_z082adc",
          e.target,
          "user_e72uicwHimQPCDqu52cqE"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.status, result.text);
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}

ul li:before {
  content: "✓ ";
}
.container {
  max-width: 100%;
  padding: 0px;
  margin: 0px;
  width: 100%;
}
.bg {
  background-image: url("https://blog.boardingware.com/wp-content/uploads/2018/11/Effective-school-administration-supports-databased-decision-making_896_6065058_0_14102171_1000.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
