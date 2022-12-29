// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getStorage, getDownloadURL, uploadBytes } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import { getDatabase, ref, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyBZ72eZTCZOP2oz0Em3FMQT9LDh-mnVdfk",
        authDomain: "to-do-drag-and-drop.firebaseapp.com",
        projectId: "to-do-drag-and-drop",
        storageBucket: "to-do-drag-and-drop.appspot.com",
        messagingSenderId: "836907883873",
        appId: "1:836907883873:web:9ef6228bb59aceb388f920",
        databaseURL: "https://to-do-drag-and-drop-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);
console.log(storage);

var uid = ''




// Create a storage reference from our storage service
// const storageRef = ref(storage);
// const fileName = "test.json"
// const spaceRef = ref(storageRef, fileName);
// console.log(spaceRef);

// //как только страница загрузится
// window.addEventListener('load', () => {
//         console.log("page is fully loaded");

const signUpButton = document.querySelector(".signUp__button")
//registration
if (signUpButton != null) {
        signUpButton.addEventListener("click", () => {

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
                        .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;

                                console.log(errorMessage);
                                alert(errorMessage);
                        });
        });
}

const logInButton = document.querySelector(".logIn__button")
//login
if (logInButton != null) {
        document.querySelector(".logIn__button").addEventListener("click", () => {
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
};


const logOutButton = document.querySelector(".header__logOut")
//logOut
if (logOutButton != null) {
        logOutButton.addEventListener("click", () => {
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
        });
};

// });

//проверка на уже зашедшего пользователя
onAuthStateChanged(auth, (user) => {
        if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                uid = user.uid;
                console.log(user.email)

                // ...
        } else {
                // User is signed out
                // ...
        }
});



export function saveToFirebase(tasks) {
        console.log(tasks)
        console.log(uid)

        if (uid != ""){
                set(ref(db, 'users/' + uid), {
                        tasks
                      })
                      .then(()=>{
                        console.log("data stored successfully")
                      })
                      .catch((error)=>{
                        console.log("error"+error)
                      })
        } else {
                alert("to store your data you need log in")
        }

        // // create a Blob from the JSON-string
        // var blob = new Blob([jsonString], { type: "application/json" })
        // if (blob != undefined) {
        //         const storageRef = ref(storage, `${uid}.json`);
        //         uploadBytes(storageRef, blob).then((snapshot) => {
        //                 console.log('Uploaded a blob or file!');
        //         });
        // }

}



export function getFileFromFirebase() {
        onAuthStateChanged(auth, (user) => {
                if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/firebase.User
                        uid = user.uid;
                        console.log(uid)

                        // ...
                } else {
                        // User is signed out
                        // ...
                }
        });

        const starsRef = ref(storage, `PG53EmrFALWtJhPTRl88A4O368u1.json`);

        // Get the download URL
        getDownloadURL(starsRef)
                .then((url) => {
                        

                        // `url` is the download URL for 'images/stars.jpg'

                        // This can be downloaded directly:
                        const xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = (event) => {
                        const blob = xhr.response;
                        console.log(blob)
                        };
                        // xhr.open('GET', url);
                        // xhr.send();
                        


                         //fetch(URL)-простой Get запрос - скачает содержимое по адресу URL
                         //responce.json - декодирует ответ в JSON
                        //  fetch(url).then(response => response.json()).then(result => console.log(result));

                })
                .catch((error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                                case 'storage/object-not-found':
                                        // File doesn't exist
                                        break;
                                case 'storage/unauthorized':
                                        // User doesn't have permission to access the object
                                        break;
                                case 'storage/canceled':
                                        // User canceled the upload
                                        break;

                                // ...

                                case 'storage/unknown':
                                        // Unknown error occurred, inspect the server response
                                        break;
                        }
                });

}

export function testfunc(){
        alert("test function")
}






