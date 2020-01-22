export const settings = {
  protocol: "http://",
  prodProtocol: "https://",
  basePath: "localhost:5000",
  prodBasePath: "whispering-tor-02190.herokuapp.com"
};

export const config = Object.freeze({
  baseURL: `${settings.prodProtocol}${settings.prodBasePath}`,
  headers: {
    "Content-Type": "application/json"
  }
});
