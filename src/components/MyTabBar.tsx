import React from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useNavigationState} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const iconsMap: Record<string, {icon: string; label: string}> = {
  Home: {icon: 'home', label: 'Home'},
  Status: {icon: 'tasks', label: 'Your Status'},
  Alerts: {icon: 'bell', label: 'Your Alerts'},
  Account: {icon: 'user', label: 'Your Account'},
  Settings: {icon: 'cog', label: 'Settings'},
};

const HIDDEN_ROUTES = ['Splash'];

console.log('Mytab consleo');

const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const currentState = useNavigationState(state => state);
  const currentTabIndex = currentState?.index;
  const currentRoute = currentState?.routes[currentTabIndex];

  const nestedState = currentRoute?.state as any;
  const nestedRouteName =
    nestedState?.routes?.[nestedState.index]?.name ?? currentRoute?.name;

  const shouldHide = HIDDEN_ROUTES.includes(nestedRouteName);

  // if (shouldHide || nestedRouteName === undefined) {
  //   return null;
  // }

  if (shouldHide) {
    return null;
  }

  return (
    <View className="flex-row justify-around bg-[#26272c] py-3">
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
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
          icon: 'circle',
          label: route.name,
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            onPress={onPress}
            className="items-center flex-1">
            <View
              className={`items-center justify-center ${
                isFocused
                  ? 'bg-[#e49a4c] p-4 rounded-full -mt-8 border-[6px] border-[#FAD9B3]'
                  : ''
              }`}>
              <FontAwesome
                name={icon}
                size={20}
                color={isFocused ? 'white' : 'white'}
              />
            </View>
            <Text
              className={`text-xs mt-1 ${
                isFocused ? 'text-white font-semibold' : 'text-white/70'
              }`}>
              {isFocused ? '' : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;
