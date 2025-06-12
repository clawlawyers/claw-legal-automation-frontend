// src/screens/FirmAdvocateDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data for a single advocate. In a real app, this would come from props or state.
const advocateDetails = {
  name: 'Adv. Soumya Banik',
  barId: '002233665588945',
  email: 'soumya.banik@example.com',
  mobile: '+91 98765 43210',
  court: 'High Court of Calcutta',
};

// Reusable component to display a detail item.
const DetailItem = ({label, value}: {label: string; value: string}) => (
  <View style={styles.detailItemContainer}>
    <LinearGradient
      colors={['#016361', '#01B779']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.detailItemGradient}>
      <View style={styles.detailItem}>
        {/* In a real implementation, you might have both a label and a value.
            For this design, we'll just show the value inside. */}
        <Text style={styles.detailItemText}>{value}</Text>
      </View>
    </LinearGradient>
  </View>
);
// Define your stack param list type (adjust as per your navigator setup)
type RootStackParamList = {
  FirmAdvocateDetailsScreen: undefined;
  AdvocateCaseListScreen: undefined;
  // ...other screens
};

const FirmAdvocateDetailsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleEditDetails = () => console.log('Edit Details pressed');
  const handleViewCases = () => navigation.navigate('AdvocateCaseListScreen');

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
            <Text style={styles.headerTitle}>Firm Advocate Details</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Main Details Card */}
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.cardGradientBorder}>
            <View style={styles.card}>
              <DetailItem label="Advocate Name" value={advocateDetails.name} />
              <DetailItem label="Advocate BAR ID" value={advocateDetails.barId} />
              <DetailItem label="Advocate Email ID" value={advocateDetails.email} />
              <DetailItem label="Advocate Mobile Number" value={advocateDetails.mobile} />
              <DetailItem label="Practice Court Complex" value={advocateDetails.court} />
            </View>
          </LinearGradient>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleEditDetails}>
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.outlineButtonGradient}>
              <View style={styles.outlineButton}>
                <Text style={styles.outlineButtonText}>Edit Details</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleViewCases}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.solidButton}>
              <Text style={styles.solidButtonText}>View Cases</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cardGradientBorder: {
    borderRadius: 20,
    padding: 1.5,
  },
  card: {
    backgroundColor: '#093138',
    borderRadius: 18,
    padding: 20,
  },
  detailItemContainer: {
    marginBottom: 16,
  },
  detailItemGradient: {
    borderRadius: 12,
    padding: 1,
  },
  detailItem: {
    backgroundColor: '#093138',
    borderRadius: 11,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  detailItemText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  outlineButtonGradient: {
    borderRadius: 10,
    padding: 1.5,
  },
  outlineButton: {
    backgroundColor: '#093138',
    borderRadius: 9,
    paddingVertical: 14,
    paddingHorizontal: 35,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#01B779',
    fontSize: 16,
    fontWeight: 'bold',
  },
  solidButton: {
    borderRadius: 10,
    paddingVertical: 15.5, // Match height of outline button
    paddingHorizontal: 35,
    alignItems: 'center',
  },
  solidButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FirmAdvocateDetailsScreen;