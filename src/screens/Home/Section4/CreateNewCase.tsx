/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

type CreateNewCaseScreenProp = NativeStackScreenProps<
  YourAlertsStackParamList,
  'NoActiveAlertsScreen'
>;

const CreateNewCaseScreen = (props : CreateNewCaseScreenProp) => {
  const {navigation} = props;

  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );
  const [searchText, setSearchText] = useState('');

  const parameterOptions = [
    {label: 'Claw Case ID', value: 'claw_case_id'},
    {label: 'CRN No', value: 'crn_no'},
    {label: 'Case Details', value: 'case_details'},
  ];

  const cases = [
    {
      id: '30',
      claw_case_id: 'CL00024',
      crn_no: 'WB071256987586742008',
      case_details:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
    {
      id: '290',
      claw_case_id: 'CL00044',
      crn_no: 'WB071256987586742007',
      case_details:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
  ];

  const filteredCases = cases.filter(item => {
    if (!selectedParameter || !searchText.trim()) return true;
    const key = selectedParameter as keyof typeof item;
    return (
      item[key]?.toLowerCase().includes(searchText.trim().toLowerCase()) ??
      false
    );
  });

  return (
    <SafeAreaView
      className="flex-1 bg-[#062C2D] px-5 pb-5"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      {/* Header */}
      <View className=" flex-row items-center">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779]">
          <Image
            source={require('../../../assets/icons/back.png')}
            className="w-30 h-30"
            resizeMode="contain"
          />
        </Pressable>
        <View className="ml-3">
          <Text className="text-white font-spacegrotesk text-xs">List of</Text>
          <Text
            style={{fontFamily: 'SpaceGrotesk-Bold'}}
            className="text-white text-base">
            Active Alert Automation
          </Text>
        </View>
      </View>

      {/* Dropdown + Search */}
      <View className="flex-row items-center mt-6 mb-3">
        {/* Dropdown */}
        <View className="w-[40%] bg-[#01B779] rounded-l-lg px-2">
          <Dropdown
            style={{height: 40}}
            containerStyle={{
              borderRadius: 0,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            inputSearchStyle={{
              backgroundColor: 'red', // dark background for search input
              color: '#fff', // white text
              borderRadius: 4,
              paddingHorizontal: 10,
            }}
            placeholderStyle={{
              color: '#fff',
              fontSize: 14,
              textAlign: 'center',
            }}
            selectedTextStyle={{
              color: '#fff',
              fontSize: 14,
              textAlign: 'center',
            }}
            iconStyle={{width: 20, height: 20, tintColor: '#fff'}}
            data={parameterOptions}
            labelField="label"
            valueField="value"
            placeholder={selectedParameter || 'Parameter'}
            value={selectedParameter}
            onChange={item => setSelectedParameter(item.value)}
            renderRightIcon={() => (
              <Ionicons name="chevron-down" size={18} color="#fff" />
            )}
          />
        </View>

        {/* Search */}
        <View className="flex-1 bg-[#143139] rounded-r-md px-3 flex-row border border-[#016361] items-center h-[40px]">
          <TextInput
            // placeholder="Search"
            placeholderTextColor="#888"
            className="flex-1 text-black"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Image
            source={require('../../../assets/icons/search1.png')}
            className="w-30 h-30 my-10"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Case List */}
      <ScrollView className="flex-1 mt-1">
        {filteredCases.map((item, index) => (
          <View
            key={item.id}
            className={`p-4 rounded-xl border ${
              index === 0
                ? 'border-[#016361] bg-[#062C2D]'
                : 'border-[#016361] bg-[#062C2D]'
            } mb-4`}>
            <Text className="text-white font-bold text-sm">
              Claw Case ID :{' '}
              <Text className="text-white">{item.claw_case_id}</Text>
            </Text>
            <Text className="text-white font-bold text-sm mt-1">
              CRN No : <Text className="text-white">{item.crn_no}</Text>
            </Text>
            <Text className="text-white font-bold text-sm mt-1">
              Case Details :
            </Text>
            <Text className="text-white text-sm mt-0.5">
              {item.case_details}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="rounded-lg overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="h-12 w-full justify-center items-center rounded-xl">
          <Pressable
            onPress={() => navigation.navigate('StartAutomatedAlertsScreen')}
            className="w-full h-full justify-center items-center">
            <Text
              style={{fontFamily: 'SpaceGrotesk-Bold'}}
              className="text-white text-base">
              Create New Case
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default CreateNewCaseScreen;
