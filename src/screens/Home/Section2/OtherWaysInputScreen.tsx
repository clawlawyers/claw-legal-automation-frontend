// src/screens/Home/Section2/OtherwaysInputScreen.tsx
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
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack'; 
import Toast from 'react-native-toast-message'; 

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');


const REFERENCE_DESIGN_WIDTH = 393;
const REFERENCE_DESIGN_HEIGHT = 852;


const getWidthPercentage = (pixelWidth: number): number => (pixelWidth / REFERENCE_DESIGN_WIDTH) * screenWidth;
const getHeightPercentage = (pixelHeight: number): number => (pixelHeight / REFERENCE_DESIGN_HEIGHT) * screenHeight;
const scaleText = (pixelFontSize: number): number => {
  const scaleFactor = screenWidth / REFERENCE_DESIGN_WIDTH;
  return Math.round(pixelFontSize * scaleFactor * 0.95);
};

type OtherwaysInputScreenNavigationProp = NavigationProp<
  YourCasesStackParamList,
  'OtherwaysInputScreen'
>;

type SearchFilterType = 'partyName' | 'advocateName' | 'advocateBarCode';

const OtherwaysInputScreen = () => {
  const navigation = useNavigation<OtherwaysInputScreenNavigationProp>();
  const [selectedSearchFilter, setSelectedSearchFilter] = useState<SearchFilterType>('partyName');

  const [partyNameValue, setPartyNameValue] = useState<string>('');
  const [advocateNameValue, setAdvocateNameValue] = useState<string>('');
  const [advocateBarCodeValue, setAdvocateBarCodeValue] = useState<string>('');

  const handleFetchAndNavigate = () => {
    let isValid = true;
    let message = '';
    let consoleMessage = '';

    switch (selectedSearchFilter) {
      case 'partyName':
        if (!partyNameValue.trim()) {
          isValid = false;
          message = 'Please enter Party Name.';
        } else {
          consoleMessage = `Party Name: ${partyNameValue}`;
        }
        break;
      case 'advocateName':
        if (!advocateNameValue.trim()) {
          isValid = false;
          message = 'Please enter Advocate Name.';
        } else {
          consoleMessage = `Advocate Name: ${advocateNameValue}`;
        }
        break;
      case 'advocateBarCode':
        if (!advocateBarCodeValue.trim()) {
          isValid = false;
          message = 'Please enter Advocate Bar Code.';
        } else {
          consoleMessage = `Advocate Bar Code: ${advocateBarCodeValue}`;
        }
        break;
      default:
        isValid = false;
        message = 'Invalid search type selected.';
    }

    if (!isValid) {
      Toast.show({ type: 'error', text1: 'Input Required', text2: message, position: 'bottom', bottomOffset: 40 });
      return;
    }

    console.log("Attempting to fetch cases with data:", consoleMessage);
    
    setTimeout(() => {
      navigation.navigate('CaseLoadingScreen', {
        fromScreen: 'OtherwaysInputScreen',
      });
    }, 500);
  };

  const searchFilterOptions: {label: string; type: SearchFilterType}[] = [
    {label: 'Party Name', type: 'partyName'},
    {label: 'Adv. Name', type: 'advocateName'},
    {label: 'Adv. Bar Code', type: 'advocateBarCode'},
  ];

  const clearAllSearchInputs = () => {
    setPartyNameValue('');
    setAdvocateNameValue('');
    setAdvocateBarCodeValue('');
  };

  const renderDynamicSearchInput = () => {
    let placeholder = '';
    let value = '';
    let onChangeText: (text: string) => void = () => {};

    switch (selectedSearchFilter) {
      case 'partyName':
        placeholder = "Enter Party Name";
        value = partyNameValue;
        onChangeText = setPartyNameValue;
        break;
      case 'advocateName':
        placeholder = "Enter Advocate Name";
        value = advocateNameValue;
        onChangeText = setAdvocateNameValue;
        break;
      case 'advocateBarCode':
        placeholder = "Enter Advocate Bar Code";
        value = advocateBarCodeValue;
        onChangeText = setAdvocateBarCodeValue;
        break;
      default:
        return null;
    }

    return (
      <TextInput
        style={styles.textInputStyle}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={value}
        onChangeText={onChangeText}
        keyboardAppearance="dark"
      />
    );
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

          <View style={styles.searchFilterSelectorContainer}>
            {searchFilterOptions.map(option => (
              <TouchableOpacity
                key={option.type}
                style={[
                  styles.searchFilterButton,
                  { backgroundColor: selectedSearchFilter === option.type ? '#01B879' : '#006261' },
                ]}
                onPress={() => {
                  setSelectedSearchFilter(option.type);
                  clearAllSearchInputs();
                }}>
                <Text style={styles.searchFilterButtonText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.dynamicInputsWrapper}>
            {renderDynamicSearchInput()}
          </View>
        
        </ScrollView>
        
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={styles.otherWaysButton}
            onPress={() => navigation.navigate('CaseInputScreen', {})} 
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
  searchFilterSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: getWidthPercentage(329),
    marginTop: getHeightPercentage(25),
    marginBottom: getHeightPercentage(20),
  },
  searchFilterButton: {
    width: getWidthPercentage(100),
    height: getHeightPercentage(40),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(5),
  },
  searchFilterButtonText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(11),
    lineHeight: scaleText(12),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  dynamicInputsWrapper: {
    width: getWidthPercentage(329),
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


export default OtherwaysInputScreen;