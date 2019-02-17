import { auth } from 'config/firebase'

const authService = {
  async login(email: string, password: string): Promise<any> {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password)
      return user
    } catch (error) {
      // TODO: figure out what htis error looks like, and handle it appropriately
      // console.log({ error })
      return error
    }
  },
}

export default authService
