import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../contents";
import {useNavigation} from "@react-navigation/native";
import utils from "../apis/utils";

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
        path: "Setting",
    },
    
    {
        id: 3,
        label: "Logout",
        icon: "log-out",
        path: "Logout",
    },
];

const AccountScreen = ({navigation}) => {
    //const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        phone: "",
        apiKey: "",
    });
    const {fullName, phone, apiKey} = userInfo;
    const handleAction = function (item) {
        async function removeUser() {
            await utils.removeUser();
            navigation.replace("Home")
        }
        if (item.option.path === "Logout") {
            removeUser().catch(console.error);
        } else{
            navigation.navigate(item.option.path);
        }
    }
    useEffect(() => {
        async function retrieveUser() {
            const y = await utils.isLoggedIn()
            if (y) {
                const user = JSON.parse(y)
                console.log(user)
                setUserInfo({...userInfo, ["fullName"]: user.full_name});
            } else {
                const navPage = 'Account';
                navigation.navigate('Signin', {navPage});
            }
        }
        retrieveUser().catch(console.error);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
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
        padding: 35,
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
});

export default AccountScreen;
