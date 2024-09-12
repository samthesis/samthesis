import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import * as Constants from '@utilities/constants';
import AppHeader from '@src/common/Header';
import { globalStyles } from '@src/common/globalStyles';

function Message({navigation}: any) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader
        title={Constants.LABLE_TAB4}
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
        <Text style={globalStyles.SubtitleText}>As discussed this will Third Party Messaging. </Text>
      </View>
    </View>
  );
}

export default Message;
