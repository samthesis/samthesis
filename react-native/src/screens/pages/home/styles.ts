import colors from '@src/utilities/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  page: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#F5FCFF"
  },
  container: {
    flex: 1,
    backgroundColor: colors.COLOR_WHITE,
  },
  map: {
    flex: 1,
  },
  topView: {
    position: 'absolute',
    top: 20,
    width: '100%',
    padding: 10,
    height: 120,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    height: 120,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    alignItems: 'center',
  },
  popCircle: {
    width: 50,
    height: 50,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 30, // Half of the width and height to make a circle
    backgroundColor: 'red', // Circle background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderColor: '#B182E1',
    borderWidth: 1,
    borderRadius: 20, // Half of the width and height to make a circle
    backgroundColor: '#B182E1', // Circle background color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleText: {
    color: '#fff',
    fontSize: 16,
  },
  popCircleText: {
    color: 'white',
    fontSize: 26,
  },
  annotationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  annotationFill: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  annotationText: {
    color: 'white',
    fontSize: 12,
  },
  locationSymbol: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
  },
  locationInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  locationText: {
    // color: 'red',
    color: colors.COLOR_BLUE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  modalView: {
    width: '100%',
    height: 270,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSmallText: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  modalText: {
    color: 'black',
    marginTop: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  centeredView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  filterItem: {
    backgroundColor: '#fff',
    borderColor: '#093177',
    borderWidth: 1,
    width: 107,
    height: 37,
    borderRadius: 100,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {color: '#093177', fontSize: 12, fontWeight: 'bold'},
  serviceListView: {
    backgroundColor: '#EFEFEF',
    flex: 1,
    flexDirection: 'row',
    borderColor: '#EFEFEF',
    height: 62,
    borderRadius: 7,
    padding: 5,
    marginBottom: 14,
  },
});

export default styles;
