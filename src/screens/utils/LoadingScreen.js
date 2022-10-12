import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";
import loadingImage from "../../images/loading.json";

const LoadingScreen = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Lottie
        source={loadingImage}
        autoPlay
        autoSize
        style={[styles.image, { width }]}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  image: {
    width: 200,
    height: 200,
  },
});
