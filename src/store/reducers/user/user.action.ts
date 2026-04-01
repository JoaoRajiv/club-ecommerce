import User from '../../../types/user.types'
import UserActionTypes from './user.action-types'

export const loginUser = (payload: User) => {
  return {
    type: UserActionTypes.LOGIN,
    payload
  }
}

export const logoutUser = () => {
  return {
    type: UserActionTypes.LOGOUT
  }
}
