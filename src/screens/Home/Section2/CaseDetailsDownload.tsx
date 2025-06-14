/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';

import {HomeStackParamList} from '../../../stacks/HomeStack';

type CaseDetailsDownloadScreenProp = NativeStackScreenProps<
  HomeStackParamList,
  'CaseDetailsDownloadScreen'
>;

const CaseDetailsDownloadScreen = (props : CaseDetailsDownloadScreenProp) => {
  const {navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [clientName, setClientName] = useState('');

  const caseFields = [
    {
      label: 'Case Head',
      value:
        'Reference with about Lumen teams, giving information on its origins, as well as a random Librum verification',
    },
    {
      label: 'Registration Number',
      value: '10261070653056442',
    },
    {
      label: 'Filing Number',
      value: '10261070653056442',
    },
    {
      label: 'Court Name',
      value: 'Kolanta High Court, West Bengal',
    },
    {
      label: 'Petitioner Name',
      value: 'Sonnyu Singana Bank',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5">
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/60 px-5">
          <View className="bg-[#062C2D] p-5 rounded-2xl w-full">
            <Text
              className="text-white text-lg mb-4"
              style={{fontFamily: 'SpaceGrotesk-Bold'}}>
              Add Associated Client
            </Text>
            <TextInput
              className="border border-white/20 text-white rounded-xl px-4 py-2 mb-5"
              placeholder="Enter client name"
              placeholderTextColor="#AAAAAA"
              value={clientName}
              onChangeText={setClientName}
              style={{fontFamily: 'SpaceGrotesk'}}
            />
            <View className="flex-row justify-between">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="w-[48%] rounded-xl overflow-hidden">
                <LinearGradient
                  colors={['#444', '#666']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  className="h-11 justify-center items-center rounded-xl">
                  <Text
                    className="text-white"
                    style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                    Cancel
                  </Text>
                </LinearGradient>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  console.log('Client Added:', clientName);
                }}
                className="w-[48%] rounded-xl overflow-hidden">
                <LinearGradient
                  colors={['#016361', '#01B779']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  className="h-11 justify-center items-center rounded-xl">
                  <Text
                    className="text-white"
                    style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                    Save
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View className="flex-row items-center mt-5">
        <View className="w-10 h-10 rounded-full overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-full h-full justify-center items-center">
            <Pressable
              onPress={() => navigation.goBack()}
              className="w-9 h-9 rounded-full bg-[#062C2D] justify-center items-center">
              <Icon name="arrow-left" size={20} color="#01B679" />
            </Pressable>
          </LinearGradient>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-white font-spacegrotesk text-xs">Viewing</Text>
          <Text
            style={{fontFamily: 'SpaceGrotesk-Bold'}}
            className="text-white text-base">
            Your Cases
          </Text>
        </View>

        <View className="w-10 h-10 rounded-full overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-full h-full justify-center items-center">
            <Pressable
              onPress={() => console.log('Download pressed')}
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Icon name="download" size={20} color="white" />
            </Pressable>
          </LinearGradient>
        </View>
      </View>

      <ScrollView className="flex-1 mt-6" showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{borderRadius: 16, padding: 2, marginBottom: 20}}>
          <View
            style={{
              backgroundColor: '#062C2D',
              borderRadius: 16,
              overflow: 'hidden',
            }}>
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="p-4 rounded-t-xl">
              <Text
                style={{fontFamily: 'SpaceGrotesk-Bold', fontSize: 15}}
                className="text-white mb-2">
                Case Details
              </Text>
              <View className="flex-row">
                <Text
                  style={{fontFamily: 'SpaceGrotesk-SemiBold'}}
                  className="text-base text-white">
                  CRN Number :
                </Text>
                <Text
                  style={{fontFamily: 'SpaceGrotesk'}}
                  className="text-base text-white pl-2">
                  WP202406070810024
                </Text>
              </View>
            </LinearGradient>

            <View className="px-4 py-3 space-y-4">
              {caseFields.map((item, idx) => (
                <View key={idx}>
                  {idx !== 0 && (
                    <LinearGradient
                      colors={['#01B679', '#00FFC6']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{height: 2, width: '100%', marginBottom: 12}}
                    />
                  )}
                  <Text
                    style={{fontFamily: 'SpaceGrotesk-Bold'}}
                    className="text-base text-[#FFFFFF] pb-1">
                    {item.label} :
                  </Text>
                  <Text
                    style={{fontFamily: 'SpaceGrotesk'}}
                    className="text-base text-white pb-2">
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      <LinearGradient
        colors={['#016361', '#01B779']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{borderRadius: 8, padding: 1, marginBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 8,
            overflow: 'hidden',
            width: '100%',
          }}>
          <LinearGradient
            colors={['#00C47E', '#00B288']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: '50%',
              paddingVertical: 12,
              paddingHorizontal: 12,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: 'SpaceGrotesk-Bold',
                color: 'white',
                fontSize: 14,
              }}>
              Associated Client :
            </Text>
          </LinearGradient>

          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              width: '50%',
              backgroundColor: '#062C2D',
              paddingVertical: 12,
              paddingHorizontal: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontFamily: 'SpaceGrotesk-SemiBold'}}
              className="text-[#01B679] text-base">
              [Click To Add]
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      <View className="flex-row justify-between mt-4 mb-10">
        <View className="w-[48%] rounded-xl overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="rounded-xl">
            <Pressable
              onPress={() => navigation.navigate('SendCaseDetailsScreen')}
              className="h-12 justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                style={{fontFamily: 'SpaceGrotesk-Bold'}}
                className="text-white text-base">
                Send Details
              </Text>
            </Pressable>
          </LinearGradient>
        </View>

        <View className="w-[48%] rounded-xl overflow-hidden">
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="rounded-xl">
            <Pressable
              onPress={() => console.log('Set Reminder')}
              className="h-12 justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                style={{fontFamily: 'SpaceGrotesk-Bold'}}
                className="text-white text-base">
                Set Reminder
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaseDetailsDownloadScreen;
