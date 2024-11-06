class AppConfig {
  public readonly couponsUrl: string = 'http://localhost:4000/api/------/';
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;
