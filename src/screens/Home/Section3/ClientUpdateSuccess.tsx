/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, Pressable, SafeAreaView} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack';

type ClientUpdateSuccessNavigationProp = NavigationProp<  YourCasesStackParamList,'ClientUpdateSuccess'

>;

const ClientUpdateSuccess = () => {
  const navigation = useNavigation<ClientUpdateSuccessNavigationProp>();


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
          source={require('../../../assets/clientdetails.png')}
          className="w-30 h-30"
          resizeMode="contain"
        />

        {/* Confirmation Message */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-xl text-[#01B779] mb-2 text-center">
          Client Update Successful
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-white text-center px-4">
          Start adding cases or documents to this client now
          <Text className="font-bold text-white">“Your Cases”</Text>
        </Text>
      </View>

      {/* View Your Cases Button */}
      <View className="rounded-lg overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="h-12 w-full justify-center items-center rounded-xl">
          <Pressable
            onPress={() => navigation.navigate('AddNewClientScreen')}
            className="w-full h-full justify-center items-center">
            <Text
              style={{fontFamily: 'SpaceGrotesk-Bold'}}
              className="text-white text-base">
              View All Clients
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default ClientUpdateSuccess;
