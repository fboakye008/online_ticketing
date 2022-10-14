
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../contents";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const items = [
  {
    id: 1,
    label: "Help",
    icon: "help-circle",
    path: "Help",
  },
  {
    id: 2,
    label: "Wallet",
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
    label: "Messages",
    icon: "information-circle-sharp",
    path: "Messages",
  },
  {
    id: 2,
    label: "Settings",
    icon: "settings",
    path: "Settings",
  },
  {
    id: 3,
    label: "Legal",
    icon: "hand-left-sharp",
    path: "Legal",
  },
  {
    id: 4,
    label: "Logout",
    icon: "log-out",
    path: "Signin",
  },
];

const AccountScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    phone: "",
    apiKey: "",
  });
  const { fullName,phone,apiKey } = userInfo;

  useEffect(() => {
    async function retrieveUser() {
      const y= await AsyncStorage.getItem("user")
      const user = JSON.parse(y)
      setUserInfo({ ...userInfo, ["fullName"]: user.full_name });
      //setUserInfo({ ...userInfo, ["phone"]: user.phone });
     // setUserInfo({ ...userInfo, ["apiKey"]: user.api_key });
    }
    retrieveUser().catch(console.error);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.username}>{userInfo.fullName}</Text>
        <Ionicons name="person-circle" size={34} color={Colors.DEFAULT_GREY} />
      </View>
      <View style={styles.itemsWrapper}>
        {items?.map((item) => (
          <TouchableOpacity
            style={styles.itemContainer}
            key={item.id}
            onPress={() => navigation.navigate(item.path)}
          >
            <Ionicons name={item.icon} size={34} color={Colors.DEFAULT_GREEN} />
            <Text style={styles.itemLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.optionsWrapper}>
        {options?.map((option) => (
          <TouchableOpacity
            style={styles.optionContainer}
            key={option.id}
            onPress={() => navigation.navigate(option.path)}
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
    fontSize: 50,
    fontWeight: "bold",
  },
  itemsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  itemContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    marginHorizontal: 20,
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
