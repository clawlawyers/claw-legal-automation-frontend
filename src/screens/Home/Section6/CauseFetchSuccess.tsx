/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';
import {SafeAreaView} from 'react-native-safe-area-context';

type CauseFetchSuccessScreenProp = NativeStackScreenProps<
  YourAlertsStackParamList,
  'CauseFetchSuccessScreen'
>;

const CauseFetchSuccessScreen = (props : CauseFetchSuccessScreenProp) => {
  const {navigation} = props;

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 justify-between pb-5">
      {/* Back Button */}
      <View className="mt-6">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779]">
          <Image
            source={require('../../../assets/icons/back.png')}
            className="w-30 h-30"
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* Center Content */}
      <View className="flex-1 mt-10 ustify-center items-center">
        {/* Circle with Icon */}
        <Image
          source={require('../../../assets/icons/causelisticon.png')}
          className="w-30 h-30"
          resizeMode="contain"
        />

        {/* Confirmation Message */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-xl text-[#01B679] mb-2 text-center">
          Causes Fetched Successfully
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-white text-center px-4">
          Your cause list has been retrieved and is Sent to your selected
          receiving devices
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CauseFetchSuccessScreen;
