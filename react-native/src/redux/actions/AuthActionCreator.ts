import * as constants from '../constants/constants';
import * as apiConstants from '../../common/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from '@utilities/constants';

export const signIn = (
  data: {email: string; password: string; wallet_address: string},
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.SIGN_USER,
    data,
    success: (response: any) => setUserInfo(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});
export const register = (
  data: {
    wallet_address: string | null;
    user_name: string;
    email: string;
    password: string;
    latitude: string | null;
    longitude: string | null;
    active: boolean;
  },
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.REG_USER,
    data,
    success: (response: any) => setUserInfo(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const registerDevice = (data: any, onSuccess: any, onError: any) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.REG_DEVICE,
    data,
    success: (response: any) => setUserInfo(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

const setUserInfo = (data: {data: any}) => {
  var token = data.data;
  console.log('user token:', token);
  AsyncStorage.setItem(Constants.KEY_AUTH_TOKEN, token);

  return {type: constants.ON_REG_USER, payload: {token}};
};


// actions.js
export const setAuthToken = (token: string) => ({
  type: constants.SET_AUTH_TOKEN,
  payload: { token },
});
