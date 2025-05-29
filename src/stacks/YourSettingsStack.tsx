// ================== Type Definitions ==================
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AppSettingsScreen from '../screens/Home/Section9/AppSettings';

export type SettingsStackParamList = {
  AppSettingsScreen: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

function YourSettingsStack() {
  return (
    <Stack.Navigator initialRouteName="AppSettingsScreen">
      <Stack.Screen
        name="AppSettingsScreen"
        component={AppSettingsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default YourSettingsStack;
