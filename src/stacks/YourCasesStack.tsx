import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YourCasesListScreen from '../screens/Home/Section2/YourCasesListScreen'; // Adjust path
import NoCasesAdded from '../screens/Home/Section2/NoCasesAdded';
import CaseDetailsDownloadScreen from '../screens/Home/Section2/CaseDetailsDownload';
import CaseDetailsScreen from '../screens/Home/Section1/CaseDetailsScreen';
import CaseAddedScreen from '../screens/Home/Section1/CaseAddedScreen';
import AssociationScreen from '../screens/Home/Section2/AssociationScreen';
import ClientDetailsScreen from '../screens/Home/Section3/ClientDetailsScreen';
import ClientUpdateSuccess from '../screens/Home/Section3/ClientUpdateSuccess';
import AddNewClientScreen from '../screens/Home/Section3/AddNewClient';
import ViewClientCasesScreen from '../screens/Home/Section3/ViewClientCasesScreen';
import MultipleTypesSearchScreen from '../screens/Home/Section2/MultipleTypesSearchScreen';
// Import InputType from the appropriate file
import FetchingCaseScreen from '../screens/Home/Section6/FetchingCase';
import CaseLoadingScreen from '../screens/Home/Section1/CaseLoadingScreen'; // Adjust the path if needed
import AssociatedSetReminder from '../screens/Home/Section4/AssociatedSetReminder'; // Add this import
import AssociatedSetReminderScreen from '../screens/Home/Section4/AssociatedSetReminder';
import AssociateClientCaseScreen from '../screens/Home/Section1/AssociateClientCaseScreen'; // Adjust the path if needed
import SendCaseDetailsScreen from '../screens/Home/Section5/SendCaseDetails';
import CnrInputScreen from '../screens/Home/Section2/CnrInputScreen';
import SearchedCaseListScreen from '../screens/Home/Section2/SearchedCaseListScreen';
import CaseNumberInputScreen from '../screens/Home/Section2/CaseNumberInputScreen';
import FilingNumberInputScreen from '../screens/Home/Section2/FilingNumberInputScreen';
import PartyNameInputScreen from '../screens/Home/Section2/PartyNameInputScreen';
import AdvocateNameInputScreen from '../screens/Home/Section2/AdvocateNameInputScreen';
import BarIdInputScreen from '../screens/Home/Section2/BarIdInputScreen';
import CaseHearingDetailsScreen from '../screens/Home/Section5/CaseHearingDetailsScreen'; // Adjust the path if needed
import HearingOrderDetailsScreen from '../screens/Home/Section5/HearingOrderDetailsScreen';
import SendHearingMessageScreen from '../screens/Home/Section5/SendHearingMessageScreen';
import SelectClientsScreen from '../screens/Home/Section5/SelectClientsScreen'; // Adjust the path if needed
import ProceedingDetailsSentScreen from '../screens/Home/Section5/ProceedingDetailsSent'; // Adjust the path if needed
import CasePaymentDetailsScreen from '../screens/Home/Section5/CasePaymentDetailsScreen'; // Adjust the path if needed
import SendInvoiceReminderScreen from '../screens/Home/Section5/SendInvoiceReminderScreen'; // Add this import
import InvoiceReminderSentScreen from '../screens/Home/Section5/InvoiceReminderSentScreen'; // Add this import
import {NODE_API_ENDPOINT} from '../utils/util';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setCases} from '../redux/commonSlice';
import {ActivityIndicator} from 'react-native';

// export type CaseDetailsType = {
//   clawId: string;
//   crn: string;
//   details: string;
//   // Add other fields from your case object if they exist
//   caseHead?: string;
//   registrationNumber?: string;
//   filingNumber?: string;
//   courtName?: string;
//   petitionerName?: string;
//   registration_no?: string;
//   filing_no?: string;
//   court_name?: string;
//   petitioner_name?: string;

//   id?: string;
//   claw_case_id?: string;
//   crn_no?: string;
//   case_details?: string;
// };

export type ClientType = {
  clientName: string;
  email: string;
  phone?: string;
  modeOfCommunication?: 'Email' | 'Phone';
  createdAt?: string;
  updatedAt?: string;
};

export type CaseDetailsType = {
  _id: string;

  case: {
    _id: string;
    crnNum: string;
    clawCaseId: string;
    filingNum: string;
    registrationNum: string;
    caseType: string;
    caseNum: string;
    year: string;
    previousCourtOrder: any[]; // Replace with specific type if available
    state: string;
    district: string;
    courtComplex: string;
    caseHierarchy: string;
    caseStatus: string;
    NextHearingDate: string; // ISO date string
    lastFetchedDate: string; // ISO date string

    partyName: {
      petitioners: string[];
      respondents: string[];
    };
    __v: number;
  };

  client: ClientType[];
  Advocate: string;
  isActive: boolean;
  __v: number;
};

