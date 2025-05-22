// src/navigation/MainStack.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import StartScreen from '../screens/StartScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegistrationSuccessScreen from '../screens/RegistrationSuccessScreen';
import OtpSuccessScreen from '../screens/OtpSuccessScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import LoginScreen from '../screens/LoginScreen';

export type MainStackParamList = {
  Splash: undefined;
  StartScreen: undefined;
  RegisterScreen: undefined;
  RegistrationSuccessScreen: undefined;
  OtpSuccessScreen: undefined;
  OtpVerificationScreen: undefined;
  ResetPasswordScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegistrationSuccessScreen"
          component={RegistrationSuccessScreen}
        />
        <Stack.Screen name="OtpSuccessScreen" component={OtpSuccessScreen} />
        <Stack.Screen
          name="OtpVerificationScreen"
          component={OtpVerificationScreen}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
