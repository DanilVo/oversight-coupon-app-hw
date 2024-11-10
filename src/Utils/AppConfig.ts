class AppConfig {
  public readonly couponsUrl: string = "http://localhost:3000/coupons/";

  public readonly usersUrl: string = "http://localhost:3000/users/";
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
