/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import CoursesScreen from '../screens/CoursesScreen';
import SearchScreen from '../screens/SearchScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
      }}>
      <BottomTab.Screen
        name="Home" // changes made in types.tsx
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color = {color} />,
        }}
      />
      <BottomTab.Screen
        name="Courses" 
        component={CoursesScreen}
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <Ionicons name="library" size={24} color = {color} />,
        }}
      />
      <BottomTab.Screen
        name="Search" 
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome5 name="search" size={24} color = {color} />,
        }}
      />
      <BottomTab.Screen
        name="Downloads"
        component={DownloadsScreen}
        options={{
          title: 'Downloads',
          tabBarIcon: ({ color }) => <FontAwesome5 name="download" size={24} color = {color} />,
        }}
      />         
    </BottomTab.Navigator>
  );
}

// icons like search, download, home,..etc can be customized from https://icons.expo.fyi
// {HomeScreen} is imported from Screens component and as many can be made.

/**
 * { color } is the color used. {} for not any specific color but the color indicated.
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

