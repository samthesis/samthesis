import colors from '@utilities/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.COLOR_WHITE,
  },
  headerView: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: '#4D8EFF',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoImage: {flex: 1.5, justifyContent: 'center', alignItems: 'center'},
  titleView: {flex: 8, justifyContent: 'center', alignItems: 'center'},
  title: {color: colors.COLOR_WHITE, fontSize: 18},
  listView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 36,
  },
  listItem: {
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#E9E9E9',
    borderWidth: 1,
    width: 153,
    height: 140,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleView: {
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    flex: 8,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.HEADING_TEXT_COLOR,
  },
  selectServiceView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 36,
  },
});

export default styles;
