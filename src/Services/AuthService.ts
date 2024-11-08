import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {
  public async logIn(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post(appConfig.usersUrl, credentials);
    const token = response.data;
    const authAction: AuthAction = {
      type: AuthActionTypes.Login,
      payload: token,
    };
    authStore.dispatch(authAction);
  }

  public logout(): void {
    const action: AuthAction = { type: AuthActionTypes.Logout };
    authStore.dispatch(action);
  }

  public createNewUser(): void {
    
  }
}

const authService = new AuthService();

export default authService;
