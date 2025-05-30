// src/navigation/types.ts
import {NavigatorScreenParams} from '@react-navigation/native';
import {YourCasesStackParamList} from '../stacks/YourCasesStack';
import {HomeStackParamList} from '../stacks/HomeStack';
// import type { YourCasesStackParamList } from './YourCasesStack'; // if you have types for other stacks

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  YourCases: NavigatorScreenParams<YourCasesStackParamList>;
  Alerts: undefined;
  Account: undefined;
  Settings: undefined;
};
