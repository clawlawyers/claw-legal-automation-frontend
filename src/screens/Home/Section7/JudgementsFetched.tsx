/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';

type ScreenProp = NativeStackNavigationProp<
  YourAlertsStackParamList,
  'JudgementsFetched'
>;

const courtOptions = [
  {
    title: 'Supreme Court Judgments',
    subtitle: 'Supreme Court Of India',
  },
  {
    title: 'High Court Judgments',
    subtitle: 'Maharashtra High Court',
  },
  {
    title: 'District Court Judgments',
    subtitle: 'Dadar District’s Court',
  },
];

const JudgementsFetched = () => {
  const navigation = useNavigation<ScreenProp>();
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D]">
      <View className="flex-1 px-5 pt-6 pb-3">
        {/* Back Button */}
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779] mb-4">
          <Image
            source={require('../../../assets/icons/back.png')}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </Pressable>

        {/* Header */}
        <View className="items-center mb-6">
          <Image
            source={require('../../../assets/icons/getjudge.png')}
            className="w-24 h-24 mb-3"
            resizeMode="contain"
          />
          <Text
            className="text-[#01B779] text-xl"
            style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Judgments Fetched
          </Text>
          <Text
            className="text-white text-center mt-2 px-2 text-sm"
            style={{fontFamily: 'SpaceGrotesk'}}>
            Please Select A Court For Downloading Judgements In Selected Date
            Range
          </Text>
        </View>

        {/* Court Options with Radio Buttons */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}>
          {courtOptions.map((court, index) => {
            const isSelected = selectedCourt === court.title;
            return (
              <Pressable
                key={index}
                onPress={() => setSelectedCourt(court.title)}
                className={`w-full px-4 py-3 rounded-xl mb-3 border flex-row items-center ${
                  isSelected
                    ? 'border-[#01B779] bg-[#01443F]'
                    : 'border-[#01443F]'
                }`}>
                {/* Radio Button */}
                <View className="mr-4">
                  <View
                    className={`w-5 h-5 rounded-full border-2 ${
                      isSelected ? 'border-[#01B779]' : 'border-gray-400'
                    } justify-center items-center`}>
                    {isSelected && (
                      <View className="w-2.5 h-2.5 rounded-full bg-[#01B779]" />
                    )}
                  </View>
                </View>

                {/* Text Content */}
                <View>
                  <Text
                    className="text-white text-base"
                    style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                    {court.title}
                  </Text>
                  <Text
                    className="text-[#ACACAC] text-sm mt-1"
                    style={{fontFamily: 'SpaceGrotesk'}}>
                    {court.subtitle}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Bottom Buttons */}
        <View className="space-y-4">
          <Pressable onPress={() => console.log('Download Excel')}>
            <View className="rounded-xl overflow-hidden mb-5">
              <LinearGradient
                colors={['#016361', '#01B779']}
                className="h-12 justify-center items-center">
                <Text
                  className="text-white text-base"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Download Excel File
                </Text>
              </LinearGradient>
            </View>
          </Pressable>

          <Pressable onPress={() => console.log('Download PDF')}>
            <View className="rounded-xl overflow-hidden">
              <LinearGradient
                colors={['#016361', '#01B779']}
                className="h-12 justify-center items-center">
                <Text
                  className="text-white text-base"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Download PDF File
                </Text>
              </LinearGradient>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JudgementsFetched;
