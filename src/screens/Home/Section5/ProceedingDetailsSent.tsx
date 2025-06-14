
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, Image, Pressable, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../stacks/HomeStack'; // Adjust path if needed

type ProceedingDetailsSentScreenProp = NativeStackScreenProps<
  HomeStackParamList,
  'ProceedingDetailsSentScreen'
>;

const ProceedingDetailsSentScreen = (props : ProceedingDetailsSentScreenProp) => {
  const {navigation} = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack();
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

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
      <View className="flex-1 -mt-10 justify-center items-center">
        <View className="w-45 h-45 rounded-full justify-center items-center mb-6 mx-auto">
          <Image
            source={require('../../../assets/casesearch.png')}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>

        {/* Confirmation Message */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-xl text-[#01B779] mb-2 text-center">
          Proceeding Details Sent
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-white text-center px-4">
          The case proceeding information has been successfully sent to the
          selected clients.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProceedingDetailsSentScreen;