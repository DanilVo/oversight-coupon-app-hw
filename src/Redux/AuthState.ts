import { legacy_createStore as createStore } from "redux";
import UserModel from "../Models/UserModel";

class AuthState {
  public user: UserModel = null;
}

export enum AuthActionTypes {
  Login = "Login",
  Logout = "Logout",
  NewUser = "NewUser",
  GetUser = "GetUser",
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
    case AuthActionTypes.Login: {
      delete action.payload[0].password;
      newState.user = action.payload[0];
      const token = btoa(JSON.stringify(newState.user));
      localStorage.setItem("token", token);
      break;
    }

    case AuthActionTypes.GetUser: {
      delete action.payload.password;
      newState.user = action.payload;
      console.log("redux " +newState); 
      
      break;
    }

    case AuthActionTypes.Logout:
      newState.user = null;
      localStorage.removeItem("token");
      break;

    case AuthActionTypes.NewUser:
      break;
  }

  return newState;
}

export const authStore = createStore(authReducer);
