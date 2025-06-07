// src/screens/Home/Section2/CaseInputScreen.tsx
/* eslint-disable react-native/no-inline-styles */
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack'; // Adjust path as needed
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// Reference design dimensions
const REFERENCE_DESIGN_WIDTH = 393;
const REFERENCE_DESIGN_HEIGHT = 852;

// Helper function to convert design units to responsive units
const getWidthPercentage = (pixelWidth: number): number => (pixelWidth / REFERENCE_DESIGN_WIDTH) * screenWidth;
const getHeightPercentage = (pixelHeight: number): number => (pixelHeight / REFERENCE_DESIGN_HEIGHT) * screenHeight;
const scaleText = (pixelFontSize: number): number => {
  const scaleFactor = screenWidth / REFERENCE_DESIGN_WIDTH;
  return Math.round(pixelFontSize * scaleFactor * 0.95);
};

type CaseInputScreenNavigationProp = NavigationProp<
  YourCasesStackParamList,
  'CaseInputScreen'
>;

type InputType = 'crnNumber' | 'caseNumber' | 'filingDetails';

const CaseInputScreen = () => {
  const navigation = useNavigation<CaseInputScreenNavigationProp>();
  const [selectedInputType, setSelectedInputType] = useState<InputType>('crnNumber');

  const [crnValue, setCrnValue] = useState<string>('');
  const [selectedCaseTypeValue, setSelectedCaseTypeValue] = useState<string | null>(null);
  const [actualCaseNumberValue, setActualCaseNumberValue] = useState<string>('');
  const [caseYearValue, setCaseYearValue] = useState<string>('');
  const [filingNumberValue, setFilingNumberValue] = useState<string>('');
  const [filingYearValue, setFilingYearValue] = useState<string>('');

  const handleFetchAndNavigate = () => {
    let isValid = true;
    let message = '';
    let consoleMessage = '';

    if (selectedInputType === 'crnNumber') {
        if (!crnValue.trim()) {
            isValid = false;
            message = 'Please enter CRN Number.';
        } else {
            consoleMessage = `CRN: ${crnValue}`;
        }
    } else if (selectedInputType === 'caseNumber') {
        if (!selectedCaseTypeValue) {
            isValid = false;
            message = 'Please select a Case Type.';
        } else if (!actualCaseNumberValue.trim()) {
            isValid = false;
            message = 'Please enter Case Number.';
        } else if (!caseYearValue.trim() || !/^\d{4}$/.test(caseYearValue.trim())) {
            isValid = false;
            message = 'Please enter a valid 4-digit Case Year.';
        } else {
            consoleMessage = `Case Type: ${selectedCaseTypeValue}, No: ${actualCaseNumberValue}, Year: ${caseYearValue}`;
        }
    } else if (selectedInputType === 'filingDetails') {
        if (!filingNumberValue.trim()) {
            isValid = false;
            message = 'Please enter Filing Number.';
        } else if (!filingYearValue.trim() || !/^\d{4}$/.test(filingYearValue.trim())) {
            isValid = false;
            message = 'Please enter a valid 4-digit Filing Year.';
        } else {
            consoleMessage = `Filing No: ${filingNumberValue}, Year: ${filingYearValue}`;
        }
    }

    if (!isValid) {
        Toast.show({ type: 'error', text1: 'Input Required', text2: message, position: 'bottom', bottomOffset: 40 });
        return;
    }

    console.log("Fetching cases with data:", consoleMessage);
    
    setTimeout(() => {
        navigation.navigate('CaseLoadingScreen'); // Or pass params if needed
    }, 500);
  };


  const inputTypeOptions: {label: string; type: InputType}[] = [
    {label: 'CRN No', type: 'crnNumber'},
    {label: 'Case Number', type: 'caseNumber'},
    {label: 'Filing Details', type: 'filingDetails'},
  ];

  const openCaseTypePicker = () => {
    Toast.show({type: 'info', text1: 'Action', text2: 'Open Case Type Picker'});
  };

  const clearAllInputs = () => {
    setCrnValue('');
    setSelectedCaseTypeValue(null);
    setActualCaseNumberValue('');
    setCaseYearValue('');
    setFilingNumberValue('');
    setFilingYearValue('');
  };

  const renderDynamicInputs = () => {
    switch (selectedInputType) {
      case 'crnNumber':
        return (
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter CRN Number"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={crnValue}
            onChangeText={setCrnValue}
            keyboardAppearance="dark"
          />
        );
      case 'caseNumber':
        return (
          <>
            <TouchableOpacity 
              style={styles.dropdownStyle}
              onPress={openCaseTypePicker}>
              <Text style={styles.dropdownTextStyle}>
                {selectedCaseTypeValue || 'Select Case Type'}
              </Text>
              <Icon name="chevron-down" size={scaleText(20)} color="rgba(255,255,255,0.7)" /> 
            </TouchableOpacity>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Case Number"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={actualCaseNumberValue}
              onChangeText={setActualCaseNumberValue}
              keyboardAppearance="dark"
            />
            <View style={styles.yearInputContainer}>
              <TextInput
                style={[styles.textInputStyle, { flex: 1, marginRight: getWidthPercentage(10), marginBottom: 0 }]}
                placeholder="Enter Case Year"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={caseYearValue}
                onChangeText={setCaseYearValue}
                keyboardType="number-pad"
                maxLength={4}
                keyboardAppearance="dark"
              />
              {/* The "C" icon was previously here for Case Number year input
                  If it's not in the latest image for CaseInputScreen, remove it or make it conditional
                  Based on the latest provided code for CaseInputScreen, the "C" icon for CaseNumber was removed from renderDynamicInputs
                  I will keep it removed from here as well. If you need it back for CaseInputScreen's "Case Number" year,
                  you'll need to add the <View style={styles.yearIconC}>...</View> back.
              */}
            </View>
          </>
        );
      case 'filingDetails':
        return (
          <>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Filing Number"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={filingNumberValue}
              onChangeText={setFilingNumberValue}
              keyboardAppearance="dark"
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Filing Year"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={filingYearValue}
              onChangeText={setFilingYearValue}
              keyboardType="number-pad"
              maxLength={4}
              keyboardAppearance="dark"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#0A3A40', '#083035']}
      style={styles.mainGradientContainer}>
      <SafeAreaView style={styles.contentSafeArea}>
        <ScrollView 
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../../../assets/casesearch.png')}
            style={styles.searchIconImage}
            resizeMode="contain"
          />

          <Text style={styles.titleText}>Fill In Case Details</Text> 
          
          <Text style={styles.instructionText}>
            Fill In The Details Of The Case To Proceed
          </Text>

          <View style={styles.inputTypeSelectorContainer}>
            {inputTypeOptions.map(option => (
              <TouchableOpacity
                key={option.type}
                style={[
                  styles.inputTypeButton,
                  { backgroundColor: selectedInputType === option.type ? '#01B879' : '#006261' },
                ]}
                onPress={() => {
                  setSelectedInputType(option.type);
                  clearAllInputs();
                }}>
                <Text style={styles.inputTypeButtonText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.dynamicInputsWrapper}>
            {renderDynamicInputs()}
          </View>
        
        </ScrollView>
        
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={styles.otherWaysButton}
            onPress={() => navigation.navigate('OtherwaysInputScreen')} // <<< NAVIGATE HERE
          >
            <Text style={styles.otherWaysButtonText}>Other Ways</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fetchButton}
            onPress={handleFetchAndNavigate}
          >
            <LinearGradient
              colors={['#01B779', '#008C68']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.fetchButtonGradient}
            >
              <Text style={styles.fetchButtonText}>Fetch Cases</Text>
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
  scrollContentContainer: {
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(20),
    paddingBottom: getHeightPercentage(100),
  },
  searchIconImage: {
    width: getWidthPercentage(188),
    height: getWidthPercentage(188),
    marginTop: getHeightPercentage(80),
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(24),
    lineHeight: scaleText(24) * 1.1,
    color: '#01B679',
    textAlign: 'center',
    marginTop: getHeightPercentage(20),
  },
  instructionText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(14),
    lineHeight: scaleText(14) * 1.2,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: getHeightPercentage(10),
    width: getWidthPercentage(292), 
  },
  inputTypeSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: getWidthPercentage(329),
    marginTop: getHeightPercentage(25),
    marginBottom: getHeightPercentage(20),
  },
  inputTypeButton: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(40),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(5),
  },
  inputTypeButtonText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(11),
    lineHeight: scaleText(12),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  dynamicInputsWrapper: {
    width: getWidthPercentage(329),
  },
  dropdownStyle: {
    width: '100%',
    height: getHeightPercentage(48),
    borderWidth: 1,
    borderColor: 'rgba(1, 183, 121, 0.5)',
    borderRadius: 10,
    backgroundColor: 'rgba(8, 48, 53, 0.7)',
    paddingHorizontal: getWidthPercentage(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getHeightPercentage(15), 
  },
  dropdownTextStyle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(15),
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
  },
  textInputStyle: {
    width: '100%',
    height: getHeightPercentage(48),
    borderWidth: 1,
    borderColor: 'rgba(1, 183, 121, 0.5)',
    borderRadius: 10,
    backgroundColor: 'rgba(8, 48, 53, 0.7)',
    paddingHorizontal: getWidthPercentage(15),
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(15),
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: getHeightPercentage(15),
  },
  yearInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: getHeightPercentage(15),
  },
  
  bottomButtonsContainer: {
    width: getWidthPercentage(329),
    position: 'absolute',
    bottom: getHeightPercentage(30),
    left: (screenWidth - getWidthPercentage(329)) / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otherWaysButton: {
    width: getWidthPercentage(120),
    height: getHeightPercentage(48),
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#01B779',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherWaysButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(16),
    color: '#01B779',
  },
  fetchButton: {
    width: getWidthPercentage(195),
    height: getHeightPercentage(48),
    borderRadius: 10,
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

export default CaseInputScreen;