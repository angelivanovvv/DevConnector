import { fromJS } from "immutable";
import Axios from "../common/api/axios";

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const transformResponse = response =>
  response ? fromJS(response?.data) : response?.data;

export const transformError = error =>
  error ? fromJS(error?.response?.data?.msg) : error?.response?.data?.msg;

export const setAuthToken = token => {
  if (token) Axios.defaults.headers.common["x-auth-token"] = token;
  else delete Axios.defaults.headers.common["x-auth-token"];
};
