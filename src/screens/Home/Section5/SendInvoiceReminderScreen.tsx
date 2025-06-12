import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock client data for demonstration
const MOCK_CLIENTS = [
  'Rahul Prajapati',
  'Sophia Tran',
  'David Kim',
  'Aisha Patel',
  'Michael Chen',
  'Emily Rodriguez',
];

type YourStackParamList = {
  SendInvoiceReminderScreen: undefined;
  InvoiceReminderSentScreen: undefined; 
  // ... other screens in your stack
};

type SendInvoiceReminderNavigationProp = NavigationProp<
  YourStackParamList,
  'SendInvoiceReminderScreen'
>;

const SendInvoiceReminderScreen = () => {
  const navigation = useNavigation<SendInvoiceReminderNavigationProp>();
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const toggleClientSelection = (clientName: string) => {
    setSelectedClients(prevSelected =>
      prevSelected.includes(clientName)
        ? prevSelected.filter(name => name !== clientName)
        : [...prevSelected, clientName],
    );
  };

  const handleSend = () => {
    if (selectedClients.length === 0) {
      Alert.alert(
        'No Clients Selected',
        'Please select at least one client to send a reminder.',
      );
      return;
    }
    navigation.navigate('InvoiceReminderSentScreen');
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
            <Text style={styles.headerSubtitle}>Send</Text>
            <Text style={styles.headerTitle}>Pending Invoice Reminder</Text>
          </View>
        </View>

        {/* Client List */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {MOCK_CLIENTS.map(client => {
            const isSelected = selectedClients.includes(client);
            return (
              <TouchableOpacity
                key={client}
                activeOpacity={0.7}
                onPress={() => toggleClientSelection(client)}>
                <LinearGradient
                  colors={['#016361', '#01B779']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.clientItemGradient}>
                  <View style={styles.clientItem}>
                    <View style={styles.radioButton}>
                      {isSelected && (
                        <View style={styles.radioButtonSelected} />
                      )}
                    </View>
                    <Text style={styles.clientName}>{client}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Fixed Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleSend}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.sendButton}>
              <Text style={styles.buttonText}>Send</Text>
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
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(1, 183, 121, 0.25)',
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
    paddingHorizontal: 24,
    paddingBottom: 100, 
  },
  clientItemGradient: {
    borderRadius: 12,
    padding: 1,
    marginBottom: 16,
  },
  clientItem: {
    backgroundColor: '#093138',
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#01B679',
  },
  clientName: {
    color: 'white',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#093138',
  },
  sendButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SendInvoiceReminderScreen;