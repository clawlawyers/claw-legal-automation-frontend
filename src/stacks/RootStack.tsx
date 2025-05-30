// src/navigation/RootStack.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './MainStack'; // Your splash/login/etc. flow
import TabNavigator from './MainTabNavigator'; // Your bottom tab navigator

const Stack = createNativeStackNavigator();

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
