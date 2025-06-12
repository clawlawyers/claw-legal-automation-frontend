import React from 'react';
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

type YourStackParamList = {
  HearingOrderDetailsScreen: undefined;
  SendHearingMessageScreen: undefined; 
  SendInvoiceReminderScreen: undefined; 
  // ... other screens in your stack
};

type HearingOrderDetailsNavigationProp = NavigationProp<
  YourStackParamList,
  'HearingOrderDetailsScreen'
>;

const HearingOrderDetailsScreen = () => {
  const navigation = useNavigation<HearingOrderDetailsNavigationProp>();

  // This handler is now only for buttons that don't navigate, like "Download".
  const handlePress = (action: string) => {
    Alert.alert(action, `The "${action}" action was triggered.`);
  };

  const dummyText = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1980s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Main Content Box with Gradient Border */}
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.contentBoxGradient}>
            <View style={styles.contentBox}>
              <ScrollView nestedScrollEnabled={true}>
                <Text style={styles.detailsText}>{dummyText}</Text>
              </ScrollView>
              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() =>
                    navigation.navigate('SendHearingMessageScreen')
                  }>
                  <LinearGradient
                    colors={['#01B779', '#008C68']}
                    style={styles.smallButton}>
                    <Text style={styles.buttonText}>Send Details</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={{width: 16}} />

                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => handlePress('Download')}>
                  <LinearGradient
                    colors={['#01B779', '#008C68']}
                    style={styles.smallButton}>
                    <Text style={styles.buttonText}>Download</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {/* Client Payment Reminder Button  */}
          <TouchableOpacity
            style={{marginTop: 24}}
            onPress={() => navigation.navigate('SendInvoiceReminderScreen')}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.largeButton}>
              <Text style={styles.buttonText}>Client Payment Reminder</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    padding: 24,
  },
  contentBoxGradient: {
    borderRadius: 15,
    padding: 1, 
    flex: 1, 
  },
  contentBox: {
    backgroundColor: '#093138',
    borderRadius: 14,
    padding: 20,
    minHeight: 400, 
    flex: 1,
  },
  detailsText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallButton: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButton: {
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HearingOrderDetailsScreen;