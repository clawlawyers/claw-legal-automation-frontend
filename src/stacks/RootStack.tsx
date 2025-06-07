// src/navigation/RootStack.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack, {MainStackParamList} from './MainStack'; // Your splash/login/etc. flow
import TabNavigator from './MainTabNavigator'; // Your bottom tab navigator
import {RootTabParamList} from './types'; // Your RootTabParamList from types.ts

import {NavigatorScreenParams} from '@react-navigation/native';
// Define the RootStackParamList
export type RootStackParamList = {
  AuthFlow: NavigatorScreenParams<MainStackParamList>;
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  // Add other root-level screens here if any
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // USE THE PARAM LIST
const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Auth + Intro Screens */}
      <Stack.Screen name="AuthFlow" component={MainStack} />

      {/* Main App */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStack;