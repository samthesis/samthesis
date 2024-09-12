import colors from '@src/utilities/colors';
import {StyleSheet} from 'react-native';
// import AppConfig from 'appConfig';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.LIGHT_BG,
    alignItems: 'center',
    //justifyContent: 'center',
    height: 50,
    marginBottom: 5,
    paddingLeft: 10,
  },
});

export default styles;
