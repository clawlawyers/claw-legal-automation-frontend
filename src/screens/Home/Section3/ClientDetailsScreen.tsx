/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../stacks/HomeStack';
import { YourCasesStackParamList } from '../../../stacks/YourCasesStack';
import HomeStackNavigator from '../../../stacks/Home';

type AddClientScreenProp = NativeStackNavigationProp<
  YourCasesStackParamList,
  'ClientDetailsScreen'
>;



const ClientDetailsScreen = () => {
  const navigation = useNavigation<AddClientScreenProp>();

  // const AddClientScreen = () => {
  //   const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('email');

  const communicationOptions = [
    {key: 'email', label: 'via Email'},
    {key: 'sms', label: 'via Contact SMS'},
    {key: 'whatsapp', label: 'via Whatsapp'},
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5">
      {/* Back Button */}
      <View className="mt-4 mb-4">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 rounded-full bg-[#016361] justify-center items-center">
          <Icon name="arrow-left" size={20} color="white" />
        </Pressable>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingBottom: 100}}>
        {/* Icon and Title */}
        <View className="items-center mb-6">
          <Image
            source={require('../../../assets/clientdetails.png')}
            className="w-25 h-25"
            resizeMode="contain"
          />
          <Text
            className="text-xl text-[#01B779] font-bold mt-4"
            style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Client Details
          </Text>
          <Text className="text-white text-center mt-1 text-sm px-4">
            Add A New Client To Streamline Communication And Case Tracking
          </Text>
        </View>

        {/* Input Fields with Gradient Borders */}
        {[
          'Enter Client Name',
          'Enter Client Email ID',
          'Enter Client Mobile Number',
        ].map((placeholder, idx) => (
          <LinearGradient
            key={idx}
            colors={['#016361', '#01B779']}
            style={{borderRadius: 6, marginBottom: 16}}>
            <View
              style={{
                backgroundColor: '#062C2D',
                borderRadius: 5,
                margin: 1,
                paddingHorizontal: 14,
                paddingVertical: 4,
              }}>
              <TextInput
                placeholder={placeholder}
                placeholderTextColor="#ccc"
                style={{color: 'white'}}
              />
            </View>
          </LinearGradient>
        ))}

        {/* Communication Section */}
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
                Communication :
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
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={{position: 'absolute', bottom: 20, left: 20, right: 20}}>
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: '100%',
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
            overflow: 'hidden',
          }}>
          <Pressable
            onPress={() => navigation.navigate('ClientUpdateSuccessScreen')}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <Text
              style={{
                fontFamily: 'SpaceGrotesk-Bold',
                color: 'white',
                fontWeight: '600',
              }}>
              Add Client
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default ClientDetailsScreen;
