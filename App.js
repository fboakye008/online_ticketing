import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BottomTabNavigator from "./src/Navigation";

export default () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};
