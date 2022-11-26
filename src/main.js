import Vue from 'vue'
import Vuetify from 'vuetify' // path to vuetify export
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.css'
import 'vue-cookie/build/vue-cookie.js'
import '@/components/bootstrap/dist/js/bootstrap.js'
import '@/components/bootstrap/dist/css/bootstrap.css'

import { firestorePlugin } from 'vuefire'
import Vuex from 'vuex'
import 'es6-promise/auto'
const fb = require('./firebaseConfig.js')

// Require dependencies
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(Vuetify)
Vue.use(Vuex)
//import firebaseui from 'firebaseui'
Vue.use(firestorePlugin)
Vue.config.productionTip = false
//moment
var moment = require('moment'); // require
moment().format();
// listen for auth status changes
let app
fb.auth.onAuthStateChanged(user => {
  if (user) {

    fb.userData.doc(user.uid).get().then(doc => {

      // cashoutSum = 0
      const cashoutSum = fb.tranx
        .where("uid", "==", user.uid)
        .where("type", "==", "cashout")
        .get()
        .then((querySnapshot) => {
          const cashouts = querySnapshot.docs.map((doc) => doc.data());
          let sum = 0;
          cashouts.forEach((cashout) => {
            sum += cashout.amount;
          });
          return sum;
        });
      // level 1 total earned
      const level1 = fb.userData
        .where("referrer", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          const referred1 = querySnapshot.docs.map((doc) => doc.data());
          let sum1 = 0;
          referred1.forEach((refer1) => {
            if (refer1.status != null) {
              sum1++;
            }
          });
          if (doc.data().role == "agent") {
            return sum1 * 1000;
          } else {
            return sum1 * 500;
          }
        });


      const store = new Vuex.Store({

        state: {
          cashout: cashoutSum,
          balance1: level1,
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          id: doc.data().id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          photoURL: user.photoURL,
          creationTime: user.metadata.creationTime,
          sponsor: doc.data().sponsor,
          referrer: doc.data().referrer,
          role: doc.data().role,
          course: doc.data().course,
          phone: doc.data().phone,
          birthday: doc.data().birthday,
          address: doc.data().address,
          city: doc.data().city,
          country: doc.data().country,
          state: doc.data().state,
          zip: doc.data().zip,
          status: doc.data().status,
          admin: doc.data().admin,
        },
        mutations: {
        }
      })
      if (!app) {
        app = new Vue({
          vuetify: new Vuetify(),
          router,
          store,
          render: h => h(App),
        }).$mount('#app')
      }
      console.log('user logged in')
    })
  } else {
    const store = new Vuex.Store({
      state: {
        email: null,
        name: null,
        uid: null,
        photoURL: null,
        creationTime: null,
        sponsor: null,
        role: null,
      }
    })
    console.log('user logged out')
    if (!app) {
      app = new Vue({
        vuetify: new Vuetify(),
        router,
        store,
        render: h => h(App),
      }).$mount('#app')
    }
  }
})