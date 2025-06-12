// src/screens/LoginScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image, // Added Image back
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainStackParamList} from '../stacks/MainStack'; // Adjust path as needed

type LoginScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'LoginScreen'
>;

type Role = 'firmAdmin' | 'advocate';

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [selectedRole, setSelectedRole] = useState<Role>('firmAdmin');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic validation example
    if (!email || !password) {
      console.log('Please enter email and password');
      return;
    }
    console.log(`Logging in as ${selectedRole} with email: ${email}`);
    navigation.replace('PostAuthLoadingScreen');
  };

  const handleForgotPassword = () => {
    navigation.navigate('OtpVerificationScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.mainContent}>
          {/* Logo - Reverted to the original Image component */}
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/LogoLogin.png')}
              style={styles.logoImage}
            />
          </View>

          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subText}>
            Your Digital Legal Assistant Is Ready
          </Text>

          {/* Role Selector */}
          <View style={styles.roleSelectorContainer}>
            {['firmAdmin', 'advocate'].map(role => {
              const isSelected = selectedRole === role;
              const button = (
                <View style={styles.roleButtonInner}>
                  <Text style={styles.roleButtonText}>
                    {role === 'firmAdmin' ? 'Firm Admin' : 'Advocate'}
                  </Text>
                </View>
              );

              return (
                <TouchableOpacity
                  key={role}
                  onPress={() => setSelectedRole(role as Role)}
                  style={{flex: 1}}>
                  {isSelected ? (
                    <LinearGradient
                      colors={['#01B779', '#009B6A']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.roleButton}>
                      {button}
                    </LinearGradient>
                  ) : (
                    <View style={[styles.roleButton, styles.roleButtonInactive]}>
                      {button}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter Your Email ID"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter Your Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}>
              <Icon
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={handleLogin} style={{width: '100%'}}>
          <LinearGradient
            colors={['#01B779', '#008C68']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          New Here?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('RegisterScreen')}>
            Create An Account
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#093138',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  mainContent: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
  },
  logoWrapper: {
    marginBottom: 40,
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 22,
    color: '#01B679',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    color: '#D1D5DB', // gray-300
    fontSize: 14,
    marginBottom: 32,
    textAlign: 'center',
  },
  roleSelectorContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    backgroundColor: '#004343',
    borderRadius: 8,
    marginBottom: 24,
    overflow: 'hidden',
  },
  roleButton: {
    flex: 1,
    height: '100%',
    borderRadius: 8,
  },
  roleButtonInactive: {
    backgroundColor: 'transparent',
  },
  roleButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  inputWrapper: {
    width: '100%',
    height: 52,
    borderColor: '#01886C',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: '100%',
    color: 'white',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#ACACAC',
    fontSize: 14,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  loginButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  signupText: {
    color: '#9CA3AF',
    marginTop: 24,
    textAlign: 'center',
  },
  signupLink: {
    color: '#01B879',
    fontWeight: '600',
  },
});

export default LoginScreen;