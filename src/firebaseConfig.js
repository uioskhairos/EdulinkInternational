import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// firebase init goes here
const firebaseConfig = {
    apiKey: "AIzaSyD-zlPotaURrEDksqIccjfGoqMKxfw72cY",
    authDomain: "edulink-international.firebaseapp.com",
    databaseURL: "https://edulink-international.firebaseio.com",
    projectId: "edulink-international",
    storageBucket: "edulink-international.appspot.com",
    appId: "1:1025132212400:web:6b01ae9edb427958774b75",
    measurementId: "G-2XNV0RZBJ8"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const user = firebase.auth().currentUser

// firebase collections
const userData = db.collection('userData')
const tranx = db.collection('transactions')

export {
    db,
    auth,
    userData,
    user,
    tranx
}