export type YourCasesStackParamList = {
  YourCasesListScreen: undefined; // Adjust the type if needed
  CasesListScreen: undefined;
  NoCasesAdded: undefined;
  CaseDetailsDownloadScreen: undefined;
  ClientDetailsScreen: undefined;
  ClientUpdateSuccess: undefined;
  AddNewClientScreen: undefined;
  ViewClientCasesScreen: undefined;
  MultipleTypesSearchScreen: undefined;

  CaseDetailsScreen: undefined;
  CaseAddedScreen: undefined;
  NoActiveAlertsScreen?: undefined;
  ClientUpdateSuccessScreen: undefined;
  AssociateClientCaseScreen:
    | {caseId: string; caseDetails: CaseDetailsType}
    | undefined;
  AssociationScreen: {clientName: string; clientId?: string};
  SendCaseDetailsScreen: {caseDetails: CaseDetailsType};
  CaseLoadingScreen: {fromScreen: string} | undefined;

  // Adjust the type if needed
  CnrInputScreen: undefined;
  SearchedCaseListScreen: undefined;

  CaseNumberInputScreen: undefined;
  FilingNumberInputScreen: undefined;
  PartyNameInputScreen: undefined;
  AdvocateNameInputScreen: undefined;
  BarIdInputScreen: undefined;
  CaseHearingDetailsScreen: undefined;
  HearingOrderDetailsScreen: undefined;
  SendHearingCaseDetails: undefined;
  SendHearingMessageScreen: undefined;
  SelectClientsScreen: undefined;
  ProceedingDetailsSent: undefined;
  CasePaymentDetailsScreen: undefined;
  SendInvoiceReminderScreen: undefined;
  InvoiceReminderSentScreen: undefined;

  FetchingCaseScreen:
    | {
        // Define params if you need to pass data
        // from CaseInputScreen
        crnValue?: string;
        selectedCaseTypeValue?: string | null;
        actualCaseNumberValue?: string;
        caseYearValue?: string;
        filingNumberValue?: string;
        filingYearValue?: string;
      }
    | undefined;
};

const Stack = createNativeStackNavigator<YourCasesStackParamList>();

const YourCasesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'YourCasesListScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="YourCasesListScreen"
        component={YourCasesListScreen}
      />
      <Stack.Screen name="CasesListScreen" component={YourCasesListScreen} />
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

      <Stack.Screen
        name="MultipleTypesSearchScreen"
        component={MultipleTypesSearchScreen}
      />

      <Stack.Screen name="CnrInputScreen" component={CnrInputScreen} />
      <Stack.Screen
        name="SearchedCaseListScreen"
        component={SearchedCaseListScreen}
      />

      <Stack.Screen
        name="CaseNumberInputScreen"
        component={CaseNumberInputScreen}
      />
      <Stack.Screen
        name="FilingNumberInputScreen"
        component={FilingNumberInputScreen}
      />
      <Stack.Screen
        name="PartyNameInputScreen"
        component={PartyNameInputScreen}
      />
      <Stack.Screen
        name="AdvocateNameInputScreen"
        component={AdvocateNameInputScreen}
      />
      <Stack.Screen name="BarIdInputScreen" component={BarIdInputScreen} />

      <Stack.Screen name="FetchingCaseScreen" component={FetchingCaseScreen} />

      <Stack.Screen name="CaseDetailsScreen" component={CaseDetailsScreen} />

      <Stack.Screen name="CaseLoadingScreen" component={CaseLoadingScreen} />
      <Stack.Screen name="CaseAddedScreen" component={CaseAddedScreen} />
      <Stack.Screen
        name="ClientUpdateSuccessScreen"
        component={ClientUpdateSuccess}
      />
      <Stack.Screen
        name="AssociateClientCaseScreen"
        component={AssociateClientCaseScreen}
      />
      <Stack.Screen
        name="SendCaseDetailsScreen"
        component={SendCaseDetailsScreen}
      />
      <Stack.Screen
        name="SendHearingCaseDetails"
        component={SendCaseDetailsScreen}
      />

      <Stack.Screen
        name="CaseHearingDetailsScreen"
        component={CaseHearingDetailsScreen}
      />
      <Stack.Screen
        name="HearingOrderDetailsScreen"
        component={HearingOrderDetailsScreen}
      />
      <Stack.Screen
        name="SendHearingMessageScreen"
        component={SendHearingMessageScreen}
      />
      <Stack.Screen
        name="SelectClientsScreen"
        component={SelectClientsScreen}
      />
      <Stack.Screen
        name="ProceedingDetailsSent"
        component={ProceedingDetailsSentScreen}
      />
      <Stack.Screen
        name="CasePaymentDetailsScreen"
        component={CasePaymentDetailsScreen}
      />
      <Stack.Screen
        name="SendInvoiceReminderScreen"
        component={SendInvoiceReminderScreen}
      />
      <Stack.Screen
        name="InvoiceReminderSentScreen"
        component={InvoiceReminderSentScreen}
      />

      {/* Add other screens as needed */}
    </Stack.Navigator>
  );
};

export default YourCasesStack;
