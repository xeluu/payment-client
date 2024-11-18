import { auth } from "../config/firebaseConfig.js";

console.log(auth);
auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User is logged in:", user);
    } else {
      console.log("No user is logged in.");
      window.location.href = '/';
    }
  });