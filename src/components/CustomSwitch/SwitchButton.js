import React, { Component } from 'react'; 
import { View, Text } from 'react-native'


const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];

const SwitchButton = () => {
  return (
    <View>
      <SwitchButton
  options={options}
  initial={0}
  switchWidth = '50%'                 
                switchHeight = {44}                 
                switchdirection = 'rtl'             
                switchBorderRadius = {100}          
                switchSpeedChange = {700}          
                switchBorderColor = '#d4d4d4'       
                switchBackgroundColor = '#fff'     
                btnBorderColor = '#00a4b9'          
                btnBackgroundColor = '#00bcd4'      
                fontColor = '#b1b1b1'               
                activeFontColor = '#fff'
  onPress={value => alert(value)}
  
/>
    </View>
  )
}

export default SwitchButton;