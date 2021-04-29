import * as firebase from "firebase-admin";

// firebase config
let serviceAccount;
if (process.env.ENVIRONMENT === "DEV") {
  serviceAccount = require("../firebaseCredDev.json");
} else {
  serviceAccount = require("../firebaseCredProd.json");
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount as any),
  databaseURL: process.env.DB_URL,
});

const db = firebase.firestore();
const auth = firebase.auth;

export { db, auth };
