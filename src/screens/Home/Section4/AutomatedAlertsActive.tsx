/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, Pressable, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';

type AutomatedAlertsActiveScreenProp = NativeStackScreenProps<
  YourAlertsStackParamList,
  'AutomatedAlertsActiveScreen'
>;

const AutomatedAlertsActiveScreen = (props : AutomatedAlertsActiveScreenProp) => {
  const {navigation} = props;

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 justify-between pb-5">
      {/* Back Button */}
      <View className="mt-6">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779]">
          <Icon name="arrow-left" size={20} color="#01B779" />
        </Pressable>
      </View>

      {/* Center Content */}
      <View className="flex-1 mt-10 ustify-center items-center">
        {/* Circle with Icon */}
        <Image
          source={require('../../../assets/images/noalerts.png')}
          className="w-30 h-30 my-10"
          resizeMode="contain"
        />

        {/* Confirmation Message */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-xl text-[#01B779] mb-2 text-center">
          Automated Alert Active
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-white text-center px-4">
          Further Case Hearing Notification will be triggered on automation
        </Text>
      </View>

      {/* View Your Cases Button */}
    </SafeAreaView>
  );
};

export default AutomatedAlertsActiveScreen;
