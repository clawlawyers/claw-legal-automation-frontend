// src/screens/CaseDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image, // Import Image
  Pressable, // Import Pressable
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
// Icon is no longer needed for the back button. It's safe to remove.
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchCaseDetailsScreen = () => {
  const navigation = useNavigation();

  const handleDownload = () => console.log('Download pressed');

  // Dummy data for display
  const title =
    'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...';
  const body =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1980s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1980s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, whLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Header with updated back button */}
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Image
              // IMPORTANT: Make sure this path is correct for your project
              source={require('../../../assets/icons/back.png')}
              style={styles.backButtonImage}
              resizeMode="contain"
            />
          </Pressable>
          <View>
            <Text style={styles.headerSubtitle}>Viewing</Text>
            <Text style={styles.headerTitle}>Case Details</Text>
          </View>
        </View>

        {/* Main Content Area */}
        <View style={styles.contentArea}>
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.cardGradientBorder}>
            <View style={styles.card}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardBody}>{body}</Text>
              </ScrollView>
            </View>
          </LinearGradient>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleDownload} style={{width: '100%'}}>
            <LinearGradient
              colors={['#01B779', '#008C68']}
              style={styles.footerButton}>
              <Text style={styles.buttonText}>Download</Text>
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
  contentArea: {
    flex: 1,
    padding: 20,
  },
  cardGradientBorder: {
    borderRadius: 15,
    padding: 1.5,
    flex: 1,
  },
  card: {
    backgroundColor: '#093138',
    borderRadius: 14,
    padding: 20,
    flex: 1,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 16,
  },
  cardBody: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    backgroundColor: '#093138',
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

export default SearchCaseDetailsScreen;