// src/screens/FirmAdvocateListScreen.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- (MODIFIED) Define a more complete type for an advocate
type Advocate = {
  id: string;
  name: string;
  barId: string;
  email: string;
  mobile: string;
  court: string;
};

// --- (MODIFIED) Expanded mock data to include all details for the details screen
const advocateData: Advocate[] = [
  {id: '1', name: 'Adv. Soumya Banik', barId: '002233665588945', email: 'soumya.b@example.com', mobile: '+91 98765 43210', court: 'High Court of Calcutta'},
  {id: '2', name: 'Adv. Priya Sharma', barId: '001122334455667', email: 'priya.s@example.com', mobile: '+91 91234 56789', court: 'Supreme Court of India'},
  {id: '3', name: 'Adv. Rohan Gupta', barId: '009988776655443', email: 'rohan.g@example.com', mobile: '+91 99887 76655', court: 'Bombay High Court'},
  {id: '4', name: 'Adv. Anjali Mehta', barId: '007788991122334', email: 'anjali.m@example.com', mobile: '+91 97788 99112', court: 'Delhi High Court'},
  {id: '5', name: 'Adv. Vikram Singh', barId: '005566778899112', email: 'vikram.s@example.com', mobile: '+91 95566 77889', court: 'Madras High Court'},
  {id: '6', name: 'Adv. Neha Desai', barId: '003344556677889', email: 'neha.d@example.com', mobile: '+91 93344 55667', court: 'Gujarat High Court'},
];

// --- (MODIFIED) Define the navigation param list for type safety
type RootStackParamList = {
  AddAdvocateScreen: undefined;
  FirmAdvocateDetailsScreen: { advocate: Advocate };
  // add other routes here if needed
};

// --- (MODIFIED) AdvocateCard now takes an `onPress` prop and is wrapped in TouchableOpacity
const AdvocateCard = ({ advocate, onPress }: { advocate: Advocate; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
    <LinearGradient
      colors={['#016361', '#01B779']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cardGradientBorder}>
      <View style={styles.card}>
        <Text style={styles.advocateName}>{advocate.name}</Text>
        <Text style={styles.barId}>BAR ID : {advocate.barId}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const FirmAdvocateListScreen = () => {
  // --- (MODIFIED) Use the new RootStackParamList for the navigation prop
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAddAdvocate = () => navigation.navigate('AddAdvocateScreen');

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
            <Text style={styles.headerTitle}>Firm Advocate List</Text>
          </View>
        </View>

        {/* Advocate List */}
        <FlatList
          data={advocateData}
          // --- (MODIFIED) The renderItem now passes the full advocate object and an onPress handler
          renderItem={({item}) => (
            <AdvocateCard
              advocate={item}
              onPress={() => navigation.navigate('FirmAdvocateDetailsScreen', { advocate: item })}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleAddAdvocate} style={{width: '100%'}}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.footerButton}>
              {/* --- (MODIFIED) Changed button text for clarity */}
              <Text style={styles.buttonText}>Add Advocate</Text>
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
  listContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16, // Add padding to the bottom
  },
  cardContainer: {
    marginBottom: 16,
  },
  cardGradientBorder: {
    borderRadius: 15,
    padding: 1, // Creates the border
  },
  card: {
    backgroundColor: '#093138', // Match screen background
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  advocateName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  barId: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#093138', // Ensure footer has a solid background
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
});

export default FirmAdvocateListScreen;