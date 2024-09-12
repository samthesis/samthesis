/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {signIn} from '@redux/actions/AuthActionCreator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from '@utilities/constants';
import styles from './styles';
import {globalStyles} from '@common/globalStyles';
import {ButtonComponent, TextViewComponent} from '@common/viewComponents';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import {
  emailValidation,
  emptyValidation,
} from '@src/utilities/validationsUtils';
import AppInputComponent from '@src/common/AppInput';
import { showSnackbarMessage } from '@src/utilities/alertUtils';

const Login = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setLoading] = useState(false);
  //  Validate input fileds
  const validateLoginSchema = Yup.object().shape({
    emailAddress: emailValidation(),
    password: emptyValidation(Constants.PASSWORD_PLACEHOLDER),
  });

  // Set Initial Values for input fields
  const initialValues = {emailAddress: '', password: ''};

  useEffect(() => {}, []);

  // Handle login user button click
  const _loginUser = async (values: any) => {
    if(isLoading) {return;}
    setLoading(true);
    // let currentLongitude = await AsyncStorage.getItem(Constants.KEY_LONG);
    // let currentLatitude = await AsyncStorage.getItem(Constants.KEY_LAT);

    // console.log('From Storage', currentLatitude);
    // console.log('From Storage', currentLongitude);
    let request = {
      email: values.emailAddress,
      password: values.password,
      wallet_address: walletAddress,
    };
    dispatch(
      signIn(
        request,
        async response => {
          //console.log(response, ' user token');
          setLoading(false);
          await AsyncStorage.setItem(Constants.KEY_WALLET_ADD, walletAddress);
          navigation.navigate(Constants.NAV_KEY_CONNECT);
          showSnackbarMessage(response.message);
        },
        async error => {
          console.log('my error', error);
          setLoading(false);
          showSnackbarMessage(error, Constants.TYPE_ERROR);
        },
      ),
    );
  };

  const goToSignUp = () => {
    AsyncStorage.setItem(Constants.KEY_WALLET_ADD, walletAddress);
    navigation.navigate(Constants.NAV_KEY_REG);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={globalStyles.titleText}>{Constants.TEXT_SIGN_IN}</Text>
        <Text style={[globalStyles.SubtitleText, styles.mBottom]}>
          {Constants.TEXT_GET_START}
        </Text>
      </View>
      <View style={{padding: 42}}>
        <Text style={styles.text}>{Constants.TEXT_SIGN_IN}</Text>
        <View>
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              _loginUser(values);
            }}
            validationSchema={validateLoginSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => {
              return (
                <View>
                  <Field
                    as={AppInputComponent}
                    placeholder={Constants.EMAIL_PLACEHOLDER}
                    onChangeText={handleChange('emailAddress')}
                    onBlur={handleBlur('emailAddress')}
                    value={values.emailAddress}
                    error={errors.emailAddress}
                    touched={touched.emailAddress}
                    keyboardType={'email-address'}
                  />
                  <Field
                    as={AppInputComponent}
                    placeholder={Constants.PASSWORD_PLACEHOLDER}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secure={true}
                    error={errors.password}
                    touched={touched.password}
                  />
                  <ButtonComponent
                    isLoading={isLoading}
                    title={Constants.TEXT_SIGN_IN}
                    onPress={() => handleSubmit()}
                  />
                </View>
              );
            }}
          </Formik>
        </View>
      </View>

      <View
        style={[
          {
            flexDirection: 'row',
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
          },
        ]}>
        <TextViewComponent
          text={Constants.TEXT_NO_ACCOUNT}
          style={[styles.text, {fontWeight: 'normal'}]}
        />

        <TextViewComponent
          text={Constants.TEXT_SIGN_UP}
          onPress={goToSignUp}
          style={styles.textBlue}
        />
      </View>
    </View>
  );
};

export default Login;
