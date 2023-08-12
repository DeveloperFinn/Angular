// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB_35APANL85Z19vmoXh9bKIkmCp_ZJnrM",
    authDomain: "angularadvanced-79fd4.firebaseapp.com",
    projectId: "angularadvanced-79fd4",
    storageBucket: "angularadvanced-79fd4.appspot.com",
    messagingSenderId: "380158354993",
    appId: "1:380158354993:web:b4b069767aec937ba95710"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebase);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
