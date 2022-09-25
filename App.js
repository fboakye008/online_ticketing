import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MainStackNavigator from "./src/Navigation";

export default () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};
