/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import * as Constants from '@utilities/constants';
import styles from './styles';
import {globalStyles} from '@common/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {emptyTextValidation} from '@utilities/validationsUtils';
import {setAuthToken} from '@src/redux/actions/AuthActionCreator';
import {useDispatch} from 'react-redux';

const WelcomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      checkAlreadyLogin();
    }, 2000);
  }, []);

  /**
   * Check if user already ligin then navigate to home screen
   */
  const checkAlreadyLogin = async () => {
    let token = await AsyncStorage.getItem(Constants.KEY_AUTH_TOKEN);
    console.log('token--------------', token);
    if (token && !emptyTextValidation(token)) {
      dispatch(setAuthToken(token));
      navigation.navigate(Constants.NAV_KEY_TAB);
    } else {
      _goToNext();
    }
  };

  const _goToNext = async () => {
    navigation.navigate(Constants.NAV_KEY_LOGIN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeView}>
        <Text style={globalStyles.titleText}>{Constants.TEXT_WELCOME}</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
