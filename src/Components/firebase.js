import firebase from "firebase/app";
import 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgv__zYbUBt1J6r8zxhKakM1Sdzt-ewvY",
  authDomain: "movie-app-95c34.firebaseapp.com",
  projectId: "movie-app-95c34",
  storageBucket: "movie-app-95c34.appspot.com",
  messagingSenderId: "25804036390",
  appId: "1:25804036390:web:10989c1298b93e4e8a89e7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;