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
import SearchedCaseListScreen from '../screens/Home/Section2/SearchedCaseListScreen'; // <-- Add the correct import path
import GetLegalCasesScreen from '../screens/Home/Section7/GetLegalCasesScreen'; // <-- Add the correct import path
import GetLegalJudgements from '../screens/Home/Section7/GetLegalJudgements'; // <-- Add the correct import path
import CaseResultsScreen from '../screens/Home/Section7/CaseResultsScreen';
import SearchCaseDetailsScreen from '../screens/Home/Section7/SearchCaseDetailsScreen'; // <-- Make sure this path is correct
import CaseSummaryScreen from '../screens/Home/Section7/CaseSummaryScreen'; // <-- Add the correct import path
import FetchingJudgements from '../screens/Home/Section7/FetchingJudgements'; // <-- Add the correct import path
import JudgementsFetched from '../screens/Home/Section7/JudgementsFetched'; // <-- Add the correct import path
import GetCauseListScreen from '../screens/Home/Section6/GetCauseList'; // <-- Added missing import
import FetchSelectedScreen from '../screens/Home/Section6/FetchSelected';
import AddNewClientScreen from '../screens/Home/Section3/AddNewClient' // <-- Add the correct import path
import MultipleTypesSearchScreen from '../screens/Home/Section2/MultipleTypesSearchScreen'; // <-- Add the correct import path

// Define your param list with route names and their params (undefined if none)
export type HomeStackParamList = {
  HomeScreen: { fromLogin?: boolean } | undefined; 
  StartCaseSearch: undefined;
  CaseLoadScreen: undefined;
  CaseDetailsScreen: undefined;
  CaseLoadingScreen: { fromScreen?: string };
  CaseAddedScreen: undefined;
  CaseNotFoundScreen: undefined;
  NoCasesAdded: undefined;
  SearchCaseList : undefined; 
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
  GetLegalCasesScreen : undefined; 
  GetCauseListScreen : undefined;
  GetLegalJudgementsScreen: undefined;
  CaseResultsScreen: undefined; 
  SearchCaseDetailsScreen : undefined; 
  CaseSummaryScreen : undefined; 
  FetchingJudgements : undefined;
  JudgementsFetched : undefined; 
  FetchSelectedScreen : undefined;
  AddNewClientScreen : undefined;
  MultipleTypesSearchScreen : undefined; 
  EditClientScreen : undefined;
  
  
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
      <Stack.Screen name="GetLegalJudgementsScreen" component={GetLegalJudgements} />
      <Stack.Screen name="CaseLoadingScreen" component={CaseLoadingScreen} />
      <Stack.Screen name="GetCauseListScreen" component={GetCauseListScreen} />
           
      <Stack.Screen name="SearchCaseList" component={SearchedCaseListScreen} />
      <Stack.Screen name="GetLegalCasesScreen" component={GetLegalCasesScreen} />
      <Stack.Screen name="CaseResultsScreen" component={CaseResultsScreen} />
      <Stack.Screen name="SearchCaseDetailsScreen" component={SearchCaseDetailsScreen} />
      <Stack.Screen name="CaseSummaryScreen" component={CaseSummaryScreen} />
      <Stack.Screen name="FetchingJudgements" component={FetchingJudgements} />
      <Stack.Screen name="FetchSelectedScreen" component={FetchSelectedScreen} />
      <Stack.Screen name="AddNewClientScreen" component={AddNewClientScreen} />
      <Stack.Screen name="MultipleTypesSearchScreen" component={MultipleTypesSearchScreen} />
      <Stack.Screen name="EditClientScreen" component={AddNewClientScreen} />
      
      
      
    </Stack.Navigator>
  );
};

export default HomeStack;