/* eslint-disable @typescript-eslint/no-unused-vars */
import {Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInputComponent, TextViewComponent} from '../viewComponents';
import Colors from '@utilities/colors';
import {globalStyles} from '@common/globalStyles';
import styles from './style';

const AppInputComponent = ({
  label,
  backgroundColor,
  fontSize,
  fontFamily,
  placeholder,
  showHide,
  value,
  onChangeText,
  onBlur,
  onFocus,
  readOnly,
  borderColor,
  multiline,
  textColor,
  error,
  touched,
  secure,
  editable,
  keyboardType,
  onPressIn,
  onPressEyeIcon,
  inputStyle,
  inputLabel,
  numberOfLines,
  maxLength,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View>
      {/*Render Label Text for Input Field */}
      {label && (
        <TextViewComponent
          text={label}
          style={[globalStyles.titleText, inputLabel]}
        />
      )}
      {/*Input Container */}
      <View style={styles.inputContainer}>
        {/*Render User Input */}
        <TextInputComponent
          inputStyle={globalStyles.inputStyle}
          placeholder={placeholder}
          secureTextEntry={secure && isPasswordSecure}
          value={value}
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false);
            onBlur;
          }}
          onFocus={() => setIsFocused(true)}
          readOnly={readOnly}
          editable={editable}
          multiline={multiline}
          autoCorrect={false}
          //backgroundColor={Colors.COLOR_GRAY}
          placeholderTextColor={Colors.SUB_HEADING_TEXT_COLOR}
          keyboardType={keyboardType}
          onPressIn={onPressIn}
          autofocus={true}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          keyboardShouldPersistTaps={'handled'}
          selectionColor={Colors.COLOR_GRAY}
          //cursorColor={Colors.HEADING_TEXT_COLOR}
        />
        {/* Render Eye Icon for Password
        {secure && (
          <TouchableOpacity
            onPress={() => setIsPasswordSecure(!isPasswordSecure)}
            style={styles.eyeIConStyle}
            hitSlop={{top: 20, bottom: 20, left: 15, right: 15}}>
            <Image
              source={isPasswordSecure ? Images.EyeIcon : Images.ShowPassword}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )} */}
      </View>
      {/*Show Validation Error Message */}
      {error && touched && (
        <TextViewComponent text={error} style={globalStyles.inputError} />
      )}
    </View>
  );
};

export default AppInputComponent;
