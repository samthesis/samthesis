/**
 * Define all common alerts used here.
 */
import { Alert } from 'react-native';
import * as Constants from '@utilities/constants';
import Snackbar from 'react-native-snackbar';
import colors from '@utilities/colors';

/**
 * define alert
 * @param {*} title - title of the alert
 * @param {*} message - message show on alert
 * @returns
 */
export const showMessageAlert = (title: string, message: string) => {
  setTimeout(() => {
    Alert.alert(
      title,
      message,
      [
        {
          text: Constants.BUTTON_TEXT_OK,
        },
      ],
      { cancelable: false },
    );
  }, 100);
};

/**
 * Define Snackbar message
 * @param {*} message - message show on Snackbar.
 */
type SnackbarType = 'success' | 'error';
export const showSnackbarMessage = (message: string, type: SnackbarType = 'success') => {
  const backgroundColor = type === 'error' ? 'red' : colors.COLOR_BLUE;

  setTimeout(() => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: backgroundColor,
    });
  }, 100);
};
