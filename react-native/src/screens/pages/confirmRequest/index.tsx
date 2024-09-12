import AppHeader from '@common/Header';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import * as Constants from '@utilities/constants';
import styles from './styles';
import {ButtonComponent} from '@src/common/viewComponents';
import {showSnackbarMessage} from '@src/utilities/alertUtils';
import {useDispatch} from 'react-redux';
import {
  acceptServiceRequest,
  markAsComplete,
} from '@src/redux/actions/ServicesActionCreator';
import ConfirmRequestView from './confirmRequest';
import moment from 'moment';

// Import images and icons
const Icons = {
  BackIcon: require('@assets/next.png'),
  InfoIcon: require('@assets/info.png'),
};
const ConfirmRequest = ({navigation, route}: any) => {
  const [isLoading, setLoading] = useState(false);
  const [showConfirmedView, setShowConfirmedView] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('route-----', route.params);
  // }, [route]);

  /**
   * Handle reaquest service buttom click
   */
  const requestService = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);

    let request: any = {
      id: route?.params?.item?.id,
    };

    //console.log('requestService--', request);
    dispatch(
      acceptServiceRequest(
        request,
        async response => {
          //console.log('getAllServices---', response);
          setLoading(false);
          //showSnackbarMessage(response.message);
          setShowConfirmedView(true);
          //navigation.goBack();
        },
        async error => {
          console.log('my error', error);
          setLoading(false);
        },
      ),
    );
  };

  /**
   * Handle mark complete buttom click
   */
  const markComplete = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);

    let request: any = {
      id: route?.params?.item?.id,
    };

    //console.log('markComplete--', request);
    dispatch(
      markAsComplete(
        request,
        async response => {
          //console.log('markComplete---', response);
          setLoading(false);
          showSnackbarMessage(response.message);
          navigation.goBack();
        },
        async error => {
          console.log('my error', error);
          setLoading(false);
        },
      ),
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={Constants.TEXT_CONFIRM_REQUEST}
        leftIcon={true}
        rightIcon={true}
        lIcon={Icons.BackIcon}
        rIcon={Icons.InfoIcon}
        onLeftPress={() => {
          navigation.goBack();
          setShowConfirmedView(false);
        }}
      />

      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.img}
              source={{uri: route?.params?.item?.image}}
            />
            <Text style={styles.headingText}>
              {route?.params?.item?.service_name}
            </Text>
          </View>
          <View style={styles.headerView}>
            <Text style={[styles.headingText, {textAlign: 'right'}]}>
              {route?.params?.item?.from_user_name}
            </Text>
            <Text style={styles.smallText}>
              {'Confirm on ' + moment(route?.params?.item?.date, 'DD-MM-YYYY').format('DD-MMM-YYYY')}
            </Text>
          </View>
        </View>

        <View style={styles.devider} />

        {route?.params?.item?.status === 0 && !showConfirmedView && (
          <View>
            <Text style={[styles.headingText]}>
              {Constants.TEXT_SERVICE_CHARGES}
            </Text>
            <Text style={[styles.headingText, {fontSize: 28}]}>$10</Text>
            <ButtonComponent
              //isLoading={isLoading}
              title={Constants.TEXT_ACCEPT}
              btnStyle={styles.btnStyle}
              onPress={() => requestService()}
              textStyle={styles.btnText}
              bgColor={'#fff'}
            />
          </View>
        )}

        {route?.params?.item?.status === 2 && (
          <View>
            <Text
              style={[
                styles.headingText,
                {
                  color: 'orange',
                },
              ]}>
              {Constants.TEXT_TASK_STARTED}
            </Text>
            <Text style={[styles.headingText, {fontSize: 28, color: 'orange'}]}>
              $10
            </Text>
            <ButtonComponent
              //isLoading={isLoading}
              title={Constants.TEXT_MARK_COMPLETED}
              btnStyle={styles.btnMarkCompStyle}
              onPress={() => markComplete()}
              textStyle={styles.btnBlueText}
              bgColor={'#fff'}
            />
          </View>
        )}
        {showConfirmedView && (
          <ConfirmRequestView
            duration={route?.params?.item?.duration}
            date={moment(route?.params?.item?.date, 'DD-MM-YYYY').format('DD-MMM-YYYY')}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ConfirmRequest;
