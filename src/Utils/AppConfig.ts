class AppConfig {
  public readonly couponsUrl: string =
    "https://my-json-server.typicode.com/DanilVo/json-server-db/coupons/";

  public readonly usersUrl: string =
    "https://my-json-server.typicode.com/DanilVo/json-server-db/users/";
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
