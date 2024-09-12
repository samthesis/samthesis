import React from 'react';
import {View, Text, Image} from 'react-native';
import * as Constants from '@utilities/constants';
import styles from './styles';

// Import images and icons
const Icons = {
  CheckedIcon: require('@assets/select.png'),
};
const ConfirmRequestView = (props: any) => {
  return (
    <View style={styles.container}>
      <Image style={styles.Confirmimg} source={Icons.CheckedIcon} />
      <Text style={[styles.headingText, {color: 'lightgreen'}]}>{Constants.TEXT_CONFIRMED}</Text>

      <View style={styles.greenBg}>
        <Text style={styles.greenText}>{Constants.TEXT_SCHEDULE_ON}</Text>
        <Text style={styles.greenText}>{props.duration + ',' + props.date}</Text>
      </View>
    </View>
  );
};

export default ConfirmRequestView;
