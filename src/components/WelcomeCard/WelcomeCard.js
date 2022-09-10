import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Display from "../../screens/utils/Display";
import { Colors, image as MyImage } from "../../contents";

const WelcomeCard = ({ title, content, images }) => {
  // console.log(MyImage);
  // console.log(images);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={MyImage[images]}
        resizeMode="contain"
      />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Display.setWidth(100),
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    fontSize: 22,
  },
  contentText: {
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default WelcomeCard;
