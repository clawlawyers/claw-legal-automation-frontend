// ================== Type Definitions ==================
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourAccountScreen from '../screens/Home/Section8/YourAccount';
import ContactAdminScreen from '../screens/Home/Section8/ContactAdmin';

// Params for Home Stack
export type AccountStackParamList = {
  YourAccountScreen: undefined;
  ContactAdminScreen: undefined;
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

function YourAccountStack() {
  return (
    <Stack.Navigator initialRouteName="YourAccountScreen">
      <Stack.Screen
        name="YourAccountScreen"
        component={YourAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactAdminScreen"
        component={ContactAdminScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default YourAccountStack;
