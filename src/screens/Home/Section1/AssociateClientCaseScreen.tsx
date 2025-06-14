// src/screens/Home/Section1/AssociateClientCaseScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react'; 
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal, 
  TouchableOpacity, 
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // For X icon
import LinearGradient from 'react-native-linear-gradient';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack';
import {NativeStackNavigationProp, NativeStackScreenProps, } from '@react-navigation/native-stack';
import SendCaseDetailsScreen from '../Section5/SendCaseDetails';

type AssociateClientCaseScreenRouteProp = RouteProp<
  YourCasesStackParamList,
  'AssociateClientCaseScreen'
>;

type AssociateClientCaseScreenNavigationProp = NativeStackScreenProps<
  YourCasesStackParamList,
  'AssociateClientCaseScreen'
>;

const AssociateClientCaseScreen = (props : AssociateClientCaseScreenNavigationProp) => {
  const {navigation} = props;
  const route = useRoute<AssociateClientCaseScreenRouteProp>();
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const passedCaseDetails = route.params?.caseDetails;
  const crnNumberToDisplay = passedCaseDetails?.crn_no || 'N/A';
  const caseHeadToDisplay = passedCaseDetails?.case_details || 'N/A';

  const caseDetailItems = [
    { label: 'Case Head', value: caseHeadToDisplay },
    { label: 'Registration Number', value: passedCaseDetails?.registration_no || 'N/A' },
    { label: 'Filing Number', value: passedCaseDetails?.filing_no || 'N/A' },
    { label: 'Court Name', value: passedCaseDetails?.court_name || 'N/A' },
    { label: 'Petitioner Name', value: passedCaseDetails?.petitioner_name || 'N/A' },
  ];
 const handleSendDetails = () => {
    console.log('Send Details pressed for case:', passedCaseDetails?.claw_case_id);
    // Navigate to SendCaseDetailsScreen, passing necessary case info
    
    if (passedCaseDetails) {
      navigation.navigate('CaseHearingDetailsScreen', {
        caseDetails: passedCaseDetails, 
      });
    } else {
      
     // console.error("Cannot send details: Case details are missing.");
    }
  };

  const handleSetReminder = () => {
    console.log('Set Reminder pressed for case:', passedCaseDetails?.claw_case_id);
    navigation.navigate('SetReminderScreen');
  };

  const handleAddClient = () => {
    // This will now open the modal
    setIsModalVisible(true);
    console.log('Opening associate client modal for case:', passedCaseDetails?.claw_case_id);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddNewClient = () => {
    console.log('Navigating to Add New Client screen...');
    handleCloseModal();
    // Navigate to ClientDetailsScreen to add a new client
    // Passing caseId to potentially auto-associate after creation
    navigation.navigate('ClientDetailsScreen', {
      caseId: passedCaseDetails?.claw_case_id,
    });
  };

  const handleAssociateExistingClient = () => {
    console.log('Navigating to Associate Existing Client screen...');
    handleCloseModal();
    // Navigate to ClientCasesScreen to select an existing client
    // Passing caseId so the selection screen knows which case to associate with
    navigation.navigate('AddNewClientScreen', {
      caseIdToAssociate: passedCaseDetails?.claw_case_id,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.iconButtonOuter}>
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.iconButtonGradient}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.iconButtonInner}>
              <Icon name="arrow-left" size={20} color="#01B679" />
            </Pressable>
          </LinearGradient>
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubtitle}>Viewing</Text>
          <Text style={styles.headerTitle}>Your Cases</Text>
        </View>
        <View style={styles.iconButtonOuter}>
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.iconButtonGradient}>
            <Pressable
              onPress={() => console.log('Download pressed')}
              style={styles.iconPressableFull}
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Icon name="download" size={20} color="white" />
            </Pressable>
          </LinearGradient>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {/* Case Details Card */}
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.cardOuterBorder}>
          <View style={styles.cardInnerContainer}>
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.cardHeaderSection}>
              <Text style={[styles.cardTitle, styles.spaceGroteskBold]}>
                Case Details
              </Text>
              <View style={styles.crnRow}>
                <Text style={[styles.crnLabel, styles.spaceGroteskSemiBold]}>
                  CRN Number :
                </Text>
                <Text style={[styles.crnValue, styles.spaceGroteskRegular]}>
                  {crnNumberToDisplay}
                </Text>
              </View>
            </LinearGradient>
            <View style={styles.cardFieldsSection}>
              {caseDetailItems.map((item, idx) => (
                <View key={idx} style={styles.fieldItemContainer}>
                  {idx !== 0 && (
                    <LinearGradient
                      colors={['#01B679', '#00FFC6']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.separatorLine}
                    />
                  )}
                  <Text style={[styles.fieldLabel, styles.spaceGroteskBold]}>
                    {item.label} :
                  </Text>
                  <Text style={[styles.fieldValue, styles.spaceGroteskRegular]}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>

        {/* Associated Client Row */}
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.associatedClientOuterBorder}>
          <View style={styles.associatedClientInnerContainer}>
            <View style={styles.associatedClientLeft}>
              <Text
                style={[
                  styles.associatedClientText,
                  styles.spaceGroteskBold,
                ]}>
                Associated Client :
              </Text>
            </View>
            <Pressable
              onPress={handleAddClient} // Opens the modal
              style={styles.associatedClientRight}
              android_ripple={{color: 'rgba(0, 183, 121, 0.3)'}}>
              <Icon
                name="plus-circle"
                size={18}
                color="#01B779"
                style={{marginRight: 6}}
              />
              <Text
                style={[
                  styles.associatedClientAddText,
                  styles.spaceGroteskSemiBold,
                ]}>
                Click To Add
              </Text>
            </Pressable>
          </View>
        </LinearGradient>

        {/* Action Buttons Container */}
        <View style={styles.actionButtonsRowContainer}>
          <View style={styles.actionButtonWrapper}>
            <Pressable onPress={handleSendDetails} style={styles.actionButton}>
              <LinearGradient
                colors={['#01B779', '#008C68']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.actionButtonGradient}>
                <Text style={[styles.actionButtonText, styles.spaceGroteskBold]}>
                  Hearing Details
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
          <View style={styles.actionButtonWrapper}>
            <Pressable onPress={handleSetReminder} style={styles.actionButton}>
              <LinearGradient
                colors={['#01B779', '#008C68']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.actionButtonGradient}>
                <Text style={[styles.actionButtonText, styles.spaceGroteskBold]}>
                  Set Reminder
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Associate Client Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Associate Client With Case</Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.modalCloseButton}>
                <MaterialCommunityIcons name="close-circle-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleAddNewClient} style={styles.modalButton}>
              <LinearGradient
                colors={['#00C47E', '#00A06B']} // Brighter green gradient
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.modalButtonGradient}>
                <Text style={styles.modalButtonText}>Add New Client</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAssociateExistingClient} style={styles.modalButton}>
               <LinearGradient
                colors={['#00C47E', '#00A06B']} // Brighter green gradient
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.modalButtonGradient}>
                <Text style={styles.modalButtonText}>Associate Existing Client</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#062C2D',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 10,
  },
  iconButtonOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  iconButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#062C2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPressableFull: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  cardOuterBorder: {
    borderRadius: 16,
    padding: 2,
    marginTop: 24,
    marginBottom: 20,
  },
  cardInnerContainer: {
    backgroundColor: '#062C2D',
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardHeaderSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  crnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crnLabel: {
    color: 'white',
    fontSize: 14,
  },
  crnValue: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
  },
  cardFieldsSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  fieldItemContainer: {},
  separatorLine: {
    height: 1,
    width: '100%',
    marginVertical: 12,
  },
  fieldLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 4,
  },
  fieldValue: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 12,
  },
  associatedClientOuterBorder: {
    borderRadius: 8,
    padding: 1,
    marginBottom: 20,
  },
  associatedClientInnerContainer: {
    flexDirection: 'row',
    borderRadius: 7,
    overflow: 'hidden',
    backgroundColor: '#062C2D',
    alignItems: 'center',
  },
  associatedClientLeft: {
    backgroundColor: '#016E61',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
  },
  associatedClientText: {
    color: 'white',
    fontSize: 14,
  },
  associatedClientRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    minWidth: '40%',
  },
  associatedClientAddText: {
    color: '#01B779',
    fontSize: 14,
  },
  actionButtonsRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionButtonWrapper: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    height: 48,
    marginHorizontal: 5,
  },
  actionButton: {
    width: '100%',
    height: '100%',
  },
  actionButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  },
  modalContainer: {
    width: '85%', // Adjust width as needed
    backgroundColor: '#0A3A40', // Dark teal background from image
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Bold',
    flex: 1, // Allow title to take space
    textAlign: 'left', // Align to left, close button will be on right
  },
  modalCloseButton: {
    padding: 5, // Make it easier to tap
  },
  modalButton: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden', // For gradient border radius
    marginBottom: 15, // Space between buttons
    height: 50,
  },
  modalButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  spaceGroteskRegular: {
    fontFamily: 'SpaceGrotesk-Regular',
  },
  spaceGroteskSemiBold: {
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  spaceGroteskBold: {
    fontFamily: 'SpaceGrotesk-Bold',
  },
});

export default AssociateClientCaseScreen;