// src/components/SelectCourtModal.tsx

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// --- Reusable Helper Functions ---
const getWidthPercentage = (pixelWidth: number): number =>
  (pixelWidth / 329) * (screenWidth * 0.9);
const getHeightPercentage = (pixelHeight: number): number =>
  (pixelHeight / 852) * screenHeight;
const scaleText = (pixelFontSize: number): number => {
  const scaleFactor = screenWidth / 393;
  return Math.round(pixelFontSize * scaleFactor * 0.95);
};
// --- End Helper Functions ---

// --- Dummy Data ---
const HIGH_COURT_DATA: {[key: string]: string[]} = {
  'Allahabad High Court': ['Principal Bench at Allahabad', 'Bench at Lucknow'],
  'Bombay High Court': [
    'Principal Bench at Mumbai',
    'Bench at Aurangabad',
    'Bench at Nagpur',
    'Bench at Goa',
  ],
  'Calcutta High Court': [
    'Principal Bench at Kolkata',
    'Circuit Bench at Port Blair',
    'Circuit Bench at Jalpaiguri',
  ],
  'Delhi High Court': ['Principal Bench at New Delhi'],
  'Madras High Court': ['Principal Bench at Chennai', 'Bench at Madurai'],
};

const DISTRICT_COURT_DATA: {[key: string]: string[]} = {
  Maharashtra: ['Mumbai City Civil Court', 'Pune District Court', 'Nagpur District Court'],
  Uttar: ['Lucknow District Court', 'Kanpur District Court', 'Varanasi District Court'],
  'New Delhi': ['Tis Hazari Court Complex', 'Saket Court Complex', 'Rohini Court Complex'],
  Karnataka: ['Bengaluru Urban District Court', 'Mysuru District Court', 'Mangaluru District Court'],
  Tamil: ['Chennai District Court', 'Coimbatore District Court', 'Madurai District Court'],
};

// --- Exportable Types ---
type CourtType = 'highCourt' | 'districtCourt';
type SelectionType = 'highCourt' | 'bench' | 'state' | 'district';

export interface CourtData {
  courtType: CourtType | null;
  highCourt?: string | null;
  bench?: string | null;
  state?: string | null;
  district?: string | null;
}

interface SelectCourtModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: CourtData) => void;
}

