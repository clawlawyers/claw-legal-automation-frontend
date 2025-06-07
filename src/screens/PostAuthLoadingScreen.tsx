// src/screens/PostAuthLoadingScreen.tsx
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  Text, // For debugging
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, NavigationProp} from '@react-navigation/native';
// TODO: Update the import path below if 'RootStack' is located elsewhere, or create the file if missing.
import {RootStackParamList} from '../navigation/RootStack';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const GIF_DISPLAY_DURATION = 3000; // 3 seconds

type PostAuthLoadingScreenNavigationProp = NavigationProp<RootStackParamList>;

const PostAuthLoadingScreen = () => {
  const navigation = useNavigation<PostAuthLoadingScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainTabs', {
        screen: 'Home',
        params: {
          screen: 'HomeScreen',
          params: { fromPostAuth: true },
        },
      });
    }, GIF_DISPLAY_DURATION);

    return () => clearTimeout(timer);
  }, [navigation]);

  

  return (
    <LinearGradient
      colors={['#0A3A40', '#083035']}
      className="flex-1">
      <SafeAreaView
        className="flex-1 justify-center items-center"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <Image
          source={require('../assets/gifs/loading_anim.gif')} 
          style={{
            width: screenWidth * 0.5, 
            height: screenWidth * 0.5, 
          }}
          resizeMode="contain" 
          onError={(e) => console.log('Error loading TEST GIF:', e.nativeEvent.error)} 
        />
        
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PostAuthLoadingScreen;