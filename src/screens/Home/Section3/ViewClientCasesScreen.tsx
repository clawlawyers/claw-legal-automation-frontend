/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const cases = [
  {
    clawId: 'CL00025',
    crn: 'WB071256987589742007',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
  {
    clawId: 'CL00023',
    crn: 'WB071256987589742007',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
];

const ViewClientCasesScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );
  const parameterOptions = [
    {label: 'Claw Case ID', value: 'claw_case_id'},
    {label: 'CRN No', value: 'crn_no'},
    {label: 'Case Details', value: 'case_details'},
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 pb-6">
      {/* Header */}
      <View className="flex-row items-center mt-5">
        {/* Back Button */}
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-10 h-10 rounded-full justify-center items-center overflow-hidden">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <View className="w-9 h-9 rounded-full bg-[#062C2D] justify-center items-center">
              <Icon name="arrow-left" size={20} color="#01B679" />
            </View>
          </Pressable>
        </LinearGradient>

        {/* Title */}
        <View className="ml-3 flex-1">
          <Text
            className="text-white text-xs"
            style={{fontFamily: 'SpaceGrotesk-Regular'}}>
            Viewing
          </Text>
          <Text
            className="text-white text-base"
            style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Client Details
          </Text>
        </View>

        {/* Download Button */}
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-10 h-10 rounded-full justify-center items-center overflow-hidden">
          <Pressable
            onPress={() => console.log('Download pressed')}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <Icon name="download" size={20} color="white" />
          </Pressable>
        </LinearGradient>
      </View>

      {/* Client Info */}
      <View className="mt-5 space-y-1">
        <Text
          className="text-white"
          style={{fontFamily: 'SpaceGrotesk-Regular'}}>
          <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>Client Name: </Text>
          Aarav Sharma
        </Text>
        <Text
          className="text-white"
          style={{fontFamily: 'SpaceGrotesk-Regular'}}>
          <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Client Email ID:{' '}
          </Text>
          aarav.sharma@example.com
        </Text>
        <Text
          className="text-white"
          style={{fontFamily: 'SpaceGrotesk-Regular'}}>
          <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Client Contact:{' '}
          </Text>
          +91 98765 43210
        </Text>
        <Text
          className="text-white"
          style={{fontFamily: 'SpaceGrotesk-Regular'}}>
          <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>Connect via: </Text>
          Email, Contact SMS, Whatsapp
        </Text>
      </View>

      {/* Associated Cases Title */}
      <Text
        className="text-white text-center text-base mt-6 mb-2"
        style={{fontFamily: 'SpaceGrotesk-Bold'}}>
        Associated Cases
      </Text>

      {/* Filter & Search Row */}
      <View
        style={{
          flexDirection: 'row',
          height: 45,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#01B779',
          overflow: 'hidden',
          marginVertical: 16,
        }}>
        {/* Dropdown */}
        <View style={{width: '40%', backgroundColor: '#01B779'}}>
          <Dropdown
            style={{
              height: '100%',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}
            placeholderStyle={{
              color: '#fff',
              fontSize: 14,
            }}
            selectedTextStyle={{
              color: '#fff',
              fontSize: 14,
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

        {/* Search Input */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#143139',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#ccc"
            style={{
              flex: 1,
              color: '#fff',
              fontSize: 14,
            }}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Image
            source={require('../../../assets/icons/search1.png')}
            className="w-25 h-25"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Cases List */}
      <ScrollView
        className="mb-24"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        {cases.map((item, index) => (
          <LinearGradient
            key={index}
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{borderRadius: 10, marginBottom: 16, padding: 1}}>
            <View
              style={{
                backgroundColor: '#062C2D',
                borderRadius: 10,
                padding: 16,
              }}>
              <Text
                className="text-white"
                style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                Claw Case ID:{' '}
                <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                  {item.clawId}
                </Text>
              </Text>
              <Text
                className="text-white mt-1"
                style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                CRN No:{' '}
                <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                  {item.crn}
                </Text>
              </Text>
              <Text
                className="text-white mt-3"
                style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                Case Details:
              </Text>
              <Text
                className="text-white text-sm mt-1"
                style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                {item.details}
              </Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-5 bg-[#062C2D] pt-3">
        {/* First Row - Delete/Edit Buttons */}
        <View className="flex-row justify-between items-center gap-4 mb-3">
          {/* Delete Button */}
          {/* Delete Button with Fixed Border Edges */}
          <View className="flex-1 rounded-lg overflow-hidden">
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="h-12 justify-center items-center p-[1px]">
              <Pressable
                className="w-full h-full justify-center items-center bg-[#062C2D] rounded-[7px]"
                android_ripple={{color: 'rgba(255,255,255,0.1)'}}>
                <Text
                  className="text-white"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Delete
                </Text>
              </Pressable>
            </LinearGradient>
          </View>

          {/* Edit Button */}
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="flex-1 h-12 rounded-lg overflow-hidden">
            <Pressable
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                className="text-white"
                style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                Edit Client
              </Text>
            </Pressable>
          </LinearGradient>
        </View>

        {/* New Full Width Button */}
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 rounded-lg overflow-hidden">
          <Pressable
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}
            onPress={() => navigation.navigate('NoActiveAlertsScreen')}>
            <Text
              className="text-white"
              style={{fontFamily: 'SpaceGrotesk-Bold'}}>
              View All Client Cases
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default ViewClientCasesScreen;
