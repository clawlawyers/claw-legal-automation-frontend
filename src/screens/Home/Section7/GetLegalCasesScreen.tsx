// src/screens/GetLegalCasesScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  Modal, // Import Modal
  FlatList, // Import FlatList
  TouchableWithoutFeedback, // Import TouchableWithoutFeedback
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Placeholder functions for demonstrating picker functionality
const openDatePicker = (
  setter: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  console.log('Opening date picker...');
  setter('25/08/2023'); // Mock selection
};

// --- Dummy Data and Modal for Court Selection ---
const DUMMY_COURTS = [
  'Supreme Court of India',
  'High Court of Delhi',
  'High Court of Bombay',
  'High Court of Madras',
  'High Court of Calcutta',
  'High Court of Allahabad',
  'National Company Law Tribunal (NCLT)',
  'National Green Tribunal (NGT)',
];

const SelectionModal = ({
  visible,
  onClose,
  data,
  onSelect,
  title,
}: {
  visible: boolean;
  onClose: () => void;
  data: string[];
  onSelect: (item: string) => void;
  title: string;
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
            <Text style={styles.modalTitle}>{title}</Text>
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
// --- End of Modal Component ---

type RootStackParamList = {
  GetLegalCasesScreen: undefined;
  CaseResultsScreen: undefined;
};

const GetLegalCasesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [prompt, setPrompt] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);

  // State for court selection modal
  const [isCourtModalVisible, setCourtModalVisible] = useState(false);

  const handleSearch = () => {
    navigation.navigate('CaseResultsScreen');
    console.log({
      prompt,
      startDate,
      endDate,
      selectedCourt,
    });
  };

  const handleSelectCourt = (court: string) => {
    setSelectedCourt(court);
    setCourtModalVisible(false);
  };

  const renderInputBox = (
    placeholder: string,
    value: string | null,
    onPress: () => void,
    iconName: string,
  ) => {
    const isValueSet = value !== null;
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.inputGradientBorder}>
          <View style={styles.inputContainer}>
            <Text
              style={[
                styles.inputText,
                !isValueSet && styles.placeholderText,
              ]}>
              {value || placeholder}
            </Text>
            <Icon name={iconName} size={22} color="rgba(255,255,255,0.7)" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              source={require('../../../assets/icons/back.png')}
              style={styles.backButtonImage}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../../assets/icons/getjudge.png')}
              style={styles.logoImage}
            />
          </View>

          <Text style={styles.title}>Get Legal Cases</Text>
          <Text style={styles.subtitle}>
            Need Previous Cases For Reference ?{'\n'}Find Them All With Just A
            Prompt
          </Text>

          <View style={styles.formContainer}>
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.promptGradientBorder}>
              <TextInput
                style={styles.promptInput}
                placeholder="Enter Case Search Prompt"
                placeholderTextColor="rgba(255,255,255,0.7)"
                multiline
                value={prompt}
                onChangeText={setPrompt}
              />
            </LinearGradient>

            {renderInputBox(
              'Select Start Date',
              startDate,
              () => openDatePicker(setStartDate),
              'calendar',
            )}

            {renderInputBox(
              'Select End Date',
              endDate,
              () => openDatePicker(setEndDate),
              'calendar',
            )}

            {renderInputBox(
              'Select Court',
              selectedCourt,
              () => setCourtModalVisible(true), // Opens the modal
              'chevron-down',
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleSearch} style={{width: '100%'}}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.footerButton}>
              <Text style={styles.buttonText}>Search Cases</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <SelectionModal
          visible={isCourtModalVisible}
          onClose={() => setCourtModalVisible(false)}
          data={DUMMY_COURTS}
          onSelect={handleSelectCourt}
          title="Select Court"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#093138',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#01B779',
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 120,
  },
  logoWrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
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
    lineHeight: 20,
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  promptGradientBorder: {
    borderRadius: 15,
    padding: 1.5,
    marginBottom: 16,
    height: 120,
  },
  promptInput: {
    flex: 1,
    backgroundColor: '#093138',
    borderRadius: 14,
    padding: 16,
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  inputGradientBorder: {
    borderRadius: 15,
    padding: 1.5,
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: '#093138',
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  inputText: {
    color: 'white',
    fontSize: 16,
  },
  placeholderText: {
    color: 'rgba(255,255,255,0.7)',
  },
  footer: {
    padding: 24,
    backgroundColor: '#093138',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
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
  // --- Modal Styles ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#0A3A40',
    width: '85%',
    maxHeight: '60%',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#01B779',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
  },
});

export default GetLegalCasesScreen;