/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const CaseDetailsScreen = () => {
  const navigation = useNavigation();

  const caseFields = [
    {
      label: 'Case Head',
      value:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
    {
      label: 'Registration Number',
      value: '12554739653585442',
    },
    {
      label: 'Filing Number',
      value: '12554739653585442',
    },
    {
      label: 'Court Name',
      value: 'Kolkata High Court, West Bengal',
    },
    {
      label: 'Petitioner Name',
      value: 'Soumuja Shigahra Bank',
    },
    {
      label: 'Advocate Name',
      value: 'Soumuja Shigahra Bank',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5">
      {/* Back Button */}
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

      {/* Scrollable Content */}
      <ScrollView className="flex-1 mt-6" showsVerticalScrollIndicator={false}>
        {/* OUTER Gradient Border Wrapper */}
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{borderRadius: 16, padding: 2, marginBottom: 20}}>
          <View
            style={{
              backgroundColor: '#062C2D',
              borderRadius: 16,
              overflow: 'hidden',
            }}>
            {/* Gradient Header Strip */}
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="p-4 rounded-t-xl">
              <Text
                style={{fontFamily: 'SpaceGrotesk-Bold', fontSize: 15}}
                className="text-white mb-2">
                Case Details
              </Text>
              <View className="flex-row">
                <Text
                  style={{fontFamily: 'SpaceGrotesk-SemiBold'}}
                  className="text-base text-white">
                  CRN Number :
                </Text>
                <Text
                  style={{fontFamily: 'SpaceGrotesk'}}
                  className="text-base text-white pl-2">
                  WB12345678902024
                </Text>
              </View>
            </LinearGradient>

            {/* Case Fields */}
            <View className="px-4 py-3 space-y-4">
              {caseFields.map((item, idx) => (
                <View
                  key={idx}
                  className={idx !== 0 ? 'border-t border-[#01B679] pt-3' : ''}>
                  <Text
                    style={{fontFamily: 'SpaceGrotesk-Bold'}}
                    className="text-base text-[#FFFFFF] pb-1">
                    {item.label} :
                  </Text>
                  <Text
                    style={{fontFamily: 'SpaceGrotesk'}}
                    className="text-base text-white pb-2">
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="mb-5">
        {/* Add To Your Cases */}
        <View className="mb-3 rounded-lg overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-full h-12 justify-center items-center">
            <Pressable
              onPress={() => navigation.navigate('CaseAddedScreen')}
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                style={{fontFamily: 'SpaceGrotesk-Bold'}}
                className="text-white font-semibold">
                Add To Your Cases
              </Text>
            </Pressable>
          </LinearGradient>
        </View>

        {/* Download Document */}
        <View className="rounded-lg overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-full h-12 justify-center items-center">
            <Pressable
              onPress={() => navigation.navigate('CaseNotFoundScreen')}
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                style={{fontFamily: 'SpaceGrotesk-Bold'}}
                className="text-white font-semibold">
                Download Document
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaseDetailsScreen;
