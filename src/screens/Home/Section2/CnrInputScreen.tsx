// src/screens/Home/Section2/CnrInputScreen.tsx

import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack'; 
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const REFERENCE_DESIGN_WIDTH = 393;
const REFERENCE_DESIGN_HEIGHT = 852;

const getWidthPercentage = (pixelWidth: number): number => (pixelWidth / REFERENCE_DESIGN_WIDTH) * screenWidth;
const getHeightPercentage = (pixelHeight: number): number => (pixelHeight / REFERENCE_DESIGN_HEIGHT) * screenHeight;
const scaleText = (pixelFontSize: number): number => {
  const scaleFactor = screenWidth / REFERENCE_DESIGN_WIDTH;
  return Math.round(pixelFontSize * scaleFactor * 0.95);
};

type CnrInputScreenNavigationProp = NavigationProp<
  YourCasesStackParamList,
  'CnrInputScreen'
>;

const CnrInputScreen = () => {
  const navigation = useNavigation<CnrInputScreenNavigationProp>();
  const [crnValue, setCrnValue] = useState('');

  const handleFetchCase = () => {
    if (!crnValue.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Input Required',
        text2: 'Please enter a valid CNR Number.',
        position: 'bottom',
        bottomOffset: 40,
      });
      return;
    }
    console.log('Fetching case with CNR:', crnValue);
    navigation.navigate('CaseLoadingScreen', { fromScreen: 'CnrInputScreen' });
  };

  return (
    <LinearGradient colors={['#0A3A40', '#083035']} style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back-ios" size={scaleText(18)} color="#FFFFFF" style={{ marginLeft: getWidthPercentage(8) }} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.innerContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollContentContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              
              <Image
                source={require('../../../assets/casesearch.png')}
                style={styles.searchIconImage}
                resizeMode="contain"
              />

              <Text style={styles.titleText}>Search Using CNR Number</Text>

              <Text style={styles.instructionText}>
                Enter A Valid CNR Number To Fetch Your Case And Add To Your Cases
              </Text>

              <LinearGradient
                colors={['#016361', '#01B779']}
                start={{x: 0.1, y: 0}}
                end={{x: 0.9, y: 1}}
                style={styles.inputGradientBorder}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter CRN Number"
                  placeholderTextColor="rgba(172, 172, 172, 0.7)"
                  value={crnValue}
                  onChangeText={setCrnValue}
                  keyboardAppearance="dark"
                />
              </LinearGradient>
            </ScrollView>

            {/* Bottom Fetch Button */}
            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity onPress={handleFetchCase} style={{width: '100%', height: '100%'}}>
                <LinearGradient
                  colors={['#01B779', '#008C68']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.fetchButtonGradient}>
                  <Text style={styles.fetchButtonText}>Fetch Case</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: getHeightPercentage(50),
    left: getWidthPercentage(20),
    zIndex: 10,
  },
  backButton: {
    width: getWidthPercentage(36),
    height: getWidthPercentage(36),
    borderRadius: getWidthPercentage(18),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContentContainer: {
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(32),
    paddingTop: getHeightPercentage(120), 
    paddingBottom: getHeightPercentage(20),
  },
  searchIconImage: {
    width: getWidthPercentage(188),
    height: getWidthPercentage(188),
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(24),
    color: '#01B679',
    textAlign: 'center',
    marginTop: getHeightPercentage(24), 
  },
  instructionText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(14),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: scaleText(18),
    marginTop: getHeightPercentage(12),
    width: getWidthPercentage(292),
    textTransform: 'capitalize',
  },
  inputGradientBorder: {
    width: getWidthPercentage(329),
    height: getHeightPercentage(48),
    borderRadius: 10,
    marginTop: getHeightPercentage(36),
    padding: 1.5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(8, 48, 53, 0.85)',
    borderRadius: 8.5,
    paddingHorizontal: getWidthPercentage(20),
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(15),
    color: '#FFFFFF',
  },
  bottomButtonContainer: {
    width: getWidthPercentage(329),
    height: getHeightPercentage(48),
    alignSelf: 'center',
    marginBottom: getHeightPercentage(32),
  },
  fetchButtonGradient: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fetchButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(16),
    color: 'white',
  },
});

export default CnrInputScreen;