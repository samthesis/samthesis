import * as constants from '../constants/constants';

const defautState = {
  token: null,
};
const INITIAL_STATE = defautState;

export default function authReducer(
  state = INITIAL_STATE,
  action: {type: any; payload: any},
) {
  switch (action.type) {
    case constants.ON_REG_USER:
      console.log('REG USER', action.payload);
      return {...action.payload};
    case constants.SET_AUTH_TOKEN: // Handle the new action to set the token
      console.log('Setting token from AsyncStorage', action.payload);
      return {...state, token: action.payload.token};
    default:
      return state;
  }
}
