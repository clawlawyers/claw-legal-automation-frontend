// src/navigation/types.ts
import {NavigatorScreenParams} from '@react-navigation/native';
import {YourCasesStackParamList} from '../stacks/YourCasesStack';
import {HomeStackParamList} from '../stacks/HomeStack';
import {YourAlertsStackParamList} from '../stacks/YourAlertsStack';
import {AccountStackParamList} from '../stacks/YourAccountStack';
import {SettingsStackParamList} from '../stacks/YourSettingsStack';
// import type { YourCasesStackParamList } from './YourCasesStack'; // if you have types for other stacks

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  YourCases: NavigatorScreenParams<YourCasesStackParamList>;
  Alerts: NavigatorScreenParams<YourAlertsStackParamList>; 
  Account: NavigatorScreenParams<AccountStackParamList>; 
  Settings: NavigatorScreenParams<SettingsStackParamList>; 
};