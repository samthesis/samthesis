/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */
// Import polyfills
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureReduxStore from './src/redux/store/configureReduxStore';
const store = configureReduxStore();
//activeChain="mumbai"
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
