// ================== Type Definitions ==================
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

// Params for Home Stack
export type HomeStackParamList = {
  Splash: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const SplashScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="Splash"
      // screenOptions={{headerShown: false}}
    >
      <HomeStack.Screen name="Splash" component={SplashScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
