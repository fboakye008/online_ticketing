import { v4 as uuidv4 } from "uuid";
import React from "react";
import { View } from "react-native";

export const generateToken = () => {
  return uuidv4();
};
