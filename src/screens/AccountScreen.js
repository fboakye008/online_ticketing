import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../contents";
import projectlogo from "../assets/images/projectLogo.png";
import {useNavigation} from "@react-navigation/native";
import utils from "../apis/utils";
import {updateError} from "../utils";

const items = [
    {
        id: 1,
        label: "Help",
        icon: "help-circle",
        path: "Help",
    },
    {
        id: 2,
        label: "Ticket-Wallet",
        icon: "ios-wallet",
        path: "Wallet",
    },
    {
        id: 3,
        label: "Trips",
        icon: "bus",
        path: "Trips",
    },
];

const options = [
    {
        id: 1,
        label: "About",
        icon: "information-circle-sharp",
        path: "About",
    },
    {
        id: 2,
        label: "Settings",
        icon: "settings",
        path: "SettingScreen",
    },

    {
        id: 3,
        label: "Logout",
        icon: "log-out",
        path: "Logout",
    },
];

const AccountScreen = ({navigation}) => {
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        phone: "",
        apiKey: "",
    });
    const {fullName, phone, apiKey} = userInfo;


    const handleAction = function (item) {
        async function removeUser() {
            await utils.removeUser();
            navigation.navigate("Home");
            return;
        }

        if (item.option.path === "Logout") {
            removeUser().catch(console.error);

        } else {
            navigation.navigate(item.option.path);
        }
    }
    const focusHandler = navigation.addListener('focus', () => {
        retrieveUser().catch(console.error);
        return;
    });
    const retrieveUser = async function () {
        try {
            const y = await utils.isLoggedIn();
            if (y) {
                const user = await utils.findCachedUser();
                if (user) {
                    setUserInfo({...userInfo, ["fullName"]: user.full_name});
                } else {
                    const navPage = 'Account';
                    navigation.navigate('Signin', {navPage});
                }
            }else{
                const navPage = 'Account';
                navigation.navigate('Signin', {navPage});
            }
            return focusHandler;
        } catch (ex) {
            const navPage = 'Account';
            navigation.navigate('Signin', {navPage});
        }
    }
    useEffect(() => {
        retrieveUser().catch(console.error);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
                 <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
            <View style={styles.userContainer}>
                <Text style={styles.username}>{userInfo.fullName}</Text>
                <Ionicons name="person-circle" size={60} color={Colors.DEFAULT_GREY}/>
            </View>
            <View style={styles.itemsWrapper}>
                {items?.map((item) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        key={item.id}
                        onPress={() => navigation.navigate(item.path)}
                    >
                        <Ionicons name={item.icon} size={34} color={Colors.DEFAULT_GREEN}/>
                        <Text style={styles.itemLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.optionsWrapper}>
                {options?.map((option) => (
                    <TouchableOpacity
                        style={styles.optionContainer}
                        key={option.id}
                        onPress={() => handleAction({option})}
                    >
                        <Ionicons
                            name={option.icon}
                            size={34}
                            color={Colors.DEFAULT_GREY}
                        />
                        <Text style={styles.optionLabel}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Image source={projectlogo} style={[styles.Image]} resizeMode="contain"/>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    userContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    username: {
        fontSize: 30,
        fontWeight: "bold",
    },
    itemsWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 2,
    },
    itemContainer: {
        backgroundColor: "#fff",
        flexDirection: "column",
        alignItems: "center",
        padding: 15,
        paddingLeft: 20,
        marginBottom: 20,
        paddingRight: 20,
        borderRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#e6e7e8",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.DEFAULT_GREY,
        paddingVertical: 5,
    },
    optionsWrapper: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: 15,
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.DEFAULT_GREY,
    },
    optionLabel: {
        paddingLeft: 20,
    },
   
    Image: {

        height: 80,
        width: 80,
        marginLeft: "42%",
        marginTop: 11
    },
});

export default AccountScreen;
