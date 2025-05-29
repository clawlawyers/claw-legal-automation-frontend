/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  const fillAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fillAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        navigation.replace('StartScreen');
      });
    }, 1000);
  }, []);

  const animatedFill = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const subtitleOpacity = fillAnim.interpolate({
    inputRange: [0.2, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const subtitleTranslateX = fillAnim.interpolate({
    inputRange: [0.2, 1],
    outputRange: [-20, 0],
    extrapolate: 'clamp',
  });

  return (
    <View className="flex-1 bg-[#143139] justify-center items-center">
      <View className="relative overflow-hidden">
        <Text
          className="text-[48px] font-bold tracking-wider"
          style={{
            color: '#143139',
            textShadowColor: 'white',
            // textShadowOffset: {width: 1.5, height: 1.5},
            textShadowRadius: 2,
          }}>
          CLAW
        </Text>

        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            width: animatedFill,
          }}>
          <Text
            className="text-[48px] font-bold tracking-wider text-white"
            style={{
              textShadowColor: 'rgba(0, 0, 0, 0.2)',
              textShadowOffset: {width: 1, height: 1},
              textShadowRadius: 1,
            }}>
            CLAW
          </Text>
        </Animated.View>
      </View>

      <Animated.Text
        className="mt-3 text-[14px] font-medium text-white"
        style={{
          opacity: subtitleOpacity,
          transform: [{translateX: subtitleTranslateX}],
        }}>
        Legal Automation
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;
