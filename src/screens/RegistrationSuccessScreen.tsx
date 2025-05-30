/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const RegistrationSuccessScreen = () => {
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
            Registration Successful
          </Text>
          <Text className="text-gray-400 mb-10 text-center">
            Your Details Have Been Sent. Keep An Eye On Your Email For
            Onboarding Process
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Fixed Section */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={() => navigation.navigate('OtpVerificationScreen')}
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
              Know More
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          className="mt-6">
          <Text className="text-gray-400 text-center">
            Already Registered? <Text className="text-[#01B879]">Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegistrationSuccessScreen;
