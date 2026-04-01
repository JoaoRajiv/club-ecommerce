export default interface User {
  firstName: string
  lastName: string
  email: string
  provider: 'google' | 'email'
}
