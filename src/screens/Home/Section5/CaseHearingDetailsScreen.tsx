import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type CaseDetailsStackParamList = {
  CaseHearingDetailsScreen: undefined;
  HearingOrderDetailsScreen: { hearingId: string; hearingDate: string }; // Example params
};

type CaseHearingDetailsNavigationProp = NativeStackScreenProps<
  CaseDetailsStackParamList,
  'CaseHearingDetailsScreen'
>;


// Mock data simulating API response
const hearingData = [
  {id: '1', date: '30/07/2025', isNext: true},
  {id: '2', date: '22/05/2025'},
  {id: '3', date: '18/04/2025'},
  {id: '4', date: '11/03/2025'},
  {id: '5', date: '05/02/2025'},
  {id: '6', date: '10/01/2025'},
  {id: '7', date: '04/12/2024'},
  {id: '8', date: '28/10/2024'},
  {id: '9', date: '15/09/2024'},
];

const CaseHearingDetailsScreen = (props : CaseHearingDetailsNavigationProp) => {
  const {navigation} = props;

  const handleHearingPress = (item: typeof hearingData[0]) => {
    navigation.navigate('HearingOrderDetailsScreen', {
      hearingId: item.id,
      hearingDate: item.date,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>Viewing</Text>
            <Text style={styles.headerTitle}>Case Hearing Details</Text>
          </View>
        </View>

        {/* Timeline */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.timelineContainer}>
            {/* The vertical line */}
            <View style={styles.timelineLine} />

            {hearingData.map((item) => (
              <View key={item.id} style={styles.timelineItem}>
                {/* Gradient Circle Node */}
                <LinearGradient
                  colors={['#006261', '#01B879']}
                  style={styles.timelineNode}
                />

                <TouchableOpacity
                  style={styles.contentContainer}
                  onPress={() => handleHearingPress(item)}
                  activeOpacity={0.7}
                >
                  {item.isNext ? (
                    <Text style={styles.nextHearingText}>
                      Next Hearing Date :{' '}
                      <Text style={{fontWeight: 'bold'}}>{item.date}</Text>
                    </Text>
                  ) : (
                    <LinearGradient
                      colors={['#016361', '#01B779']}
                      start={{x: 0.8, y: 0}}
                      end={{x: 0.2, y: 1}}
                      style={styles.dateBoxGradient}>
                      <View style={styles.dateBox}>
                        <Text style={styles.dateText}>
                          Hearing Date: {item.date}
                        </Text>
                      </View>
                    </LinearGradient>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#093138',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    backgroundColor: 'rgba(1, 183, 121, 0.25)', // Updated color
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  timelineContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    top: 8, // Start below the center of the first node
    bottom: 8, // End above the center of the last node
    left: 8, // Aligns with the center of the 16x16 node
    width: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  timelineNode: {
    width: 16,
    height: 16,
    borderRadius: 8,
    // The top margin helps align the box content with the node's center
    marginTop: 17,
    zIndex: 1,
  },
  contentContainer: {
    marginLeft: 16,
    flex: 1,
  },
  nextHearingText: {
    color: '#FFFFFF',
    fontSize: 18,
    // Adjust top position to align vertically with the node
    marginTop: 10,
  },
  dateBoxGradient: {
    borderRadius: 10,
    padding: 1, // This creates the border effect
    width: '100%',
    maxWidth: 289,
  },
  dateBox: {
    backgroundColor: '#093138', // Match screen background
    borderRadius: 9, // Slightly less than the gradient wrapper
    height: 49,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
});

export default CaseHearingDetailsScreen;