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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {YourAlertsStackParamList} from '../../../stacks/YourAlertsStack';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

type StartAutomatedAlertsScreenProp = NativeStackNavigationProp<
  YourAlertsStackParamList,
  'StartAutomatedAlertsScreen'
>;

const StartAutomatedAlertsScreen = () => {
  const navigation = useNavigation<StartAutomatedAlertsScreenProp>();

  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('email');

  const parameterOptions = [
    {label: 'Claw Case ID', value: 'claw_case_id'},
    {label: 'CRN No', value: 'crn_no'},
    {label: 'Case Details', value: 'case_details'},
  ];

  const communicationOptions = [
    {key: 'email', label: 'via Email'},
    {key: 'sms', label: 'via Contact SMS'},
    {key: 'whatsapp', label: 'via Whatsapp'},
  ];

  const communicationOptions1 = [
    {key: 'Morning', label: 'Morning Of Hearing Date'},
    {key: '1day', label: '1 Day Before Hearing Date'},
    {key: '3day', label: '3 Days Before Hearing Date'},
    {key: '7day', label: '7 Days Before Hearing Date'},
  ];
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
            Case Alert Automation
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
        <LinearGradient
          colors={['#016361', '#01B779']}
          style={{borderRadius: 6, marginBottom: 16}}>
          <View
            style={{
              backgroundColor: '#062C2D',
              borderRadius: 5,
              margin: 1,
              padding: 16,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{color: 'white', marginTop: 4, width: 110}}>
                Send Alert :
              </Text>

              <View style={{flex: 1, paddingLeft: 8}}>
                {communicationOptions.map(option => (
                  <Pressable
                    key={option.key}
                    onPress={() => setSelectedOption(option.key)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#01B779',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                      }}>
                      {selectedOption === option.key && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: '#01B779',
                          }}
                        />
                      )}
                    </View>
                    <Text style={{color: 'white'}}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#016361', '#01B779']}
          style={{borderRadius: 6}}>
          <View
            style={{
              backgroundColor: '#062C2D',
              borderRadius: 5,
              margin: 1,
              padding: 16,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{color: 'white', marginTop: 4, width: 110}}>
                Alert Trigger :
              </Text>

              <View style={{flex: 1, paddingLeft: 8}}>
                {communicationOptions1.map(option => (
                  <Pressable
                    key={option.key}
                    onPress={() => setSelectedOption(option.key)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#01B779',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                      }}>
                      {selectedOption === option.key && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: '#01B779',
                          }}
                        />
                      )}
                    </View>
                    <Text style={{color: 'white'}}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      <View className="rounded-lg overflow-hidden">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="h-12 w-full justify-center items-center rounded-xl">
          <Pressable
            onPress={() => navigation.navigate('AssociatedSetReminderScreen')}
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

export default StartAutomatedAlertsScreen;
