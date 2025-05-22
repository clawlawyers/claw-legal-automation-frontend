// ================== Type Definitions ==================
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {Text, View} from 'react-native';
import SplashScreen from '../screens/SplashScreen';

// Params for Home Stack
export type HomeStackParamList = {
  Splash: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Splash" component={SplashScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
