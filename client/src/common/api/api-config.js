export const settings = {
  protocol: "http://",
  prodProtocol: "https://",
  basePath: "localhost:5000",
  prodBasePath: "whispering-tor-02190.herokuapp.com"
};

export const config = Object.freeze({
  baseURL: `${settings.protocol}${settings.basePath}`,
  headers: {
    "Content-Type": "application/json"
  }
});
