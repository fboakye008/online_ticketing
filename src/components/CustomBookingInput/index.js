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
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const BookingTextField = ({ placeholder, label, numOfPassenger }) => {
  const [numOfPassengers, setNumOfPassengers] = React.useState(1);
  return (
    <View style={styles.FieldContainer}>
      <Text style={styles.label}>{label}:</Text>
      {numOfPassenger ? (
        <TouchableOpacity style={styles.inputField}>
          <Text>{numOfPassengers}</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (numOfPassengers > 1) {
                  setNumOfPassengers(numOfPassengers - 1);
                }
              }}
            >
              <AntDesign name="minus" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setNumOfPassengers(numOfPassengers + 1)}
            >
              <MaterialIcons
                name="add"
                size={20}
                color={Colors.DEFAULT_BLACK}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.inputField}>
          <Text>{placeholder}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={30} color="#000" />
        </TouchableOpacity>
      )}
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
  btnContainer: {
    flexDirection: "row",
  },
  btn: {
    paddingHorizontal: 10,
  },
});

export default BookingTextField;
