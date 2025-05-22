// ================== Type Definitions ==================
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

// import Favorites from '../screens/Favorites';

// Params for Home Stack
export type OrderHistoryParamList = {
  InvoiceDetailScreen: undefined; // No parameters expected
};

const OrderHistory = createNativeStackNavigator<OrderHistoryParamList>();

const InvoiceDetailScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

function OrderHistoryStackNavigator() {
  return (
    <OrderHistory.Navigator initialRouteName="InvoiceDetailScreen">
      <OrderHistory.Screen
        name="InvoiceDetailScreen"
        component={InvoiceDetailScreen}
        options={{headerShown: false}}
      />
    </OrderHistory.Navigator>
  );
}

export default OrderHistoryStackNavigator;
