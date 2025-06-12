// src/screens/AdvocateCaseListScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data for the case list
const caseData = [
  {
    id: '1',
    caseId: 'CL00023',
    crn: 'WB071256987569742007',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
  {
    id: '2',
    caseId: 'CL00024',
    crn: 'WB071256987569742008',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
  {
    id: '3',
    caseId: 'CL00025',
    crn: 'WB071256987569742009',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
  {
    id: '4',
    caseId: 'CL00026',
    crn: 'WB071256987569742010',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
];

// Reusable Case Card Component
const CaseCard = ({caseItem}: {caseItem: typeof caseData[0]}) => (
  <View style={styles.cardWrapper}>
    <LinearGradient
      colors={['#016361', '#01B779']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardGradientBorder}>
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Claw Case ID :</Text>
          <Text style={styles.cardValue}>{caseItem.caseId}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>CRN No :</Text>
          <Text style={styles.cardValue}>{caseItem.crn}</Text>
        </View>
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardLabel}>Case Details :</Text>
          <Text style={styles.cardDetailsText}>{caseItem.details}</Text>
        </View>
      </View>
    </LinearGradient>
  </View>
);

const AdvocateCaseListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleParameterPress = () => {
    console.log('Parameter dropdown pressed');
    // Logic to show a picker/modal would go here
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
            <Text style={styles.headerTitle}>Advocate Case List</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarWrapper}>
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.searchBarGradientBorder}>
            <View style={styles.searchBarInner}>
              <TouchableOpacity
                style={styles.parameterButton}
                onPress={handleParameterPress}>
                <Text style={styles.parameterText}>Parameter</Text>
                <Icon name="chevron-down" size={22} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.searchInputContainer}>
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search..."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                />
                <Icon
                  name="magnify"
                  size={24}
                  color="#01B779"
                  style={styles.searchIcon}
                />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Case List */}
        <FlatList
          data={caseData}
          renderItem={({item}) => <CaseCard caseItem={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
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
  searchBarWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBarGradientBorder: {
    borderRadius: 12,
    padding: 1.5,
  },
  searchBarInner: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#093138',
    borderRadius: 10.5,
    overflow: 'hidden',
  },
  parameterButton: {
    backgroundColor: '#01B779',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  parameterText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 5,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: 'white',
    fontSize: 16,
    paddingLeft: 15,
  },
  searchIcon: {
    paddingRight: 15,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  cardGradientBorder: {
    borderRadius: 15,
    padding: 1.5,
  },
  card: {
    backgroundColor: '#093138',
    borderRadius: 13.5,
    padding: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  },
  cardValue: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    flex: 1,
  },
  cardDetailsContainer: {
    marginTop: 4,
  },
  cardDetailsText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});

export default AdvocateCaseListScreen;