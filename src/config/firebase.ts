import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { isDevEnv } from './env'
import { devConfig } from './firebaseConfig'

let initialized = false
let firebaseAuth
let db

if (!initialized) {
  // firebase.initializeApp(isDevEnv() ? devConfig : prodConfig)
  firebase.initializeApp(devConfig)
  firebaseAuth = firebase.auth()
  const firestore = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  firestore.settings(settings)
  db = firebase.firestore()
  initialized = true
}

export const fbTimestamp = () => firebase.firestore.FieldValue.serverTimestamp()

export { db, firebaseAuth }
