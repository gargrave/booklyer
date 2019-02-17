import { auth } from 'config/firebase'

const authService = {
  async login(email: string, password: string): Promise<any> {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password)
      return user
    } catch (error) {
      throw Error
    }
  },
}

export default authService
