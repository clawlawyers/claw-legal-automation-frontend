// src/screens/Home/Section2/YourCasesListScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import {RootTabParamList} from '../../../navigation/types';
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {YourCasesStackParamList, CaseDetailsType} from '../../../stacks/YourCasesStack';
import { HomeStackParamList } from '../../../stacks/Home';
import { YourAlertsStackParamList } from '../../../stacks/YourAlertsStack';

type CaseListItemType = {
  id: string;
  claw_case_id: string;
  crn_no: string;
  case_details: string;
};

type YourCasesListScreenNavigationProp = NavigationProp<
YourCasesStackParamList,
 'YourCasesListScreen'
 >;

const YourCasesListScreen = () => {
  const navigation = useNavigation<YourCasesListScreenNavigationProp>();

  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );
  const [searchText, setSearchText] = useState('');

  const parameterOptions = [
    {label: 'Claw Case ID', value: 'claw_case_id'},
    {label: 'CRN No', value: 'crn_no'},
    {label: 'Case Details', value: 'case_details'},
  ];

  const casesData: CaseListItemType[] = [
    {
      id: '29',
      claw_case_id: 'CL00023',
      crn_no: 'WB071256987586742007',
      case_details:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
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
    {
      id: '300',
      claw_case_id: 'CL00090',
      crn_no: 'WB071256987586742008',
      case_details:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
    {
      id: '31',
      claw_case_id: 'CL00025',
      crn_no: 'WB071256987586742009',
      case_details:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
  ];

  const filteredCases = casesData.filter(item => {
    if (!selectedParameter || !searchText.trim()) return true;
    const key = selectedParameter as keyof CaseListItemType;
    if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
        return (item[key] as string).toLowerCase().includes(searchText.trim().toLowerCase());
    }
    return false;
  });

  const handleCaseItemPress = (item: CaseListItemType) => {
    console.log('Navigating to associate client for case:', item.claw_case_id);
    const caseDetailsToPass: CaseDetailsType = {
        id: item.id,
        clawId: item.claw_case_id,
        crn: item.crn_no,
        details: item.case_details,
        
    };

    navigation.navigate('AssociateClientCaseScreen', {
      caseId: item.claw_case_id,
      caseDetails: caseDetailsToPass,
    });
  };

  const handleAddCasesPress = () => {
    navigation.navigate('MultipleTypesSearchScreen');
    console.log("Add Cases pressed, navigating to SelectCourtScreen");
  };

  // --- ADDED --- Function handler for the new button
  const handleViewFirmCases = () => {
    console.log("View Firm Cases pressed. Implement navigation here.");
    // Example navigation: navigation.navigate('FirmCasesScreen');
  };


  return (
    <SafeAreaView
      className="flex-1 bg-[#062C2D] px-5 pb-5"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      {/* --- MODIFIED --- Added justify-between, items-center, and top margin */}
      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-row items-center">
            <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779]">
            <Icon name="arrow-left" size={20} color="#01B779" />
            </Pressable>
            <View className="ml-3">
            <Text className="text-white font-spacegrotesk text-xs">Viewing</Text>
            <Text
                style={{fontFamily: 'SpaceGrotesk-Bold'}}
                className="text-white text-base">
                Your Cases
            </Text>
            </View>
        </View>

        {/* --- ADDED --- New button on the right */}
        <TouchableOpacity onPress={handleViewFirmCases}>
            <Text 
                style={{fontFamily: 'SpaceGrotesk-Bold'}}
                className="text-[#01B779] text-sm"
            >
                View Firm Cases
            </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mt-6 mb-3">
        <View className="w-[40%] bg-[#01B779] rounded-l-lg px-2">
          <Dropdown
            style={{height: 40}}
            containerStyle={{ borderRadius: 0, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
            placeholderStyle={{ color: '#fff', fontSize: 14, textAlign: 'center', fontFamily: 'SpaceGrotesk-Regular' }}
            selectedTextStyle={{ color: '#fff', fontSize: 14, textAlign: 'center', fontFamily: 'SpaceGrotesk-Regular' }}
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
        <View className="flex-1 bg-[#143139] rounded-r-md px-3 flex-row border border-[#016361] items-center h-[40px]">
          <TextInput
            placeholder="Search"
            placeholderTextColor="#888"
            className="flex-1 text-white font-spacegrotesk-regular"
            style={{fontSize: 14}}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Ionicons name="search" size={18} color="#006261" />
        </View>
      </View>

      <ScrollView className="flex-1 mt-1">
        {filteredCases.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleCaseItemPress(item)}>
            <View
              className={`p-4 rounded-xl border border-[#016361] bg-[#062C2D] mb-4`}>
              <Text className="text-white font-bold text-sm font-spacegrotesk">
                Claw Case ID:{' '}
                <Text className="text-white font-normal font-spacegrotesk">{item.claw_case_id}</Text>
              </Text>
              <Text className="text-white font-bold text-sm mt-1 font-spacegrotesk">
                CRN No : <Text className="text-white font-normal font-spacegrotesk">{item.crn_no}</Text>
              </Text>
              <Text className="text-white font-bold text-sm mt-1 font-spacegrotesk">
                Case Details :
              </Text>
              <Text className="text-white text-sm mt-0.5 font-spacegrotesk">
                {item.case_details}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="mb-3 rounded-lg overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 justify-center items-center">
          <Pressable
            onPress={handleAddCasesPress}
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
    </SafeAreaView>
  );
};

export default YourCasesListScreen;