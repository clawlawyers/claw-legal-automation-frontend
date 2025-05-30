/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  TouchableOpacity,
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

  const inputFields = [
    'Enter CRN Number',
    'Enter Filing Number',
    'Enter Case Number',
    'Enter Filing Year',
  ];

  const caseTypes = ['Civil', 'Criminal'];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCaseType, setSelectedCaseType] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5">
      {/* Header */}
      <View className="w-10 h-10 mt-6 rounded-full overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-full justify-center items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-9 h-9 rounded-full bg-[#062C2D] justify-center items-center">
            <Image
              source={require('../../../assets/icons/back.png')}
              className="w-30 h-30"
              resizeMode="contain"
            />
          </Pressable>
        </LinearGradient>
      </View>

      {/* Main content */}
      <View className="flex-1 justify-start">
        {/* Icon */}
        <View className="justify-center items-center mb-4">
          <Image
            source={require('../../../assets/casesearch.png')}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text
          style={{fontFamily: 'SpaceGrotesk-Bold'}}
          className="text-xl text-[#01B679] mb-1 text-center">
          Find a Case Instantly
        </Text>
        <Text
          style={{fontFamily: 'SpaceGrotesk'}}
          className="text-xs text-white text-center mb-6 px-3 leading-5">
          Fill In Max Number Of Fields To Get Better{'\n'}Results Quickly
        </Text>

        {/* Input Fields */}
        {inputFields.map((placeholder, index) => (
          <View key={index} className="w-full rounded-lg overflow-hidden mb-4">
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="p-px rounded-lg">
              <TextInput
                style={{
                  fontFamily: 'SpaceGrotesk',
                  height: 45,
                  backgroundColor: '#062C2D',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  color: '#ACACAC',
                }}
                placeholder={placeholder}
                placeholderTextColor="#ccc"
              />
            </LinearGradient>
          </View>
        ))}

        {/* Dropdown with border radius preserved */}
        <View className="w-full rounded-lg overflow-hidden mb-6">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="p-px rounded-lg">
            <View
              style={{
                backgroundColor: '#062C2D',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
              <TouchableOpacity
                onPress={() => setDropdownOpen(!dropdownOpen)}
                className="flex-row items-center justify-between px-4"
                style={{
                  height: 45,
                }}>
                <Text
                  style={{
                    fontFamily: 'SpaceGrotesk',
                    color: selectedCaseType ? 'white' : '#ACACAC',
                  }}>
                  {selectedCaseType || 'Enter Case Type'}
                </Text>
                <Icon
                  name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#ACACAC"
                />
              </TouchableOpacity>

              {/* Dropdown list inside same rounded background */}
              {dropdownOpen && (
                <View className="border-t border-[#01443F]">
                  {caseTypes.map((type, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedCaseType(type);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-3">
                      <Text
                        style={{
                          fontFamily: 'SpaceGrotesk',
                          color: 'white',
                        }}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Fetch Button */}
      <View className="w-full mb-5 rounded-lg overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 justify-center items-center rounded-lg">
          <Pressable
            onPress={() => navigation.navigate('CaseLoadingScreen')}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <Text
              style={{fontFamily: 'SpaceGrotesk-Bold'}}
              className="text-white text-base">
              Fetch Case Details
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default StartCaseSearch;
