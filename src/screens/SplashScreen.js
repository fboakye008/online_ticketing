import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { Colors, image } from "../contents";
import logo1 from "../assets/images/logo1.png";
import { generateToken } from "../helpers/tokenGenerator";
import { Display } from "./utils";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Welcome");
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Image source={logo1} resizeMode="contain" style={styles.image} />
      <Text style={styles.titleText}>VIP Bus Online Booking</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  image: {
    height: Display.setHeight(50),
    width: Display.setWidth(50),
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 30,
  },
});

export default SplashScreen;
