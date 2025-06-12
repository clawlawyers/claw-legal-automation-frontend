// ================== Type Definitions ==================
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourAccountScreen from '../screens/Home/Section8/YourAccount';
import ContactAdminScreen from '../screens/Home/Section8/ContactAdmin';
import FirmAdvocateListScreen from '../screens/Home/Section8/FirmAdvocateListScreen';
import AddAdvocateScreen from '../screens/Home/Section8/AddAdvocateScreen';
import FirmAdvocateDetailsScreen from '../screens/Home/Section8/FirmAdvocateDetailsScreen';
import AdvocateCaseListScreen from '../screens/Home/Section8/AdvocateCaseListScreen';

// Params for Home Stack
export type AccountStackParamList = {
  YourAccountScreen: undefined;
  ContactAdminScreen: undefined;
  FirmAdvocateListScreen : undefined;
  AddAdvocateScreen : undefined;
  FirmAdvocateDetailsScreen : undefined;
  AdvocateCaseListScreen : undefined; 
};

const Stack = createNativeStackNavigator<AccountStackParamList>();

function YourAccountStack() {
  return (
    <Stack.Navigator initialRouteName="YourAccountScreen">
      <Stack.Screen
        name="YourAccountScreen"
        component={YourAccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactAdminScreen"
        component={ContactAdminScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FirmAdvocateListScreen"
        component={FirmAdvocateListScreen} // Assuming this is the correct screen for the advocate list
        options={{headerShown: false}}/>
        <Stack.Screen name='AddAdvocateScreen' component={AddAdvocateScreen} options={{headerShown: false}}/>
        <Stack.Screen name='FirmAdvocateDetailsScreen' component={FirmAdvocateDetailsScreen} options={{headerShown: false}}/>
        <Stack.Screen name='AdvocateCaseListScreen' component={AdvocateCaseListScreen} options={{headerShown: false}}/>

    </Stack.Navigator>
  );
}

export default YourAccountStack;
