import {setAuthToken} from '@redux/actions/AuthActionCreator';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import * as Constants from '@utilities/constants';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '@src/common/Header';
import {getUserProfile} from '@src/redux/actions/CommonActionCreator';

const Settings = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  /**
   * Get user profile from server
   */
  const getProfile = () => {
    dispatch(
      getUserProfile(
        async response => {
          console.log('getProfile---', response);
          setUserName(response?.data);
        },
        async error => {
          console.log('my error', error);
        },
      ),
    );
  };

  /**
   * Handle logout click
   */
  const _onLogOut = async () => {
    await AsyncStorage.clear();
    dispatch(setAuthToken(''));
    // navigation.navigate(Constants.NAV_KEY_CONNECT);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: Constants.NAV_KEY_LOGIN}],
      }),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader
        title={Constants.LABLE_TAB5}
        leftIcon={false}
        rightIcon={true}
        rIcon={require('@assets/info.png')}
      />
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, paddingTop: 250, height: 700}}>
          <View
            style={{
              width: '100%',
              height: 170,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 90, width: 90}}
              source={require('@assets/pImage.png')}
            />
            <View
              style={{
                width: '50%',
                height: 35,
                borderWidth: 1,
                borderColor: '#224550',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 100,
                marginTop: 10,
              }}>
              <Text style={{color: 'black'}}>Upload</Text>
            </View>

      
            <View style={{width: '100%', height: 90, padding: 5}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#CAC8DA34',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('@assets/sprofile.png')}
                  />
                </View>
                <View
                  style={{flex: 8, justifyContent: 'center', paddingLeft: 5}}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    {userName}
                  </Text>
                  <Text style={{color: '#010F07', fontSize: 12, marginTop: 8}}>
                    Change you Username
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#010F07', fontSize: 18}}>&#62;</Text>
                </View>
              </View>
            </View>
            <View style={{width: '100%', height: 90, padding: 5}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#CAC8DA34',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('@assets/spay.png')}
                  />
                </View>
                <View
                  style={{flex: 8, justifyContent: 'center', paddingLeft: 5}}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Payment Methods
                  </Text>
                  <Text style={{color: '#010F07', fontSize: 12, marginTop: 8}}>
                    Add your credit & debit cards
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#010F07', fontSize: 18}}>&#62;</Text>
                </View>
              </View>
            </View>
            <View style={{width: '100%', height: 90, padding: 5}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#CAC8DA34',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('@assets/spay.png')}
                  />
                </View>
                <View
                  style={{flex: 8, justifyContent: 'center', paddingLeft: 5}}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Provide a Service
                  </Text>
                  <Text style={{color: '#010F07', fontSize: 12, marginTop: 8}}>
                    Become a service provider
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#010F07', fontSize: 18}}>&#62;</Text>
                </View>
              </View>
            </View>
            <View style={{width: '100%', height: 90, padding: 5}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#CAC8DA34',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('@assets/spay.png')}
                  />
                </View>
                <View
                  style={{flex: 8, justifyContent: 'center', paddingLeft: 5}}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Complete your KYC
                  </Text>
                  <Text style={{color: '#010F07', fontSize: 12, marginTop: 8}}>
                    Claim your free token by complete kyc
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#010F07', fontSize: 18}}>&#62;</Text>
                </View>
              </View>
            </View>
            <View style={{width: '100%', height: 90, padding: 5}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 5,
                  borderBottomWidth: 0,
                  borderBottomColor: '#CAC8DA34',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 24, width: 24}}
                    source={require('@assets/sprofile.png')}
                  />
                </View>
                <TouchableOpacity
                  onPress={_onLogOut}
                  style={{flex: 8, justifyContent: 'center', paddingLeft: 5}}>
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                    Logout
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
