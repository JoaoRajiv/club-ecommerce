import User from '../../../types/user.types'
import UserActionTypes from './user.action-types'

interface loginUserAction {
  type: typeof UserActionTypes.LOGIN
  payload: User
}

export const loginUser = (payload: User): loginUserAction => {
  return {
    type: UserActionTypes.LOGIN,
    payload
  }
}

interface logoutUserAction {
  type: typeof UserActionTypes.LOGOUT
}

export const logoutUser = (): logoutUserAction => {
  return {
    type: UserActionTypes.LOGOUT
  }
}

export type UserActions = loginUserAction | logoutUserAction
