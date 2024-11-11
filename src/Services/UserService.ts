import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";

class UserService {
  public async inviteAdmin(user: UserModel): Promise<void> {
    await axios.post(appConfig.usersUrl, user);
  }
}

const userService = new UserService();

export default userService;
