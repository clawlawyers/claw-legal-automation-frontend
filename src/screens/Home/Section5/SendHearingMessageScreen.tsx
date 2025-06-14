// src/screens/SendHearingMessageScreen.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type YourStackParamList = {
  SendHearingMessageScreen: undefined;
  SendCaseDetailsScreen: undefined;
  SelectClientsScreen: undefined;
  // ... other screens
};

type SendHearingMessageNavigationProp = NativeStackScreenProps<
  YourStackParamList,
  'SendHearingMessageScreen'
>;

const SendHearingMessageScreen = (props : SendHearingMessageNavigationProp) => {
  const {navigation} = props;
  const [message, setMessage] = React.useState('');
  const [aiMessage, setAiMessage] = React.useState('');

  const handleGenerateAiMessage = () => {
    if (!message.trim()) {
      Alert.alert('Input Required', 'Please enter a message first.');
      return;
    }
    // Simulate AI formatting
    const formatted = `Dear Client,\n\nThis is to inform you about the recent proceedings for your case. The key details are as follows:\n\n- ${message}\n\nWe will keep you updated on further developments.\n\nBest regards,\nYour Legal Team`;
    setAiMessage(formatted);
  };

  const handleNavigateToSendDetails = () => {
    navigation.navigate('SelectClientsScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>Send</Text>
            <Text style={styles.headerTitle}>Case Hearing Details</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Main Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Message..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={styles.aiIcon}
              onPress={handleGenerateAiMessage}>
              <Icon name="account-voice" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* AI Formatted Message Section */}
          <View style={styles.aiSectionHeader}>
            <Icon name="magic-staff" size={20} color="#01B679" />
            <Text style={styles.aiTitle}>AI Formatted Message</Text>
          </View>

          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.aiBoxGradient}>
            <View style={styles.aiBox}>
              <Text style={styles.aiText}>
                {aiMessage || 'AI generated message will appear here...'}
              </Text>
            </View>
          </LinearGradient>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={handleNavigateToSendDetails}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.sendButton}>
              <Text style={styles.buttonText}>Via Email</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={{width: 16}} />

          <TouchableOpacity
            style={{flex: 1}}
            onPress={handleNavigateToSendDetails}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.sendButton}>
              <Text style={styles.buttonText}>Via Whatsapp</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#093138',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    backgroundColor: 'rgba(1, 183, 121, 0.25)',
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
    position: 'relative',
  },
  textInput: {
    height: 200,
    borderWidth: 1.5,
    borderColor: '#00A3FF',
    borderRadius: 15,
    padding: 16,
    paddingBottom: 40, 
    fontSize: 16,
    color: 'white',
  },
  aiIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#01B679',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 12,
  },
  aiTitle: {
    color: '#01B679',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  aiBoxGradient: {
    borderRadius: 15,
    padding: 1,
  },
  aiBox: {
    backgroundColor: '#093138',
    borderRadius: 14,
    minHeight: 120,
    padding: 16,
  },
  aiText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#093138',
  },
  sendButton: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendHearingMessageScreen;