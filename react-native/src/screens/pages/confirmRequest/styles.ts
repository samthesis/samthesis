import colors from '@utilities/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.COLOR_WHITE,
  },
  headingText: {
    color: colors.COLOR_BLACK,
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    marginTop: 5,
    fontSize: 10,
    //fontWeight: 'bold',
    color: colors.COLOR_BLACK,
    //textAlign: 'center'
  },
  headerView: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
  },

  img: {height: 40, width: 40},
  Confirmimg: {
    height: 90,
    width: 90,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
  },

  btnStyle: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60,
    width: 150,
    margin: 20,
  },
  btnMarkCompStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.COLOR_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60,
    width: 250,
    margin: 20,
  },
  btnText: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  btnBlueText: {
    fontSize: 18,
    color: colors.COLOR_BLUE,
    fontWeight: 'bold',
  },
  devider: {
    height: 1,
    margin: 10,
    backgroundColor: colors.COLOR_GRAY,
  },

  greenBg: {
    //height: 200,
    borderRadius: 5,
    backgroundColor: 'lightgreen',
    opacity: 0.6,
    margin: 20,
    marginTop: 50,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'green',
    alignItems: 'center',
    padding: 20
  },
  greenText: {
    fontSize: 16,
    color: 'green',
  },

  greenTextBold: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  }
});

export default styles;
