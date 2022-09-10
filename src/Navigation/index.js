import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
  SplashScreen, 
  WelcomeScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen ,
  RegisterPhoneNumberScreen,
  VerificationScreen,
  HomeScreen,
  BookingScreen
} from "../screens";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
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
        <Stack.Screen name="RegisterPhone" component={ RegisterPhoneNumberScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="bookings" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
