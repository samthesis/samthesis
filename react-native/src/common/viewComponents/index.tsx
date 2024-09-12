import React from 'react';
import {globalStyles} from '@common/globalStyles';
import Colors from '@utilities/colors';
// import * as Constants from '@utilities/constants';

import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * Define App TextViewComponent to show text on views
 * @param props Text props
 * @returns Text View
 */
export const TextViewComponent = (props: any) => {
  return (
    <Text
      style={[props.style ? props.style : styles.textViewStyle]}
      onPress={props.onPress}
      {...props}
      suppressHighlighting={true}
      // numberOfLines={}
    >
      {props.text}
    </Text>
  );
};

export const ButtonComponent = (props: any) => {
  return (
    <TouchableOpacity
      style={
        props.btnStyle
          ? [
              props.btnStyle,
              {
                backgroundColor: props.disabled
                  ? Colors.COLOR_GRAY
                  : props.bgColor ? props.bgColor :  Colors.COLOR_BLACK,
              },
            ]
          : [
              styles.btnContainer,
              {
                backgroundColor: props.disabled
                  ? Colors.COLOR_GRAY
                  : Colors.BUTTON_BG,
              },
            ]
      }
      // style={[
      //   props.btnStyle ? props.btnStyle
      //   styles.btnContainer,
      //   {
      //     backgroundColor: props.disabled
      //       ? Colors.COLOR_GRAY
      //       : Colors.COLOR_BLACK,
      //   },
      //   props.btnStyle,
      //   props.containerStyle,
      // ]}
      onPress={props.onPress}
      disabled={props.disabled}>
      {props.isLoading ? (
        <ActivityIndicator size={'small'} color={Colors.COLOR_WHITE} />
      ) : (
        <>
          {props.showLeftIcon && (
            <Image
              source={props.leftIcon}
              style={[styles.btnIcon, props.leftIconStyle]}
              resizeMode="contain"
            />
          )}
          <TextViewComponent
            text={props.title}
            style={[
              // styles.btnTextStyle,
              globalStyles.buttonText,
              {
                color: props.disabled ? Colors.COLOR_GRAY : Colors.COLOR_WHITE,
              },
              props.textStyle,
            ]}
          />
          {props.showRightIcon && (
            <Image
              source={props.rightIcon}
              style={styles.btnIcon}
              resizeMode="contain"
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

/**
 * Define TextInputComponent for user input
 */
export const TextInputComponent = (props: any) => {
  return (
    <View style={props.containerStyle}>
      <TextInput style={props.inputStyle} {...props} />
    </View>
  );
};

/**
 * Define ImageComponent for image view
 * @param props Image props
 * @returns Image view
 */
export const ImageComponent = (props: any) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={props.containerStyle}
      onPress={props.onImageClicked}
      hitSlop={{top: 15, right: 15, left: 15, bottom: 15}}>
      <Image
        source={props.source}
        style={props.imageStyle}
        resizeMode={props.resizeMode}
      />
    </TouchableOpacity>
  );
};

/**
 * Define ImageComponent for image view
 * @param props Image props
 * @returns Image view
 */
export const ImageComponentNoPress = (props: any) => {
  return (
    <View style={props.containerStyle}>
      <Image
        source={props.source}
        style={props.imageStyle}
        resizeMode={props.resizeMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.BUTTON_BG,
    backgroundColor: Colors.BUTTON_BG,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    height: 50,
    marginTop: 15,
  },
  btnTextStyle: {
    fontSize: 16,
    lineHeight: 19.36,
    alignSelf: 'center',
    color: Colors.COLOR_WHITE,
  },
  textViewStyle: {
    fontSize: 15,
    color: Colors.HEADING_TEXT_COLOR,
  },
  btnIcon: {
    width: 20,
    height: 20,
  },
});
