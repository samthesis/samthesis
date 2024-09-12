// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import Colors from '@utilities/colors';
import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {ImageComponent, TextViewComponent} from '../viewComponents';
import {globalStyles} from '../globalStyles';

// Define types for the props
interface AppHeaderProps {
  title?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  isCustomRightIcon?: any;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconDisabled?: boolean;
  lIcon?: string;
  rIcon?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  isCustomRightIcon,
  containerStyle,
  leftIconDisabled,
  lIcon,
  rIcon,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && (
        <ImageComponent
          source={lIcon}
          imageStyle={styles.leftIcon}
          onImageClicked={onLeftPress}
          containerStyle={styles.leftContainer}
          disabled={leftIconDisabled}
        />
      )}
      <View style={[styles.centerContainer, styles.headingContainer]}>
        <TextViewComponent text={title} style={globalStyles.headerText} />
      </View>
      {rightIcon && (
        <ImageComponent
          source={rIcon}
          imageStyle={
            isCustomRightIcon ? styles.customRightIcon : styles.rightIcon
          }
          onImageClicked={onRightPress}
          containerStyle={styles.rightContainer}
        />
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.HEADER_BG,
  },
  leftIcon: {
    // height: 35,
    // width: 35,
    marginLeft: 10,
    transform: [{rotate: '180 deg'}],
  },
  customRightIcon: {
    width: 23,
    height: 22,
  },
  rightIcon: {
    width: 31.5,
    height: 31,
  },
  leftContainer: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  rightContainer: {
    position: 'absolute',
    right: 10,
  },
  centerContainer: {
    alignSelf: 'center',
  },
  lotteStyle: {
    width: 300,
    height: 300,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  lotteContainer: {
    width: '80%',
    justifyContent: 'center',
    flex: 1,
  },
  headingContainer: {
    alignItems: 'center',
    width: '100%',
  },
});
