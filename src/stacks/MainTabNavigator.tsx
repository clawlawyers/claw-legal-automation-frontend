/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/MyTabBar';
import HomeStack from './HomeStack';
import YourCasesStack from './YourCasesStack';
import YourAlertsStack from './YourAlertsStack';
import YourAccountStack from './YourAccountStack';
import YourSettingsStack from './YourSettingsStack';
import { RootTabParamList } from '../navigation/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="YourCases" component={YourCasesStack} />
      <Tab.Screen name="Alerts" component={YourAlertsStack} /> 
      <Tab.Screen name="Account" component={YourAccountStack} />
      <Tab.Screen name="Settings" component={YourSettingsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;