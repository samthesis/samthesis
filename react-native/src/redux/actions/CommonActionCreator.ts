import * as constants from '../constants/constants';
import * as apiConstants from '../../common/api';

export const getUserProfile = (
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.GET_PROFILE,
    success: (response: any) =>
      onApiSuccess(response, constants.ON_API_SUCCESS),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

const onApiSuccess = (data: any, type: string) => {
  //console.log('setServices:', data);
  return {type: type, payload: data.data};
};
