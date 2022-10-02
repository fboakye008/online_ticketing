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
      <Text style={styles.label}>{label}:</Text>
      
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
  
//   const TextField = (props) => {
//     const {placeholder,
//       label,
//       isPassword,
//       icon,
//       setPasswordShow,
//       isPasswordShow,  
//       onFocus = ()=>{},
//        } = props
//     const [isFocused, setIsFocused] = React.useState(false);
//     return <View style={{marginVertical: 5}}>
//         <Text style={styles.label}>{label}:</Text>
//         <View style={[
//             styles.inputContainer, 
//             {
//                 borderColor: isFocused 
//                  ?Colors.LIGHT_GREEN
//                  : Colors.Light
//                  },
//                  ]}>
//             <Feather
//           name={icon}
//           size={22}
//           color={Colors.DEFAULT_GREY}
//           style={{ marginRight: 10 }}
//         />
//         <TextInput 
//           value onChangeText  placeholder={placeholder} style={styles.inputText}
//         />
//         <TextInput
         
//           // 
          
//           placeholderTextColor={Colors.DEFAULT_GREY}
//           SelectionColor={Colors.DEFAULT_GREEN}
//           autoCorrect={false}
//           onFocus={()=>{
//             onFocus();
//             setIsFocused(true);
//             }}

//             onBlur={()=>{
//                 setIsFocused(false);
//             }}
//             style={styles.inputText} 
//         />
           
//         </View>
        
        
//         <TouchableOpacity onPress={() => setPasswordShow(!isPasswordShow)}>
//           {isPassword ? (
//             <Feather
//               name={isPasswordShow ? 'eye' : 'eye-off'}
//               size={22}
//               color={Colors.Blue_Gray}
//               style={{ marginRight: 10 }}
//             />
//           ) : null}
//         </TouchableOpacity>
//     </View>;
// }


const styles=StyleSheet.create({ 
  label:{
   marginVertical: 5,
   fontSize: 14,
   color: Colors.grey,
  },
inputContainer: {
    height: 55,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: Colors.Light,
    borderColor: Colors.LIGHT_GREEN,
    alignItems: 'center',
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