import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import colors from '@utilities/colors';
import Home from '@pages/home';
import Service from '@pages/service';
import Activities from '@pages/activities';
import Message from '@pages/message';
import Settings from '@pages/settings';
import * as Constants from '@utilities/constants';

// Import images and icons
const tabIcons = {
  tab1: require('@assets/home.png'),
  tab2: require('@assets/service.png'),
  tab3: require('@assets/activity.png'),
  tab4: require('@assets/message.png'),
  tab5: require('@assets/settings.png'),
};

const Tab = createBottomTabNavigator();

const MyTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: colors.COLOR_WHITE,
      tabBarInactiveTintColor: colors.COLOR_WHITE,
      tabBarIcon: ({focused}) => {
        const icon = getTabIcon(route.name);
        return (
          <Image
            source={icon}
            style={[styles.icon, focused && styles.iconFocused]}
            resizeMode="contain"
          />
        );
      },
    })}>
    <Tab.Screen
      name={Constants.LABLE_TAB1}
      component={Home}
      options={{tabBarLabel: Constants.LABLE_TAB1}}
    />
    <Tab.Screen
      name={Constants.LABLE_TAB2}
      component={Service}
      options={{tabBarLabel: Constants.LABLE_TAB2}}
    />
    <Tab.Screen
      name={Constants.LABLE_TAB3}
      component={Activities}
      options={{tabBarLabel: Constants.LABLE_TAB3}}
    />
    <Tab.Screen
      name={Constants.LABLE_TAB4}
      component={Message}
      options={{tabBarLabel: Constants.LABLE_TAB4}}
    />
    <Tab.Screen
      name={Constants.LABLE_TAB5}
      component={Settings}
      options={{tabBarLabel: Constants.LABLE_TAB5}}
    />
  </Tab.Navigator>
);

/**
 *
 * @param routeName tab name
 * @returns tab icon
 */
const getTabIcon = (routeName: string) => {
  switch (routeName) {
    case Constants.LABLE_TAB1:
      return tabIcons.tab1;
    case Constants.LABLE_TAB2:
      return tabIcons.tab2;
    case Constants.LABLE_TAB3:
      return tabIcons.tab3;
    case Constants.LABLE_TAB4:
      return tabIcons.tab4;
    case Constants.LABLE_TAB5:
      return tabIcons.tab5;
    default:
      return tabIcons.tab1;
  }
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.COLOR_BLUE,
    height: 70,
    padding: 5,
    paddingBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconFocused: {
    width: 30,
    height: 30,
  },
});

export default MyTabs;
