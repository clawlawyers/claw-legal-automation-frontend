// src/screens/CaseResultsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image, // Import Image
  Pressable, // Import Pressable
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
// Icon is no longer needed in this file, but we can leave it for future use or remove it.
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data simulating case search results
const caseResultsData = [
  {
    id: '1',
    type: 'standard',
    title: 'Firhad Hakim vs The State of West Bengal along with Orisda PWD Dept.',
    description:
      'This is a Sub text Viewing Case Hearing Details Viewing Case Hearing Details ......',
  },
  {
    id: '2',
    type: 'standard',
    title: 'Neha Sharma vs City of Mumbai Municipal Corporation',
    description:
      'This is a Sub text Viewing Case Hearing Details regarding environmental regulations and compliance ......',
  },
  {
    id: '3',
    type: 'standard',
    title: 'Rajesh Kumar vs State of Uttar Pradesh',
    description:
      'This is a Sub text Viewing Case Hearing Details concerning land acquisition disputes and compensation ......',
  },
  {
    id: '4',
    type: 'split',
    petitioner: 'Anita Desai',
    respondent: 'Delhi Development Authority',
    description:
      'This is a Sub text Viewing Case Hearing Details on urban development and zoning laws ......',
  },
];

// Define the navigation stack parameters
type RootStackParamList = {
  SearchCaseDetailsScreen: undefined;
  CaseSummaryScreen: undefined;
  CaseResultsScreen: undefined;
};

type CaseCardProps = {
  item: (typeof caseResultsData)[0];
  navigation: StackNavigationProp<RootStackParamList>;
};

// Reusable component for the case result card
const CaseCard = ({item, navigation}: CaseCardProps) => {
  const handleGenerateSummary = () => navigation.navigate('CaseSummaryScreen');
  const handleViewDetails = () => navigation.navigate('SearchCaseDetailsScreen');

  const renderTitle = () => {
    if (item.type === 'split') {
      return (
        <View style={styles.splitTitleContainer}>
          <Text style={[styles.cardTitle, styles.splitTitleText]}>
            {item.petitioner}
          </Text>
          <Text style={styles.vsText}>vs</Text>
          <Text style={[styles.cardTitle, styles.splitTitleText, {textAlign: 'right'}]}>
            {item.respondent}
          </Text>
        </View>
      );
    }
    return <Text style={styles.cardTitle}>{item.title}</Text>;
  };

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['#016361', '#01B779']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.cardGradientBorder}>
        <View style={styles.card}>
          {renderTitle()}
          <Text style={styles.cardDescription}>{item.description}</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={handleGenerateSummary}>
              <LinearGradient
                colors={['#01B779', '#008C68']}
                style={styles.smallButton}>
                <Text style={styles.buttonTextSmall}>Generate Summary</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleViewDetails}>
              <LinearGradient
                colors={['#01B779', '#008C68']}
                style={styles.smallButton}>
                <Text style={styles.buttonTextSmall}>View Case Details</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const CaseResultsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Header with updated back button */}
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
          <View>
            <Text style={styles.headerSubtitle}>Viewing</Text>
            <Text style={styles.headerTitle}>Case Results</Text>
          </View>
        </View>

        <FlatList
          data={caseResultsData}
          renderItem={({item}) => (
            <CaseCard item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Fixed Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{width: '100%'}}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.footerButton}>
              <Text style={styles.buttonTextLarge}>Re-Enter Prompt</Text>
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#01B779',
    marginRight: 16,
  },
  backButtonImage: {
    width: 20,
    height: 20,
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
  listContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  cardGradientBorder: {
    borderRadius: 15,
    padding: 1.5,
  },
  card: {
    backgroundColor: '#093138',
    borderRadius: 14,
    padding: 20,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 8,
  },
  splitTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  splitTitleText: {
    flex: 1,
    marginBottom: 0,
  },
  vsText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginHorizontal: 10,
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextSmall: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#093138',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerButton: {
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextLarge: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CaseResultsScreen;