/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '../../../stacks/HomeStack'; // Adjust import path as needed
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type CaseLoadingNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'CaseLoadingScreen'
>;

const CaseLoadingScreen = () => {
  const navigation = useNavigation<CaseLoadingNavigationProp>();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    spinAnimation.start();

    // Set timeout for navigation
    const timer = setTimeout(() => {
      navigation.navigate('CaseDetailsScreen');
    }, 3000); // 3 seconds delay

    return () => {
      spinAnimation.stop();
      clearTimeout(timer); // Clean up the timer
    };
  }, [navigation, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#062C2D', '#083F40']}
      className="flex-1 justify-center items-center p-5">
      <View className="items-center">
        <Animated.Image
          source={require('../../../assets/casesearch.png')}
          style={{
            width: 150,
            height: 150,
            transform: [{rotate: spin}],
            marginBottom: 30,
          }}
          resizeMode="contain"
        />
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-2xl text-[#01B679] mb-4 text-center">
          Fetching Case
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-lg text-white text-center mb-2">
          Please Wait. It Might Take 1 - 3 Minutes
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-base text-gray-400 text-center">
          Only To Fetch Your Case
        </Text>
      </View>
    </LinearGradient>
  );
};

export default CaseLoadingScreen;
