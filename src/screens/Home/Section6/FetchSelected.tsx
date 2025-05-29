/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const cases = [
  {
    clawId: 'CL00025',
    crn: 'WB071256987589742007',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
  {
    clawId: 'CL00023',
    crn: 'WB071256987589742007',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
];

type SendCaseDetailsScreenProp = NativeStackNavigationProp<
  YourAlertsStackParamList,
  'FetchSelectedScreen'
>;

const FetchSelectedScreen = () => {
  const navigation = useNavigation<SendCaseDetailsScreenProp>();
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number | null>(
    null,
  );

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 pb-6">
      {/* Header */}
      <View className="flex-row items-center mt-5">
        {/* Back Button */}
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-10 h-10 rounded-full justify-center items-center overflow-hidden">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <View className="w-9 h-9 rounded-full bg-[#062C2D] justify-center items-center">
              <Icon name="arrow-left" size={20} color="#01B679" />
            </View>
          </Pressable>
        </LinearGradient>

        {/* Title */}
        <View className="ml-3 flex-1">
          <Text
            className="text-white text-xs"
            style={{fontFamily: 'SpaceGrotesk-Regular'}}>
            Viewing
          </Text>
          <Text
            className="text-white text-base"
            style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Cause List
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="mt-6 mb-6 flex-row items-center px-4 rounded-lg border border-[#1E4A4A] bg-[#043233]">
        <TextInput
          placeholder="Search By Advocate Name"
          placeholderTextColor="#7A9E9F"
          className="flex-1 text-white text-base"
        />
        <Image
          source={require('../../../assets/icons/search1.png')}
          className="w-25 h-25"
          resizeMode="contain"
        />
      </View>

      {/* Cases List */}
      <ScrollView
        className="mb-24"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        {cases.map((item, index) => (
          <LinearGradient
            key={index}
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{borderRadius: 10, marginBottom: 16, padding: 1}}>
            <Pressable
              onPress={() => setSelectedCaseIndex(index)}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                backgroundColor: '#062C2D',
                borderRadius: 10,
                padding: 16,
              }}>
              {/* Radio Button */}
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#01B779',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                  marginTop: 4,
                }}>
                {selectedCaseIndex === index && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#01B779',
                    }}
                  />
                )}
              </View>

              {/* Case Info */}
              <View style={{flex: 1}}>
                <Text
                  className="text-white"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Claw Case ID:{' '}
                  <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                    {item.clawId}
                  </Text>
                </Text>
                <Text
                  className="text-white mt-1"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  CRN No:{' '}
                  <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                    {item.crn}
                  </Text>
                </Text>
                <Text
                  className="text-white mt-3"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Case Details:
                </Text>
                <Text
                  className="text-white text-sm mt-1"
                  style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                  {item.details}
                </Text>
              </View>
            </Pressable>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-5 bg-[#062C2D] pt-3">
        <View className="flex-row justify-between items-center gap-4 mb-3">
          {/* Fetch Selected Button */}
          <View className="flex-1 rounded-lg overflow-hidden">
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="flex-1 h-12 rounded-lg overflow-hidden">
              <Pressable
                className="w-full h-full justify-center items-center"
                android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
                <Text
                  className="text-white"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Fetch Selected
                </Text>
              </Pressable>
            </LinearGradient>
          </View>

          {/* Fetch All Button */}
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="flex-1 h-12 rounded-lg overflow-hidden">
            <Pressable
              onPress={() => navigation.navigate('RetrieveOrderScreen')}
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                className="text-white"
                style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                Fetch All
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FetchSelectedScreen;
