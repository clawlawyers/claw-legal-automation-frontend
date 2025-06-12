// src/screens/Home/Section2/SearchedCaseListScreen.tsx

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {YourCasesStackParamList, CaseDetailsType} from '../../../stacks/YourCasesStack';

type CaseListItemType = {
  id: string;
  claw_case_id: string;
  crn_no: string;
  case_details: string;
};

type SearchedCaseListScreenNavigationProp = NavigationProp<
  YourCasesStackParamList,
  'SearchedCaseListScreen'
>;

const SearchedCaseListScreen = () => {
  const navigation = useNavigation<SearchedCaseListScreenNavigationProp>();

  // This would typically come from route params or an API call
  const casesData: CaseListItemType[] = [
    {
      id: '29',
      claw_case_id: 'CL00023',
      crn_no: 'WB071256987586742007',
      case_details:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
    {
      id: '30',
      claw_case_id: 'CL00024',
      crn_no: 'WB071256987586742008',
      case_details:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
    {
      id: '290',
      claw_case_id: 'CL00044',
      crn_no: 'WB071256987586742007',
      case_details:
        'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
    },
  ];

  const handleCaseItemPress = (item: CaseListItemType) => {
    console.log('Navigating to case details for:', item.claw_case_id);
    const caseDetailsToPass: CaseDetailsType = {
        id: item.id,
        clawId: item.claw_case_id,
        crn: item.crn_no,
        details: item.case_details,
    };

    navigation.navigate('CaseDetailsScreen', {
      caseDetails: caseDetailsToPass,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#01B779" />
        </Pressable>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSubtitle}>Viewing</Text>
          <Text style={styles.headerTitle}>
            Searched Cases 
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {casesData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleCaseItemPress(item)}>
            <View style={styles.caseItemContainer}>
              <Text style={styles.caseItemLabel}>
                Claw Case ID:{' '}
                <Text style={styles.caseItemValue}>{item.claw_case_id}</Text>
              </Text>
              <Text style={styles.caseItemLabel}>
                CRN No : <Text style={styles.caseItemValue}>{item.crn_no}</Text>
              </Text>
              <Text style={styles.caseItemLabel}>
                Case Details :
              </Text>
              <Text style={styles.caseItemDetails}>
                {item.case_details}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#062C2D',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#01B779',
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    marginTop: 14,
    paddingHorizontal: 20,
  },
  caseItemContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#016361',
    backgroundColor: '#062C2D',
    marginBottom: 16,
  },
  caseItemLabel: {
    color: '#FFFFFF',
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    marginBottom: 4,
  },
  caseItemValue: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontWeight: 'normal',
  },
  caseItemDetails: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    marginTop: 2,
    lineHeight: 20,
  },
});

export default SearchedCaseListScreen;