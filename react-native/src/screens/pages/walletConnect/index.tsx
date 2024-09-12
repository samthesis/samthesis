/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';

import * as Constants from '@utilities/constants';
import styles from './styles';
import {globalStyles} from '@common/globalStyles';
import {ButtonComponent} from '@common/viewComponents';
// Import images and icons
const Icons = {
  MetaMaskIcon: require('@assets/metamask-icon.png'),
  WalletConnectIcon: require('@assets/walletconnect-seeklogo.com.png'),
  CoinbaseIcon: require('@assets/cw.png'),
};

const WalletConnect = ({navigation}: any) => {
  const _goToNext = async () => {
    navigation.navigate(Constants.NAV_KEY_TAB);
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
        <Text style={styles.text}>{Constants.TEXT_CONNECT_WALLET}</Text>
        <View style={styles.buttonView}>
          <Text style={styles.textLight}>{Constants.TEXT_METAMAST}</Text>
          <Image source={Icons.MetaMaskIcon} />
        </View>
        <View style={styles.buttonView}>
          <Text style={styles.textLight}>{Constants.TEXT_WALLET_CONNECT}</Text>
          <Image source={Icons.WalletConnectIcon} />
        </View>
        <View style={styles.buttonView}>
          <Text style={styles.textLight}>{Constants.TEXT_COINBASE_WALLET}</Text>
          <Image source={Icons.CoinbaseIcon} />
        </View>

        <ButtonComponent
          isLoading={false}
          title={Constants.TEXT_CONNECT}
          onPress={() => _goToNext()}
        />
      </View>
    </View>
  );
};

export default WalletConnect;
