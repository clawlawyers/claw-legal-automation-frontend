/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ResetPasswordScreen = () => {
  const navigation = useNavigation<any>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#032B33] px-6"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Main content */}
      <View className="flex-1 justify-center">
        <View className="mb-10 items-center">
          <Image
            source={require('../assets/LogoLogin.png')}
            style={{width: 200, height: 200, resizeMode: 'contain'}}
          />
        </View>

        <Text
          style={{fontSize: 22}}
          className="text-[#01B679] text-center font-bold mb-2">
          Reset Your Password
        </Text>
        <Text className="text-gray-400 text-center mb-6">
          Enter A New Password To Regain Access To Your Legal Workspace
        </Text>

        <TextInput
          placeholder="Enter New Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          className="w-full h-12 border border-[#01B879] rounded-md px-4 mb-4 text-white"
        />
        <TextInput
          placeholder="Confirm Your Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-full h-12 border border-[#01B879] rounded-md px-4 text-white"
        />
      </View>

      {/* Fixed bottom button */}
      <View className="mb-8">
        <TouchableOpacity
          onPress={() => navigation.replace('PostAuthLoadingScreen')}
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
              Reset Password
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
