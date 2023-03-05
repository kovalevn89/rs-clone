class User {
  private static instance: User;
  private userToken: string;

  constructor() {
    this.userToken = '';

    // Singleton
    if (User.instance) {
      return User.instance;
    }

    User.instance = this;

    // read with first init
    this.loadLocalStorage();
  }

  private loadLocalStorage(): void {
    const userToken = localStorage.getItem('userToken');
    if (userToken !== null) {
      this.userToken = userToken;
    }
  }

  private saveLocalStorage(): void {
    localStorage.setItem('userToken', this.userToken);
  }

  public setToken(userToken: string) {
    this.userToken = userToken;
    this.saveLocalStorage();
  }

  public getToken(): string {
    return this.userToken;
  }

  run(): void {
  }
}

export default User;
