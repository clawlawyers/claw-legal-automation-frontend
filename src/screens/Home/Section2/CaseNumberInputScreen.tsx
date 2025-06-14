// src/screens/Home/Section2/CaseNumberInputScreen.tsx

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
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SelectCourtModal, {
  type CourtData,
} from '../../../components/SelectCourtModal';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const REFERENCE_DESIGN_WIDTH = 393;
const REFERENCE_DESIGN_HEIGHT = 852;

const getWidthPercentage = (pixelWidth: number): number =>
  (pixelWidth / REFERENCE_DESIGN_WIDTH) * screenWidth;
const getHeightPercentage = (pixelHeight: number): number =>
  (pixelHeight / REFERENCE_DESIGN_HEIGHT) * screenHeight;
const scaleText = (pixelFontSize: number): number => {
  const scaleFactor = screenWidth / REFERENCE_DESIGN_WIDTH;
  return Math.round(pixelFontSize * scaleFactor * 0.95);
};

type CaseNumberInputScreenNavigationProp = NavigationProp<
  YourCasesStackParamList,
  'CaseNumberInputScreen'
>;

// --- Dummy Data and Modal for Case Type Selection ---

const DUMMY_CASE_TYPES = [
  'Civil Suit',
  'Criminal Case',
  'Writ Petition',
  'Special Leave Petition',
  'First Appeal',
  'Revision Petition',
  'Contempt Petition',
  'Execution Petition',
];

interface CaseTypeSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
  data: string[];
}

const CaseTypeSelectionModal: React.FC<CaseTypeSelectionModalProps> = ({
  visible,
  onClose,
  onSelect,
  data,
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Case Type</Text>
            <FlatList
              data={data}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => onSelect(item)}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

// --- Main Component ---

const CaseNumberInputScreen = () => {
  const navigation = useNavigation<CaseNumberInputScreenNavigationProp>();
  const [caseType, setCaseType] = useState<string | null>(null);
  const [caseNumber, setCaseNumber] = useState('');
  const [caseYear, setCaseYear] = useState('');

  const [isCourtModalVisible, setCourtModalVisible] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<CourtData | null>(null);
  const [isCaseTypeModalVisible, setCaseTypeModalVisible] = useState(false);

  const handleFetchCase = () => {
    if (!selectedCourt) {
      Toast.show({
        type: 'error',
        text1: 'Input Required',
        text2: 'Please select a court.',
      });
      return;
    }
    if (!caseType) {
      Toast.show({
        type: 'error',
        text1: 'Input Required',
        text2: 'Please select a Case Type.',
      });
      return;
    }
    if (!caseNumber.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Input Required',
        text2: 'Please enter the Case Number.',
      });
      return;
    }
    if (!caseYear.trim() || !/^\d{4}$/.test(caseYear.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Input Required',
        text2: 'Please enter a valid 4-digit Case Year.',
      });
      return;
    }

    console.log(
      `Fetching case: Type - ${caseType}, Number - ${caseNumber}, Year - ${caseYear}`,
    );
    console.log('With saved court details:', selectedCourt); // Log the saved court data
    navigation.navigate('CaseLoadingScreen', {
      fromScreen: 'CaseNumberInputScreen',
    });
  };

  const openCaseTypePicker = () => {
    setCaseTypeModalVisible(true);
  };

  const handleSelectCaseType = (selectedType: string) => {
    setCaseType(selectedType);
    setCaseTypeModalVisible(false);
  };

  const handleSaveCourt = (data: CourtData) => {
    setSelectedCourt(data);
    setCourtModalVisible(false);
  };

  const getCourtButtonText = () => {
    if (!selectedCourt) return 'Select Court';
    if (selectedCourt.highCourt) return selectedCourt.highCourt;
    if (selectedCourt.courtType === 'districtCourt') return 'District Court';
    return 'Court Selected';
  };

  return (
    <LinearGradient
      colors={['#0A3A40', '#083035']}
      style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon
              name="arrow-back-ios"
              size={scaleText(18)}
              color="#FFFFFF"
              style={{marginLeft: getWidthPercentage(8)}}
            />
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

              <Text style={styles.titleText}>Search Using Case Number</Text>
              <Text style={styles.instructionText}>
                Enter Valid Case Details To Fetch Your Case And Add To Your
                Cases
              </Text>

              <LinearGradient
                colors={['#016361', '#01B779']}
                style={styles.inputGradientBorder}>
                <TouchableOpacity
                  onPress={openCaseTypePicker}
                  style={styles.dropdownTouchable}>
                  <Text
                    style={[
                      styles.inputText,
                      !caseType && styles.placeholderText,
                    ]}>
                    {caseType || 'Select Case Type'}
                  </Text>
                  <FeatherIcon
                    name="chevron-down"
                    size={scaleText(20)}
                    color="#ACACAC"
                  />
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={['#016361', '#01B779']}
                style={styles.inputGradientBorder}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Case Number"
                  placeholderTextColor="rgba(172, 172, 172, 0.7)"
                  value={caseNumber}
                  onChangeText={setCaseNumber}
                  keyboardAppearance="dark"
                />
              </LinearGradient>
              <LinearGradient
                colors={['#016361', '#01B779']}
                style={styles.inputGradientBorder}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Case Year"
                  placeholderTextColor="rgba(172, 172, 172, 0.7)"
                  value={caseYear}
                  onChangeText={setCaseYear}
                  keyboardType="number-pad"
                  maxLength={4}
                  keyboardAppearance="dark"
                />
              </LinearGradient>
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity
                onPress={() => setCourtModalVisible(true)}
                style={styles.selectCourtButton}>
                <Text
                  style={styles.selectCourtButtonText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {getCourtButtonText()}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleFetchCase}
                style={styles.fetchCaseButton}>
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

        <SelectCourtModal
          visible={isCourtModalVisible}
          onClose={() => setCourtModalVisible(false)}
          onSave={handleSaveCourt}
        />

        <CaseTypeSelectionModal
          visible={isCaseTypeModalVisible}
          onClose={() => setCaseTypeModalVisible(false)}
          onSelect={handleSelectCaseType}
          data={DUMMY_CASE_TYPES}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  safeArea: {flex: 1},
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
    paddingTop: getHeightPercentage(100),
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
    marginTop: getHeightPercentage(18),
    padding: 1.5,
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
  dropdownTouchable: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(8, 48, 53, 0.85)',
    borderRadius: 8.5,
    paddingHorizontal: getWidthPercentage(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(15),
    color: '#FFFFFF',
  },
  placeholderText: {
    color: 'rgba(172, 172, 172, 0.7)',
  },
  bottomButtonsContainer: {
    width: getWidthPercentage(329),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getHeightPercentage(32),
  },
  selectCourtButton: {
    width: getWidthPercentage(155),
    height: getHeightPercentage(48),
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#01B779',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(8),
  },
  selectCourtButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(14),
    color: '#01B779',
  },
  fetchCaseButton: {
    width: getWidthPercentage(155),
    height: getHeightPercentage(48),
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
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#0A3A40',
    width: getWidthPercentage(320),
    maxHeight: getHeightPercentage(500),
    borderRadius: 15,
    padding: getWidthPercentage(20),
    borderWidth: 1,
    borderColor: '#01B779',
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(18),
    color: '#FFFFFF',
    marginBottom: getHeightPercentage(15),
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: getHeightPercentage(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalItemText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(16),
    color: '#FFFFFF',
    textAlign: 'left',
  },
});

export default CaseNumberInputScreen;