/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#032B33]"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 24}}
        keyboardShouldPersistTaps="handled">
        <View className="flex-1 items-center justify-center pt-12 pb-6">
          <View className="mb-10">
            <Image
              source={require('../assets/LogoLogin.png')}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
          </View>

          <Text
            style={{fontSize: 22}}
            className="text-[#01B679] font-bold mb-2">
            Step Into Legal Tech
          </Text>
          <Text className="text-gray-400 mb-6 text-center">
            Future-Proof Your Practice With Smart Automation
          </Text>

          {/* Input Fields */}
          <TextInput
            placeholder="Enter Your Name"
            placeholderTextColor="#9CA3AF"
            className="w-full h-12 border border-[#01B879] rounded-md px-4 mb-3 text-white"
          />
          <TextInput
            placeholder="Enter Your Email ID"
            placeholderTextColor="#9CA3AF"
            className="w-full h-12 border border-[#01B879] rounded-md px-4 mb-3 text-white"
          />
          <TextInput
            placeholder="Enter Your Contact No"
            placeholderTextColor="#9CA3AF"
            className="w-full h-12 border border-[#01B879] rounded-md px-4 mb-3 text-white"
          />
          <TextInput
            placeholder="Enter Your Advocate Bar Code"
            placeholderTextColor="#9CA3AF"
            className="w-full h-12 border border-[#01B879] rounded-md px-4 mb-3 text-white"
          />
          <TextInput
            placeholder="Court Of Practice"
            placeholderTextColor="#9CA3AF"
            className="w-full h-12 border border-[#01B879] rounded-md px-4 mb-3 text-white"
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={() => navigation.navigate('RegistrationSuccessScreen')}
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
              Register Now
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

export default RegisterScreen;
