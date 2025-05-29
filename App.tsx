// import React from 'react';
// // import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// // import CustomTabBar from './src/components/CustomTabBar';
// // import HomeStackNavigator from './src/stacks/Home';
// // import AddNewUserStackNavigator from './src/stacks/AddNewUser';
// // import OrderHistoryStackNavigator from './src/stacks/OrderHistory';
// // import AccountStackNavigator from './src/stacks/Account';
// // import MainStack from './src/stacks/MainStack';
// // import RegistrationSuccessScreen from './src/screens/RegistrationSuccessScreen';
// // import OtpSuccessScreen from './src/screens/OtpSuccessScreen';
// // import OtpVerificationScreen from './src/screens/OtpVerificationScreen';
// // import SplashScreen from './src/screens/SplashScreen';
// import TabNavigator from './src/stacks/MainTabNavigator';

// // ================== Type Definitions ==================

// // Params for Root Tab Navigator
// // type RootTabParamList = {
// //   Home: undefined;
// //   AddNewUser: undefined;
// //   OrderHistory: undefined;
// //   Account: undefined;
// // };

// // Create the bottom tab navigator
// // const Tab = createBottomTabNavigator<RootTabParamList>();

// // const AppInner: React.FC = () => {
// //   return (
// //     <NavigationContainer>
// //       <Tab.Navigator
// //         screenOptions={{headerShown: false}}
// //         tabBar={props => <CustomTabBar {...props} />}
// //         initialRouteName="Home">
// //         <Tab.Screen name="Home" component={HomeStackNavigator} />
// //         <Tab.Screen name="AddNewUser" component={AddNewUserStackNavigator} />
// //         <Tab.Screen
// //           name="OrderHistory"
// //           component={OrderHistoryStackNavigator}
// //         />
// //         <Tab.Screen name="Account" component={AccountStackNavigator} />
// //       </Tab.Navigator>
// //     </NavigationContainer>
// //   );
// // };

// const NewInner: React.FC = () => {
//   return (
//     <NavigationContainer>
//       <TabNavigator />
//     </NavigationContainer>
//   );
// };

// const App: React.FC = () => {
//   return (
//     // <Provider store={store}>
//     //   {/* <FirmAccordion /> */}
//     //   <AppInner />
//     // </Provider>
//     // <AppInner />
//     // <MainStack />
//     <NewInner />
//   );
// };

// export default App;

// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from './src/stacks/RootStack';

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
