import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import Feather from 'react-native-vector-icons/Feather';
  import { Colors } from '../../contents';
  import { Display } from '../../screens/utils';

  const TextField = (props) =>{ 
    const {placeholder, label,isPassword,
            icon,
            setPasswordShow,
            isPasswordShow,  
            onFocus = ()=>{}
          } = props
          const [isFocused, setIsFocused] = React.useState(false);
  return(
    <>
      <Text style={styles.label}></Text>
      
      <View style={[
            styles.inputContainer, 
            {
                borderColor: isFocused 
                 ?Colors.LIGHT_GREEN
                 : Colors.Light
                 },
                 ]}>
                 <Feather
          name={icon}
          size={22}
          color={Colors.DEFAULT_GREY}
          style={{ marginRight: 10 }}
        />
        
      <TextInput 
      {...props} 
      placeholder={placeholder}
      placeholderTextColor={Colors.DEFAULT_GREY}
          SelectionColor={Colors.DEFAULT_GREEN}
          autoCorrect={false}
          onFocus={()=>{
            onFocus();
            setIsFocused(true);
            }}

            onBlur={()=>{
                setIsFocused(false);
            }}
            style={styles.inputText} 
        />
           <TouchableOpacity onPress={() => setPasswordShow(!isPasswordShow)}>
       {isPassword ? (
        <Feather
           name={isPasswordShow ? 'eye' : 'eye-off'}
           size={22}
       color={Colors.Blue_Gray}
      style={{ marginRight: 10 }}
   />
  ) : null}
  </TouchableOpacity>
      </View>
    </>
  );
  };
  
const styles=StyleSheet.create({ 
  label:{
   marginVertical: 5,
   fontSize: 15,
   color: Colors.DEFAULT_BLACK,
  },
inputContainer: {
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 15,
  backgroundColor: Colors.SECONDARY_WHITE,
  width: "90%",
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
  // inputSubContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
});
export default  TextField;