
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
  

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBl31yXPQKz4eFKMMmc5E211fstqNmc3KY",
    authDomain: "anony-79776.firebaseapp.com",
    projectId: "anony-79776",
    storageBucket: "anony-79776.appspot.com",
    messagingSenderId: "1092146068290",
    appId: "1:1092146068290:web:2160004ce4564e1cae66db",
    measurementId: "G-3MVP8DHL52"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  async function signIn(username) {

    const anonyName = username.value 
    if(!anonyName) return

    await signInAnonymously(auth).then(() => {
        createUser(anonyName);
    }).catch((error) => {
        console.log(error.message)
    })
  } 

  async function createUser(user){
    console.log(user)

  }
  export {
    signIn
  }