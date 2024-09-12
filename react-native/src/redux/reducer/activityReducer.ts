import * as constants from '../constants/constants';

const defaultState = {
  requestedServices: null,
  providedServices: null,
  recivedServices: null,
};
const INITIAL_STATE = defaultState;

export default function activityReducer(
  state = INITIAL_STATE,
  action: {type: any; payload: any},
) {
  switch (action.type) {
    case constants.ON_REQUESTED_SERVICES:
      return {
        ...state, // Keep the current state
        requestedServices: action.payload, // Update the `data` field
      };
    case constants.ON_PROVIDED_SERVICES:
      console.log('Demo USER', action.payload);
      return {
        ...state, // Keep the current state
        providedServices: action.payload, // Update the `servicesById` field
      };
    case constants.ON_RECIVED_SERVICES:
      console.log('Demo USER', action.payload);
      return {
        ...state, // Keep the current state
        recivedServices: action.payload, // Update the `servicesById` field
      };
    default:
      return state;
  }
}
