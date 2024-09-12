/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {register} from '@redux/actions/AuthActionCreator';
import * as Constants from '@utilities/constants';
import styles from './styles';
import {globalStyles} from '@common/globalStyles';
import {ButtonComponent, TextViewComponent} from '@common/viewComponents';
import {Field, Formik} from 'formik';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from '@src/utilities/validationsUtils';
import * as Yup from 'yup';
import AppInputComponent from '@src/common/AppInput';
import { showSnackbarMessage } from '@src/utilities/alertUtils';

function UserName({navigation}: any) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  //  Validate input fileds
  const validateLoginSchema = Yup.object().shape({
    name: nameValidation(),
    emailAddress: emailValidation(),
    password: passwordValidation(),
  });

  // Set Initial Values for input fields
  const initialValues = {emailAddress: '', password: '', name: ''};
  useEffect(() => {
    console.log('UserName--screen----');
  }, []);
  const _register = async (values: any) => {
    if(isLoading) {return;}
    setLoading(true);
    let walletAddress = await AsyncStorage.getItem(Constants.KEY_WALLET_ADD);
    let currentLongitude = await AsyncStorage.getItem(Constants.KEY_LONG);
    let currentLatitude = await AsyncStorage.getItem(Constants.KEY_LAT);

    console.log('Wallet Address Storage', walletAddress);

    dispatch(
      register(
        {
          wallet_address: walletAddress,
          user_name: values.name,
          email: values.emailAddress,
          password: values.password,
          latitude: currentLatitude,
          longitude: currentLongitude,
          active: true,
        },
        response => {
          console.log(response, ' user token');
          setLoading(false);
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

  const goToSignIn = () => {
    navigation.navigate(Constants.NAV_KEY_LOGIN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={globalStyles.titleText}>{Constants.TEXT_SIGN_UP}</Text>
        <Text style={[globalStyles.SubtitleText, styles.mBottom]}>
          {Constants.TEXT_GET_START}
        </Text>
      </View>
      <View style={{padding: 42}}>
        <Text style={styles.text}>{Constants.TEXT_SIGN_UP}</Text>
        <View>
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              _register(values);
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
                    placeholder={Constants.PLACEHOLDER_USER_NAME}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                  />
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
                    title={Constants.TEXT_SIGN_UP}
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
          text={Constants.TEXT_SIGN_IN}
          onPress={goToSignIn}
          style={styles.textBlue}
        />
      </View>
    </View>
  );
}

export default UserName;
