import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/Section1/Screen1';
import StartCaseSearch from '../screens/Home/Section1/StartCaseSearch';
import CaseLoadingScreen from '../screens/Home/Section1/CaseLoadingScreen';
import CaseDetailsScreen from '../screens/Home/Section1/CaseDetailsScreen';
import CaseAddedScreen from '../screens/Home/Section1/CaseAddedScreen';
import CaseNotFoundScreen from '../screens/Home/Section1/CaseNotFound';
import NoCasesAdded from '../screens/Home/Section2/NoCasesAdded';
import YourCasesListScreen from '../screens/Home/Section2/YourCasesListScreen';
import AssociationScreen from '../screens/Home/Section2/AssociationScreen';
import CaseDetailsDownloadScreen from '../screens/Home/Section2/CaseDetailsDownload';
import AddClientScreen from '../screens/Home/Section3/ClientDetailsScreen';
import SendCaseDetailsScreen from '../screens/Home/Section5/SendCaseDetails';
import ProceedingDetailsSentScreen from '../screens/Home/Section5/ProceedingDetailsSent';

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
  CaseDetailsDownloadScreen: undefined;
  AssociationScreen: undefined;
  AddClientScreen: undefined;
  ProceedingDetailsSentScreen: undefined;
  SendCaseDetailsScreen: undefined;
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
      <Stack.Screen name="AssociationScreen" component={AssociationScreen} />
      <Stack.Screen name="AddClientScreen" component={AddClientScreen} />
      <Stack.Screen
        name="ProceedingDetailsSentScreen"
        component={ProceedingDetailsSentScreen}
      />
      <Stack.Screen
        name="CaseDetailsDownloadScreen"
        component={CaseDetailsDownloadScreen}
      />
      <Stack.Screen
        name="SendCaseDetailsScreen"
        component={SendCaseDetailsScreen}
      />
      <Stack.Screen
        name="YourCasesListScreen"
        component={YourCasesListScreen}
      />
      <Stack.Screen name="NoCasesAdded" component={NoCasesAdded} />
    </Stack.Navigator>
  );
};

export default HomeStack;
