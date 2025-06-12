/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'; // Import useState
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Modal, // <-- Import Modal
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp, RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from '../../../stacks/HomeStack';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For the close icon

type HomeScreenNavigationProp = NavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;

type HomeScreenRouteProp = RouteProp<HomeStackParamList, 'HomeScreen'>;

interface HomeScreenComponentProps {
  route: HomeScreenRouteProp;
}

// Define a type for our update objects for better type safety
interface Update {
  title: string;
  description: string;
  date: string;
  head: string;
}

const updates: Update[] = [
  {
    title: 'Clause 31 (A) Updated',
    description:
      'Supreme Court have Updated the Clause 31 (A) in order to cater to the ongoing stress between international payments. This detailed update includes several sub-clauses that address digital transactions, cross-border disputes, and the implementation of new escrow requirements for high-value transfers. The change aims to provide greater transparency and security for all parties involved in international commerce. Lawyers are advised to review the full documentation to understand the impact on their clients\' contractual agreements and financial operations.',
    date: '20 May',
    head: 'Recent Legal Updates',
  },
  {
    title: 'Clause 31 (B) Updated',
    description:
      'Following the recent changes to Clause 31 (A), the Supreme Court has now issued an update for Clause 31 (B). This clause specifically deals with arbitration procedures for disputes arising from the aforementioned international payments. The update mandates a new timeline for dispute resolution and introduces a panel of pre-approved arbitrators with expertise in financial law. This is a significant change designed to expedite the resolution process and reduce legal costs.',
    date: '20 May',
    head: 'Recent Legal Updates',
  },
  // Add more items if needed for carousel
];

const mainButtonsData = [
  {
    label: 'Get All\nJudgements',
    icon: require('../../../assets/images/button1.png'),
    onPress: (navigation: HomeScreenNavigationProp) => navigation.navigate('Alerts', { screen: 'GetLegalJudgements' })
  },
  {
    label: 'Start\nCase Search',
    icon: require('../../../assets/images/button2.png'),
   // onPress: (navigation: HomeScreenNavigationProp) => navigation.navigate('StartCaseSearch'),
  },
  {
    label: 'Get\nCause List',
    icon: require('../../../assets/images/button3.png'),
    onPress: (navigation: HomeScreenNavigationProp) => navigation.navigate('Alerts', { screen: 'GetCauseListScreen' }),
  },
  {
    label: 'Start\nLegal GPT',
    icon: require('../../../assets/images/button4.png'),
     //onPress: (navigation: HomeScreenNavigationProp) => navigation.navigate('LegalGptScreen')
  },
];

const clienteleData = [
  {
    label: 'View All\nClients',
    image: require('../../../assets/images/client1.png'),
    onPress: (navigation: HomeScreenNavigationProp) => navigation.navigate('YourCases', { screen: 'AddNewClientScreen' })
  },
  {
    label: 'Add New\nClient',
    image: require('../../../assets/images/client2.png'),
    onPress: (navigation: HomeScreenNavigationProp) => navigation.navigate('AddClientScreen')
  },
  {
    label: 'Set Up Case\nReminder',
    image: require('../../../assets/images/client3.png'),
    onPress: (navigation: HomeScreenNavigationProp) => navigation.navigate( 'YourCasesListScreen' )
  },
];


