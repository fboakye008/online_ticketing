import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import SwitchSelector from "react-native-switch-selector";
import { Colors } from '../../contents';



const options = [
    { label: "Ticket", value: "Ticket" },
    { label: "History", value: "History" }
  ];

const SwitchButton = (toggleSwitch) => {
  return (
    <View>
      <SwitchSelector
  options={options}
  initial={0}
  onPress={(item) => {toggleSwitch(item)}}
  textColor={Colors.DEFAULT_WHITE}
  buttonColor = {Colors.DEFAULT_GREEN}
  borderColor = {Colors.DEFAULT_GREY}
  backgroundColor={Colors.Blue_Gray}
  borderRadius = {10}
  haspadding
/>

    </View>
  )
}


export default SwitchButton;


