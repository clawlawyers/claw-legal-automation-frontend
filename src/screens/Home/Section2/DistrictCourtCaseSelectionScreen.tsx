// src/screens/Home/Section2/DistrictCourtCaseSelectionScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const REFERENCE_DESIGN_WIDTH = 393;
const REFERENCE_DESIGN_HEIGHT = 852;

const getWidthPercentage = (pixelWidth: number): number => (pixelWidth / REFERENCE_DESIGN_WIDTH) * screenWidth;
const getHeightPercentage = (pixelHeight: number): number => (pixelHeight / REFERENCE_DESIGN_HEIGHT) * screenHeight;
const scaleText = (pixelFontSize: number): number => {
  const scaleFactor = screenWidth / REFERENCE_DESIGN_WIDTH;
  return Math.round(pixelFontSize * scaleFactor * 0.95);
};

type DistrictCourtCaseSelectionScreenNavigationProp = NavigationProp<
  YourCasesStackParamList,
  'DistrictCourtCaseSelectionScreen'
>;

const DistrictCourtCaseSelectionScreen = () => {
  const navigation = useNavigation<DistrictCourtCaseSelectionScreenNavigationProp>();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCourtComplex, setSelectedCourtComplex] = useState<string | null>(null);

  const handleContinueAction = () => {
    // if (!selectedState || !selectedDistrict || !selectedCourtComplex) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Selection Required',
    //     text2: 'Please fill all fields to continue.',
    //     position: 'bottom',
    //     bottomOffset: 40,
    //   });
    //   return;
    // }
    
    // TODO: Pass selected data to the next screen or use it for an API call.
    navigation.navigate('CaseInputScreen', { 
        // Example of passing data:
        // state: selectedState, 
        // district: selectedDistrict, 
        // courtComplex: selectedCourtComplex 
    });
  };

  // Replace these with actual picker logic (e.g., a modal or bottom sheet)
  const openStatePicker = () => {
    // setSelectedState("Some State");
    Toast.show({type: 'info', text1: 'Action', text2: 'Open State Picker'});
  };

  const openDistrictPicker = () => {
    // setSelectedDistrict("Some District");
    Toast.show({type: 'info', text1: 'Action', text2: 'Open District Picker'});
  };

  const openCourtComplexPicker = () => {
    // setSelectedCourtComplex("Some Complex");
    Toast.show({type: 'info', text1: 'Action', text2: 'Open Court Complex Picker'});
  };

  return (
    <LinearGradient
      colors={['#0A3A40', '#083035']}
      style={styles.mainGradientContainer}>
      <SafeAreaView style={styles.contentSafeArea}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../../../assets/casesearch.png')}
            style={styles.searchIconImage}
            resizeMode="contain"
          />

          <Text style={styles.titleText}>Find District Court Cases</Text>
          
          <Text style={styles.instructionText}>
            Search For Cases From India's District Courts Efficiently Here.
          </Text>

          {/* Select State Dropdown */}
          <TouchableOpacity 
            style={[styles.dropdownOuterContainer, {marginTop: getHeightPercentage(39)}]}
            onPress={openStatePicker}>
            <Text style={styles.dropdownText}>
              {selectedState || 'Select State'}
            </Text>
            <Icon name="chevron-down" size={scaleText(20)} color="rgba(255,255,255,0.7)" /> 
          </TouchableOpacity>

          {/* Select District Dropdown */}
          <TouchableOpacity 
            style={[styles.dropdownOuterContainer, {marginTop: getHeightPercentage(12)}]}
            onPress={openDistrictPicker}>
            <Text style={styles.dropdownText}>
              {selectedDistrict || 'Select District'}
            </Text>
            <Icon name="chevron-down" size={scaleText(20)} color="rgba(255,255,255,0.7)" /> 
          </TouchableOpacity>

          {/* Select Court Complex Dropdown */}
          <TouchableOpacity 
            style={[styles.dropdownOuterContainer, {marginTop: getHeightPercentage(12)}]}
            onPress={openCourtComplexPicker}>
            <Text style={styles.dropdownText}>
              {selectedCourtComplex || 'Select Court Complex'}
            </Text>
            <Icon name="chevron-down" size={scaleText(20)} color="rgba(255,255,255,0.7)" /> 
          </TouchableOpacity>

          {/* Spacer to push button to bottom */}
          <View style={{flex: 1}} />

          <TouchableOpacity onPress={handleContinueAction} style={styles.continueButtonWrapper}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
              style={styles.continueButtonGradient}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainGradientContainer: {
    flex: 1,
  },
  contentSafeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(20),
  },
  searchIconImage: {
    width: getWidthPercentage(188),
    height: getWidthPercentage(188),
    marginTop: getHeightPercentage(117),
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(24),
    lineHeight: scaleText(24) * 1.0,
    color: '#01B679',
    textAlign: 'center',
    marginTop: getHeightPercentage(10),
  },
  instructionText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(14),
    lineHeight: scaleText(14) * 1.1,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: getHeightPercentage(8),
    width: getWidthPercentage(292),
  },
  dropdownOuterContainer: {
    width: getWidthPercentage(329),
    height: getHeightPercentage(48),
    borderWidth: 1,
    borderColor: 'rgba(1, 183, 121, 0.5)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getWidthPercentage(15),
    backgroundColor: 'rgba(8, 48, 53, 0.7)',
  },
  dropdownText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(15),
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
  },
  continueButtonWrapper: {
    width: getWidthPercentage(329),
    height: getHeightPercentage(48),
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: getHeightPercentage(32),
  },
  continueButtonGradient: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(16),
    color: 'white',
  },
});

export default DistrictCourtCaseSelectionScreen;