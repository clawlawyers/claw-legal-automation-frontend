// src/screens/Home/Section2/SelectCourtScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack'; 
import Toast from 'react-native-toast-message';

type SelectCourtScreenNavigationProp = NavigationProp<
  YourCasesStackParamList,
  'SelectCourtScreen' 
>;

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const REFERENCE_DESIGN_WIDTH = 393;
const REFERENCE_DESIGN_HEIGHT = 852;

const getWidthPercentage = (pixelWidth: number) => (pixelWidth / REFERENCE_DESIGN_WIDTH) * screenWidth;
const getHeightPercentage = (pixelHeight: number) => (pixelHeight / REFERENCE_DESIGN_HEIGHT) * screenHeight;
const scaleText = (pixelFontSize: number) => {
  const scaleFactor = screenWidth / REFERENCE_DESIGN_WIDTH;
  return Math.round(pixelFontSize * scaleFactor * 0.95);
};



const courtOptionsInfo = [
  {id: 'supreme', label: 'Supreme Court Of India'},
  {id: 'high', label: 'State High Courts'},
  {id: 'district', label: 'District Courts'},
];
const SelectCourtScreen = () => {
  const navigation = useNavigation<SelectCourtScreenNavigationProp>();
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);

  const handleContinueAction = () => {
    if (!selectedCourt) {
      Toast.show({
        type: 'error',
        text1: 'Selection Required',
        text2: 'Please select a court type to continue.',
        position: 'bottom',
        bottomOffset: 40,
      });
      return;
    }
    
    const selectedOptionLabel = courtOptionsInfo.find(c => c.id === selectedCourt)?.label;
    console.log('Selected Court:', selectedOptionLabel);
    


    if (selectedCourt === 'high') {
      navigation.navigate('HighCourtCaseSelectionScreen');
    } else if (selectedCourt === 'supreme') {
      Toast.show({
        type: 'info',
        text1: 'Coming Soon',
        text2: `Searching for ${selectedOptionLabel} is under development.`,
        position: 'bottom',
        bottomOffset: 40,
      });
      // navigation.navigate('SupremeCourtCaseInputScreen'); 
    } else if (selectedCourt === 'district') {
      navigation.navigate('DistrictCourtCaseSelectionScreen');
    } else {
        // Fallback for any other unhandled selections
        Toast.show({
            type: 'info',
            text1: 'Navigation',
            text2: `Navigation for "${selectedOptionLabel}" not yet implemented.`,
            position: 'bottom',
            bottomOffset: 40,
        });
    }
  };

  return (
    <LinearGradient
      colors={['#0A3A40', '#083035']}
      style={styles.mainGradientContainer}>
      <SafeAreaView style={styles.contentSafeArea}>
        {/* Back button if needed, or rely on stack header if shown */}
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity> */}
        
        <View className="flex-1 mt-10 ustify-center items-center">
                {/* Circle with Icon */}
                <Image
                  source={require('../../../assets/casesearch.png')}
                  className="w-30 h-30"
                  resizeMode="contain"
                />
        </View>

        <Text style={[styles.mainTitle, {marginTop: ((196 - (117 + 188) + 15) / REFERENCE_DESIGN_HEIGHT) * screenHeight }]}>Find a Case Instantly</Text>
        <Text style={styles.subInstructionText}>
          Fill In Max Number Of Fields To Get Better Results Quickly
        </Text>

        <View style={[styles.optionsWrapper, {marginTop: ((360 - (296+31) -10) / REFERENCE_DESIGN_HEIGHT) * screenHeight}]}>
          {courtOptionsInfo.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[styles.selectableOptionButton, {marginBottom: ((470 - 410 - 48) / REFERENCE_DESIGN_HEIGHT) * screenHeight}]}
              onPress={() => setSelectedCourt(option.id)}>
              <LinearGradient
                colors={selectedCourt === option.id ? ['#01B779DD', '#008C68DD'] : ['transparent', 'transparent']}
                start={{x: 0, y: 0}} end={{x:1, y:1}}
                style={styles.selectableOptionGradient}>
                <View style={[styles.selectableOptionInner, {borderColor: selectedCourt === option.id ? '#01B779' : 'rgba(1, 183, 121, 0.5)'} ]}>
                    <View style={styles.radioOuterCircle}>
                    {selectedCourt === option.id && (
                        <View style={styles.radioInnerSelected} />
                    )}
                    </View>
                    <Text style={[styles.optionLabelText, selectedCourt === option.id && styles.optionLabelTextSelected]}>
                        {option.label}
                    </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{flex: 1}} />
        

        <TouchableOpacity onPress={handleContinueAction} style={[styles.primaryActionButtonWrapper, {marginBottom: getHeightPercentage(852 - 772 - 48)}]}>
          <LinearGradient
            colors={['#01B779', '#008C68']}
            start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
            style={styles.primaryActionButtonGradient}>
            <Text style={styles.primaryActionButtonLabel}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Already handled by SafeAreaView prop
  },
  // backButton: { // Optional back button styling if you add one manually
  //   position: 'absolute',
  //   top: (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) + 10,
  //   left: 15,
  //   zIndex: 1,
  //   padding: 10,
  // },
  profileImageWrapper: {
    width: getWidthPercentage(188),
    height: getWidthPercentage(188),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageOuterElement: {
    width: '50%',
    height: '50%',
    borderRadius: getWidthPercentage(188) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  profileImageMiddleElement: {
    width: '60%',
    height: '60%',
    borderRadius: (getWidthPercentage(188) * 0.9) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  profileImageInnerElement: {
    width: '100%',
    height: '100%',
    borderRadius: (getWidthPercentage(188) * 0.9 * 0.85) / 2,
    backgroundColor: '#01B779',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIcon: {
    width: '100%',
    height: '100%',
  },
  mainTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(24),
    lineHeight: scaleText(24) * 1.0,
    textAlign: 'center',
    color: '#01B679',
    alignSelf: 'center',
  },
  subInstructionText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(14),
    lineHeight: scaleText(14) * 1.1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'center',
    marginTop: getHeightPercentage(10),
    width: getWidthPercentage(320),
  },
  optionsWrapper: {
    alignSelf: 'center',
    width: getWidthPercentage(329),
  },
  selectableOptionButton: {
    height: getHeightPercentage(48),
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectableOptionGradient: {
    flex: 1,
    borderRadius: 10,
  },
  selectableOptionInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(15),
    backgroundColor: 'rgba(8, 48, 53, 0.7)',
    borderRadius: 9,
    borderWidth: 1,
    margin: 0,
  },
  radioOuterCircle: {
    width: scaleText(22),
    height: scaleText(22),
    borderRadius: scaleText(11),
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidthPercentage(12),
  },
  radioInnerSelected: {
    width: scaleText(12),
    height: scaleText(12),
    borderRadius: scaleText(6),
    backgroundColor: '#01B779',
  },
  optionLabelText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(15),
    color: 'rgba(255, 255, 255, 0.9)',
  },
  optionLabelTextSelected: {
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#01B779',
  },
  primaryActionButtonWrapper: {
    width: getWidthPercentage(329),
    alignSelf: 'center',
  },
  primaryActionButtonGradient: {
    height: getHeightPercentage(48),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryActionButtonLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(16),
    color: 'white',
  },
});

export default SelectCourtScreen;