import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../contents";

const { width } = Dimensions.get("window");

const BookingTextField = ({ placeholder, label }) => {
  return (
    <View style={styles.FieldContainer}>
      <Text style={styles.label}>{label}:</Text>
      <TouchableOpacity style={styles.inputField}>
        <Text>{placeholder}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  FieldContainer: {
    width: width - 40,
    marginVertical: 10,
  },
  label: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 10,
  },
  inputField: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: Colors.SECONDARY_WHITE,
    width: "100%",
    height: 50,
    borderRadius: 50,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
});

export default BookingTextField;
