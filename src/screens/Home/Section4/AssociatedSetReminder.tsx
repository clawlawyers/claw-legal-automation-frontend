/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable, SafeAreaView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type AssociatedSetReminderScreenProp = NativeStackNavigationProp<
  YourAlertsStackParamList,
  'AssociatedSetReminderScreen'
>;

const AssociatedSetReminderScreen = () => {
  const navigation = useNavigation<AssociatedSetReminderScreenProp>();

  const caseFields = [
    {
      label: 'Case Head',
      value:
        'Reference with about Lumen teams, giving information on its origins, as well as a random Librum verification',
    },
    {
      label: 'Registration Number',
      value: '10261070653056442',
    },
    {
      label: 'Filing Number',
      value: '10261070653056442',
    },
    {
      label: 'Court Name',
      value: 'Kolanta High Court, West Bengal',
    },
    {
      label: 'Petitioner Name',
      value: 'Sonnyu Singana Bank',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5">
      {/* Header with Back and Download */}
      <View className="flex-row items-center mt-5">
        <View className="w-10 h-10 rounded-full overflow-hidden">
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

        <View className="ml-3 flex-1">
          <Text className="text-white font-spacegrotesk text-xs">Viewing</Text>
          <Text
            style={{fontFamily: 'SpaceGrotesk-Bold'}}
            className="text-white text-base">
            Your Cases
          </Text>
        </View>

        <View className="w-10 h-10 rounded-full overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-full h-full justify-center items-center">
            <Pressable
              onPress={() => console.log('Download pressed')}
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Icon name="download" size={20} color="white" />
            </Pressable>
          </LinearGradient>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView className="flex-1 mt-6" showsVerticalScrollIndicator={false}>
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
                  WP202406070810024
                </Text>
              </View>
            </LinearGradient>

            <View className="px-4 py-3 space-y-4">
              {caseFields.map((item, idx) => (
                <View key={idx}>
                  {/* Gradient line separator except for the first item */}
                  {idx !== 0 && (
                    <LinearGradient
                      colors={['#01B679', '#00FFC6']} // gradient colors
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{height: 2, width: '100%', marginBottom: 12}}
                    />
                  )}

                  {/* Content */}
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

      {/* Associated Client Styled Row */}
      <LinearGradient
        colors={['#016361', '#01B779']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{borderRadius: 8, padding: 1, marginBottom: 20}} // Border thickness via padding
      >
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 8,
            overflow: 'hidden',
            width: '100%',
          }}>
          {/* Left Half - Gradient Background */}
          <LinearGradient
            colors={['#00C47E', '#00B288']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: '50%',
              paddingVertical: 12,
              paddingHorizontal: 12,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: 'SpaceGrotesk-Bold',
                color: 'white',
                fontSize: 14,
              }}>
              Associated Client :
            </Text>
          </LinearGradient>

          {/* Right Half - Solid Color */}
          <Pressable
            onPress={() => console.log('Add client')}
            style={{
              width: '50%',
              backgroundColor: '#062C2D',
              paddingVertical: 12,
              paddingHorizontal: 12,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontFamily: 'SpaceGrotesk-SemiBold',
                color: 'white',
                fontSize: 14,
              }}>
              Rahul Prajapati +3
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      <View className="rounded-lg mb-5 overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="h-12 w-full justify-center items-center rounded-xl">
          <Pressable
            onPress={() => navigation.navigate('SetReminderScreen')}
            className="w-full h-full justify-center items-center">
            <Text
              style={{fontFamily: 'SpaceGrotesk-Bold'}}
              className="text-white text-base">
              Set Reminder
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default AssociatedSetReminderScreen;
