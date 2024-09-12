/**
 *
 * define all validation function here...
 *
 */
import * as Yup from 'yup';
import * as Messages from '@utilities/messages';

//validate email id
export function validateEmail(email: string) {
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
}

//validate for empty value
export function emptyTextValidation(inputs: string) {
  if (
    inputs === '' ||
    inputs === undefined ||
    inputs === null ||
    inputs === 'null' ||
    inputs.trim() === ''
  ) {
    return true;
  }
  return false;
}

//validate for empty value
export function emptyValidation(input: string) {
  return Yup.string().trim().required(`${input} ${Messages.IS_REQUIRED_MSG}`);
}

//validate password
export function isValidPassword(password: string) {
  const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,}$/;
  if (!re.test(password)) {
    return true;
  } else {
    return false;
  }
}

//Validate Email
export function emailValidation() {
  // return Yup.string()
  //   .trim()
  //   .email(Messages.VALID_EMAIL_MSG)
  //   .required(Messages.REQUIRED_EMAIL_MSG);

  return Yup.string()
    .trim()
    .email(Messages.VALID_EMAIL_MSG)
    .required(Messages.REQUIRED_EMAIL_MSG)
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      Messages.INVALID_DOMAIN_MSG,
    );
}

//Validate Name
export function nameValidation() {
  return Yup.string().trim().required(Messages.REQUIRED_USERNAME_MSG);
}

//Validate Password
export function passwordValidation() {
   const passwordRules =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]*$/
  return (
    Yup.string()
      .trim()
      .required(Messages.REQUIRED_PASSWORD_MSG)
      .matches(
        passwordRules,
        Messages.STRONG_PWD_MSG
      )
      .min(8, ({min}) => Messages.PASSWORD_LEN_MSG(min))
  );
}

//Validate Confirm Password
export function confirmPasswordValidation(password: string) {
  return Yup.string()
    .trim()
    .required(Messages.REQUIRED_CPASSWORD_MSG)
    .oneOf([Yup.ref(password), ''], Messages.CPASSWORD_MATCH_MSG);
}

