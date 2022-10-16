import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {
    SplashScreen,
    WelcomeScreen,
    SignInScreen,
    SignUpScreen,
    ForgotPasswordScreen,
    ResetPassword,
    // RegisterPhoneNumberScreen,
    VerificationScreen,
    HomeScreen,
    BookingScreen,
    RouteScreen,
    BusStopTimeScreen,
    AccountScreen,
    Help,
    About,
    Legal,
    Trips,
    Ticket,
    PaymentMessage,
    Wallet,
} from "../screens";

import Ionicons from "react-native-vector-icons/Ionicons";
import {Colors} from "../contents";
import PaymentScreen from "../screens/PaymentScreen";
// import { PaymentMessage } from "../screens";
//import { Ticket } from "../screens";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="Home" component={HomeScreen}/>
            <HomeStack.Screen name="Booking" component={BookingScreen}/>
            <HomeStack.Screen name="Route" component={RouteScreen}/>
            <HomeStack.Screen name="BusStopTime" component={BusStopTimeScreen}/>
            <HomeStack.Screen name="Ticket" component={Ticket}/>
            <HomeStack.Screen name="Payment" component={PaymentScreen}/>
            <HomeStack.Screen name="PaymentMessage" component={PaymentMessage}/>
        </HomeStack.Navigator>
    );
};

const AccountStack = createNativeStackNavigator();
const AccountStackNavigator = () => {
    return (
        <AccountStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AccountStack.Screen name="Account" component={AccountScreen}/>
            <AccountStack.Screen name="Help" component={Help}/>
            <AccountStack.Screen name="About" component={About}/>
            <AccountStack.Screen name="Legal" component={Legal}/>
            <AccountStack.Screen name="Wallet" component={Wallet} /> 
            <AccountStack.Screen name="Trips" component={Trips}/>
        </AccountStack.Navigator>
    );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                activeTintColor: Colors.DEFAULT_BLACK,
                inactiveTintColor: Colors.DEFAULT_GREY,
                tabBarActiveTintColor: Colors.DEFAULT_BLACK,
                tabBarInactiveTintColor: Colors.DEFAULT_GREY,
            }}
        >
            <BottomTab.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons
                            name="ios-home"
                            color={focused ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY}
                            size={size}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="AccountStack"
                component={AccountStackNavigator}
                options={{
                    tabBarLabel: "Account",
                    tabBarIcon: ({size, focused}) => (
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
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Signin" component={SignInScreen}/>
            <Stack.Screen name="Signup" component={SignUpScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="ResetPassword" component={ResetPassword}/>
            <Stack.Screen name="Verification" component={VerificationScreen}/>
            <Stack.Screen name="Home" component={BottomTabNavigator}/>
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
