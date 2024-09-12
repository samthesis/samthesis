import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  PermissionsAndroid,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import Mapbox from '@rnmapbox/maps';
import {MAPBOX_ACCESS_TOTEN} from '@common/api';
import * as Constants from '@utilities/constants';
import * as Messages from '@utilities/messages';
import styles from './styles';
import {
  getServices,
  getUsersByServiceId,
} from '@src/redux/actions/ServicesActionCreator';
import colors from '@src/utilities/colors';
import {globalStyles} from '@src/common/globalStyles';
import AppHeader from '@src/common/Header';

// Import images and icons
const Icons = {
  NextIcon: require('@assets/next.png'),
  LocationIcon: require('@assets/location.png'),
  InfoIcon: require('@assets/info.png'),
  SearchIcon: require('@assets/search.png'),
  FilterIcon: require('@assets/filter.png'),
};

Mapbox.setAccessToken(MAPBOX_ACCESS_TOTEN);

const Home = ({navigation}: any) => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.services);
  const token = useSelector((state: any) => state.user);

  const [coordinates, setCoordinates] = useState([0, 0]);
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [locationStatus, setLocationStatus] = useState('');
  const [servicesData, setServicesData]: any = useState([]);
  const [selectedServices, setSelectedServices]: any = useState([]);
  const [selectedServiceId, setSelectedServiceId]: any = useState(0);

  var watchID = useRef<number | null>(null);

  // Request location permission and get location
  useEffect(() => {
    getAllServices();
    const requestLocationPermission = async () => {
      if (Platform.OS === Constants.PLATEFORM_IOS) {
        getOneTimeLocation();
        subscribeLocationLocation();
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
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();

    return () => {
      if (watchID.current) Geolocation.clearWatch(watchID.current);
    };
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
   * Get all serices list from server
   */
  const getServicesById = (serviceId: number) => {
    let request = {
      longitude: currentLongitude,
      latitude: currentLatitude,
      serviceId: serviceId,
    };
    dispatch(
      getUsersByServiceId(
        request,
        async response => {
          //console.log('getUsersByServiceId---', JSON.stringify(response.data));
          setServicesData(response.data);
        },
        async error => {
          console.log('my error', error);
        },
      ),
    );
  };

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      position => {
        //console.log('address-----------', position.coords.heading);

        const {longitude, latitude} = position.coords;
        setCurrentLongitude(longitude);
        setCurrentLatitude(latitude);
        setCoordinates([longitude, latitude]);
        setLocationStatus('You are Here');
      },
      error => setLocationStatus(error.message),
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
  };

  const subscribeLocationLocation = () => {
    watchID.current = Geolocation.watchPosition(
      position => {
        const {longitude, latitude} = position.coords;
        setCurrentLongitude(longitude);
        setCurrentLatitude(latitude);
        setCoordinates([longitude, latitude]);
        setLocationStatus('You are Here');
      },
      error => setLocationStatus(error.message),
      {enableHighAccuracy: false, maximumAge: 1000},
    );
  };

  const onMarkerPress = () => setCalloutVisible(true);

  /**
   * Handle on filter item click
   */
  const onFilterItemClick = (serviceId: number) => {
    //console.log('onFilterItemClick----');
    setSelectedServiceId(serviceId);
    getServicesById(serviceId);
  };

  /**
   * Open request service screen
   */
  const goTORequestServiceView = (
    serviceName: string,
    imageSource: string,
    serviceId: number,
    userId: number,
  ) => {
    setModalVisible(!modalVisible);
    navigation.navigate(Constants.NAV_KEY_REQ_SERVICE, {
      serviceName,
      userName,
      imageSource,
      serviceId,
      userId,
    });
  };

  const FilterItem = ({
    serviceName,
    serviceId,
  }: {
    serviceName: string;
    serviceId: number;
  }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        {
          backgroundColor:
            serviceId === selectedServiceId
              ? colors.COLOR_BLUE
              : colors.COLOR_WHITE,
        },
      ]}
      onPress={() => onFilterItemClick(serviceId)}>
      <Text
        style={[
          styles.filterText,
          {
            color:
              serviceId === selectedServiceId ? colors.COLOR_WHITE : '#093177',
          },
        ]}>
        {serviceName}
      </Text>
    </TouchableOpacity>
  );

  const UserServiceItem = ({
    id,
    serviceId,
    serviceName,
    imageSource,
  }: {
    id: number;
    serviceId: number;
    serviceName: string;
    imageSource: string;
  }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          goTORequestServiceView(serviceName, imageSource, serviceId, id)
        }
        style={styles.serviceListView}>
        <View
          style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{height: 40, width: 40}} source={{uri: imageSource}} />
        </View>
        <View style={{flex: 8, justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
            {serviceName}{' '}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 10, width: 10}}
            source={Icons.NextIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterItem = ({item}: any) => {
    return <FilterItem serviceName={item.services} serviceId={item.id} />;
  };

  const renderUserServiceItem = ({item}: any) => {
    return (
      <UserServiceItem
        id={item.id}
        serviceId={item.serviceId}
        serviceName={item.services}
        imageSource={item.image}
      />
    );
  };
  const Item = ({item}: any) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderColor: '#00000029',
          borderWidth: 1,
          width: 106,
          height: 100,
          borderRadius: 9,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedServices(item.services);
            setUserName(item.name);
            setModalVisible(true);
          }}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>
              {item.name?.charAt(0)?.toUpperCase()}
            </Text>
          </View>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            {item.name}{' '}
          </Text>
          <Text style={{color: '#FF8F0E', fontSize: 9}}>View Profile </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const CustomLocationSymbol = ({userName}: {userName: string}) => {
    const firstLetter = userName?.charAt(0)?.toUpperCase();
    return (
      <View style={styles.locationSymbol}>
        <ImageBackground
          source={Icons.LocationIcon}
          style={styles.image}>
          <View style={styles.textContainer}>
            <Text style={styles.locationText}>{firstLetter}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };
  const renderServiceItem = ({item}: any) => {
    return <Item item={item} />;
  };

  const loadAnnotationUK = () => {
    return (
      <Mapbox.PointAnnotation
        key="annotationUK"
        id="annotationUK"
        coordinate={coordinates}
        onSelected={onMarkerPress}>
        <View
          style={{
            height: 20,

            width: 20,

            backgroundColor: 'green',

            borderColor: 'black',

            borderWidth: 2,

            borderRadius: 50,
          }}
        />

        <Mapbox.Callout title="My Location" contentStyle={{borderRadius: 5}} />
      </Mapbox.PointAnnotation>
    );
  };

  const emptyChild = () => {
    return <></>;
  };
  return (
    <View style={styles.page}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{width: '100%', height: 80}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1.5}}>
                  <View style={styles.popCircle}>
                    <Text style={styles.popCircleText}>
                      {userName?.charAt(0)?.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 7,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={styles.modalText}>{userName}</Text>
                  <Text style={styles.modalSmallText}>XXX7894</Text>
                </View>
                <View style={{flex: 1}}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>X</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={{width: '100%', height: '70%'}}>
              <FlatList
                data={selectedServices}
                ItemSeparatorComponent={() => <View style={{width: 5}} />}
                renderItem={renderUserServiceItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </Modal>
      <AppHeader
        title={Constants.TEXT_MY_ACCOUNT}
        leftIcon={false}
        //lIcon={require('@assets/bar.png')}
        rightIcon={true}
        rIcon={Icons.InfoIcon}
      />
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Mapbox.MapView style={styles.map}>
            <Mapbox.Camera zoomLevel={12} centerCoordinate={coordinates} />

            <Mapbox.PointAnnotation id="uk" coordinate={coordinates} children ={emptyChild()} />
            <View>
              {loadAnnotationUK()}

              {/* {servicesData.map((data: any) => (
                <Mapbox.PointAnnotation
                  key={data.id.toString()}
                  id={data.id.toString()}
                  coordinate={[data.longitude, data.latitude]}>
                  <CustomLocationSymbol userName={data.name} />
                </Mapbox.PointAnnotation>
              ))} */}
            </View>
          </Mapbox.MapView>
        </View>
        <View style={styles.bottomView}>
          <FlatList
            data={servicesData}
            horizontal={true}
            ItemSeparatorComponent={() => <View style={{width: 5}} />}
            renderItem={renderServiceItem}
            keyExtractor={(item: any) => item.id}
          />
        </View>
        <View style={styles.topView}>
          <View style={{padding: 4}}>
            <Text style={{fontSize: 19, color: '#272727', fontWeight: 'bold'}}>
              Find a Service
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#B182E1',
                      borderWidth: 1,
                      backgroundColor: '#fff',
                      borderRadius: 20,
                    }}>
                    <Image source={Icons.SearchIcon} />
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#B182E1',
                      borderWidth: 1,
                      backgroundColor: '#fff',
                      borderRadius: 20,
                    }}>
                    <Image source={Icons.FilterIcon} />
                  </View>
                </View>
              </View>
            </View>
            <View style={{flex: 8}}>
              <FlatList
                data={data.serviceData}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{width: 5}} />}
                renderItem={renderFilterItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;
