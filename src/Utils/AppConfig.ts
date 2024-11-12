class AppConfig {

  public readonly couponsUrl: string = "http://159.89.39.164:4000/coupons/";

  public readonly usersUrl: string = "http://159.89.39.164:4000/users/";
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
