/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AccountStackParamList} from '../../../stacks/YourAccountStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ContactAdminScreenProp = NativeStackScreenProps<
  AccountStackParamList,
  'YourAccountScreen'
>;

const ContactAdminScreen = (props : ContactAdminScreenProp) => {
  const {navigation} = props;

  return (
    <SafeAreaView
      className="flex-1 bg-[#0D2C32] px-5"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      {/* Header */}
      <View className="flex-row items-center mb-6 mt-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779]">
          <Image
            source={require('../../../assets/icons/back.png')}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </Pressable>
        <View className="ml-3">
          <Text className="text-white text-xs">Viewing</Text>
          <Text className="text-white text-base font-bold">Your Account</Text>
        </View>
      </View>

      {/* Warning Section */}
      <View className="items-center justify-center mt-20">
        <Image
          source={require('../../../assets/images/noalerts.png')}
          className="w-24 h-24"
          resizeMode="contain"
        />
        <Text className="text-[#00D38C] text-2xl font-bold mt-3">
          Pre Verified Details
        </Text>
        <Text className="text-white text-sm text-center px-4 mt-2">
          Your Account Details Are Pre Verified. {'\n'}
          Contact Administrator To Update.
        </Text>
      </View>

      {/* Set Contact Button */}
      <View className="absolute bottom-20 left-5 right-5">
        <LinearGradient
          colors={['#016361', '#01B679']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="rounded-lg overflow-hidden h-12 justify-center items-center">
          <Pressable
            onPress={() => navigation.navigate('ContactAdminScreen')}
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}
            className="w-full h-full justify-center items-center">
            <Text className="text-white font-bold font-spacegrotesk">
              Contact Administrator
            </Text>
          </Pressable>
        </LinearGradient>
      </View>

      {/* Footer */}
      <View className="absolute bottom-0 left-5 right-5 border-t border-white bg-[#0D2C32] py-3">
        <Text className="text-center text-white text-xs">
          Version: Beta{'\n'}
          Designed & Developed By{' '}
          <Text className="font-semibold">Claw LegalTech</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ContactAdminScreen;
