import AppHeader from '@common/Header';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import * as Constants from '@utilities/constants';
import * as Messages from '@utilities/messages';
import styles from './styles';
import {globalStyles} from '@common/globalStyles';
import DatePickerComponent from '@src/common/DatePickerView';
import AppInputComponent from '@src/common/AppInput';
import {ButtonComponent} from '@src/common/viewComponents';
import colors from '@src/utilities/colors';
import {showMessageAlert, showSnackbarMessage} from '@src/utilities/alertUtils';
import {useDispatch} from 'react-redux';
import {requestForService} from '@src/redux/actions/ServicesActionCreator';
import StarRating from 'react-native-star-rating-widget';

// Import images and icons
const Icons = {
  BackIcon: require('@assets/next.png'),
  InfoIcon: require('@assets/info.png'),
};
const RequestService = ({navigation, route}: any) => {
  const [isLoading, setLoading] = useState(false);
  const [date, setDate] = useState(Constants.TEXT_DATE);
  const [duration, setDuration] = useState(Constants.TEXT_DURATION);
  const [pickerDateModal, setPickerDateModal] = useState(false);
  const [pickerTimeModal, setPickerTimeModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('route-----', route.params);
  }, [route]);

  /**
   * Handle reaquest service buttom click
   */
  const requestService = () => {
    if (date === Constants.TEXT_DATE) {
      showMessageAlert(Constants.TITLE_ALERT, Messages.SELECT_DATE);
      return;
    }
    if (duration === Constants.TEXT_DURATION) {
      showMessageAlert(Constants.TITLE_ALERT, Messages.SELECT_DURATION);
      return;
    }

    if (isLoading) {
      return;
    }
    setLoading(true);

    let request: any = {
      toUserId: route?.params?.userId ? route?.params?.userId.toString() : '0',
      amount: 1,
      paymentType: 'credit card',
      longitude: 0,
      latitude: 0,
      duration: duration,
      date: date,
      serviceId: route?.params?.serviceId
        ? route?.params?.serviceId.toString()
        : '0',
    };

    //console.log('requestService----', request);
    dispatch(
      requestForService(
        request,
        async response => {
          // console.log('getAllServices---', response);
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
        title={Constants.TEXT_REQUEST_SERVICE}
        leftIcon={true}
        rightIcon={true}
        onLeftPress={() => navigation.goBack()}
        lIcon={Icons.BackIcon}
        rIcon={Icons.InfoIcon}
      />
      <ScrollView style={styles.container}>
        <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
          <View style={styles.row}>
            <View style={styles.userNameCircle}>
              <Text style={globalStyles.titleText}>
                {route?.params?.userName?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
            <View style={styles.headerView}>
              <Text style={styles.headingText}>{route?.params?.userName}</Text>
              <Text style={styles.smallText}>XXX7894</Text>
            </View>
          </View>
          <View>
            <StarRating
              rating={4.1}
              onChange={rating => console.log('rating---', rating)}
              emptyColor="gray"
              starSize={20}
            />
            <Text style={styles.smallText}>{'4.1/5(25 Ratings)'}</Text>
          </View>
        </View>

        <View style={styles.devider} />

        <Image style={styles.img} source={{uri: route?.params?.imageSource}} />
        <Text style={styles.headingText}>{route?.params?.serviceName}</Text>
        <View
          style={[
            styles.row,
            {justifyContent: 'space-between', margin: 20, marginTop: 40},
          ]}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setPickerDateModal(true)}>
            <Text style={globalStyles.SubtitleText}>{date}</Text>
            <DatePickerComponent
              modalVisible={pickerDateModal}
              setOpen={() => {
                setPickerDateModal(false);
              }}
              mode={'date'}
              onDateChange={(val: any) => {
                console.log('ondatechange values: ', val);
                setDate(val);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setPickerTimeModal(true)}>
            <Text style={globalStyles.SubtitleText}>{duration}</Text>
            <DatePickerComponent
              modalVisible={pickerTimeModal}
              setOpen={() => {
                setPickerTimeModal(false);
              }}
              mode={'time'}
              onDateChange={(val: string) => {
                console.log('ondatechange values: ', val);
                setDuration(val);
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <AppInputComponent placeholder={Constants.TEXT_LOCATION} />
        </View>
        <View style={styles.row}>
          <ButtonComponent
            //isLoading={isLoading}
            title={Constants.TEXT_COIN}
            btnStyle={styles.btnStyle}
            bgColor={colors.COLOR_BLUE}
            //onPress={() => handleSubmit()}
          />
          <ButtonComponent
            //isLoading={isLoading}
            title={Constants.TEXT_CASH}
            btnStyle={[styles.btnStyle, {borderWidth: 0}]}
            bgColor={colors.COLOR_GRAY}
            //onPress={() => handleSubmit()}
          />
        </View>
        <View style={styles.priceView}>
          <View></View>
          <Text style={globalStyles.titleText}>
            {'09.000'}
            <Text style={globalStyles.SubtitleText}>{' SST'}</Text>
          </Text>
          <Text style={styles.blueText}>{'$10'}</Text>
        </View>
        <ButtonComponent
          isLoading={isLoading}
          title={Constants.TEXT_REQUEST_SERVICE}
          btnStyle={[
            styles.btnStyle,
            {borderRadius: 30, borderWidth: 0, marginTop: 40},
          ]}
          bgColor={'lightgreen'}
          onPress={() => requestService()}
        />
      </ScrollView>
    </View>
  );
};

export default RequestService;
