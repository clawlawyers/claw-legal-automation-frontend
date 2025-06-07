import React from 'react';
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
import SelectCourtScreen from '../screens/Home/Section2/SelectCourtScreen'; 
import HighCourtCaseSelectionScreen from '../screens/Home/Section2/HighCourtCaseSelectionScreen';
// import DistrictCourtCaseSelectionScreen from '../screens/Home/Section2/DistrictCourtCaseSelectionScreen';
import DistrictCourtCaseSelectionScreen from '../screens/Home/Section2/DistrictCourtCaseSelectionScreen';
import CaseInputScreen from '../screens/Home/Section2/CaseInputScreen';
// Import InputType from the appropriate file
import FetchingCaseScreen from '../screens/Home/Section6/FetchingCase';
import CaseLoadingScreen from '../screens/Home/Section1/CaseLoadingScreen'; // Adjust the path if needed
import AssociatedSetReminder from '../screens/Home/Section4/AssociatedSetReminder'; // Add this import
import AssociatedSetReminderScreen from '../screens/Home/Section4/AssociatedSetReminder';
import AssociateClientCaseScreen from '../screens/Home/Section1/AssociateClientCaseScreen'; // Adjust the path if needed
import SendCaseDetailsScreen from '../screens/Home/Section5/SendCaseDetails';
import OtherwaysInputScreen from '../screens/Home/Section2/OtherWaysInputScreen';
export type CaseDetailsType  = {
  clawId: string;
  crn: string;
  details: string;
  // Add other fields from your case object if they exist
  caseHead?: string;
  registrationNumber?: string;
  filingNumber?: string;
  courtName?: string;
  petitionerName?: string;
   registration_no?: string;
  filing_no?: string;
  court_name?: string;
  petitioner_name?: string;

  id?: string; 
  claw_case_id?: string; 
  crn_no?: string; 
  case_details?: string; 
};

export type YourCasesStackParamList = {
 YourCasesListScreen: undefined;
 CasesListScreen: undefined; 
  NoCasesAdded: undefined;
  CaseDetailsDownloadScreen: undefined;
  ClientDetailsScreen: undefined;
  ClientUpdateSuccess: undefined;
  AddNewClientScreen: undefined;
  ViewClientCasesScreen: undefined;
  SelectCourtScreen: undefined;
  HighCourtCaseSelectionScreen: undefined;
  DistrictCourtCaseSelectionScreen: undefined;
  CaseDetailsScreen: undefined; 
  CaseAddedScreen : undefined; 
   NoActiveAlertsScreen?: undefined;
  ClientUpdateSuccessScreen : undefined;
    AssociateClientCaseScreen: { caseId: string; caseDetails: CaseDetailsType } | undefined;
   AssociationScreen: { clientName: string; clientId?: string };
   SendCaseDetailsScreen : { caseDetails: CaseDetailsType };
   CaseLoadingScreen: { fromScreen: string } | undefined;
   OtherwaysInputScreen: undefined; // Adjust the type if needed
   
   // Adjust the type if needed
  
  
   

    CaseInputScreen: {
    
    
     }
  FetchingCaseScreen: { // Define params if you need to pass data
    // from CaseInputScreen
    crnValue?: string;
    selectedCaseTypeValue?: string | null;
    actualCaseNumberValue?: string;
    caseYearValue?: string;
    filingNumberValue?: string;
    filingYearValue?: string;
  } | undefined;
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
      <Stack.Screen
        name="CasesListScreen"
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
            <Stack.Screen name="HighCourtCaseSelectionScreen" component={HighCourtCaseSelectionScreen} />
             <Stack.Screen name="DistrictCourtCaseSelectionScreen" component={DistrictCourtCaseSelectionScreen} />

      <Stack.Screen name="SelectCourtScreen" component={SelectCourtScreen} />

      <Stack.Screen name="CaseInputScreen" component={CaseInputScreen} />
       <Stack.Screen name="FetchingCaseScreen" component={FetchingCaseScreen} />
      
        <Stack.Screen name="CaseDetailsScreen" component={CaseDetailsScreen} />
        
        <Stack.Screen name="CaseLoadingScreen" component={CaseLoadingScreen} />
        <Stack.Screen name="CaseAddedScreen" component={CaseAddedScreen} />
        <Stack.Screen name="ClientUpdateSuccessScreen" component={ClientUpdateSuccess} />
        <Stack.Screen name="AssociateClientCaseScreen" component={AssociateClientCaseScreen} />
        <Stack.Screen name="SendCaseDetailsScreen" component={SendCaseDetailsScreen} />
        <Stack.Screen name="OtherwaysInputScreen" component={OtherwaysInputScreen} />

     
      {/* Add other screens as needed */}
    </Stack.Navigator>
  );
};

export default YourCasesStack;
