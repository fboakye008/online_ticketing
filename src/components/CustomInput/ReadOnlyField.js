import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
  } from 'react-native';
  import { Colors } from '../../contents';
  import { Display } from '../../screens/utils';

  const ReadOnlyField = ( {placeholder, label}) =>{ 
   
          
  return(
    <>
      <Text style={styles.label}>{label}:</Text>
      
      <View style={[styles.inputContainer ]}>
      <Text placeholderTextColor={Colors.DEFAULT_BLACK}>{placeholder}</Text>
      </View>
    </>
  );
  };


const styles=StyleSheet.create({ 
  label: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    paddingLeft: 10,
  },
  inputField: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: Colors.INACTIVE_GREY,
    width: "100%",
    height: 50,
    borderRadius: 50,
    shadowColor: Colors.DEFAULT_BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.121,
    shadowRadius: 9.11,
    elevation: 5,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
});
export default  ReadOnlyField;