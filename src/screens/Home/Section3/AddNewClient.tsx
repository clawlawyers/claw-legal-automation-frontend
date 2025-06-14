// src/screens/Home/Section3/AddNewClient.tsx
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const clients = [
  {id: '1', name: 'Sophia Tran', hasAlert: false},
  {id: '2', name: 'David Kim', hasAlert: true},
  {id: '3', name: 'Emily Smith', hasAlert: false},
  {id: '4', name: 'Alisha Patel', hasAlert: false},
  {id: '5', name: 'Lily Evans', hasAlert: true},
];

type AddNewClientScreenNavigationProp = NativeStackScreenProps<
  YourCasesStackParamList,
  'AddNewClientScreen'
>;

const AddNewClientScreen = (props : AddNewClientScreenNavigationProp) => {
  const {navigation} = props;

  const handleClientPress = (client: {id: string; name: string}) => {
    navigation.navigate('ViewClientCasesScreen', {
      clientName: client.name,
      clientId: client.id,
    });
  };

  const handleAddNewClientButtonPress = () => {
    navigation.navigate('ClientDetailsScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 pb-4">
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
          <Text className="text-white text-xs font-spacegrotesk">Viewing</Text>
          <Text className="text-white text-base font-bold font-spacegrotesk">
            Client List
          </Text>
        </View>
      </View>

      <View className="mt-6 flex-row items-center px-4 py-2 rounded-lg border border-[#1E4A4A] bg-[#043233]">
        <TextInput
          placeholder="Search Clients"
          placeholderTextColor="#7A9E9F"
          className="flex-1 text-white text-base font-spacegrotesk"
        />
        <Image
          source={require('../../../assets/icons/search1.png')}
          style={{width: 25, height: 25}}
          resizeMode="contain"
        />
      </View>

      <ScrollView className="mt-6 mb-[70px]">
        {clients.map(client => (
          <TouchableOpacity
            key={client.id}
            onPress={() => handleClientPress(client)}
            className="flex-row justify-between items-center px-4 py-3 mt-3 rounded-md border-[#1E4A4A] border"
            style={{borderWidth: 1.5}}>
            <Text className="text-white text-base font-spacegrotesk">
              {client.name}
            </Text>
            {client.hasAlert && (
              <Image
                source={require('../../../assets/icons/bell1.png')}
                style={{width: 25, height: 25}}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="absolute bottom-5 left-5 right-5">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 justify-center items-center rounded-lg overflow-hidden">
          <Pressable
            onPress={handleAddNewClientButtonPress}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <Text className="text-white font-semibold font-spacegrotesk-bold">
              Add New Client
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default AddNewClientScreen;