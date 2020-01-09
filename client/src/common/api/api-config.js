export const settings = {
  protocol: "http://",
  basePath: "localhost:5000"
};

export const config = Object.freeze({
  baseURL: `${settings.protocol}${settings.basePath}`,
  headers: {
    "Content-Type": "application/json"
  }
});
