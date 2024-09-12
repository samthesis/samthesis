/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';

import Login from './src/screens/pages/login';
import MyTabs from './src/screens/navigation/tab';
import UserName from './src/screens/pages/username';
import WalletConnect from './src/screens/pages/walletConnect';
import RequestService from './src/screens/pages/requestService';
import ConfirmRequest from './src/screens/pages/confirmRequest';
import WelcomeScreen from './src/screens/pages/welcome';

import * as Constants from '@utilities/constants';
import * as Messages from '@utilities/messages';
import { MAPBOX_ACCESS_TOTEN } from '@common/api';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOTEN);

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === Constants.PLATEFORM_IOS) {
        await getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: Messages.LOCATION_ALERT_TITLE,
              message: Messages.LOCATION_ALERT_MESSAGE,
              buttonPositive: Constants.BUTTON_TEXT_OK,
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await getOneTimeLocation();
          } else {
            console.warn('Location permission denied');
          }
        } catch (err) {
          console.error('Failed to request location permission:', err);
        }
      }
    };

    requestLocationPermission();
  }, []);

  const getOneTimeLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        async position => {
          const {longitude, latitude} = position.coords;
          await AsyncStorage.setItem(
            'currentLongitude',
            JSON.stringify(longitude),
          );
          await AsyncStorage.setItem(
            'currentLatitude',
            JSON.stringify(latitude),
          );
        },
        error => {
          console.error('Error fetching location:', error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000,
        },
      );
    } catch (error) {
      console.error('Error storing location:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Constants.NAV_KEY_WELCOME} component={WelcomeScreen} />
        <Stack.Screen name={Constants.NAV_KEY_CONNECT} component={WalletConnect} />
        <Stack.Screen name={Constants.NAV_KEY_LOGIN} component={Login} />
        <Stack.Screen name={Constants.NAV_KEY_TAB} component={MyTabs} />
        <Stack.Screen name={Constants.NAV_KEY_REG} component={UserName} />
        <Stack.Screen name={Constants.NAV_KEY_REQ_SERVICE} component={RequestService} />
        <Stack.Screen name={Constants.NAV_KEY_CONFIRM_REQ} component={ConfirmRequest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
