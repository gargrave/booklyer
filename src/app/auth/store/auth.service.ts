import { auth } from 'config/firebase'

const authService = {
  async login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch(error => {
          reject(error)
        })
    })
  },

  async register(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch(error => {
          reject(error)
        })
    })
  },
}

export default authService
