import * as actionTypes from "../../constants/actionTypes";
import initialState from '../initialState';
import { LocalStorage } from '../../common/helpers';

const authState = initialState.get('autentication');

const authReducer = (state = authState, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_LOADED:
      return state
          .set('isAuthenticated', true)
          .set('loading', false)
          .set('user', payload)
    case actionTypes.AUTH_ERROR:
      LocalStorage.remove("token");
      return  state
          .set('token', null)
          .set('isAuthenticated', false)
          .set('loading', false)
          .set('user', null)
    case actionTypes.REGISTER_SUCCESS:
      LocalStorage.set("token", payload.get('token'));
      return state
          .set('token', payload.get('token'))
          .set('isAuthenticated', true)
          .set('loading', false)
    case actionTypes.REGISTER_FAIL:
      LocalStorage.remove("token");
      return  state
          .set('token', null)
          .set('isAuthenticated', false)
          .set('loading', false)
          .set('user', null)
    case actionTypes.LOGIN_SUCCESS:
      LocalStorage.set("token", payload.get('token'));
      return state
          .set('token', payload.get('token'))
          .set('isAuthenticated', true)
          .set('loading', false)
    case actionTypes.LOGIN_FAIL:
      LocalStorage.remove("token");
      return  state
          .set('token', null)
          .set('isAuthenticated', false)
          .set('loading', false)
          .set('user', null)
    case actionTypes.LOGOUT:
      LocalStorage.remove("token");
      return  state
          .set('token', null)
          .set('isAuthenticated', false)
          .set('loading', false)
          .set('user', null)
    default:
      return state;
  }
};

export default authReducer;