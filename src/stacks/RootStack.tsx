// src/navigation/RootStack.tsx
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack, {MainStackParamList} from './MainStack'; // Your splash/login/etc. flow
import TabNavigator from './MainTabNavigator'; // Your bottom tab navigator
import {RootTabParamList} from './types'; // Your RootTabParamList from types.ts

import {NavigatorScreenParams} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {retrieveAuth} from '../redux/authSlice';
import {RootState} from '../redux/store';
import {ActivityIndicator} from 'react-native';

// Define the RootStackParamList
export type RootStackParamList = {
  AuthFlow: NavigatorScreenParams<MainStackParamList>;
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  // Add other root-level screens here if any
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // USE THE PARAM LIST
const RootStack = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    dispatch(retrieveAuth());
  }, []);

  console.log(currentUser);

  if (status === 'loading') {
    return (
      <ActivityIndicator
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#016361',
        }}
        size="large"
        color="#fff"
      />
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={`${currentUser ? 'MainTabs' : 'AuthFlow'}`}>
      {/* Auth + Intro Screens */}
      <Stack.Screen name="AuthFlow" component={MainStack} />

      {/* Main App */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStack;
