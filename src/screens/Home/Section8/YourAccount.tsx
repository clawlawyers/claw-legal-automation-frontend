/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import {AccountStackParamList} from '../../../stacks/YourAccountStack';

const BORDER_RADIUS = 16; 
const BORDER_WIDTH = 2; 

type YourAccountScreenProp = NavigationProp<
  AccountStackParamList,
  'YourAccountScreen'
>;

const YourAccountScreen = () => {
  const navigation = useNavigation<YourAccountScreenProp>();

  const accountDetails = [
    'Adv. Soumya Snigdha Banik',
    'soumyabanik0@gmail.com',
    '+91 7384242486',
    'WB/12589/2019',
  ];

  const actionButtons = [
    { label: 'Edit Details', onPress: () => navigation.navigate('ContactAdminScreen') },
    { label: 'Add New Advocate', onPress: () => { /* Navigation logic for Add New Advocate */ } },
    { label: 'Log Out', onPress: () => { /* Logout logic */ } },
  ];

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
          <Text className="text-white font-spacegrotesk text-xs">Viewing</Text>
          <Text
            style={{fontFamily: 'SpaceGrotesk-Bold'}}
            className="text-white text-base"> 
            Your Account
          </Text>
        </View>
      </View>

      {/* Scrollable Content Area */}
     
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 96 }}>
        {/* Details Card with proper rounded gradient border */}
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            borderRadius: BORDER_RADIUS,
            padding: BORDER_WIDTH,
            marginBottom: 24,
            overflow: 'hidden',
          }}>
          <View
            style={{
              backgroundColor: '#0D2C32',
              borderRadius: BORDER_RADIUS - BORDER_WIDTH, 
              padding: 16,
            }}>
            {accountDetails.map((value, index) => (
              <LinearGradient
                key={index}
                colors={['#016361', '#01B779']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className={`${index !== accountDetails.length - 1 ? 'mb-3' : ''}`}
                style={{
                  borderRadius: 8, 
                  padding: 1, 
                }}>
                <View
                  style={{
                    backgroundColor: '#0D2C32',
                    borderRadius: 7, 
                    paddingHorizontal: 12,
                    height: 48, 
                    justifyContent: 'center', 
                  }}>
                  <TextInput
                    editable={false}
                    value={value}
                    style={{
                      color: 'white',
                      fontFamily: 'SpaceGrotesk-Regular', 
                      fontSize: 14, 
                    }}
                    placeholderTextColor="#A0A0A0" 
                  />
                </View>
              </LinearGradient>
            ))}
          </View>
        </LinearGradient>

        {/* Buttons */}
        {actionButtons.map(({label, onPress}, idx) => (
          <LinearGradient
            key={idx}
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="rounded-lg mb-4 overflow-hidden h-12 justify-center items-center">
            <Pressable
              className="w-full h-full py-3 items-center justify-center" 
              onPress={onPress}
              android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
              >
              <Text
                className="text-white text-base" 
                style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                {label}
              </Text>
            </Pressable>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Fixed Bottom Footer */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-white/20 mx-5 bg-[#0D2C32] py-3">
        <Text className="text-center text-white text-xs font-spacegrotesk">
          Version: Beta{'\n'}
          Designed & Developed By{' '}
          <Text className="font-semibold">Claw LegalTech</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default YourAccountScreen;