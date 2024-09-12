import colors from '@utilities/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.COLOR_WHITE,
  },
  headingText: {
    color: colors.COLOR_BLACK,
    marginTop: 5,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  smallText: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.COLOR_BLACK,
    textAlign: 'center'
  },
  headerView: {
    //flex: 7,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    marginTop: 10,
  },
  row: {flexDirection: 'row', flex: 1},
  userNameCircle: {
    width: 50,
    height: 50,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 30, // Half of the width and height to make a circle
    backgroundColor: 'red', // Circle background color
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  img: {height: 80, width: 80, alignSelf: 'center', marginTop: 50},
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
    flex: 0.49
  },
  btnStyle: {
    flex: 0.5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.COLOR_BLUE,
    backgroundColor: colors.COLOR_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    margin: 20,
  },
  priceView: {
    alignItems: 'center', marginTop: 20
  },
  blueText: {
    fontSize: 16,
    color: colors.COLOR_BLUE,
    fontWeight: 'bold'
  },
  devider: {
    height: 1,
    margin: 10,
    backgroundColor: colors.COLOR_GRAY,
  },
});

export default styles;
