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
    RouteScreen,
    BusStopTimeScreen,
    AccountScreen,
    TicketScreen,
    Help,
    About,
    Trips,
    PaymentScreen,
    PaymentMessage,
    ScheduleScreen,
    MapScreen,
    Wallet
} from "../screens";

import Ionicons from "react-native-vector-icons/Ionicons";
import {Colors} from "../contents";


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="Home" component={HomeScreen}/>
            <HomeStack.Screen name="Route" component={RouteScreen}/>
            <HomeStack.Screen name="BusStopTimeScreen" component={BusStopTimeScreen}/>
            <HomeStack.Screen name="TicketScreen" component={TicketScreen}/>
            <HomeStack.Screen name="PaymentScreen" component={PaymentScreen}/>
            <HomeStack.Screen name="PaymentMessage" component={PaymentMessage}/>
            <HomeStack.Screen name="ScheduleScreen" component={ScheduleScreen}/>
            <HomeStack.Screen name="MapScreen" component={MapScreen}/>
        </HomeStack.Navigator>
    );
};

const HelpStack = createNativeStackNavigator();

const HelpStackNavigator = () => {
    return (
        <HelpStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
                <HelpStack.Screen name="Help" component={Help}/>
        </HelpStack.Navigator>
    );
};

const AboutStack = createNativeStackNavigator();

const AboutStackNavigator = () => {
    return (
        <AboutStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
                <AboutStack.Screen name="About" component={About}/>
        </AboutStack.Navigator>
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
                name="HelpStack"
                component={HelpStackNavigator}
                options={{
                    tabBarLabel: "Help",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons
                            name="help-circle"
                            color={focused ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY}
                            size={30}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="AboutStack"
                component={AboutStackNavigator}
                options={{
                    tabBarLabel: "About",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons
                            name="information-circle"
                            color={focused ? Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY}
                            size={30}
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
            <Stack.Screen name="ScheduleScreen" component={ScheduleScreen}/>
            <Stack.Screen name="MapScreen" component={MapScreen}/>
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen name="Home" component={BottomTabNavigator}/>
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
