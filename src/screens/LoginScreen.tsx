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

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#032B33]"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 24}}
        keyboardShouldPersistTaps="handled">
        <View className="flex-1 items-center justify-center pt-12 pb-6">
          {/* Logo */}
          <View className="mb-10">
            <Image
              source={require('../assets/LogoLogin.png')}
              style={{width: 200, height: 200, resizeMode: 'contain'}}
            />
          </View>

          <Text
            style={{fontSize: 22}}
            className="text-[#01B679] font-bold mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-400 text-sm mb-8 text-center">
            Your Digital Legal Assistant is Ready
          </Text>

          {/* Email Input with Gradient Border */}
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: '100%',
              borderRadius: 8,
              padding: 1,
              marginBottom: 16,
            }}>
            <View className="bg-[#032B33] rounded-md">
              <TextInput
                placeholder="Enter Your Email ID"
                placeholderTextColor="#9CA3AF"
                className="w-full h-12 rounded-md px-4 text-white"
              />
            </View>
          </LinearGradient>

          {/* Password Input with Gradient Border */}
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{width: '100%', borderRadius: 8, padding: 1}}>
            <View className="bg-[#032B33] rounded-md">
              <TextInput
                placeholder="Enter Your Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                className="w-full h-12 rounded-md px-4 text-white"
              />
            </View>
          </LinearGradient>

          <TouchableOpacity className="self-end mt-2 mb-6">
            <Text className="text-[#ACACAC] text-sm">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
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
            <Text className="text-white font-semibold text-base">Log In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text className="text-gray-400 mt-6 text-center">
          New Here? <Text className="text-[#01B879]">Create An Account</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
