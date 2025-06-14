// src/screens/Home/Section3/ViewClientCasesScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {YourCasesStackParamList} from '../../../stacks/YourCasesStack';

type CaseItemType = {
  clawId: string;
  crn: string;
  details: string;
};

const cases: CaseItemType[] = [
  {
    clawId: 'CL00025',
    crn: 'WB071256987589742007',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
  {
    clawId: 'CL00023',
    crn: 'WB071256987589742007',
    details:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
  },
];

type ViewClientCasesScreenNavigationProp = NavigationProp<
  YourCasesStackParamList,
  'ViewClientCasesScreen'
>;

const ViewClientCasesScreen = () => {
  const navigation = useNavigation<ViewClientCasesScreenNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [selectedParameter, setSelectedParameter] = useState<string | null>(
    null,
  );
  const parameterOptions = [
    {label: 'Claw Case ID', value: 'claw_case_id'},
    {label: 'CRN No', value: 'crn_no'},
    {label: 'Case Details', value: 'case_details'},
  ];

  const handleCaseItemPress = (caseItem: CaseItemType) => {
    navigation.navigate('AssociateClientCaseScreen', {
      caseId: caseItem.clawId,
      caseDetails: caseItem,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#062C2D] px-5 pb-6">
      {/* Header */}
      <View className="flex-row items-center mt-5">
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-10 h-10 rounded-full justify-center items-center overflow-hidden">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <View className="w-9 h-9 rounded-full bg-[#062C2D] justify-center items-center">
              <Icon name="arrow-left" size={20} color="#01B679" />
            </View>
          </Pressable>
        </LinearGradient>
        <View className="ml-3 flex-1">
          <Text
            className="text-white text-xs"
            style={{fontFamily: 'SpaceGrotesk-Regular'}}>
            Viewing
          </Text>
          <Text
            className="text-white text-base"
            style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Client Details
          </Text>
        </View>
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-10 h-10 rounded-full justify-center items-center overflow-hidden">
          <Pressable
            onPress={() => console.log('Download pressed')}
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
            <Icon name="download" size={20} color="white" />
          </Pressable>
        </LinearGradient>
      </View>

      <View className="mt-5 space-y-1">
        <Text
          className="text-white"
          style={{fontFamily: 'SpaceGrotesk-Regular'}}>
          <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>Client Name: </Text>
          Aarav Sharma
        </Text>
        <Text
          className="text-white"
          style={{fontFamily: 'SpaceGrotesk-Regular'}}>
          <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Client Email ID:{' '}
          </Text>
          aarav.sharma@example.com
        </Text>
        <Text
          className="text-white"
          style={{fontFamily: 'SpaceGrotesk-Regular'}}>
          <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>
            Client Contact:{' '}
          </Text>
          +91 98765 43210
        </Text>
        <Text
          className="text-white"
          style={{fontFamily: 'SpaceGrotesk-Regular'}}>
          <Text style={{fontFamily: 'SpaceGrotesk-Bold'}}>Connect via: </Text>
          Email, Contact SMS, Whatsapp
        </Text>
      </View>

      <Text
        className="text-white text-center text-base mt-6 mb-2"
        style={{fontFamily: 'SpaceGrotesk-Bold'}}>
        Associated Cases
      </Text>

      <View
        style={styles.filterSearchRow}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            iconStyle={styles.dropdownIcon}
            data={parameterOptions}
            labelField="label"
            valueField="value"
            placeholder={selectedParameter || 'Parameter'}
            value={selectedParameter}
            onChange={item => setSelectedParameter(item.value)}
            renderRightIcon={() => (
              <Ionicons name="chevron-down" size={18} color="#fff" />
            )}
          />
        </View>
        <View
          style={styles.searchInputContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#ccc"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Image
            source={require('../../../assets/icons/search1.png')}
            style={{width: 22, height: 22}}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView
        className="mb-24"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        {cases.map((item) => (
          <TouchableOpacity key={item.clawId} onPress={() => handleCaseItemPress(item)}>
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.caseItemGradient}>
              <View
                style={styles.caseItemInner}>
                <Text
                  className="text-white"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Claw Case ID:{' '}
                  <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                    {item.clawId}
                  </Text>
                </Text>
                <Text
                  className="text-white mt-1"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  CRN No:{' '}
                  <Text style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                    {item.crn}
                  </Text>
                </Text>
                <Text
                  className="text-white mt-3"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Case Details:
                </Text>
                <Text
                  className="text-white text-sm mt-1"
                  style={{fontFamily: 'SpaceGrotesk-Regular'}}>
                  {item.details}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.actionButtonsContainer}>
        <View className="flex-row justify-between items-center gap-4 mb-3">
          <View className="flex-1 rounded-lg overflow-hidden">
            <LinearGradient
              colors={['#016361', '#01B779']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              className="h-12 justify-center items-center p-[1px]">
              <Pressable
                onPress={() => Alert.alert("Delete Client", "Are you sure?")}
                className="w-full h-full justify-center items-center bg-[#062C2D] rounded-[7px]"
                android_ripple={{color: 'rgba(255,255,255,0.1)'}}>
                <Text
                  className="text-white"
                  style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                  Delete
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
          <LinearGradient
            colors={['#016361', '#01B779']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="flex-1 h-12 rounded-lg overflow-hidden">
            <Pressable
              onPress={() => navigation.navigate('ClientDetailsScreen')}
              className="w-full h-full justify-center items-center"
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}>
              <Text
                className="text-white"
                style={{fontFamily: 'SpaceGrotesk-Bold'}}>
                Edit Client
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
        <LinearGradient
          colors={['#016361', '#01B779']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-full h-12 rounded-lg overflow-hidden">
          <Pressable
            className="w-full h-full justify-center items-center"
            android_ripple={{color: 'rgba(255,255,255,0.2)'}}
            onPress={() => {
                // This navigation needs to be to a route defined in YourCasesStackParamList
                // If 'NoActiveAlertsScreen' is not in YourCasesStackParamList, this will error
                // For now, casting to 'any' to suppress TypeScript error if it's not defined
                // but this should be fixed by defining the route or choosing a valid one.
                // navigation.navigate('NoActiveAlertsScreen' as any);
                 console.log("View All Client Cases (button) pressed - Navigation target might need review");
                 //navigation.navigate('NoActiveAlertsScreen');
            }}
            >
            <Text
              className="text-white"
              style={{fontFamily: 'SpaceGrotesk-Bold'}}>
              View All Client Cases
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterSearchRow: {
    flexDirection: 'row',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#01B779',
    overflow: 'hidden',
    marginVertical: 16,
  },
  dropdownContainer: {
    width: '40%',
    backgroundColor: '#01B779',
  },
  dropdown: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownPlaceholder: { color: '#fff', fontSize: 14, fontFamily: 'SpaceGrotesk-Regular' },
  dropdownSelectedText: { color: '#fff', fontSize: 14, fontFamily: 'SpaceGrotesk-Regular' },
  dropdownIcon: { width: 20, height: 20, tintColor: '#fff' },
  searchInputContainer: {
    flex: 1,
    backgroundColor: '#143139',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, color: '#fff', fontSize: 14, fontFamily: 'SpaceGrotesk-Regular' },
  caseItemGradient: { borderRadius: 10, marginBottom: 16, padding: 1 },
  caseItemInner: { backgroundColor: '#062C2D', borderRadius: 9, padding: 16 },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    backgroundColor: '#062C2D',
  },
});

export default ViewClientCasesScreen;