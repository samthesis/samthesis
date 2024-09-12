import Colors from '@utilities/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
    justifyContent: 'center',
  },

  headerView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  mBottom: {
    marginBottom: 20,
  },
  text: {
    color: Colors.HEADING_TEXT_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 27,
  },
  textLight: {
    color: Colors.SUB_HEADING_TEXT_COLOR,
    fontSize: 15,
    flex: 8,
  },
  inputView: {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    height: 50,
    marginBottom: 5,
  },
  textBlue: {
    color: Colors.COLOR_BLUE,
    fontSize: 15,
  },
});

export default styles;
