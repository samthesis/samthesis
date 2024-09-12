import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Switch,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import colors from '@utilities/colors';
import * as Constants from '@utilities/constants';
import {
  addUsersServices,
  getServices,
} from '@src/redux/actions/ServicesActionCreator';
import AppHeader from '@src/common/Header';
interface serviceItem {
  id: number;
  serviceName: string;
  imagePath: string;
  active: boolean;
}

const Service = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const data = useSelector((state: any) => state.services);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const filterData = [
    {
      id: 1,
      serviceName: 'Driving by car',
      imagePath: 'http://134.122.64.108:4000/servicephotos/car.png',
      active: true,
    },
    {
      id: 2,
      serviceName: 'Go for walk',
      imagePath: 'http://134.122.64.108:4000/servicephotos/walk.png',
      active: false,
    },
    {
      id: 3,
      serviceName: 'Clean the garden',
      imagePath: 'http://134.122.64.108:4000/servicephotos/garden.png',
      active: false,
    },
    {
      id: 4,
      serviceName: 'IT support',
      imagePath: 'http://134.122.64.108:4000/servicephotos/it.png',
      active: true,
    },
  ];

  useEffect(() => {
    getAllServices();
  }, []);

  /**
   * Get all serices list from server
   */
  const getAllServices = () => {
    dispatch(
      getServices(
        async response => {
          console.log('getAllServices---', response);
        },
        async error => {
          console.log('my error', error);
        },
      ),
    );
  };

  /**
   * Add user services
   */
  const addService = (serviceid: number) => {
    let request: any = {
      serviceId: [serviceid],
    };
    dispatch(
      addUsersServices(
        request,
        async response => {
          console.log('addService---', response);
          getAllServices();
        },
        async error => {
          console.log('my error', error);
        },
      ),
    );
  };

  const FilterItem = ({id, serviceName, imagePath, active}: serviceItem) => {
    return (
      <TouchableOpacity
        disabled={id === 1 ? active ? true : false : true}
        style={[styles.listItem, {opacity: id === 1 ? 1 : 0.5}]}
        onPress={() => addService(id)}>
        {active ? (
          <Image
            style={{height: 30, width: 30, marginTop: -40, marginLeft: 140}}
            source={require('@assets/select.png')}
          />
        ) : (
          ''
        )}
        <Image style={{width: 70, height: 70}} source={{uri: imagePath}} />
        <Text style={{color: '#093177', fontSize: 12, fontWeight: 'bold'}}>
          {serviceName}{' '}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderFilterItem = ({item}: any) => {
    return (
      <FilterItem
        id={item.id}
        serviceName={item.services}
        imagePath={item.image}
        active={item.selected}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={Constants.TEXT_PROVIDE_SERVICES}
        leftIcon={false}
        rightIcon={true}
        rIcon={require('@assets/info.png')}
      />

      <View style={{flex: 1, paddingTop: 10}}>
        <View style={styles.toggleView}>
          <Text style={styles.toggleText}>
            {Constants.TEXT_START_AS_PROVIDER}
          </Text>
          <Switch
            style={{flex: 2}}
            trackColor={{false: '#767577', true: '#4D8EFF'}}
            thumbColor={isEnabled ? '#4D8EFF' : '#f5dd4b'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 10, color: colors.HEADING_TEXT_COLOR}}>
            {Constants.TEXT_NOTI}
          </Text>
        </View>

        <View style={styles.selectServiceView}>
          <Text style={{fontSize: 19, color: '#272727', fontWeight: 'bold'}}>
            {Constants.TEXT_SELECT_SERVICES}
          </Text>
        </View>
        <View style={styles.listView}>
          <FlatList
            data={data.serviceData}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{width: 5}} />}
            renderItem={renderFilterItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
}

export default Service;
