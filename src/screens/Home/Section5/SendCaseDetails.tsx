
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../stacks/HomeStack'; // Adjust path if needed

const clients = ['Rahul Prajapati', 'Sophia Tran', 'David Kim', 'Emily Smith'];

// Use the corrected HomeStackParamList for navigation props
type SendCaseDetailsScreenProp = NativeStackNavigationProp<
  HomeStackParamList,
  'SendCaseDetailsScreen'
>;

const SendCaseDetailsScreen = () => {
  const navigation = useNavigation<SendCaseDetailsScreenProp>();

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
              <Image
                source={require('../../../assets/icons/back.png')}
                className="w-30 h-30"
                resizeMode="contain"
              />
            </Pressable>
          </LinearGradient>
        </View>

        <View className="ml-3 flex-1">
          <Text className="text-white font-spacegrotesk text-xs">
            Select Client To
          </Text>
          <Text
            style={{fontFamily: 'SpaceGrotesk-Bold'}}
            className="text-white text-base">
            Send Case Details
          </Text>
        </View>
      </View>

      {/* List */}
      <ScrollView className="mt-10">
        {clients.map((name, index) => (
          <LinearGradient
            style={{
              borderRadius: 8,
              marginBottom: 12,
              overflow: 'hidden',
            }}
            key={index}
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="rounded-lg p-[1px] mb-3">
            <View className="bg-[#062C2D] rounded-lg flex-row items-center px-4 py-3">
              <Pressable
                onPress={() => toggleSelection(name)}
                className="w-5 h-5 border-2 rounded-full border-[#FFFFFF] mr-4 justify-center items-center">
                {selected.includes(name) && (
                  <View className="w-3 h-3 bg-[#01B779] rounded-full" />
                )}
              </Pressable>
              <Text className="text-white font-spacegrotesk">{name}</Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Button */}
      <View style={styles.fixedBottom}>
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 justify-center items-center rounded-lg overflow-hidden">
          <Pressable
            onPress={() => navigation.navigate('ProceedingDetailsSentScreen')} // This will now work
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <Text
              style={{fontFamily: 'SpaceGrotesk-Bold'}}
              className="text-white font-semibold">
              Send Case Details
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fixedBottom: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default SendCaseDetailsScreen;