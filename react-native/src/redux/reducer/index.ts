import {combineReducers} from 'redux';
import user from './authReducer';
import services from './serviceReducer';
import activities from './activityReducer';

const rootReducer = combineReducers({
  user,
  services,
  activities,
});
export default rootReducer;
