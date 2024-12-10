import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HisotryScreen.jsx';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import AccountScreen from '../screens/AccountScreen';
import DirectoryScreen from '../screens/DirectoryScreen.jsx';
import SettingsScreen from '../screens/SettingsScreen.jsx';
import ResultScreen from '../screens/ResultScreen.jsx';
import ChangePasswordScreen from '../screens/ChangePasswordScreen.jsx';
import PhotosScreen from '../screens/PhotosScreen.jsx';
import SignsScreen from '../screens/SignsScreen.jsx';
import SignDetailScreen from '../screens/SignDetailScreen.jsx';
import HelpScreen from '../screens/HelpScreen.jsx';
import ForgotPasswordScreen from '../screens/authentication/ForgotPasswordScreen.jsx';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="DirectoryScreen" component={DirectoryScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="PhotosScreen" component={PhotosScreen} />
      <Stack.Screen name="SignsScreen" component={SignsScreen} />
      <Stack.Screen name="SignDetailScreen" component={SignDetailScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
