import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.BOOKLYER_FIREBASE_API_KEY,
  authDomain: process.env.BOOKLYER_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.BOOKLYER_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.BOOKLYER_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.BOOKLYER_FIREBASE_PROJECT_ID,
  storageBucket: process.env.BOOKLYER_FIREBASE_STORAGE_BUCKET,
}

let initialized = false
let auth
let db

if (process.env.NODE_ENV !== 'test') {
  if (!initialized) {
    firebase.initializeApp(config)
    auth = firebase.auth()
    db = firebase.firestore()
    initialized = true
  }
}

export { auth, db }
