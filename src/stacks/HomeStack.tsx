// src/stacks/HomeStack.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/Section1/Screen1'; // Ensure this is the correct path to your HomeScreen
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
import LegalGptScreen from '../screens/Gpt/LegalGptScreen';
import ClientUpdateSuccessScreen from '../screens/Home/Section3/ClientUpdateSuccess';
// Define your param list with route names and their params (undefined if none)
export type HomeStackParamList = {
  HomeScreen: { fromLogin?: boolean } | undefined; 
  StartCaseSearch: undefined;
  CaseLoadScreen: undefined;
  CaseDetailsScreen: undefined;
  CaseAddedScreen: undefined;
  CaseNotFoundScreen: undefined;
  NoCasesAdded: undefined;
 // YourCasesListScreen: undefined;
  CaseDetailsDownloadScreen: undefined;
  AssociationScreen: undefined;
  AddClientScreen: undefined;
  ClientUpdateSuccessScreen: undefined; 
  ClientDetailsScreen: undefined;
  ProceedingDetailsSentScreen: undefined;
  SendCaseDetailsScreen: undefined;
  LegalGptScreen: undefined; 
  CaseListScreen: undefined; 
  YourCasesList: undefined;
  
  
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="StartCaseSearch" component={StartCaseSearch} />
      <Stack.Screen name="CaseLoadScreen" component={CaseLoadingScreen} />
      <Stack.Screen name="CaseDetailsScreen" component={CaseDetailsScreen} />
      <Stack.Screen name="CaseAddedScreen" component={CaseAddedScreen} />
      
      <Stack.Screen name="CaseNotFoundScreen" component={CaseNotFoundScreen} />
      <Stack.Screen name="AssociationScreen" component={AssociationScreen} />
      <Stack.Screen name="AddClientScreen" component={AddClientScreen} />
      <Stack.Screen
        name="ClientDetailsScreen"
        component={AddClientScreen} />
        <Stack.Screen name="ClientUpdateSuccessScreen" component={ClientUpdateSuccessScreen} />
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
        name="CaseListScreen"
        component={YourCasesListScreen}
      />
      <Stack.Screen name="NoCasesAdded" component={NoCasesAdded} />
      
      <Stack.Screen name="LegalGptScreen" component={LegalGptScreen} />
      <Stack.Screen name="YourCasesList" component={YourCasesListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;