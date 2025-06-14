// src/screens/Home/Section2/CaseLoadingScreen.tsx

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from '../../../stacks/HomeStack';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';

type CaseLoadingNavigationProp = NativeStackScreenProps<
  HomeStackParamList,
  'CaseLoadingScreen'
>;

type CaseLoadingScreenRouteProp = RouteProp<
  HomeStackParamList,
  'CaseLoadingScreen'
>;

const CaseLoadingScreen = (props : CaseLoadingNavigationProp) => {
  const {navigation} = props;
  const route = useRoute<CaseLoadingScreenRouteProp>();
  const blinkOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkOpacity, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        Animated.timing(blinkOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    );
    blinkAnimation.start();

    const fromScreen = route.params?.fromScreen;

    const searchResultScreens = [
      'CnrInputScreen',
      'CaseNumberInputScreen',
      'FilingNumberInputScreen',
      'PartyNameInputScreen',
      'AdvocateNameInputScreen',
      'BarIdInputScreen',
    ];

    const timer = setTimeout(() => {
      if (fromScreen && searchResultScreens.includes(fromScreen)) {
        // Corrected the navigation destination to match the component name
        // Make sure 'SearchedCaseListScreen' is the name in your Stack Navigator!
        navigation.replace('SearchedCaseListScreen')
      } else {
        // Added a fallback: if no parameter is passed, just go back.
        // This prevents the screen from getting stuck.
        console.warn('CaseLoadingScreen was called without a "fromScreen" param. Navigating back.');
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }
    }, 3000);

    return () => {
      blinkAnimation.stop();
      clearTimeout(timer);
    };
  }, []); // Removed dependencies to prevent re-running on param changes

  return (
    <LinearGradient
      colors={['#062C2D', '#083F40']}
      style={styles.container}>
      <View style={styles.content}>
        <Animated.Image
          source={require('../../../assets/casesearch.png')}
          style={[styles.image, {opacity: blinkOpacity}]}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>
          Fetching Case
        </Text>
        <Text style={styles.subtitleText}>
          Please Wait. It Might Take 1 - 3 Minutes
        </Text>
        <Text style={styles.infoText}>
          Only To Fetch Your Case
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: '#01B679',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: '#9CA3AF', // Corresponds to text-gray-400
    textAlign: 'center',
  },
});

export default CaseLoadingScreen;