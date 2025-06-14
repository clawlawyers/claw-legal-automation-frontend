// src/screens/Home/Section2/YourCasesListScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import {RootTabParamList} from '../../../navigation/types';
import React, {useEffect, useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import {
  YourCasesStackParamList,
  CaseDetailsType,
} from '../../../stacks/YourCasesStack';
import {HomeStackParamList} from '../../../stacks/Home';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setCases} from '../../../redux/commonSlice';
import {NODE_API_ENDPOINT} from '../../../utils/util';
import NoCasesAdded from './NoCasesAdded';

type YourCasesListScreenNavigationProp = NativeStackScreenProps<
  YourCasesStackParamList,
  'YourCasesListScreen'
>;

const YourCasesListScreen = ({
  navigation,
}: YourCasesListScreenNavigationProp) => {
  // const navigation = useNavigation<YourCasesListScreenNavigationProp>();

  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(true);
  const [caseLists, setCaseLists] = useState<CaseDetailsType[]>([]);
  const [filterCase, setFilterCase] = useState<CaseDetailsType[]>([]);

  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const getCase = async () => {
      if (!currentUser?.token) {
        console.error('No user token found');
        return;
      }
      setLoading(true); // ✅ Show loader while fetching

      try {
        const caseList = await fetch(
          `${NODE_API_ENDPOINT}/case/getCases/user`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.token}`,
            },
          },
        );

        if (!caseList.ok) {
          console.error('Failed to fetch cases:', caseList.statusText);
          throw new Error('Failed to fetch cases');
        }

        const data = await caseList.json();
        setCaseLists(data.cases);
        setFilterCase(data.cases);

        if (data?.cases?.length === 0) {
          navigation?.replace('NoCasesAdded');
        }

        dispatch(setCases(data.cases));
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false); // ✅ Only hide loader after fetch attempt completes
      }
    };

    if (currentUser?.token) {
      getCase();
    }
  }, [currentUser?.token, dispatch, navigation]);

  console.log(caseLists);
  console.log(loading, 'length of caseLists:', caseLists.length);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilterCase(caseLists);
    } else {
      const filtered = caseLists.filter(item => {
        if (!selectedParameter) return true;

        const nested = (item.case as any)[selectedParameter];
        if (typeof nested === 'string') {
          return nested.toLowerCase().includes(searchText.trim().toLowerCase());
        }
        return false;
      });
      setFilterCase(filtered);
    }
  }, [searchText, selectedParameter, caseLists]);

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 bg-[#062C2D] px-5 pb-5"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#01B779" />
          <Text className="text-white mt-4">Loading cases...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const parameterOptions = [
    {label: 'Claw Case ID', value: 'clawCaseId'},
    {label: 'CRN No', value: 'crnNum'},
    {label: 'Case Type', value: 'caseType'},
  ];

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
    console.log('Add Cases pressed, navigating to SelectCourtScreen');
  };

  // --- ADDED --- Function handler for the new button
  const handleViewFirmCases = () => {
    console.log('View Firm Cases pressed. Implement navigation here.');
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
            <Text className="text-white font-spacegrotesk text-xs">
              Viewing
            </Text>
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
            className="text-[#01B779] text-sm">
            View Firm Cases
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center mt-6 mb-3">
        <View className="w-[40%] bg-[#01B779] rounded-l-lg px-2">
          <Dropdown
            style={{height: 40}}
            containerStyle={{
              borderRadius: 0,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            placeholderStyle={{
              color: '#fff',
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'SpaceGrotesk-Regular',
            }}
            selectedTextStyle={{
              color: '#fff',
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'SpaceGrotesk-Regular',
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
        {filterCase?.map(item => (
          <TouchableOpacity
            key={item._id}
            onPress={() => handleCaseItemPress(item)}>
            <View
              className={`p-4 rounded-xl border border-[#016361] bg-[#062C2D] mb-4`}>
              <Text className="text-white font-bold text-sm font-spacegrotesk">
                Claw Case ID:{' '}
                <Text className="text-white font-normal font-spacegrotesk">
                  {item.case.clawCaseId}
                </Text>
              </Text>
              <Text className="text-white font-bold text-sm mt-1 font-spacegrotesk">
                CRN No :{' '}
                <Text className="text-white font-normal font-spacegrotesk">
                  {item.case.crnNum}
                </Text>
              </Text>
              <Text className="text-white font-bold text-sm mt-1 font-spacegrotesk">
                Case Type :
              </Text>
              <Text className="text-white text-sm mt-0.5 font-spacegrotesk">
                {item.case.caseType}
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
