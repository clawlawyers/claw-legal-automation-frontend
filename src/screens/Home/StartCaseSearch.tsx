import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const StartCaseSearch = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 pt-4">
      {/* Back Button using Feather icon */}
      <Pressable
        onPress={() => navigation.goBack()}
        className="w-10 h-10 rounded-full border border-white justify-center items-center">
        <Icon name="arrow-left" size={20} color="#fff" />
      </Pressable>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center">
        {/* Search Circle Icon */}
        <View className="w-28 h-28 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 justify-center items-center mb-6">
          <Image
            source={require('../../assets/icons/alert.png')} // Replace this with actual icon path
            className="w-10 h-10"
            resizeMode="contain"
          />
        </View>

        {/* Title and Subtitle */}
        <Text className="text-xl font-semibold text-green-400 mb-1">
          Find a Case Instantly
        </Text>
        <Text className="text-sm text-white text-center mb-6 px-2">
          Search And Filter Through Your Case{'\n'}Records With Ease With CRN
        </Text>

        {/* Input */}
        <TextInput
          placeholder="Enter CRN Number"
          placeholderTextColor="#ccc"
          className="w-full h-12 border border-green-500 rounded-lg px-4 text-white mb-6"
        />

        {/* Center Icon */}
        <Image
          source={require('../../assets/icons/alert.png')}
          className="w-12 h-12 mb-8"
          resizeMode="contain"
        />

        {/* Submit Button */}
        <Pressable className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg justify-center items-center">
          <Text className="text-white font-semibold">Fetch Case Details</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default StartCaseSearch;
