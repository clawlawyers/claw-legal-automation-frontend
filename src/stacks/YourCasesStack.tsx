import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourCasesListScreen from '../screens/Home/YourCasesListScreen'; // Adjust path
import NoCasesAdded from '../screens/Home/NoCasesAdded';
import CaseDetailsDownloadScreen from '../screens/Home/CaseDetailsDownload';
import AssociationScreen from '../screens/Home/AssociationScreen';
import ClientDetailsScreen from '../screens/Home/Section3/ClientDetailsScreen';
import ClientUpdateSuccess from '../screens/Home/Section3/ClientUpdateSuccess';
import AddNewClientScreen from '../screens/Home/Section3/AddNewClient';
import ViewClientCasesScreen from '../screens/Home/Section3/ViewClientCasesScreen';

export type YourCasesStackParamList = {
  YourCasesListScreen: undefined;
  NoCasesAdded: undefined;
  CaseDetailsDownloadScreen: undefined;
  AssociationScreen: undefined;
  ClientDetailsScreen: undefined;
  ClientUpdateSuccess: undefined;
  AddNewClientScreen: undefined;
  ViewClientCasesScreen: undefined;
};

const Stack = createNativeStackNavigator<YourCasesStackParamList>();

const YourCasesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="NoCasesAdded"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="YourCasesListScreen"
        component={YourCasesListScreen}
      />
      <Stack.Screen name="NoCasesAdded" component={NoCasesAdded} />
      <Stack.Screen
        name="CaseDetailsDownloadScreen"
        component={CaseDetailsDownloadScreen}
      />

      <Stack.Screen
        name="ClientDetailsScreen"
        component={ClientDetailsScreen}
      />
      <Stack.Screen name="AssociationScreen" component={AssociationScreen} />
      <Stack.Screen
        name="ClientUpdateSuccess"
        component={ClientUpdateSuccess}
      />
      <Stack.Screen name="AddNewClientScreen" component={AddNewClientScreen} />
      <Stack.Screen
        name="ViewClientCasesScreen"
        component={ViewClientCasesScreen}
      />
    </Stack.Navigator>
  );
};

export default YourCasesStack;
