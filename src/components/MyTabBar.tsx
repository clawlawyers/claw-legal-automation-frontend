/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';

// Updated to use local images
const iconsMap: Record<string, {icon: any; label: string}> = {
  Home: {
    icon: require('../assets/Firsttab.png'), // Your local image
    label: 'Home',
  },
  YourCases: {
    icon: require('../assets/Secondtab.png'),
    label: 'Your Cases',
  },
  Alerts: {
    icon: require('../assets/third.png'),
    label: 'Alerts',
  },
  Account: {
    icon: require('../assets/youraccount.png'),
    label: 'Your Account',
  },
  Settings: {
    icon: require('../assets/settings.png'),
    label: 'Settings',
  },
};

const HIDDEN_ROUTES = ['Splash'];

const MyTabBar: React.FC<BottomTabBarProps> = ({state, navigation}) => {
  const currentState = useNavigationState(navState => navState);
  const currentTabIndex = currentState?.index;
  const currentRoute = currentState?.routes[currentTabIndex];

  const nestedState = currentRoute?.state as any;
  const nestedRouteName =
    nestedState?.routes?.[nestedState.index]?.name ?? currentRoute?.name;

  const shouldHide = HIDDEN_ROUTES.includes(nestedRouteName);

  if (shouldHide) {
    return null;
  }

  return (
    <View className="flex-row justify-around bg-[#0B1B20] pt-3 pb-4">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const {icon, label} = iconsMap[route.name] || {
          icon: require('../assets/Firsttab.png'), // Fallback image
          label: route.name,
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            onPress={onPress}
            className="items-center flex-1 border-0">
            <View className="items-center mb-0.5justify-center">
              <Image
                source={icon}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: isFocused ? '#006261' : '#FFFFFF',
                }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{fontSize: 10, fontFamily: 'SpaceGrotesk-Bold'}}
              className={` justify-center font-spacegrotesk mt-1 ${
                isFocused ? 'text-[#006261] font-semibold' : 'text-white'
              }`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;