// --- Reusable Selection Modal Component ---
const SelectionListModal = ({
  modalVisible,
  setModalVisible,
  data,
  onSelect,
  title,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  data: string[];
  onSelect: (item: string) => void;
  title: string;
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}>
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={styles.selectionModalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.selectionModalContent}>
            <Text style={styles.selectionModalTitle}>{title}</Text>
            <FlatList
              data={data}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.selectionModalItem}
                  onPress={() => onSelect(item)}>
                  <Text style={styles.selectionModalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const SelectCourtModal = ({
  visible,
  onClose,
  onSave,
}: SelectCourtModalProps) => {
  const [selectedCourtType, setSelectedCourtType] =
    useState<CourtType>('highCourt');

  // State for High Court
  const [selectedHighCourt, setSelectedHighCourt] = useState<string | null>(
    null,
  );
  const [selectedBench, setSelectedBench] = useState<string | null>(null);

  // State for District Court
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // State for the selection modal
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState('');
  const [currentSelectionType, setCurrentSelectionType] =
    useState<SelectionType | null>(null);

  useEffect(() => {
    if (selectedCourtType === 'highCourt') {
      setSelectedState(null);
      setSelectedDistrict(null);
    } else if (selectedCourtType === 'districtCourt') {
      setSelectedHighCourt(null);
      setSelectedBench(null);
    }
  }, [selectedCourtType]);

  const handleSave = () => {
    let dataToSave: CourtData = {courtType: selectedCourtType};
    if (selectedCourtType === 'highCourt') {
      if (!selectedHighCourt || !selectedBench) {
        Toast.show({
          type: 'error',
          text1: 'Input Required',
          text2: 'Please select a High Court and a Bench.',
        });
        return;
      }
      dataToSave = {
        ...dataToSave,
        highCourt: selectedHighCourt,
        bench: selectedBench,
      };
    } else if (selectedCourtType === 'districtCourt') {
      if (!selectedState || !selectedDistrict) {
        Toast.show({
          type: 'error',
          text1: 'Input Required',
          text2: 'Please select a State and a District Court.',
        });
        return;
      }
      dataToSave = {
        ...dataToSave,
        state: selectedState,
        district: selectedDistrict,
      };
    }
    onSave(dataToSave);
    onClose();
  };

  const openSelectionModal = (type: SelectionType) => {
    setCurrentSelectionType(type);
    switch (type) {
      case 'highCourt':
        setModalData(Object.keys(HIGH_COURT_DATA));
        setModalTitle('Select High Court');
        break;
      case 'bench':
        if (!selectedHighCourt) {
          Toast.show({type: 'info', text2: 'Please select a High Court first.'});
          return;
        }
        setModalData(HIGH_COURT_DATA[selectedHighCourt]);
        setModalTitle('Select Bench');
        break;
      case 'state':
        setModalData(Object.keys(DISTRICT_COURT_DATA));
        setModalTitle('Select State');
        break;
      case 'district':
        if (!selectedState) {
          Toast.show({type: 'info', text2: 'Please select a State first.'});
          return;
        }
        setModalData(DISTRICT_COURT_DATA[selectedState]);
        setModalTitle('Select District');
        break;
    }
    setSelectionModalVisible(true);
  };

  const handleSelection = (item: string) => {
    switch (currentSelectionType) {
      case 'highCourt':
        setSelectedHighCourt(item);
        setSelectedBench(null); // Reset bench when high court changes
        break;
      case 'bench':
        setSelectedBench(item);
        break;
      case 'state':
        setSelectedState(item);
        setSelectedDistrict(null); // Reset district when state changes
        break;
      case 'district':
        setSelectedDistrict(item);
        break;
    }
    setSelectionModalVisible(false);
  };

  const renderDropdown = (
    placeholder: string,
    value: string | null,
    type: SelectionType,
  ) => (
    <LinearGradient
      colors={['#016361', '#01B779']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.dropdownBorder}>
      <TouchableOpacity
        style={styles.dropdownInner}
        onPress={() => openSelectionModal(type)}>
        <Text style={value ? styles.dropdownText : styles.dropdownPlaceholder}>
          {value || placeholder}
        </Text>
        <Icon name="chevron-down" size={scaleText(20)} color="#ACACAC" />
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Court</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={scaleText(24)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.supremeCourtContainer}>
            <Text style={styles.supremeCourtText}>Supreme Court Of India</Text>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.comingSoonBanner}>
              <Text style={styles.comingSoonText}>COMING SOON</Text>
            </LinearGradient>
          </View>

          <View style={styles.toggleContainer}>
            {['highCourt', 'districtCourt'].map(type => {
              const isSelected = selectedCourtType === type;
              const label =
                type === 'highCourt' ? 'High Court' : 'District Court';

              if (isSelected) {
                return (
                  <LinearGradient
                    key={type}
                    colors={['#01B779', '#008C68']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    style={styles.toggleButtonSolid}>
                    <Text style={styles.toggleButtonText}>{label}</Text>
                  </LinearGradient>
                );
              }

              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedCourtType(type as CourtType)}>
                  <LinearGradient
                    colors={['#016361', '#01B779']}
                    style={styles.toggleButtonBorder}>
                    <View style={styles.toggleButtonInner}>
                      <Text style={styles.toggleButtonText}>{label}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedCourtType === 'highCourt' && (
            <View style={styles.dropdownsContainer}>
              {renderDropdown('Select High Court', selectedHighCourt, 'highCourt')}
              {renderDropdown('Select Bench', selectedBench, 'bench')}
            </View>
          )}

          {selectedCourtType === 'districtCourt' && (
            <View style={styles.dropdownsContainer}>
              {renderDropdown('Select State', selectedState, 'state')}
              {renderDropdown(
                'Select District Court',
                selectedDistrict,
                'district',
              )}
            </View>
          )}

          <View style={{flex: 1}} />
          <TouchableOpacity onPress={handleSave}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Court</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <SelectionListModal
        modalVisible={isSelectionModalVisible}
        setModalVisible={setSelectionModalVisible}
        data={modalData}
        onSelect={handleSelection}
        title={modalTitle}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    minHeight: '60%',
    maxHeight: '85%',
    backgroundColor: '#0A3A40',
    borderRadius: 20,
    padding: getWidthPercentage(20),
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getHeightPercentage(20),
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(20),
    color: '#FFFFFF',
  },
  closeButton: {
    width: getWidthPercentage(32),
    height: getWidthPercentage(32),
    borderRadius: getWidthPercentage(16),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supremeCourtContainer: {
    backgroundColor: '#062C2D',
    borderWidth: 1,
    borderColor: '#01B779',
    borderRadius: 10,
    overflow: 'hidden',
  },
  supremeCourtText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(16),
    color: '#FFFFFF',
    paddingVertical: getHeightPercentage(15),
    textAlign: 'center',
  },
  comingSoonBanner: {
    paddingVertical: getHeightPercentage(5),
  },
  comingSoonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(12),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHeightPercentage(20),
  },
  toggleButtonSolid: {
    width: getWidthPercentage(134),
    height: getHeightPercentage(50),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonBorder: {
    width: getWidthPercentage(134),
    height: getHeightPercentage(50),
    borderRadius: 10,
    padding: 1.5,
  },
  toggleButtonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0A3A40',
    borderRadius: 8.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(14),
    color: '#FFFFFF',
  },
  dropdownsContainer: {
    marginTop: getHeightPercentage(25),
  },
  dropdownBorder: {
    borderRadius: 10,
    padding: 1,
    marginBottom: getHeightPercentage(15),
  },
  dropdownInner: {
    height: getHeightPercentage(48),
    backgroundColor: '#0A3A40',
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getWidthPercentage(15),
  },
  dropdownText: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(14),
    color: '#FFFFFF',
  },
  dropdownPlaceholder: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: scaleText(14),
    color: '#ACACAC',
  },
  saveButton: {
    height: getHeightPercentage(50),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeightPercentage(20),
  },
  saveButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(16),
    color: '#FFFFFF',
  },
  // --- Selection Modal Styles ---
  selectionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionModalContent: {
    backgroundColor: '#0A3A40',
    width: '85%',
    maxHeight: '60%',
    borderRadius: 15,
    padding: getWidthPercentage(20),
    borderWidth: 1,
    borderColor: '#01B779',
  },
  selectionModalTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: scaleText(18),
    color: '#FFFFFF',
    marginBottom: getHeightPercentage(15),
    textAlign: 'center',
  },
  selectionModalItem: {
    paddingVertical: getHeightPercentage(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectionModalItemText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: scaleText(15),
    color: '#FFFFFF',
  },
});

export default SelectCourtModal;