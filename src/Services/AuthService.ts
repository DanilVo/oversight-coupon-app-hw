import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import { AuthAction, ActionTypes, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

/*
  Functionality that is presented in this service: 
  - Login
  - Logout
*/

class AuthService {
  public async logIn(credentials: CredentialsModel): Promise<void> {
    const { data } = await axios.get(
      appConfig.usersUrl +
        `?email=${credentials.email}&password=${credentials.password}`
    );
    const authAction: AuthAction = {
      type: ActionTypes.Login,
      payload: data,
    };
    authStore.dispatch(authAction);
  }

  public logout(): void {
    const action: AuthAction = { type: ActionTypes.Logout };
    authStore.dispatch(action);
  }
}

const authService = new AuthService();

export default authService;
