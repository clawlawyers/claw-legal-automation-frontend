// ================== Type Definitions ==================
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

// Params for Home Stack
export type AccountStackParamList = {
  Account: undefined; // No parameters expected
  FirmScreens: undefined; // No parameters expected
  FirmDetailsScreens: undefined;
  UserDetailsScreen: undefined;
  UsersScreen: undefined;
  MyOrder: undefined;
  OrderDetails: {orderId: string};
  ShippingAddress: undefined;
  PaymentMethod: undefined;
  MyReviews: undefined;
  Setting: undefined;
  Home: undefined;
};

const AccountStack = createNativeStackNavigator<AccountStackParamList>();

const AccountScreen = () => {
  return (
    <View>
      <Text>Account Screen</Text>
    </View>
  );
};

function AccountStackNavigator() {
  return (
    <AccountStack.Navigator initialRouteName="Account">
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </AccountStack.Navigator>
  );
}

export default AccountStackNavigator;
