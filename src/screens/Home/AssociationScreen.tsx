/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const clients = [
  'Rahul Prajapati',
  'Sophia Tran',
  'David Kim',
  'Emily Smith',
  'John Doe',
  'Lily Evans',
  'Michael Chen',
];

const AssociationScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 pb-20">
      {/* Header with Back and Download */}
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

      {/* Scrollable Checkbox List */}
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
                className="w-5 h-5 border-2 rounded-full border-[#01B779] mr-4 justify-center items-center">
                {selected.includes(name) && (
                  <View className="w-3 h-3 bg-[#01B779] rounded-full" />
                )}
              </Pressable>
              <Text className="text-white">{name}</Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.fixedBottom}>
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 justify-center items-center rounded-lg overflow-hidden">
          <Pressable
            onPress={() => navigation.navigate('CaseNotFoundScreen')}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <Text
              style={{fontFamily: 'SpaceGrotesk-Bold'}}
              className="text-white font-semibold">
              Associate Clients
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

export default AssociationScreen;
