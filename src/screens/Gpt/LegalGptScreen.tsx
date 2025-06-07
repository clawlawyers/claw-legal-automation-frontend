// src/screens/Gpt/LegalGptScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../stacks/HomeStack';

type LegalGptScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'LegalGptScreen'
>;

const suggestionCardsData = [
  {
    id: '1',
    text: 'Request information about specific laws or acts.',
    icon: 'help-circle',
  },
  {
    id: '2',
    text: 'Learn the process of calculating tax amounts, including applicable rates and deductions.',
    icon: 'file-text',
  },
  {
    id: '3',
    text: 'Engage in a discussion regarding legal issues and relevant laws associated with the incident.',
    icon: 'message-square',
  },
  {
    id: '4',
    text: 'Article 370 was implemented in which circumstances of Indian Judicial System',
    icon: 'archive',
  },
];

const recentSearchesData = [
  'Discuss The Legal Issues of Fraud with very long text to see how it handles overflow',
  'Short search',
  'Another Legal Inquiry about Torts',
  'Case Law Research Strategies',
  'Understanding Contract Breach',
  'Intellectual Property Rights Overview',
  'Criminal Procedure Code Sections',
  'Environmental Law Updates 2024',
];

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const drawerWidth = screenWidth * 0.85;
const IS_SMALL_SCREEN = screenWidth < 375;

