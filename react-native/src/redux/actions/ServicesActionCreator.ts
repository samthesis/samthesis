import * as constants from '../constants/constants';
import * as apiConstants from '../../common/api';

export const getServices = (
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.GET_SERVICES,
    success: (response: any) => setServices(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const getUsersByServiceId = (
  data: {longitude: number; latitude: number; serviceId: number},
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.GET_SERVICE_BY_ID,
    data,
    success: (response: any) => setServicesByServiceId(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const addUsersServices = (
  data: {data: any},
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.ADD_USER_SERVICES,
    data,
    success: (response: any) =>
      onApiSuccess(response, constants.ON_ADD_SERVICES),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const requestForService = (
  data: {data: any},
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.REQUEST_SERVICES,
    data,
    success: (response: any) =>
      onApiSuccess(response, constants.ON_REQUEST_SERVICE),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const getMyRequestedServices = (
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.GET_MY_REQUESTED_SERVICES,
    success: (response: any) =>
      onApiSuccess(response, constants.ON_REQUESTED_SERVICES),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const getMyProvidedServices = (
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.GET_MY_PROVIDED_SERVICES,
    success: (response: any) =>
      onApiSuccess(response, constants.ON_PROVIDED_SERVICES),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const acceptServiceRequest = (
  data: {data: any},
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.ACCEPT_REQUEST,
    data,
    success: (response: any) =>
      onApiSuccess(response, constants.ON_API_SUCCESS),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const markAsComplete = (
  data: {data: any},
  onSuccess: (response: any) => void,
  onError: (error: any) => Promise<void>,
) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: apiConstants.MARKED_COMPLETE,
    data,
    success: (response: any) =>
      onApiSuccess(response, constants.ON_API_SUCCESS),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

const setServices = (data: {data: any}) => {
  var serviceData = data.data;
  //console.log('setServices:', serviceData);
  return {type: constants.ON_SERVICES, payload: {serviceData}};
};

const setServicesByServiceId = (data: {data: any}) => {
  var serviceData = data.data;
  //console.log('setServices:', serviceData);
  return {type: constants.ON_SERVICES_BY_ID, payload: {serviceData}};
};

const addServices = (data: {data: any}) => {
  console.log('setServices:', data);
  return {type: constants.ON_ADD_SERVICES, payload: {data}};
};

const onApiSuccess = (data: any, type: string) => {
  //console.log('setServices:', data);
  return {type: type, payload: data.data};
};
