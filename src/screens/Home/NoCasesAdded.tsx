/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const NoCasesAdded = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 justify-between pb-5">
      {/* Header */}
      <View className="mt-6 flex-row">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779]">
          <Icon name="arrow-left" size={20} color="#01B779" />
        </Pressable>
        <View className="flex-col ml-3">
          <Text className="text-white font-spacegrotesk text-xs">Viewing</Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'SpaceGrotesk-Bold',
            }}>
            Your Cases
          </Text>
        </View>
      </View>

      {/* Center Content */}
      <View className="flex-1 justify-center items-center">
        {/* Alert Icon */}
        <Icon name="alert-triangle" size={60} color="#01B779" />

        {/* No Cases Text */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-[#01B779] text-xl mb-2 text-center">
          No Cases Added
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-white text-center px-4">
          Organize Your Legal Work By Adding Your{'\n'}First Case
        </Text>
      </View>

      {/* Buttons */}
      <View className="space-y-4">
        <View className="rounded-lg my-4 overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-full h-12 justify-center items-center">
            <Pressable
              onPress={() => navigation.navigate('YourCasesListScreen')}
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                style={{fontFamily: 'SpaceGrotesk-Bold'}}
                className="text-white font-semibold">
                View Cases
              </Text>
            </Pressable>
          </LinearGradient>
        </View>

        {/* Add Cases Button - No border radius */}
        <View className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-full h-12 justify-center items-center">
            <Pressable
              onPress={() => navigation.navigate('YourCasesListScreen')}
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                style={{fontFamily: 'SpaceGrotesk-Bold'}}
                className="text-white font-semibold">
                Add Cases
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoCasesAdded;
