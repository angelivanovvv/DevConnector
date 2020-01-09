import { fromJS } from 'immutable';
import Axios from '../common/api/axios';

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const transformResponse = response => response ? fromJS(response) : response;
export const transformError = error => error ? fromJS(error) : error;

export const setAuthToken = token => {
  if (token) Axios.defaults.headers.common['x-auth-token'] = token;
  else delete Axios.defaults.headers.common['x-auth-token'];
}