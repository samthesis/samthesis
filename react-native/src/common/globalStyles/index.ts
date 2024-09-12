// globalStyles.js
import Colors from '@utilities/colors';
import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COLOR_WHITE,
  },
  titleText: {
    fontSize: 26,
    color: Colors.HEADING_TEXT_COLOR,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    color: Colors.COLOR_WHITE,
    //fontWeight: 'bold',
  },
  SubtitleText: {
    fontSize: 15,
    color: Colors.SUB_HEADING_TEXT_COLOR,
  },
  buttonText: {
    color: Colors.COLOR_WHITE,
    fontSize: 18,
  },
  inputError: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  inputStyle: {
    width: 250,
    color:  Colors.SUB_HEADING_TEXT_COLOR,
    fontSize: 14,
  },
});
