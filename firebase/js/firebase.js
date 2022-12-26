// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ72eZTCZOP2oz0Em3FMQT9LDh-mnVdfk",
  authDomain: "to-do-drag-and-drop.firebaseapp.com",
  projectId: "to-do-drag-and-drop",
  storageBucket: "to-do-drag-and-drop.appspot.com",
  messagingSenderId: "836907883873",
  appId: "1:836907883873:web:9ef6228bb59aceb388f920"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var auth = getAuth(app);

//как только страница загрузится
window.addEventListener('load', () => {
        console.log("page is fully loaded");

//registration
document.querySelector(".signUp__button").addEventListener("click", ()=>{

const email = document.querySelector(".signUp__email").value;
const pass = document.querySelector(".signUp__password").value;

//for new registratiom
createUserWithEmailAndPassword(auth, email, pass)
.then((userCredential) => {
    //signed in
    const user = userCredential.user;
    console.log(user);
    alert("Registration successfully!!");
    //...
})
.catch ((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorMessage);
    alert(errorMessage);
});
});

//login
document.querySelector(".logIn__button").addEventListener("click", ()=>{
    const email = document.querySelector(".logIn__email").value;
    const pass = document.querySelector(".logIn__password").value;

    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert(user.email + "Login successfully!!!");
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        alert(errorMessage);
    })
});

//logOut
document.querySelector(".header__logOut").addEventListener("click", ()=>{
    signOut(auth).then(() => {
        console.log("Sign-out successful")
        alert("Sign-out successful")

    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        alert(errorMessage);

    });
})

});

//проверка на уже зашедшего пользователя
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user.email)
        // ...
    } else {
        // User is signed out
        // ...
    }
});






const sum = (a, b) => a + b;
export default sum;