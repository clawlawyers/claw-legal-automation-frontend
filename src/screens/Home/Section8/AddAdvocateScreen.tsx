// src/screens/AddAdvocateScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Reusable Input Component with Gradient Border
const FormInput = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
}) => (
  <View style={styles.inputContainer}>
    <LinearGradient
      colors={['#016361', '#01B779']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.inputGradientBorder}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </LinearGradient>
  </View>
);

const AddAdvocateScreen = () => {
  const navigation = useNavigation();

  // State for form inputs
  const [name, setName] = useState('');
  const [barId, setBarId] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [court, setCourt] = useState('');

  const handleAddAdvocate = () => {
    // Logic to handle form submission
    console.log('Adding Advocate:', {name, barId, email, mobile, court});
    // You can add form validation here
    // On success, navigate back or to a confirmation screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Header Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.content}>
            {/* Avatar Icon */}
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarRing, styles.ring1]} />
              <View style={[styles.avatarRing, styles.ring2]} />
              <LinearGradient
                colors={['#01B879', '#006261']}
                style={styles.avatarIconBg}>
                <Icon name="account" size={40} color="#072429" />
              </LinearGradient>
            </View>

            {/* Titles */}
            <Text style={styles.title}>Add New Advocate</Text>
            <Text style={styles.subtitle}>
              To Add An Advocate, Please Fill All The Details Below.
            </Text>

            {/* Form Inputs */}
            <FormInput
              placeholder="Advocate Name"
              value={name}
              onChangeText={setName}
            />
            <FormInput
              placeholder="Advocate BAR ID"
              value={barId}
              onChangeText={setBarId}
            />
            <FormInput
              placeholder="Advocate Email ID"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <FormInput
              placeholder="Advocate Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
            <FormInput
              placeholder="Practice Court Complex"
              value={court}
              onChangeText={setCourt}
            />

            {/* Add Advocate Button */}
            <TouchableOpacity
              onPress={handleAddAdvocate}
              style={styles.addButtonWrapper}>
              <LinearGradient
                colors={['#01B779', '#008C68']}
                style={styles.addButton}>
                <Text style={styles.buttonText}>Add Advocate</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#093138',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 80, // Space for back button
    paddingBottom: 40,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarRing: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(1, 182, 121, 0.1)',
  },
  ring1: {width: 120, height: 120},
  ring2: {width: 95, height: 95},
  avatarIconBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#01B679',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: '85%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputGradientBorder: {
    borderRadius: 12,
    padding: 1, // Border width
  },
  input: {
    backgroundColor: '#093138',
    borderRadius: 11,
    height: 52,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 16,
  },
  addButtonWrapper: {
    width: '100%',
    marginTop: 10,
  },
  addButton: {
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAdvocateScreen;