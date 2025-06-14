// src/screens/Home/Section2/MultipleTypesSearchScreen.tsx
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
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type MultipleTypesSearchScreenNavigationProp = NativeStackScreenProps<
  YourCasesStackParamList,
  'MultipleTypesSearchScreen'
>;

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const REFERENCE_DESIGN_WIDTH = 393;
const REFERENCE_DESIGN_HEIGHT = 852;

const getWidthPercentage = (pixelWidth: number) =>
  (pixelWidth / REFERENCE_DESIGN_WIDTH) * screenWidth;
const getHeightPercentage = (pixelHeight: number) =>
  (pixelHeight / REFERENCE_DESIGN_HEIGHT) * screenHeight;
const scaleText = (pixelFontSize: number) => {
  const scaleFactor = screenWidth / REFERENCE_DESIGN_WIDTH;
  return Math.round(pixelFontSize * scaleFactor * 0.95);
};

const searchOptions = [
  {id: 'cnr', label: 'CNR Number'},
  {id: 'case', label: 'Case Number'},
  {id: 'filing', label: 'Filing Number'},
  {id: 'party', label: 'Party Name'},
  {id: 'advocateName', label: 'Advocate Name'},
  {id: 'advocateBarCode', label: 'Advocate Bar Code'},
];

const MultipleTypesSearchScreen = (props : MultipleTypesSearchScreenNavigationProp) => {
  const {navigation} = props;
  const [selectedSearchType, setSelectedSearchType] = useState<string | null>(
    null,
  );

  const handleContinueAction = () => {
    if (!selectedSearchType) {
      Toast.show({
        type: 'error',
        text1: 'Selection Required',
        text2: 'Please select a search type to continue.',
        position: 'bottom',
        bottomOffset: 40,
      });
      return;
    }

    if (selectedSearchType === 'cnr') {
      navigation.navigate('CnrInputScreen');
    } else if (selectedSearchType === 'case') {
      navigation.navigate('CaseNumberInputScreen');
    } else if (selectedSearchType === 'filing') {
      navigation.navigate('FilingNumberInputScreen');
    } else if (selectedSearchType === 'party') {
      navigation.navigate('PartyNameInputScreen');
    } else if (selectedSearchType === 'advocateName') {
      navigation.navigate('AdvocateNameInputScreen');
    } else if (selectedSearchType === 'advocateBarCode') {
      navigation.navigate('BarIdInputScreen');
    }
  };

  return (
    <LinearGradient
      colors={['#0A3A40', '#083035']}
      style={styles.mainGradientContainer}>
      <SafeAreaView style={styles.contentSafeArea}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={scaleText(24)} color="#01B779" />
        </TouchableOpacity>

        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}>
          <Image
            source={require('../../../assets/casesearch.png')}
            style={styles.searchIconImage}
            resizeMode="contain"
          />

          <Text style={styles.mainTitle}>Find a Case Instantly</Text>
          <Text style={styles.subInstructionText}>
            Fill In Max Number Of Fields To Get Better Results Quickly
          </Text>

          <View style={styles.optionsWrapper}>
            {searchOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.selectableOptionButton}
                onPress={() => setSelectedSearchType(option.id)}>
                <View
                  style={[
                    styles.selectableOptionInner,
                    {
                      borderColor:
                        selectedSearchType === option.id
                          ? '#01B779'
                          : 'rgba(1, 183, 121, 0.5)',
                    },
                  ]}>
                  <View
                    style={[
                      styles.radioOuterCircle,
                      {
                        borderColor:
                          selectedSearchType === option.id
                            ? '#01B779'
                            : 'rgba(255, 255, 255, 0.7)',
                      },
                    ]}>
                    {selectedSearchType === option.id && (
                      <View style={styles.radioInnerSelected} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.optionLabelText,
                      selectedSearchType === option.id &&
                        styles.optionLabelTextSelected,
                    ]}>
                    {option.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={handleContinueAction}
            style={styles.primaryActionButtonWrapper}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.primaryActionButtonGradient}>
              <Text style={styles.primaryActionButtonLabel}>Continue</Text>
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
  backButton: {
    position: 'absolute',
    top: getHeightPercentage(50),
    left: getWidthPercentage(20),
    zIndex: 10,
    padding: 10,
  },
  scrollContentContainer: {
    paddingHorizontal: getWidthPercentage(32),
    paddingTop: getHeightPercentage(40),
    paddingBottom: getHeightPercentage(20),
  },
  searchIconImage: {
    width: getWidthPercentage(188),
    height: getWidthPercentage(188),
    alignSelf: 'center',
    marginTop: getHeightPercentage(53),
  },
  mainTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(24),
    lineHeight: scaleText(31),
    textAlign: 'center',
    color: '#01B679',
    alignSelf: 'center',
    marginTop: getHeightPercentage(272 - 93 - 188),
  },
  subInstructionText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(14),
    lineHeight: scaleText(14) * 1.2,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'center',
    marginTop: getHeightPercentage(10),
    width: getWidthPercentage(320),
  },
  optionsWrapper: {
    alignSelf: 'center',
    width: '100%',
    marginTop: getHeightPercentage(30),
  },
  selectableOptionButton: {
    height: getHeightPercentage(48),
    borderRadius: 10,
    marginBottom: getHeightPercentage(15),
    justifyContent: 'center',
  },
  selectableOptionInner: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(15),
    backgroundColor: 'rgba(8, 48, 53, 0.7)',
    borderRadius: 10,
    borderWidth: 1.5,
  },
  radioOuterCircle: {
    width: scaleText(22),
    height: scaleText(22),
    borderRadius: scaleText(11),
    borderWidth: 1.5,
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
  bottomContainer: {
    width: '100%',
    paddingHorizontal: getWidthPercentage(32),
    paddingBottom: getHeightPercentage(30),
    paddingTop: getHeightPercentage(10),
    backgroundColor: '#083035',
  },
  primaryActionButtonWrapper: {
    width: '100%',
    height: getHeightPercentage(48),
  },
  primaryActionButtonGradient: {
    flex: 1,
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

export default MultipleTypesSearchScreen;
