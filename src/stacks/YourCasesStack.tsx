import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourCasesListScreen from '../screens/Home/YourCasesListScreen'; // Adjust path
import NoCasesAdded from '../screens/Home/NoCasesAdded';
import CaseDetailsDownloadScreen from '../screens/Home/CaseDetailsDownload';
import AssociationScreen from '../screens/Home/AssociationScreen';

export type YourCasesStackParamList = {
  YourCasesListScreen: undefined;
  NoCasesAdded: undefined;
  CaseDetailsDownloadScreen: undefined;
  AssociationScreen: undefined;
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
      <Stack.Screen name="AssociationScreen" component={AssociationScreen} />
    </Stack.Navigator>
  );
};

export default YourCasesStack;
