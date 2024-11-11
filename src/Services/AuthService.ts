import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CredentialsModel from "../Models/CredentialsModel";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";

class AuthService {
  public async logIn(credentials: CredentialsModel): Promise<void> {
    const { data } = await axios.get(
      appConfig.usersUrl +
        `?email=${credentials.email}&pass=${credentials.password}`
    );
    const authAction: AuthAction = {
      type: AuthActionTypes.Login,
      payload: data,
    };
    authStore.dispatch(authAction);
  }

  public async getSingleUser(id: string): Promise<any> {    
    const { data } = await axios.get(appConfig.usersUrl + id);
    const authAction: AuthAction = {
      type: AuthActionTypes.GetUser,
      payload: data,
    };    
    authStore.dispatch(authAction);
    return data
  }

  public logout(): void {
    const action: AuthAction = { type: AuthActionTypes.Logout };
    authStore.dispatch(action);
  }
}

const authService = new AuthService();

export default authService;
