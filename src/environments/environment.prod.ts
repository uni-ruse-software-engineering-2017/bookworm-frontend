export const environment = {
  production: true,
  host: "http://localhost:3000",
  get api() {
    return `${this.host}/api`;
  }
};
