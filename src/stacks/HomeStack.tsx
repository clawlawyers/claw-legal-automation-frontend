/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/Screen1';
import StartCaseSearch from '../screens/Home/StartCaseSearch';
import CaseLoadingScreen from '../screens/Home/CaseLoadingScreen';
import CaseDetailsScreen from '../screens/Home/CaseDetailsScreen';
import CaseAddedScreen from '../screens/Home/CaseAddedScreen';
import CaseNotFoundScreen from '../screens/Home/CaseNotFound';
import NoCasesAdded from '../screens/Home/NoCasesAdded';
import YourCasesListScreen from '../screens/Home/YourCasesListScreen';

// Define your param list with route names and their params (undefined if none)
export type HomeStackParamList = {
  HomeScreen: undefined;
  StartCaseSearch: undefined;
  CaseLoadingScreen: undefined;
  CaseDetailsScreen: undefined;
  CaseAddedScreen: undefined;
  CaseNotFoundScreen: undefined;
  NoCasesAdded: undefined;
  YourCasesListScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="StartCaseSearch" component={StartCaseSearch} />
      <Stack.Screen name="CaseLoadingScreen" component={CaseLoadingScreen} />
      <Stack.Screen name="CaseDetailsScreen" component={CaseDetailsScreen} />
      <Stack.Screen name="CaseAddedScreen" component={CaseAddedScreen} />
      <Stack.Screen name="CaseNotFoundScreen" component={CaseNotFoundScreen} />
      <Stack.Screen
        name="YourCasesListScreen"
        component={YourCasesListScreen}
      />
      <Stack.Screen name="NoCasesAdded" component={NoCasesAdded} />
    </Stack.Navigator>
  );
};

export default HomeStack;
