export const APP_VERSION = '1.0';
export const DEFAULT_TOKEN = 'MATIC';
export const DEFAULT_TOKEN_DECIMAL = 18;
// local server
//http://192.168.0.199:4000/api/v1/
//export const BASE_URL = 'http://192.168.0.199:4000/api/v1/'; //server

// http://13.239.30.115:4000/
export const BASE_URL = 'http://13.239.30.115:4000/api/v1/'; //server

// export const BASE_URL = 'http://134.122.64.108:4000/api/v1/';
export const MAPBOX_ACCESS_TOTEN = 'pk.eyJ1Ijoic2FteW1hcyIsImEiOiJjbHl4ODkzejUxcjZsMmpyNGp1NXFyZTVtIn0.9pcvK9FHYbW2Buixxy8yCQ'; //server

export const REG_USER = 'auth/register';
export const SIGN_USER = 'auth/sigin';
export const GET_SERVICES = 'member/getmyservices';
export const GET_SERVICE_BY_ID = 'member/getserviceproviders';
export const ADD_USER_SERVICES = 'member/adduserservices';
export const REQUEST_SERVICES = 'member/requestservice';
export const GET_MY_REQUESTED_SERVICES = 'member/getmyrequestedservices';
export const GET_MY_PROVIDED_SERVICES = 'member/getmyprovidedservices';
export const ACCEPT_REQUEST = 'member/acceptrequest';
export const MARKED_COMPLETE = 'member/markedcomplete';
export const GET_PROFILE = 'member/getprofile';

export const REG_DEVICE = 'auth/add_device';
export const GET_NEWS = 'member/get_news';
export const GET_NATIVE_TRANSACTIONS = 'member/get_address_logs';
export const GET_TOKEN_TRANSACTIONS = 'member/get_token_data';
export const GET_USER_BALANCE = 'member/get_user_balance';

export const GET_HELP_CONTENT = 'member/get_help';
export const GET_TUTORIALS = 'member/get_tutorials';
export const GET_FAQ = 'member/get_faq';
export const GET_BRIDGE_TOKEN = 'member/get_all_tokens';
