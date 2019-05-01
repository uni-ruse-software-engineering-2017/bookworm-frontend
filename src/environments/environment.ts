export const environment = {
  production: false,
  host: "http://localhost:3000",
  get api() {
    return `${this.host}/api`;
  },
  stripeKey: "pk_test_5PlEY32jdaqOVXhbKZv9oIXF"
};
