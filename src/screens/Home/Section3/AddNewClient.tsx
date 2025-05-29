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
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {HomeStackParamList} from '../../../stacks/HomeStack';

const clients = [
  'Sophia Tran',
  'David Kim',
  'Emily Smith',
  'Alisha Patel',
  'Lily Evans',
];

type AddNewClientScreenProps = NavigationProp<
  HomeStackParamList,
  'StartCaseSearch'
>;

const AddNewClientScreen = () => {
  const navigation = useNavigation<AddNewClientScreenProps>();

  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 pb-20">
      {/* Header */}
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

      {/* Search Bar */}
      <View className="mt-6 flex-row items-center px-4 py-2 rounded-lg border border-[#1E4A4A] bg-[#043233]">
        <TextInput
          placeholder="Search Clients"
          placeholderTextColor="#7A9E9F"
          className="flex-1 text-white text-base"
        />
        <Image
          source={require('../../../assets/icons/search1.png')}
          className="w-25 h-25"
          resizeMode="contain"
        />
      </View>

      {/* Scrollable Client List */}
      <ScrollView className="mt-6 mb-24">
        {clients.map((name, index) => (
          <Pressable
            key={index}
            onPress={() => toggleSelection(name)}
            className={`flex-row justify-between items-center px-4 py-3 mt-3 rounded-md ${
              selected.includes(name) ? 'border-[#00F0FF]' : 'border-[#1E4A4A]'
            } border`}
            style={{borderWidth: 1.5}}>
            <Text className="text-white text-base">{name}</Text>
            {(index === 1 || index === 4) && (
              <Image
                source={require('../../../assets/icons/bell1.png')}
                className="w-25 h-25"
                resizeMode="contain"
              />
            )}
          </Pressable>
        ))}
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-5 left-5 right-5">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 justify-center items-center rounded-lg overflow-hidden">
          <Pressable
            onPress={() => navigation.navigate('ViewClientCasesScreen')}
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
