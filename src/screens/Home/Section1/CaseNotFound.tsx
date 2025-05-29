/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Text, Image, Pressable, SafeAreaView} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {HomeStackParamList} from '../../../stacks/HomeStack';

type CaseNotFoundScreenProp = NavigationProp<
  HomeStackParamList,
  'StartCaseSearch'
>;

const CaseNotFoundScreen = () => {
  const navigation = useNavigation<CaseNotFoundScreenProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('NoCasesAdded');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

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
          source={require('../../../assets/casesearch.png')}
          className="w-30 h-30"
          resizeMode="contain"
        />

        {/* Confirmation Message */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-xl text-[#01B779] mb-2 text-center">
          Case Not Found
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-white text-center px-4">
          No Case Found with your CRN Number. kindly check before proceeding
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CaseNotFoundScreen;
