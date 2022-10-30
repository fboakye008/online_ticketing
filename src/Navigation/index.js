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
    VerificationScreen,
    HomeScreen,
    RouteScreen,
    BusStopTimeScreen,
    AccountScreen,
    TicketScreen,
    FAQScreen,
    AppInfoScreen,
    TermsScreen,
    CustomerServiceScreen,
    Help,
    About,
    Trips,
    PaymentScreen,
    PaymentMessage,
    ScheduleScreen,
    Wallet, MapScreen,
    SettingScreen
} from "../screens";

import Ionicons from "react-native-vector-icons/Ionicons";
import {Colors} from "../contents";


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <HomeStack.Screen name="Splash" component={SplashScreen}/>
            <HomeStack.Screen name="Welcome" component={WelcomeScreen}/>
            <HomeStack.Screen name="Signin" component={SignInScreen}/>
            <HomeStack.Screen name="Signup" component={SignUpScreen}/>
            <HomeStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <HomeStack.Screen name="ResetPassword" component={ResetPassword}/>
            <HomeStack.Screen name="Verification" component={VerificationScreen}/>
            <HomeStack.Screen name="Wallet" component={Wallet} />
            <HomeStack.Screen name="Home" component={HomeScreen}/>
            <HomeStack.Screen name="Route" component={RouteScreen}/>
            <HomeStack.Screen name="BusStopTimeScreen" component={BusStopTimeScreen}/>
            <HomeStack.Screen name="FAQScreen" component={FAQScreen}/>
            <HomeStack.Screen name="CustomerServiceScreen" component={CustomerServiceScreen}/>
            <HomeStack.Screen name="AppInfoScreen" component={AppInfoScreen}/>
            <HomeStack.Screen name="TermsScreen" component={TermsScreen}/>
            <HomeStack.Screen name="TicketScreen" component={TicketScreen}/>
            <HomeStack.Screen name="PaymentScreen" component={PaymentScreen}/>
            <HomeStack.Screen name="PaymentMessage" component={PaymentMessage}/>
            <HomeStack.Screen name="ScheduleScreen" component={ScheduleScreen}/>
            <HomeStack.Screen name="MapScreen" component={MapScreen}/>
            <HomeStack.Screen name="SettingScreen" component={SettingScreen}/>
        </HomeStack.Navigator>
    );
};

const AccountStack = createNativeStackNavigator();
const AccountStackNavigator = () => {
    return (
        <AccountStack.Navigator screenOptions={{headerShown: false,}}>
            <AccountStack.Screen name="Account" component={AccountScreen}/>
            <AccountStack.Screen name="Help" component={Help}/>
            <AccountStack.Screen name="About" component={About}/>
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
            }}>
            <BottomTab.Screen
                name="HomeStack"
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
            <BottomTab.Screen
                name="Help"
                component={Help}
                options={{
                    tabBarLabel: "Help",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons
                            name="help-circle"
                            color={focused ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY}
                            size={size}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="About"
                component={About}
                options={{
                    tabBarLabel: "About",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons
                            name="information-circle"
                            color={focused ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY}
                            size={size}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
