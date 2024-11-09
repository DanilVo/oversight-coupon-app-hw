import axios from 'axios';
import appConfig from '../Utils/AppConfig';
import CredentialsModel from '../Models/CredentialsModel';
import { AuthAction, AuthActionTypes, authStore } from '../Redux/AuthState';

class AuthService {
  public async logIn(credentials: CredentialsModel): Promise<void> {
    const { data } = await axios.get(appConfig.usersUrl);    
    const authAction: AuthAction = {
      type: AuthActionTypes.Login,
      payload: { ...credentials, data },
    };
    authStore.dispatch(authAction);
  }

  public logout(): void {
    const action: AuthAction = { type: AuthActionTypes.Logout };
    authStore.dispatch(action);
  }

  public createNewUser(): void {}
}

const authService = new AuthService();

export default authService;
