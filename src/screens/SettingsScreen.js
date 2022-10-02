import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../contents";
import { useNavigation } from "@react-navigation/native";

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
    icon: "car",
    path: "Trips",
  },
];

const options = [
  {
    id: 1,
    label: "Messages",
    icon: "help-circle",
    path: "Messages",
  },
  {
    id: 2,
    label: "Settings",
    icon: "ios-wallet",
    path: "Settings",
  },
  {
    id: 3,
    label: "Legal",
    icon: "car",
    path: "Legal",
  },
  {
    id: 4,
    label: "Admin",
    icon: "car",
    path: "Admin",
  },
];

const AccountScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.username}>Frank Boakye</Text>
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
    fontSize: 20,
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
