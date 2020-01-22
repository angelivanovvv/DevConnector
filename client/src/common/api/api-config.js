const isProd = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "production" ? true : false;

export const settings = {
  protocol: isProd() ? "https://" : "http://",
  basePath: isProd() ? "whispering-tor-02190.herokuapp.com" : "localhost:5000"
};

export const config = Object.freeze({
  baseURL: `${settings.protocol}${settings.basePath}`,
  headers: {
    "Content-Type": "application/json"
  }
});
