import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDcC_kfX_hbcXZdBt1Et6xgAVkQSHyDWDI',
  authDomain: 'dcompute-16d7b.firebaseapp.com',
  projectId: 'dcompute-16d7b',
  storageBucket: 'dcompute-16d7b.appspot.com',
  messagingSenderId: '270954567071',
  appId: '1:270954567071:web:3d66eddae32f1b3f73d9aa',
}

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const db = firebase.firestore()
