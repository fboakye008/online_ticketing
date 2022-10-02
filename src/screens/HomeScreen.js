import React, { useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import logo from "../../src/images/logo1.png";
import TravelInformation from "../components/TravelInformation/TravelInformation";
import { Colors } from "../contents";
import { Display } from "../screens/utils";
import HomeSearch from "../components/HomeSearch/HomeSearch";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={[styles.Image]} resizeMode="cover" />
        <TravelInformation />
        <HomeSearch />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  Image: {
    height: Display.setHeight(30),
    width: Display.setWidth(100),
  },
});
export default HomeScreen;
