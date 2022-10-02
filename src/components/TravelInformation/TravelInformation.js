import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native-web";
import { Colors } from "../../contents";

const TravelInformation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride with VIP today</Text>
      {/* <Text style={styles.readMore} onPress={() => navigation.navigate('readMore')}>Read more</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DEFAULT_GREEN,
    padding: 19,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    marginHorizontal: 20,
    shadowColor: Colors.DEFAULT_GREEN,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.31,
    shadowRadius: 9.11,
    elevation: 14,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: "#bed9ff",
    fontSize: 15,
    marginBottom: 10,
  },
  readMore: {
    color: Colors.DEFAULT_GREY,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default TravelInformation;
