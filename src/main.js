import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBq864A7ueSj7zoN6BcaPLbpcN-db3WlYU",
  authDomain: "vue-firechat-8bfdb.firebaseapp.com",
  projectId: "vue-firechat-8bfdb",
  storageBucket: "vue-firechat-8bfdb.appspot.com",
  messagingSenderId: "891713045387",
  appId: "1:891713045387:web:5c1b27888cd199581d258e",
  measurementId: "G-MZEKQR6ZHN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

const app = createApp(App);

// Provide Firebase and Firestore as properties to your Vue app
app.config.globalProperties.$firebaseApp = firebaseApp;
app.config.globalProperties.$db = db;

app.use(store).use(router).mount('#app');