export default function HomeScreen({route}: HomeScreenComponentProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [isLoadingContent, setIsLoadingContent] = React.useState(false);
  const [initialLoadEffectDone, setInitialLoadEffectDone] = React.useState(false);

  // --- NEW STATE FOR MODAL ---
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<Update | null>(null);

  React.useEffect(() => {
    if (route.params?.fromLogin && !initialLoadEffectDone) {
        setIsLoadingContent(true);
        const timer = setTimeout(() => {
            setIsLoadingContent(false);
            setInitialLoadEffectDone(true);
        }, 1500);

        return () => clearTimeout(timer);
    }
  }, [route.params, initialLoadEffectDone]);

  // --- FUNCTION TO OPEN THE MODAL ---
  const openUpdateModal = (update: Update) => {
    setSelectedUpdate(update);
    setIsModalVisible(true);
  };

  // --- FUNCTION TO CLOSE THE MODAL ---
  const closeUpdateModal = () => {
    setIsModalVisible(false);
    setSelectedUpdate(null);
  };

  return (
    <View style={styles.container}>
      {/* --- UPDATE DETAILS MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeUpdateModal} // For Android back button
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContentContainer}>
            {selectedUpdate && (
              <>
                <TouchableOpacity style={styles.closeButton} onPress={closeUpdateModal}>
                  <Icon name="close" size={responsiveFontSize(3)} color="white" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedUpdate.title}</Text>
                <Text style={styles.modalDate}>{selectedUpdate.date}</Text>
                <View style={styles.modalDivider} />
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalDescription}>{selectedUpdate.description}</Text>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Fixed Header */}
      <View style={styles.headerOuterContainer}>
        <View style={styles.headerContent}>
          <View style={styles.userInfoContainer}>
            <LinearGradient
              colors={['#016361', '#01B779']}
              style={styles.userIconGradient}
            >
              <Image
                source={require('../../../assets/images/user.png')}
                style={styles.userIcon}
                resizeMode="contain"
              />
            </LinearGradient>

            <View style={{marginLeft: responsiveWidth(3)}}>
              <Text style={styles.welcomeText}>
                Welcome
              </Text>
              <Text style={styles.userNameText}>
                Soumya Snigdha Banik
              </Text>
            </View>
          </View>
        </View>
      </View>

      {isLoadingContent ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#01B779" />
          <Text style={styles.loadingText}>
            Loading your dashboard, please wait...
          </Text>
        </View>
      ) : (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
        >
          {/* Carousel Section (Notification) */}
          <View style={{ marginBottom: responsiveHeight(0.5), marginTop: responsiveHeight(2) }}>
            <Carousel
              loop
              width={responsiveWidth(83.72)}
              height={responsiveHeight(17.14)}
              paddingTop={responsiveHeight(2)}
              autoPlay
              autoPlayInterval={3000}
              scrollAnimationDuration={1000}
              data={updates.length > 0 ? updates : [{}]}
              style={{ alignSelf: 'center' }}
              renderItem={({item}: {item: Partial<Update>}) =>
                updates.length > 0 && item.title ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => openUpdateModal(item as Update)}>
                    <LinearGradient
                      colors={['#004040', '#016361']}
                      style={styles.carouselItem}
                    >
                      <View style={styles.carouselHeader}>
                        <Text style={styles.carouselHeadText}>
                          {item.head}
                        </Text>
                        <Text style={styles.carouselDateText}>
                          {item.date}
                        </Text>
                      </View>
                      <Text style={styles.carouselTitleText} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={styles.carouselDescriptionText} numberOfLines={3}>
                        {item.description}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <View style={[styles.carouselItem, styles.carouselEmptyItem]}>
                    <Text style={styles.carouselEmptyText}>No updates available</Text>
                  </View>
                )
              }
            />
          </View>

          {/* White line divider */}
          <View style={styles.divider} />

          {/* Main Buttons Section */}
          <View style={styles.mainButtonsGrid}>
            {mainButtonsData.map(({label, icon, onPress}, index) => (
              <View key={index} style={styles.mainButtonOuterContainer}>
                <LinearGradient
                  colors={['#016361', '#01B779']}
                  start={{x: 0.25, y: 0}}
                  end={{x: 0.75, y: 1}}
                  style={styles.mainButtonGradientBorder}
                >
                  <TouchableOpacity
                    onPress={() => onPress ? onPress(navigation) : {}}
                    style={styles.mainButtonTouchable}
                  >
                    <View style={styles.mainButtonContent}>
                        <Image source={icon} style={styles.mainButtonIcon} />
                        <Text style={styles.mainButtonLabel}>
                        {label}
                        </Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ))}
          </View>

          {/* White line divider */}
          <View style={styles.dividersecond} />

          {/* Clientele Section */}
          <Text style={styles.clienteleTitle}>
            Your Clientele
          </Text>

          <View style={styles.clienteleRow}>
            {clienteleData.map(({label, image, onPress}, index) => (
              <View key={index} style={styles.clienteleItemContainer}>
                <LinearGradient
                  colors={['#016361', '#01B779']}
                  style={styles.clienteleItemBackground}
                >
                  <TouchableOpacity
                    onPress={() => onPress ? onPress(navigation) : {}} 
                    style={styles.clienteleItemButton}
                  >
                    <LinearGradient
                      colors={['#FFFDFD', '#FFFDFD']}
                      style={styles.clienteleItemIconBg}
                    >
                      <Image
                        source={image}
                        style={styles.clienteleItemIcon}
                        resizeMode="contain"
                      />
                    </LinearGradient>
                    <Text style={styles.clienteleItemLabel} numberOfLines={2}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002b2b',
  },
  // --- HEADER ---
  headerOuterContainer: {
    paddingHorizontal: responsiveWidth(8.15),
    paddingTop: responsiveHeight(2),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIconGradient: {
    width: responsiveWidth(10),
    height: responsiveWidth(10), // Keep aspect ratio square based on width
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(5), // Half of width/height
  },
  userIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
  },
  welcomeText: {
    color: 'white',
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: responsiveFontSize(1.5),
  },
  userNameText: {
    color: 'white',
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: responsiveFontSize(1.8),
  },
  // --- LOADING ---
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(8.15),
  },
  loadingText: {
    color: 'white',
    marginTop: responsiveHeight(2),
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: responsiveFontSize(1.8),
  },
  // --- SCROLLVIEW ---
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: responsiveWidth(8.15),
    paddingBottom: responsiveHeight(10),
  },
  // --- CAROUSEL (Notification) ---
  carouselItem: {
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2.54),
    height: '100%',
    justifyContent: 'space-between',
  },
  carouselEmptyItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004040',
    borderRadius: responsiveWidth(2.54),
  },
  carouselEmptyText: {
    color: 'white',
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: responsiveFontSize(1.8),
  },
  carouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  carouselHeadText: {
    color: '#D1D5DB',
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: responsiveFontSize(1.4),
    marginBottom: responsiveHeight(1.5),
    marginTop: responsiveHeight(0.1),
  },
  carouselDateText: {
    color: '#A7F3D0',
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: responsiveFontSize(1.4),
  },
  carouselTitleText: {
    fontFamily: 'SpaceGrotesk-Bold',
    color: 'white',
    fontSize: responsiveFontSize(1.9),
    marginBottom: responsiveHeight(0.5),
  },
  carouselDescriptionText: {
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#E5E7EB',
    fontSize: responsiveFontSize(1.6),
    lineHeight: responsiveHeight(2.1), // Using responsiveHeight for line height
  },
  // --- DIVIDER ---
  divider: {
    height: responsiveHeight(0.15), // Made slightly thicker than hairline, responsive
    backgroundColor: 'rgba(255, 255, 255,1.2)',
    marginVertical: responsiveHeight(2), // This will be overridden by marginTop for top margin
    marginTop: responsiveHeight(2), // Specific marginTop
  },
  dividersecond: {
    height: responsiveHeight(0.15), // Made slightly thicker than hairline, responsive
    backgroundColor: 'rgba(255, 255, 255,1.2)',
    marginVertical: responsiveHeight(2), // This will be overridden by marginTop for top margin
    marginTop: responsiveHeight(0.5), // Specific marginTop
  },
  // --- MAIN BUTTONS GRID ---
  mainButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mainButtonOuterContainer: {
    width: responsiveWidth(40.71),
    height: responsiveHeight(13.15),
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveWidth(2.54),
    overflow: 'hidden',
  },
  mainButtonGradientBorder: {
    flex: 1,
    borderRadius: responsiveWidth(2.54),
    padding: responsiveWidth(0.25), // Small responsive padding for border effect
  },
  mainButtonTouchable: {
    flex: 1,
    backgroundColor: '#002b2b',
    borderRadius: responsiveWidth(2.54) - 1, 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: responsiveWidth(3),
  },
  mainButtonContent: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  mainButtonIcon: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    resizeMode: 'contain',
    marginBottom: responsiveHeight(1),
  },
  mainButtonLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    color: 'white',
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveHeight(2.2), // Using responsiveHeight
  },
  // --- CLIENTELE SECTION ---
  clienteleTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#D1D5DB',
    marginBottom: responsiveHeight(1.5),
    fontSize: responsiveFontSize(1.5),
  },
  clienteleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: responsiveHeight(5),
  },
  clienteleItemContainer: {
    width: responsiveWidth(27.23),
    height: responsiveHeight(11.62),
    borderRadius: responsiveWidth(2.54),
    overflow: 'hidden',
  },
  clienteleItemBackground: {
    flex: 1,
  },
  clienteleItemButton: {
    flex: 1,
    padding: responsiveWidth(2.5),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  clienteleItemIconBg: {
    width: responsiveWidth(8),
    height: responsiveWidth(8), // Keep aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(4), // Half of width/height
    marginBottom: responsiveHeight(0.5),
  },
  clienteleItemIcon: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
  },
  clienteleItemLabel: {
    fontFamily: 'SpaceGrotesk-SemiBold',
    lineHeight: responsiveHeight(2), // Using responsiveHeight
    color: 'white',
    fontSize: responsiveFontSize(1.6),
    width: '100%',
    textAlign: 'left',
  },
  // --- NEW MODAL STYLES ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    width: responsiveWidth(90),
    maxHeight: responsiveHeight(70),
    backgroundColor: '#002b2b', // Match screen background
    borderRadius: responsiveWidth(4),
    padding: responsiveWidth(5),
    borderWidth: 1,
    borderColor: '#01B779',
  },
  closeButton: {
    position: 'absolute',
    top: responsiveHeight(1.5),
    right: responsiveWidth(3),
    zIndex: 1,
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    color: 'white',
    fontSize: responsiveFontSize(2.2),
    marginBottom: responsiveHeight(0.5),
  },
  modalDate: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#A7F3D0',
    fontSize: responsiveFontSize(1.6),
    marginBottom: responsiveHeight(1.5),
  },
  modalDivider: {
    height: 1,
    backgroundColor: 'rgba(1, 183, 121, 0.5)',
    marginBottom: responsiveHeight(1.5),
  },
  modalDescription: {
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#E5E7EB',
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveHeight(2.5),
  },
});