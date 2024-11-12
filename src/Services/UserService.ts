import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthAction, ActionTypes, authStore } from "../Redux/AuthState";

/*
  Functionality that is presented in this service: 
  - Create new admin user
  - Get user by ID
*/

class UserService {
  public async inviteAdmin(user: UserModel): Promise<void> {
    await axios.post(appConfig.usersUrl, user);
  }

  public async getSingleUser(id: string): Promise<UserModel> {
    const { data } = await axios.get(appConfig.usersUrl + id);
    const action: AuthAction = {
      type: ActionTypes.GetUser,
      payload: data,
    };
    authStore.dispatch(action);
    return data;
  }
}

const userService = new UserService();

export default userService;
