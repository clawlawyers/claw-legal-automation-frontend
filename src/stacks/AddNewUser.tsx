// ================== Type Definitions ==================
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

// import Cart from '../screens/CartScreen';
// import Checkout from '../screens/CheckoutScreen';
// import PaymentMethods from '../screens/PaymentMethodsScreen';
// import ShippingAddress from '../screens/AddressScreen';
// import SuccessScreen from '../screens/SuccessScreen';

// Define the type for an Address object based on your schema
export type Address = {
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark?: string; // Optional field
  type: 'HOME' | 'WORK'; // Type of the address
  isDefault: boolean; // Whether the address is the default one
};

export type Card = {
  _id: string;
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  type: 'mastercard' | 'visa';
  isDefault: boolean;
};

// Params for Home Stack
export type AddNewUserStackParamList = {
  basicInfo: undefined;
  UserPermissions: undefined;
  AddNewUserAdded: undefined;
};

const BagStack = createNativeStackNavigator<AddNewUserStackParamList>();

const BasicInfo = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

function AddNewUserStackNavigator() {
  return (
    <BagStack.Navigator initialRouteName="basicInfo">
      <BagStack.Screen name="basicInfo" component={BasicInfo} />
    </BagStack.Navigator>
  );
}

export default AddNewUserStackNavigator;
