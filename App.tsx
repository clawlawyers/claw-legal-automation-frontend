/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CustomTabBar from './src/components/CustomTabBar';
import HomeStackNavigator from './src/stacks/Home';
import AddNewUserStackNavigator from './src/stacks/AddNewUser';
import OrderHistoryStackNavigator from './src/stacks/OrderHistory';
import AccountStackNavigator from './src/stacks/Account';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

// ================== Type Definitions ==================

// Params for Root Tab Navigator
type RootTabParamList = {
  Home: undefined;
  AddNewUser: undefined;
  OrderHistory: undefined;
  Account: undefined;
};

// Create the bottom tab navigator
const Tab = createBottomTabNavigator<RootTabParamList>();

const AppInner: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => <CustomTabBar {...props} />}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="AddNewUser" component={AddNewUserStackNavigator} />
        <Tab.Screen
          name="OrderHistory"
          component={OrderHistoryStackNavigator}
        />
        <Tab.Screen name="Account" component={AccountStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    // <Provider store={store}>
    //   {/* <FirmAccordion /> */}
    //   <AppInner />
    // </Provider>
    <AppInner />
  );
};

export default App;
