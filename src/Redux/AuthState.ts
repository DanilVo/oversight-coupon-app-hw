import { legacy_createStore as createStore } from "redux";
import UserModel from "../Models/UserModel";

class AuthState {
  users: UserModel[] = [];
}

enum AuthActionTypes {
  Login = "Login",
  Logout = "Logout",
  NewUser = "NewUser",
}

interface AuthAction {
  type: AuthActionTypes;
  payload?: unknown;
}

function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionTypes.Login:
      break;

    case AuthActionTypes.Logout:
      break;

    case AuthActionTypes.NewUser:
      break;
  }
}

export const authStore = createStore(authReducer);
