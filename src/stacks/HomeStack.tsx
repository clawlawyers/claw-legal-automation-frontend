/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/Screen1';
import StartCaseSearch from '../screens/Home/StartCaseSearch';

// Define your param list with route names and their params (undefined if none)
export type HomeStackParamList = {
  HomeScreen: undefined;
  StartCaseSearch: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="StartCaseSearch" component={StartCaseSearch} />
    </Stack.Navigator>
  );
};

export default HomeStack;
