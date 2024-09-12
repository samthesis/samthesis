/**
 * Define all messages use in app
 */
export const NO_INTERNET = 'Seems your device is not connected with internet.';
export const LOCATION_ALERT_TITLE = 'Location Access Required';
export const LOCATION_ALERT_MESSAGE =
  'This App needs to access your location to provide the best experience.';
export const INVALID_DOMAIN_MSG = 'Invalid email format';
export const VALID_EMAIL_MSG = 'Please enter valid email address';
export const REQUIRED_EMAIL_MSG = 'Email Address is Required';
export const REQUIRED_USERNAME_MSG = 'User Name is Required';
export const REQUIRED_PASSWORD_MSG = 'Password is Required';
export const REQUIRED_CPASSWORD_MSG = 'Confirm Password is Required';
export const CPASSWORD_MATCH_MSG = 'Password Must Match!';
export const SELECT_DATE = 'Please Select Date!';
export const SELECT_DURATION = 'Please Select Duration!';
export const STRONG_PWD_MSG =
  'Password must include at least one uppercase letter, one lowercase letter, and one special character (e.g., !, @, #).';
export const IS_REQUIRED_MSG = 'is required';

export const PASSWORD_LEN_MSG = (min: any) => {
  return `Password must be at least ${min} characters`;
};
