export const settings = {
  protocol: "http://",
  basePath: "localhost:5000",
  prodBasePath: "whispering-tor-02190.herokuapp.com"
};

export const config = Object.freeze({
  baseURL: `${settings.protocol}${settings.prodBasePath}`,
  headers: {
    "Content-Type": "application/json"
  }
});
