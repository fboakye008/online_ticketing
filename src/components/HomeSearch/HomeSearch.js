import React from "react";
import {
  View,
  Text,
  StyleSheet,
  inputText,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Colors } from "../../contents";
import { useNavigation } from "@react-navigation/native";

const HomeSearch = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => navigation.navigate("Booking")}
      >
        <EvilIcons name="search" size={24} color="black" />
        <Text style={styles.inputText}>Where To?</Text>
      </TouchableOpacity>
      <View style={styles.tripHistoryWrapper}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <AntDesign
              name="clockcircle"
              size={16}
              color={"#ffffff"}
            ></AntDesign>
          </View>
          <Text style={styles.destinationText}>Accra-Kumasi</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <AntDesign
              name="clockcircle"
              size={16}
              color={"#ffffff"}
            ></AntDesign>
          </View>
          <Text style={styles.destinationText}>Kumasi-Takoradi</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <AntDesign
              name="clockcircle"
              size={16}
              color={"#ffffff"}
            ></AntDesign>
          </View>
          <Text style={styles.destinationText}>Cape-Coast-Kumasi</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  inputBox: {
    backgroundColor: "#b0b0b0",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 60,
  },
  inputText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#6e6e6e",
    justifyContent: "space-between",
  },
  tripHistoryWrapper: {
    marginTop: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
  },
  iconContainer: {
    backgroundColor: "#b3b3b3",
    padding: 10,
    borderRadius: 25,
  },
  destinationText: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 16,
  },
});

export default HomeSearch;
