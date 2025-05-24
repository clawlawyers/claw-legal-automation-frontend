/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {HomeStackParamList} from '../../stacks/HomeStack';

type StartCaseSearchProp = NavigationProp<
  HomeStackParamList,
  'StartCaseSearch'
>;

const StartCaseSearch = () => {
  const navigation = useNavigation<StartCaseSearchProp>();

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5">
      {/* Header with Back Button */}
      <View className="w-10 h-10 mt-6 rounded-full overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-full justify-center items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-9 h-9 rounded-full bg-[#062C2D] justify-center items-center">
            <Icon name="arrow-left" size={20} color="#01B679" />
          </Pressable>
        </LinearGradient>
      </View>

      {/* Main Content - starts 30% from top */}
      <View className="flex-1 justify-start pt-[20%]">
        {/* Search Circle Icon */}
        <View className="w-45 h-45 rounded-full justify-center items-center mb-6 mx-auto">
          <Image
            source={require('../../assets/casesearch.png')}
            className="w-30 h-30"
            resizeMode="contain"
          />
        </View>

        {/* Title and Subtitle */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-xl font-semibold text-[#01B679] mb-1 text-center">
          Find a Case Instantly
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-sm text-white text-center mb-6 px-2">
          Search And Filter Through Your Case{'\n'}Records With Ease With CRN
        </Text>

        {/* Input */}
        <View className="w-full rounded-lg overflow-hidden mb-6">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="p-px">
            <TextInput
              style={{
                fontFamily: 'SpaceGrotesk',
                height: 45,
                backgroundColor: '#062C2D',
                borderRadius: 8, // Slightly less than rounded-lg (12) to account for border
                paddingHorizontal: 16,
                color: '#ACACAC',
              }}
              placeholder="Enter CRN Number"
              placeholderTextColor="#ccc"
            />
          </LinearGradient>
        </View>
      </View>

      {/* Fixed Bottom Button */}
      <View className="w-full mb-5 rounded-lg overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 justify-center items-center">
          <Pressable
            onPress={() => navigation.navigate('CaseLoadingScreen')}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <Text
              style={{fontFamily: 'SpaceGrotesk-Bold'}}
              className="text-white font-semibold">
              Fetch Case Details
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};
export default StartCaseSearch;