const LegalGptScreen = () => {
  const navigation = useNavigation<LegalGptScreenNavigationProp>();
  const [inputText, setInputText] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;

  const handleSend = () => {
    if (inputText.trim()) {
      console.log('Sending:', inputText);
      setInputText('');
    }
  };

  const openDrawer = () => {
    setIsDrawerVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = (callback?: () => void) => {
    Animated.timing(slideAnim, {
      toValue: -drawerWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerVisible(false);
      if (callback) {
        callback();
      }
    });
  };

  const handleExitGpt = () => {
    closeDrawer(() => {
      navigation.goBack();
    });
  };

  const handleStartNewChat = () => {
    console.log("Start new chat pressed");
    closeDrawer(() => {
      // Add logic to clear current chat or reset state here if necessary
    });
  };

  return (
    <LinearGradient colors={['#062C2D', '#0A3F40']} className="flex-1">
      <SafeAreaView
        className="flex-1"
        style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        {/* Header - Main Screen Responsiveness Applied */}
        <View
          className={`px-4 pt-2 pb-1 flex-row justify-between items-center ${
            IS_SMALL_SCREEN ? 'px-3 pt-1 pb-0' : 'px-5 pt-3 pb-2'
          }`}>
          <TouchableOpacity onPress={openDrawer} className="p-2">
            <Icon name="grid-outline" size={IS_SMALL_SCREEN ? 24 : 28} color="#00B779" />
          </TouchableOpacity>
          <View style={{width: (IS_SMALL_SCREEN ? 24 : 28) + 4}} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
          <ScrollView
            className={`flex-1 ${IS_SMALL_SCREEN ? 'px-3' : 'px-5'}`}
            contentContainerStyle={{paddingBottom: 10, flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View className={`items-center ${IS_SMALL_SCREEN ? 'mt-0 mb-3' : 'mt-1 mb-5'}`}>
              <View
                className={`relative justify-center items-center ${
                  IS_SMALL_SCREEN ? 'w-28 h-28' : 'w-32 h-32'
                }`}>
                <View
                  className={`absolute bg-[#01B779]/10 rounded-full ${
                    IS_SMALL_SCREEN ? 'w-28 h-28' : 'w-32 h-32'
                  }`}
                />
                <View
                  className={`absolute bg-[#01B779]/20 rounded-full ${
                    IS_SMALL_SCREEN ? 'w-20 h-20' : 'w-24 h-24'
                  }`}
                />
                <View
                  className={`absolute bg-[#01B779] rounded-full justify-center items-center ${
                    IS_SMALL_SCREEN ? 'w-16 h-16' : 'w-20 h-20'
                  }`}>
                  <Image
                    source={require('../../assets/gpt-logo-icon.png')}
                    className={IS_SMALL_SCREEN ? 'w-8 h-8' : 'w-10 h-10'}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Text
                className={`text-white font-spacegrotesk ${
                  IS_SMALL_SCREEN ? 'text-sm mt-3' : 'text-base mt-4'
                }`}>
                Welcome To
              </Text>
              <View className="my-0.5">
                <LinearGradient
                  colors={['#00FFC2', '#00B779']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{
                    paddingHorizontal: IS_SMALL_SCREEN ? 6 : 8,
                    paddingVertical: IS_SMALL_SCREEN ? 3 : 4,
                    borderRadius: 6,
                  }}>
                  <Text
                    className={`text-white font-bold font-spacegrotesk ${
                      IS_SMALL_SCREEN ? 'text-3xl' : 'text-4xl'
                    }`}
                    style={{backgroundColor: 'transparent'}}>
                    LegalGPT
                  </Text>
                </LinearGradient>
              </View>
              <Text
                className={`text-gray-400 font-spacegrotesk text-center ${
                  IS_SMALL_SCREEN ? 'text-xs mt-1 px-3' : 'text-sm mt-1 px-4'
                }`}>
                The power of AI for your Legal service
              </Text>
            </View>

            {/* Suggestion Cards Grid - Main Screen Responsiveness Applied */}
            <View
              className={`flex-row flex-wrap justify-between mb-4 ${
                IS_SMALL_SCREEN ? 'gap-y-2' : 'gap-y-3'
              }`}>
              {suggestionCardsData.map(card => (
                <TouchableOpacity
                  key={card.id}
                  className={`w-[48%] bg-[#0D393F]/70 border border-[#01B779]/80 rounded-lg p-2.5 justify-start items-start ${
                    IS_SMALL_SCREEN ? 'min-h-[90px] p-2' : 'min-h-[110px] p-3'
                  }`}
                  onPress={() => setInputText(card.text)}>
                  <FeatherIcon
                    name={card.icon as any}
                    size={IS_SMALL_SCREEN ? 18 : 20}
                    color="#01B779"
                    style={{marginBottom: IS_SMALL_SCREEN ? 4 : 6}}
                  />
                  <Text
                    className={`text-gray-300 font-spacegrotesk leading-tight ${
                      IS_SMALL_SCREEN ? 'text-[11px]' : 'text-xs'
                    }`}>
                    {card.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-grow" />
          </ScrollView>

          {/* Input Bar - Main Screen Responsiveness Applied */}
          <View className={`pt-1 ${IS_SMALL_SCREEN ? 'px-3 pb-1.5' : 'px-5 pb-2'}`}>
            <View className="flex-row items-center bg-[#0D393F] border border-[#01B779]/70 rounded-full p-1.5">
              <TextInput
                placeholder="Ask Anything You Want To Know ...."
                placeholderTextColor="#A0AEC0"
                className={`flex-1 px-3 text-white font-spacegrotesk ${
                  IS_SMALL_SCREEN ? 'h-9 text-[13px]' : 'h-10 text-sm'
                }`}
                value={inputText}
                onChangeText={setInputText}
                multiline={false}
                returnKeyType="send"
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity className={`mx-0.5 ${IS_SMALL_SCREEN ? 'p-1.5' : 'p-2'}`}>
                <FeatherIcon
                  name="paperclip"
                  size={IS_SMALL_SCREEN ? 20 : 22}
                  color="#01B779"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className={`bg-[#01B779] rounded-full ${IS_SMALL_SCREEN ? 'p-2' : 'p-2.5'}`}
                onPress={handleSend}>
                <Icon
                  name="send"
                  size={IS_SMALL_SCREEN ? 16 : 18}
                  color="white"
                  style={{transform: [{rotate: '-30deg'}], marginLeft: -2, marginTop: 1}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      
      {isDrawerVisible && (
        <Pressable
          onPress={() => closeDrawer()} 
          style={{
            position: 'absolute',// Covers the whole screen
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 10, 
          }}
        />
      )}
      <Modal
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={() => closeDrawer()} 
        animationType="none" 
      >
        
        <Animated.View
          style={{
            transform: [{translateX: slideAnim}],
            width: drawerWidth,
            height: screenHeight,
            position: 'absolute', 
            left: 0,
            top: 0,
            zIndex: 20, 
          }}
          className="bg-[#083A3F] shadow-2xl" 
        >
          <SafeAreaView
            className="flex-1"
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
           
            <View className="flex-row justify-end p-4 mb-4">
              <TouchableOpacity onPress={() => closeDrawer()} className="p-2">
                <Icon name="close-outline" size={32} color="white" />
              </TouchableOpacity>
            </View>

           
            <View className="px-6 mb-8">
              <TouchableOpacity
                onPress={handleStartNewChat} 
                className="bg-[#00B779] rounded-lg py-3.5 flex-row items-center justify-center space-x-2 shadow-md">
                <MaterialCommunityIcons name="chat-plus-outline" size={20} color="white" />
                <Text className="text-white text-base font-spacegrotesk-bold">
                  Start New Chat
                </Text>
              </TouchableOpacity>
            </View>

            
            <Text className="text-white text-lg font-spacegrotesk-bold px-6 mb-3">
              Recent Searches
            </Text>
            <ScrollView className="flex-1 px-6">
              {recentSearchesData.map((search, index) => (
                <TouchableOpacity key={index} className="py-3 border-b border-gray-500/50">
                  <Text
                    className="text-gray-200 text-sm font-spacegrotesk"
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {search}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            
            <View className="px-6 py-6 border-t border-gray-500/30">
              <TouchableOpacity
                onPress={handleExitGpt} 
                className="bg-[#0D2C32] rounded-lg py-3.5 items-center justify-center shadow-md">
                <Text className="text-white text-base font-spacegrotesk-bold">
                  Exit LegalGPT
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Modal>
    </LinearGradient>
  );
};

export default LegalGptScreen;