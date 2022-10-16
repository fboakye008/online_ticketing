import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../contents";

const Trips = ({ navigation }) => {
  return (


    
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e6e7e8" }}>
     <TouchableOpacity
        style={styles.arrowContainer}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      <View>
      <Text style={styles.title}>Trips</Text>
    </View>
    </SafeAreaView>
     
    
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  arrowContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SECONDARY_WHITE,
    borderRadius: 10,
    marginLeft: 10,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 5,
  },
})
export default Trips;
