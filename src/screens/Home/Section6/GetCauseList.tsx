/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  SafeAreaView,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';

type ScreenProp = NativeStackScreenProps<
  YourAlertsStackParamList,
  'GetCauseListScreen'
>;

const courtTypes = ['District Court', 'State High Court', 'Supreme Court'];

const GetCauseListScreen = (props : ScreenProp) => {
  const {navigation} = props;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrictCourt, setSelectedDistrictCourt] = useState<
    string | null
  >(null);
  const [selectedCourtType, setSelectedCourtType] = useState<string | null>(
    null,
  );

  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);

  const dropdownData = {
    states: ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'West Bengal', 'Gujarat'],
    cities: ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Ahmedabad', 'Hyderabad'],
    districts: ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6'],
  };

  const renderDropdown = (
    label: string,
    selected: string | null,
    onSelect: (val: string) => void,
    options: string[],
    isOpen: boolean,
    setIsOpen: (val: boolean) => void,
  ) => (
    <View className="w-full rounded-lg overflow-hidden mb-4">
      <LinearGradient
        colors={['#016361', '#01B779']}
        className="p-px rounded-lg">
        <View style={{backgroundColor: '#062C2D', borderRadius: 8}}>
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            className="flex-row items-center justify-between px-4"
            style={{height: 45}}>
            <Text
              style={{
                fontFamily: 'SpaceGrotesk',
                color: selected ? 'white' : '#ACACAC',
              }}>
              {selected || label}
            </Text>
            <Icon
              name={isOpen ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#ACACAC"
            />
          </TouchableOpacity>
          {isOpen && (
            <View className="border-t border-[#01443F] max-h-60">
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3">
                  <Text
                    style={{
                      fontFamily: 'SpaceGrotesk',
                      color: 'white',
                    }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <View className="flex-1 px-5 pb-3">
          {/* Back Button */}
          <View className="mt-6">
            <Pressable
              onPress={() => navigation.goBack()}
              className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779]">
              <Image
                source={require('../../../assets/icons/back.png')}
                className="w-30 h-30"
                resizeMode="contain"
              />
            </Pressable>
          </View>

          {/* Header */}
          <View className="items-center mb-4 mt-3">
            <Image
              source={require('../../../assets/icons/causelisticon.png')}
              className="w-30 h-30"
              resizeMode="contain"
            />
            <Text
              className="text-[#01B679] text-xl mt-2"
              style={{fontFamily: 'SpaceGrotesk-Bold'}}>
              Get Cause List
            </Text>
            <Text
              className="text-white text-center mt-1 px-2"
              style={{fontFamily: 'SpaceGrotesk'}}>
              Instantly pull updated cause lists from court databases
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Date Picker */}
            <View className="w-full rounded-lg overflow-hidden mb-4">
              <LinearGradient
                colors={['#016361', '#01B779']}
                className="p-px rounded-lg">
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  className="bg-[#062C2D] rounded-lg px-4 h-11 flex-row items-center justify-between">
                  <Text style={{color: '#ACACAC', fontFamily: 'SpaceGrotesk'}}>
                    {selectedDate ? selectedDate.toDateString() : 'Select Date'}
                  </Text>
                  <Icon name="calendar" size={18} color="#ACACAC" />
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <DatePicker
              modal
              open={open}
              date={selectedDate}
              mode="date"
              theme="dark"
              onConfirm={date => {
                setOpen(false);
                setSelectedDate(date);
              }}
              onCancel={() => setOpen(false)}
            />

            {/* Dropdowns */}
            {renderDropdown(
              'Select State',
              selectedState,
              setSelectedState,
              dropdownData.states,
              stateDropdownOpen,
              setStateDropdownOpen,
            )}

            {/* Court Type Selection */}
            <View className="border border-[#01B779] rounded-lg px-4 py-3 mb-4">
              <Text
                className="text-white mb-2"
                style={{fontFamily: 'SpaceGrotesk'}}>
                Select Court Type:
              </Text>
              <View className="flex-col space-y-2">
                {courtTypes.map((type, index) => (
                  <Pressable
                    key={index}
                    className="flex-row items-center"
                    onPress={() => setSelectedCourtType(type)}>
                    <View
                      className={`w-5 h-5 rounded-full border mr-2 ${
                        selectedCourtType === type
                          ? 'bg-[#01B779]'
                          : 'border-[#01B779]'
                      }`}
                    />
                    <Text
                      className="text-white"
                      style={{fontFamily: 'SpaceGrotesk'}}>
                      {type}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {renderDropdown(
              'Select City',
              selectedCity,
              setSelectedCity,
              dropdownData.cities,
              cityDropdownOpen,
              setCityDropdownOpen,
            )}

            {renderDropdown(
              'Select District Court',
              selectedDistrictCourt,
              setSelectedDistrictCourt,
              dropdownData.districts,
              districtDropdownOpen,
              setDistrictDropdownOpen,
            )}
          </ScrollView>

          {/* Submit Button */}
          <View className="rounded-lg overflow-hidden mt-4">
            <LinearGradient
              colors={['#016361', '#01B779']}
              className="h-12 w-full justify-center items-center rounded-xl">
              <Pressable
                onPress={() => navigation.navigate('FetchSelectedScreen')}
                className="w-full h-full justify-center items-center">
                <Text
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}
                  className="text-white text-base">
                  Fetch Cause List
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GetCauseListScreen;
