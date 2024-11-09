import { legacy_createStore as createStore } from 'redux';
import UserModel from '../Models/UserModel';

class AuthState {
  public user: UserModel = null ;
}

export enum AuthActionTypes {
  Login = 'Login',
  Logout = 'Logout',
  NewUser = 'NewUser',
}

export interface AuthAction {
  type: AuthActionTypes;
  payload?: any;
}

function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionTypes.Login:      
      const userPayload = action.payload.data.find(
        (u: UserModel) =>
          u.password === btoa(action.payload.password) &&
        u.email === action.payload.email
      );
      if (userPayload) {
        const { id, password, ...userWithoutSensitiveInfo } = userPayload;
        newState.user = userWithoutSensitiveInfo;
        
        const token = btoa(JSON.stringify(newState.user))
        localStorage.setItem('token', token);
      }
      break;

    case AuthActionTypes.Logout:
      newState.user = null;
      localStorage.removeItem('token');
      break;

    case AuthActionTypes.NewUser:
      break;
  }

  return newState
}

export const authStore = createStore(authReducer);
