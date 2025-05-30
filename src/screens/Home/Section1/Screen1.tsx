/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {HomeStackParamList} from '../../../stacks/HomeStack';

type HomeScreenNavigationProp = NavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

const updates = [
  {
    title: 'Clause 31 (A) Updated',
    description:
      'Supreme Court have Updated the Clause 31 (A) in order to cater to the ongoing stress between international payments...',
    date: '20 May',
    head: 'Recent Legal Updates',
  },
];

export default function HomeScreen() {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 bg-[#002b2b]">
      {/* Fixed Header */}
      <View className="px-4 pt-6">
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center space-x-3">
            <LinearGradient
              colors={['#016361', '#01B779']}
              className="w-10 h-10 justify-center items-center"
              style={{borderRadius: 40}}>
              <Image
                source={require('../../../assets/images/user.png')}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </LinearGradient>

            <View className="flex-col ml-3">
              <Text className="text-white font-spacegrotesk text-xs">
                Welcome
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'SpaceGrotesk-Bold',
                }}>
                Soumya Snigdha Banik
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Content (from Carousel to Clientele) */}
      <ScrollView className="px-4 pb-60">
        {/* Carousel Section */}
        <View>
          <Carousel
            loop
            width={width - 32}
            height={140}
            autoPlay
            scrollAnimationDuration={2000}
            data={updates}
            renderItem={({item}) => (
              <LinearGradient
                colors={['#004040', '#016361']}
                className="p-4 rounded-2xl shadow-md"
                style={{borderRadius: 16}}>
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-gray-300 font-spacegrotesk text-xs">
                    {item.head}
                  </Text>
                  <Text className="text-green-200 text-xs font-spacegrotesk font-medium">
                    {item.date}
                  </Text>
                </View>
                <Text
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}
                  className="text-white text-base mb-1">
                  {item.title}
                </Text>
                <Text className="text-sm font-spacegrotesk text-gray-200">
                  {item.description}
                </Text>
              </LinearGradient>
            )}
          />
        </View>
        {/* White line divider */}
        <View className="h-px bg-white my-6" />
        {/* Buttons Section */}
        <View className="flex-row flex-wrap justify-between gap-4 mb-2">
          {[
            {
              label: 'Get All Judgements',
              icon: require('../../../assets/images/button1.png'),
            },
            {
              label: 'Start Case\nSearch',
              icon: require('../../../assets/images/button2.png'),
              onPress: () => navigation.navigate('StartCaseSearch'),
            },
            {
              label: 'Get\nCause List',
              icon: require('../../../assets/images/button3.png'),
              // onPress: () => navigation.navigate('GetCauseList'),
            },
            {
              label: 'Start Caveat Search',
              icon: require('../../../assets/images/button4.png'),
            },
          ].map(({label, icon, onPress}, index) => (
            <View key={index} className="w-[48%]">
              <TouchableOpacity
                onPress={onPress ?? (() => {})}
                className="bg-[#002b2b] border border-[#016361] rounded-xl p-4 py-3">
                <View className="flex-col items-start">
                  <Image source={icon} className="w-9 h-9 resize-contain" />
                  <Text
                    className="pt-6"
                    style={{
                      fontFamily: 'SpaceGrotesk-Bold',
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 20,
                    }}>
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* White line divider */}
        <View className="h-px w-full bg-white my-4" />
        {/* Clientele Section */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-gray-300 mb-2 text-md">
          Your Clientele
        </Text>

        <View className="flex-row justify-between pb-10">
          {[
            {
              label: 'View All Clients',
              image: require('../../../assets/images/client1.png'),
            },
            {
              label: 'Add New Client',
              image: require('../../../assets/images/client2.png'),
            },
            {
              label: 'Set Up Reminder',
              image: require('../../../assets/images/client3.png'),
            },
          ].map(({label, image}, index) => (
            <View key={index} className="w-[32%] rounded-xl overflow-hidden">
              <LinearGradient
                colors={['#016361', '#01B779']}
                className="flex-1 rounded-xl">
                <TouchableOpacity className="p-2 items-start justify-center">
                  <LinearGradient
                    colors={['#FFFDFD', '#FFFDFD']}
                    className="w-10 h-10 justify-center items-center"
                    style={{borderRadius: 40}}>
                    <Image
                      source={image}
                      className="w-5 h-5"
                      resizeMode="contain"
                    />
                  </LinearGradient>

                  <Text
                    style={{
                      fontFamily: 'SpaceGrotesk-SemiBold',
                      lineHeight: 20,
                    }}
                    className="text-white pt-4 text-sm w-[85%]"
                    numberOfLines={2}>
                    {label}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
