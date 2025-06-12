import React, {useState, useEffect, useRef} from 'react'; // Import useEffect and useRef
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


type PaymentEntry = {
  id: number;
  amount: string;
  type: 'Advance' | 'Final' | 'Other';
};
type YourStackParamList = {
  CasePaymentDetailsScreen: undefined;
  SelectClientScreen: undefined;
  SendInvoiceReminderScreen: undefined;
};
type CasePaymentDetailsNavigationProp = NavigationProp<
  YourStackParamList,
  'CasePaymentDetailsScreen'
>;

const CasePaymentDetailsScreen = () => {
  const navigation = useNavigation<CasePaymentDetailsNavigationProp>();
  const [payments, setPayments] = useState<PaymentEntry[]>([
    {id: 1, amount: '10,000', type: 'Advance'},
    {id: 2, amount: '15,000', type: 'Advance'},
  ]);

  
  const initialPayments = useRef(JSON.stringify(payments));

 
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      const hasUnsavedChanges =
        initialPayments.current !== JSON.stringify(payments);

      if (!hasUnsavedChanges) {
        return;
      }

      
      e.preventDefault();

      
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to leave?',
        [
          {text: 'Stay', style: 'cancel', onPress: () => {}},
          {
            text: 'Discard',
            style: 'destructive',
            // If the user discards, dispatch the original back action
            onPress: () => navigation.dispatch(e.data.action),
          },
          {
            text: 'Save & Leave',
            style: 'default',
            onPress: () => {
              handleUpdatePayment(false); 
              navigation.dispatch(e.data.action); 
            },
          },
        ],
      );
    });

    return unsubscribe;
  }, [navigation, payments]);

  const handleAddPayment = () => {
    const newPayment: PaymentEntry = {
      id: Date.now(),
      amount: '',
      type: 'Advance',
    };
    setPayments(prevPayments => [...prevPayments, newPayment]);
  };

  const handleAmountChange = (text: string, id: number) => {
    setPayments(prevPayments =>
      prevPayments.map(p => (p.id === id ? {...p, amount: text} : p)),
    );
  };

  const handleTypeChange = (id: number) => {
    Alert.alert(
      'Change Payment Type',
      `Logic to open a picker for item ${id} would go here.`,
    );
  };

  const handleUpdatePayment = (showAlert = true) => {
    console.log('Saving payments:', JSON.stringify(payments, null, 2));

    // Update the initial state ref to the new saved state
    initialPayments.current = JSON.stringify(payments);

    if (showAlert) {
      Alert.alert(
        'Payments Updated',
        'The payment details have been successfully saved.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>Viewing</Text>
            <Text style={styles.headerTitle}>Case Payment Details</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Summary Boxes */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryBox}>
              <View style={styles.summaryLabel}>
                <Text style={styles.summaryLabelText}>Total Amount :</Text>
              </View>
              <View style={styles.summaryValue}>
                <Text style={styles.summaryValueText}>₹ 25,000</Text>
              </View>
            </View>
            <View style={styles.summaryBox}>
              <View style={styles.summaryLabel}>
                <Text style={styles.summaryLabelText}>Due Amount :</Text>
              </View>
              <View style={styles.summaryValue}>
                <Text style={styles.summaryValueText}>₹ 20,000</Text>
              </View>
            </View>
          </View>

          {/* Add Payment Section */}
          <Text style={styles.sectionTitle}>Add Payment Mode</Text>

          {payments.map(payment => (
            <View key={payment.id} style={styles.paymentRow}>
              <LinearGradient
                colors={['#016361', '#01B779']}
                style={styles.inputGradient}>
                <View style={styles.inputContainer}>
                  <Text style={{color: 'white', marginRight: 8}}>₹</Text>
                  <TextInput
                    style={styles.textInput}
                    value={payment.amount}
                    onChangeText={text => handleAmountChange(text, payment.id)}
                    placeholder="0"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="number-pad"
                  />
                </View>
              </LinearGradient>
              <TouchableOpacity onPress={() => handleTypeChange(payment.id)}>
                <LinearGradient
                  colors={['#01B779', '#009F6D']}
                  style={styles.typeDropdown}>
                  <Text style={styles.typeText}>{payment.type}</Text>
                  <Icon name="chevron-down" size={20} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ))}

          {/* Add Payment Button */}
          <TouchableOpacity
            style={styles.addPaymentButton}
            onPress={handleAddPayment}>
            <Icon name="plus-circle-outline" size={22} color="#FFFFFF" />
            <Text style={styles.addPaymentText}>Add Payment</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={{flex: 1}} onPress={() => handleUpdatePayment()}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Update Payment</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{width: 16}} />
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => navigation.navigate('SendInvoiceReminderScreen')}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.footerButton}>
              <Text style={styles.footerButtonText}>Send Reminder</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingBottom: 120,
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryBox: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#01886C',
    overflow: 'hidden',
    marginBottom: 16,
  },
  summaryLabel: {
    backgroundColor: '#01B679',
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '45%',
  },
  summaryLabelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  summaryValue: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryValueText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputGradient: {
    borderRadius: 12,
    padding: 1,
    flex: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#093138',
    borderRadius: 11,
    height: 50,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  typeDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 12,
    flex: 0.35,
  },
  typeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  addPaymentButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 10,
  },
  addPaymentText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 24,
    backgroundColor: '#093138',
  },
  footerButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CasePaymentDetailsScreen;