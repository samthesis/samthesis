import axios from 'axios';
import * as constants from '../constants/constants';
import * as apiConstants from '../../common/api';

export const apiMiddleware =
  ({dispatch, getState}: any) =>
  (next: (arg0: any) => any) =>
  (action: {
    type: string;
    payload: {
      url: any;
      method: any;
      success: any;
      data: any;
      postProcessSuccess: any;
      postProcessError: any;
    };
  }) => {
    if (action.type !== constants.API) {
      return next(action);
    }
    // dispatch({type:constants.TOGGLE_LOADER});
    const BASE_URL = apiConstants.BASE_URL;
    //console.log('USER STATE', getState().user);
    const AUTH_TOKEN = getState().user.token;
    console.log('TOKEN-->>', AUTH_TOKEN);
    if (AUTH_TOKEN) {
      axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
    }
    const {url, method, success, data, postProcessSuccess, postProcessError} =
      action.payload;

      //console.log('data-->>', BASE_URL);

    axios({
      method,
      url: BASE_URL + url,
      data: data ? data : null,
      //formData: data ? data : null,
    })
      .then(response => {
        // dispatch({type:constants.TOGGLE_LOADER});
        if (success) {
          dispatch(success(response.data));
        }
        if (postProcessSuccess) {
          postProcessSuccess(response.data);
        }
      })
      .catch(err => {
        console.log('1');

        if (!err.response) {
          //  dispatch({type:constants.TOGGLE_LOADER});
          console.warn(err);
        } else {
          console.log('11');

          //dispatch({type:constants.TOGGLE_LOADER});
          // if(err.response && err.response.status=== 400)
          // dispatch(logoutUser());
          console.log('errors', err.response);
          if (err.response.data.error.message) {
            console.log('Entered');
            //   dispatch({type:constants.TOGGLE_LOADER});
            if (postProcessError) {
              postProcessError(err.response.data.error.message);
            }
          }
        }
      });
  };
