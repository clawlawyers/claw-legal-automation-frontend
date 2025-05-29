/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Switch,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SettingsStackParamList} from '../../../stacks/YourSettingsStack';

type AppSettingsScreenProp = NavigationProp<
  SettingsStackParamList,
  'AppSettingsScreen'
>;

const AppSettingsScreen = () => {
  const navigation = useNavigation<AppSettingsScreenProp>();

  const [pushNotification, setPushNotification] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [autoCrashReport, setAutoCrashReport] = useState(true);

  return (
    <SafeAreaView
      className="flex-1 bg-[#0D2C32] px-5"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      {/* Header */}
      <View className="flex-row items-center mb-6 mt-3">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-10 h-10 justify-center items-center rounded-full border border-[#01B779]">
          <Image
            source={require('../../../assets/icons/back.png')}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </Pressable>
        <View className="ml-3">
          <Text className="text-white text-xs">Viewing</Text>
          <Text className="text-white text-base font-bold">APP Settings</Text>
        </View>
      </View>

      {/* Toggle Settings */}
      <View className="gap-y-6 mt-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-sm">Enable Push Notification</Text>
          <Switch
            value={pushNotification}
            onValueChange={setPushNotification}
            trackColor={{false: '#555', true: '#01B779'}}
            thumbColor={pushNotification ? '#01B779' : '#999'}
          />
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-white text-sm">Auto Update App</Text>
          <Switch
            value={autoUpdate}
            onValueChange={setAutoUpdate}
            trackColor={{false: '#555', true: '#01B779'}}
            thumbColor={autoUpdate ? '#01B779' : '#999'}
          />
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-white text-sm">Auto Send Crash Report</Text>
          <Switch
            value={autoCrashReport}
            onValueChange={setAutoCrashReport}
            trackColor={{false: '#555', true: '#01B779'}}
            thumbColor={autoCrashReport ? '#01B779' : '#999'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppSettingsScreen;
