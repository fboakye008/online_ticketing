import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SplashScreen,
  WelcomeScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  RegisterPhoneNumberScreen,
  VerificationScreen,
  HomeScreen,
  BookingScreen,
  SettingsScreen,
} from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../contents";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="bookings" component={BookingScreen} />
    </HomeStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        activeTintColor: Colors.DEFAULT_BLACK,
        inactiveTintColor: Colors.DEFAULT_GREY,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="ios-home"
              color={focused ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="person"
              color={focused ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY}
              size={size}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signin" component={SignInScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="RegisterPhone"
        component={RegisterPhoneNumberScreen}
      />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
