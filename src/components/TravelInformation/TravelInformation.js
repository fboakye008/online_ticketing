import React from "react";
import { View, Text} from "react-native";
import {StyleSheet} from 'react-native-web';


const TravelInformation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>I will write message here</Text>
      <Text style={styles.text}>I will write message here</Text>
      <Text style={styles.readMore}>Read more</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2b80ff",
    padding: 17,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
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
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
})

export default TravelInformation;
