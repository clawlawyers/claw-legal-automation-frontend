import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type YourStackParamList = {
  SendInvoiceReminderScreen: undefined;
  InvoiceReminderSentScreen: undefined;
  // ... other screens
};

type InvoiceReminderSentNavigationProp = NavigationProp<
  YourStackParamList,
  'InvoiceReminderSentScreen'
>;

const InvoiceReminderSentScreen = () => {
  const navigation = useNavigation<InvoiceReminderSentNavigationProp>();

  useEffect(() => {
    // Set a timer for 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      navigation.goBack(); 
    }, 3000);

    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Central Icon with Rings */}
        <View style={styles.iconWrapper}>
          <View style={[styles.ring, styles.ring1]} />
          <View style={[styles.ring, styles.ring2]} />
          <View style={styles.iconBackground}>
            <Icon name="magnify" size={40} color="#FFFFFF" />
          </View>
        </View>

        {/* Confirmation Text */}
        <Text style={styles.title}>Invoice Reminder Sent</Text>
        <Text style={styles.subtitle}>
          Pending Payment Details Are Send To The Selected Case Clients And
          Receipients
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#093138',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 60,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(1, 183, 121, 0.25)',
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  ring: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(1, 182, 121, 0.2)',
  },
  ring1: {
    width: 120,
    height: 120,
  },
  ring2: {
    width: 100,
    height: 100,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#01B679',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#01B679',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default InvoiceReminderSentScreen;