import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NoActiveAlertsScreen from '../screens/Home/Section4/NoActiveAlerts';
import CreateNewCaseScreen from '../screens/Home/Section4/CreateNewCase';

import StartAutomatedAlertsScreen from '../screens/Home/Section4/StartAutomatedAlerts';
import AssociatedSetReminderScreen from '../screens/Home/Section4/AssociatedSetReminder';
import SetReminderScreen from '../screens/Home/Section4/SetReminder';
import AutomatedAlertsActiveScreen from '../screens/Home/Section4/AutomatedAlertsActive';
import GetCauseListScreen from '../screens/Home/Section6/GetCauseList';
import FetchSelectedScreen from '../screens/Home/Section6/FetchSelected';
import RetrieveOrderScreen from '../screens/Home/Section6/RetrieveOrder';
import FetchingCaseScreen from '../screens/Home/Section6/FetchingCase';
import CauseFetchSuccessScreen from '../screens/Home/Section6/CauseFetchSuccess';
import GetLegalJudgements from '../screens/Home/Section7/GetLegalJudgements';
import FetchingJudgements from '../screens/Home/Section7/FetchingJudgements';
import JudgementsFetched from '../screens/Home/Section7/JudgementsFetched';

export type YourAlertsStackParamList = {
  NoActiveAlertsScreen: undefined;
  CreateNewCaseScreen: undefined;
  StartAutomatedAlertsScreen: undefined;
  AssociatedSetReminderScreen: undefined;
  SetReminderScreen: undefined;
  AutomatedAlertsActiveScreen: undefined;
  GetCauseListScreen: undefined;
  FetchSelectedScreen: undefined;
  RetrieveOrderScreen: undefined;
  FetchingCaseScreen: undefined;
  CauseFetchSuccessScreen: undefined;
  GetLegalJudgements: undefined;
  FetchingJudgements: undefined;
  JudgementsFetched: undefined;
};

const Stack = createNativeStackNavigator<YourAlertsStackParamList>();

const YourAlertsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GetLegalJudgements"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="NoActiveAlertsScreen"
        component={NoActiveAlertsScreen}
      />
      <Stack.Screen
        name="CreateNewCaseScreen"
        component={CreateNewCaseScreen}
      />
      <Stack.Screen
        name="StartAutomatedAlertsScreen"
        component={StartAutomatedAlertsScreen}
      />
      <Stack.Screen
        name="AssociatedSetReminderScreen"
        component={AssociatedSetReminderScreen}
      />
      <Stack.Screen name="SetReminderScreen" component={SetReminderScreen} />
      <Stack.Screen
        name="AutomatedAlertsActiveScreen"
        component={AutomatedAlertsActiveScreen}
      />
      <Stack.Screen name="GetCauseListScreen" component={GetCauseListScreen} />
      <Stack.Screen
        name="FetchSelectedScreen"
        component={FetchSelectedScreen}
      />
      <Stack.Screen
        name="RetrieveOrderScreen"
        component={RetrieveOrderScreen}
      />
      <Stack.Screen name="FetchingCaseScreen" component={FetchingCaseScreen} />
      <Stack.Screen
        name="CauseFetchSuccessScreen"
        component={CauseFetchSuccessScreen}
      />
      <Stack.Screen name="FetchingJudgements" component={FetchingJudgements} />
      <Stack.Screen name="GetLegalJudgements" component={GetLegalJudgements} />
      <Stack.Screen name="JudgementsFetched" component={JudgementsFetched} />
    </Stack.Navigator>
  );
};

export default YourAlertsStack;
