import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAzTxzIJcQWOLlMP0Y--Zv_PqPu43o-LFM',
  authDomain: 'club-ecommerce-abc39.firebaseapp.com',
  projectId: 'club-ecommerce-abc39',
  storageBucket: 'club-ecommerce-abc39.firebasestorage.app',
  messagingSenderId: '650749646986',
  appId: '1:650749646986:web:24176069ec523cb32e7573'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
