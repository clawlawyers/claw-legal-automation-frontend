/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';

// Two image versions: default (white) and selected (gradient-colored)
const iconsMap: Record<
  string,
  {defaultIcon: any; selectedIcon: any; label: string}
> = {
  Home: {
    defaultIcon: require('../assets/home-icon.png'),
    selectedIcon: require('../assets/home-selected.png'),
    label: 'Home',
  },
  YourCases: {
    defaultIcon: require('../assets/Secondtab.png'),
    selectedIcon: require('../assets/cases-selected.png'),
    label: 'Your Cases',
  },
  Alerts: {
    defaultIcon: require('../assets/third.png'),
    selectedIcon: require('../assets/alerts-selected.png'),
    label: 'Alerts',
  },
  Account: {
    defaultIcon: require('../assets/youraccount.png'),
    selectedIcon: require('../assets/account-selected.png'),
    label: 'Your Account',
  },
  Settings: {
    defaultIcon: require('../assets/settings.png'),
    selectedIcon: require('../assets/settings-selected.png'),
    label: 'Settings',
  },
};

const HIDDEN_ROUTES = ['Splash',
  'StartCaseSearch',
  'CaseLoadingScreen',
  'CaseDetailsScreen',
  'CaseAddedScreen',
  'CaseNotFound',
  'SelectCourtScreen',
  'LegalGptScreen',
  'AddClientScreen',
  'ClientUpdateScreen',
  'CaseDeetailsDownload',
  'YourCasesListScreen',
  'CreateNewCase',
  'AutomatedAlertsActive',
  'AssociatedSetReminder',

  'NoActiveAlerts',
  'GetReminder',
  'StartAutomatedAlerts',
  'SendCaseDetails',
  'ProceedingDetailsSent',
  'FetchingCase',
  'ClientDetailsScreen',
  'CauseFetchSuccess',
  'FetchSelected',
  'GetCauseListScreen',
  'RetrieveOrder',
  'FetchingJudgements',
  'GetLegalJudgements',
  'JudgementsFetched',
  'Contactadmin',
  'YourAccount',
  'ViewClientCasesScreen',
  'AddNewClientScreen',
  'HighCourtCaseSelectionScreen',
  'DistrictCourtCaseSelectionScreen',
  'CaseInputScreen',
  'OtherwaysInputScreen',
  'FetchingCaseScreen',
  'AssociateClientCaseScreen',
  'CaseDetailsDownloadScreen',
  'CaseDetailsScreen',
  'CaseAddedScreen',
  'ClientUpdateSuccessScreen',
  


];

const MyTabBar: React.FC<BottomTabBarProps> = ({state, navigation}) => {
  // Instead of using useNavigationState, we should use the state prop that's already passed in
  const currentRoute = state.routes[state.index];

  const nestedState = currentRoute?.state as any;
  const nestedRouteName =
    nestedState?.routes?.[nestedState.index]?.name ?? currentRoute?.name;

  const shouldHide = HIDDEN_ROUTES.includes(nestedRouteName);

  if (shouldHide) {
    return null;
  }

  return (
    <View className="flex-row justify-around bg-[#0B1B20] pt-3 pb-4">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const iconData = iconsMap[route.name];
        const iconSource = isFocused
          ? iconData?.selectedIcon
          : iconData?.defaultIcon;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            className="items-center flex-1 border-0">
            <View className="items-center justify-center mb-0.5">
              <Image
                source={iconSource}
                style={{width: 22, height: 22}}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{fontSize: 10, fontFamily: 'SpaceGrotesk-Bold'}}
              className={`mt-1 ${
                isFocused ? 'text-[#006261] font-semibold' : 'text-white'
              }`}>
              {iconData?.label || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default MyTabBar;
