import React, { Component } from 'react'; 
import { View, Text, StyleSheet } from 'react-native'
import SwitchSelector from "react-native-switch-selector";
import { Colors } from '../../contents';



const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];

const SwitchButton = () => {
  return (
    <View>
      <SwitchSelector
  options={options}
  initial={0}
  onPress={value => alert(value)}
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


