/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const OtpSuccessScreen = () => {
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
            Verification Successful
          </Text>
          <Text className="text-gray-400 mb-10 text-center">
            Your Identity Has Been Confirmed. You're All Set To Continue
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Button at Bottom */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
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
            <Text className="text-white font-semibold text-base">Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpSuccessScreen;
