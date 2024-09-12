/* eslint-disable @typescript-eslint/no-unused-vars */

import AppHeader from '@src/common/Header';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import * as Constants from '@utilities/constants';
import {
  getMyProvidedServices,
  getMyRequestedServices,
} from '@src/redux/actions/ServicesActionCreator';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

const Activities = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isRequested, setIsRequested] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const {requestedServices, providedServices, recivedServices} = useSelector(
    (state: any) => state.activities,
  );

  const filterData = [
    {
      id: 1,
      serviceName: 'Driving by car',
      userName: 'JIM',
      date: '08/07/2024',
      color: '#F5F5F5',
      imagePath: 'http://134.122.64.108:4000/servicephotos/car.png',
      active: true,
    },
    {
      id: 2,
      serviceName: 'Go for walk',
      userName: 'AMMY',
      date: '08/07/2024',
      color: '#B9F7C3',
      imagePath: 'http://134.122.64.108:4000/servicephotos/walk.png',
      active: false,
    },
    {
      id: 3,
      serviceName: 'Clean the garden',
      userName: 'TOM',
      date: '08/07/2024',
      color: '#FFDCB3',
      imagePath: 'http://134.122.64.108:4000/servicephotos/garden.png',
      active: false,
    },
    {
      id: 4,
      serviceName: 'IT support',
      userName: 'TOM',
      date: '08/07/2024',
      color: '#DEDEDE',
      imagePath: 'http://134.122.64.108:4000/servicephotos/it.png',
      active: true,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      getAllActivities();
      return;
    }, []),
  );

  useEffect(() => {
    // console.log('requestedServices---', JSON.stringify(requestedServices));
    // console.log('providedServices---', JSON.stringify(providedServices));
  }, [requestedServices, providedServices, recivedServices]);

  /**
   * Get all serices list from server
   */
  const getAllActivities = () => {
    dispatch(
      getMyRequestedServices(
        async response => {},
        async error => {
          console.log('my error', error);
        },
      ),
    );

    dispatch(
      getMyProvidedServices(
        async response => {
          console.log('getMyProvidedServices---', response);
        },
        async error => {
          console.log('my error', error);
        },
      ),
    );
  };

  const onItemClick = (item: any) => {
    //console.log('onItemClick------', item);
    navigation.navigate(Constants.NAV_KEY_CONFIRM_REQ, {item});
  };
  const FilterItem = ({item}: any) => {
    //console.log('Item----', item.service_name);
    return (
      <TouchableOpacity
        disabled={isRequested ? item.status !== 2 : item.status === 1}
        onPress={() => onItemClick(item)}
        style={{
          backgroundColor: item.bgcolor,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          width: '100%',
          height: 60,
          padding: 5,
        }}>
        <Text
          style={{
            flex: 5,
            marginLeft: 10,
            color: '#040404',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          {item.service_name}{' '}
        </Text>
        <View style={{flex: 5}}>
          <Text
            style={{
              textAlign: 'right',
              color: '#040404',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {isRequested ? item.to_user_name : item.from_user_name}
          </Text>
          <Text style={{textAlign: 'right', color: '#040404', fontSize: 10}}>
            {item.status === 0
              ? isRequested
                ? 'Requested on ' +
                  moment(item.date, 'DD-MM-YYYY').format('DD-MMM-YYYY')
                : 'Received on ' +
                  moment(item.date, 'DD-MM-YYYY').format('DD-MMM-YYYY')
              : item.status === 2
              ? 'Schedule on ' +
                moment(item.date, 'DD-MM-YYYY').format('DD-MMM-YYYY')
              : 'Completed on ' +
                moment(item.date, 'DD-MM-YYYY').format('DD-MMM-YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderFilterItem = ({item}: any) => {
    return (
      <FilterItem
        item={item}
        // id={item.id}
        // serviceName={item.service_name}
        // imagePath={item.image}
        // active={item.active}
        // color={item.bgcolor}
        // userName={item.to_user_name}
        // date={item.date}
      />
    );
  };

  const emptyView = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', marginTop: 150}}>
        <Text style={{color: 'red', fontSize: 16}}>No Data Found</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader
        title={Constants.LABLE_TAB3}
        leftIcon={false}
        rightIcon={true}
        rIcon={require('@assets/info.png')}
      />
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 60,
            width: '70%',
            height: 100,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setIsRequested(true)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  borderRadius: 100,
                  borderWidth: isRequested ? 0 : 1,
                  width: '95%',
                  backgroundColor: isRequested ? '#1160E8' : '#fff',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: isRequested ? '#fff' : '#818181',
                  }}>
                  Requested
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setIsRequested(false)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40,
                  borderRadius: 100,
                  width: '95%',
                  borderWidth: !isRequested ? 0 : 1,
                  borderColor: '#000000',
                  backgroundColor: !isRequested ? '#1160E8' : '#fff',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: !isRequested ? '#fff' : '#818181',
                  }}>
                  Provided
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{width: '100%', height: '100%', padding: 20}}>
          <FlatList
            data={isRequested ? requestedServices : providedServices}
            ItemSeparatorComponent={() => <View style={{width: 5}} />}
            renderItem={renderFilterItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={emptyView}
          />
        </View>
      </View>
    </View>
  );
};

export default Activities;
