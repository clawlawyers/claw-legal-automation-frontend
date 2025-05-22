/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const OtpVerificationScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#032B33]"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}
        keyboardShouldPersistTaps="handled">
        <View className="items-center">
          <View className="mb-10">
            <Image
              source={require('../assets/LogoLogin.png')}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
          </View>

          <Text
            style={{fontSize: 22}}
            className="text-[#01B679] font-bold mb-2 text-center">
            OTP Verification
          </Text>
          <Text className="text-gray-400 mb-6 text-center">
            We've Sent A 6-Digit Code To Your Registered Email ID
          </Text>

          <View className="flex-row justify-center space-x-2 mb-6">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <TextInput
                  key={i}
                  className="w-10 h-12 mx-1 border border-[#01B879] rounded-md text-center text-white"
                  maxLength={1}
                  keyboardType="numeric"
                />
              ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Fixed Section */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={() => navigation.navigate('OtpSuccessScreen')}
          style={{
            width: '100%',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: 'center',
            }}>
            <Text className="text-white font-semibold text-base">
              Verify OTP
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-6">
          <Text className="text-gray-400 text-center">
            Wrong Email ID?{' '}
            <Text className="text-[#01B879]">Re-enter Email</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerificationScreen;
